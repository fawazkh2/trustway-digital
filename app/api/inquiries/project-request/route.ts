import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { z } from "zod";
import { guardPublicJsonRequest, readLimitedJson } from "@/lib/security/request-guard";

const projectRequestSchema = z.object({
  name: z.string().trim().min(2).max(120), company: z.string().trim().max(160).optional().nullable(),
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()), phone: z.string().trim().min(5).max(80),
  projectType: z.enum(["Website", "Shopify", "AI Automation", "Booking System", "Sonstiges"]),
  budget: z.enum(["unter 500 €", "500-1000 €", "1000-3000 €", "über 3000 €"]),
  timeline: z.enum(["so schnell wie möglich", "innerhalb 2 Wochen", "innerhalb 1 Monat", "flexibel"]),
  description: z.string().trim().min(20).max(5000), privacy: z.literal(true),
  website: z.literal("").optional(),
}).strict();

export async function POST(request: Request) {
  try {
    const blocked = await guardPublicJsonRequest(request);
    if (blocked) return blocked;
    const body = projectRequestSchema.parse(await readLimitedJson(request));

    const { error } = await createAdminClient().from("project_requests").insert({
      name: body.name, email: body.email, phone: body.phone, project_type: body.projectType, budget: body.budget, timeline: body.timeline, description: body.description,
      company: body.company || null,
    });
    if (error) throw error;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof SyntaxError) return NextResponse.json({ error: "Bitte fülle alle Pflichtfelder korrekt aus." }, { status: 400 });
    if (error instanceof RangeError) return NextResponse.json({ error: "Die Anfrage ist zu groß." }, { status: 413 });
    return NextResponse.json({ error: "Die Projektanfrage konnte nicht gespeichert werden." }, { status: 503 });
  }
}
