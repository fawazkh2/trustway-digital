import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { z } from "zod";
import { guardPublicJsonRequest, readLimitedJson } from "@/lib/security/request-guard";

const contactInquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  project: z.enum(["Website", "Shopify-Shop", "AI Automation", "Anderes Projekt"]),
  message: z.string().trim().min(10).max(5000),
  website: z.literal("").optional(),
}).strict();

export async function POST(request: Request) {
  try {
    const blocked = await guardPublicJsonRequest(request);
    if (blocked) return blocked;
    const body = contactInquirySchema.parse(await readLimitedJson(request));

    const { error } = await createAdminClient().from("contact_inquiries").insert({ name: body.name, email: body.email, project_type: body.project, message: body.message });
    if (error) throw error;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof SyntaxError) return NextResponse.json({ error: "Bitte fülle alle Pflichtfelder korrekt aus." }, { status: 400 });
    if (error instanceof RangeError) return NextResponse.json({ error: "Die Anfrage ist zu groß." }, { status: 413 });
    return NextResponse.json({ error: "Die Anfrage konnte nicht gespeichert werden." }, { status: 503 });
  }
}
