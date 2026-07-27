import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const MAX_BODY_BYTES = 20_000;
const MAX_REQUESTS = 5;
const WINDOW_SECONDS = 60;

function clientIp(request: Request) {
  // Vercel overwrites this header at the edge. Treat other deployments as one bucket
  // until a trusted proxy integration is explicitly configured.
  return request.headers.get("x-vercel-forwarded-for") || "untrusted-network";
}

function hashedRateKey(request: Request) {
  const salt = process.env.RATE_LIMIT_SALT || new URL(request.url).origin;
  return createHash("sha256").update(`${salt}:${clientIp(request)}`).digest("hex");
}

export async function guardPublicJsonRequest(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "Ungültiges Anfrageformat." }, { status: 415 });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Ungültige Anfragequelle." }, { status: 403 });
  const { data, error } = await createAdminClient().rpc("consume_public_request_rate_limit", { rate_key: hashedRateKey(request), max_requests: MAX_REQUESTS, window_seconds: WINDOW_SECONDS });
  if (error) throw error;
  if (!data) return NextResponse.json({ error: "Zu viele Anfragen. Bitte versuche es später erneut." }, { status: 429, headers: { "Retry-After": String(WINDOW_SECONDS) } });
  return null;
}

export async function readLimitedJson(request: Request): Promise<unknown> {
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) throw new RangeError("Request body too large");
  if (!request.body) throw new SyntaxError("Missing request body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) { await reader.cancel(); throw new RangeError("Request body too large"); }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(body));
}
