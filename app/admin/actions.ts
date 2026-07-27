"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/require-user";
import { createAdminClient } from "@/lib/supabase/admin";

const statuses = ["planning", "development", "complete"] as const;
const inquiryStatuses = ["new", "in_progress", "closed"] as const;

function value(formData: FormData, key: string) { return String(formData.get(key) ?? "").trim(); }
function validStatus(status: string) { return statuses.includes(status as (typeof statuses)[number]) ? status : "planning"; }
function validInquiryStatus(status: string) { return inquiryStatuses.includes(status as (typeof inquiryStatuses)[number]) ? status : "new"; }

async function adminContext() {
  return requireUser(["admin"]);
}

async function getOrCreateClient(name: string, email: string) {
  const supabase = createAdminClient();
  const { data: profile, error: profileError } = await supabase.from("profiles").select("id").eq("email", email.toLowerCase()).maybeSingle();
  if (profileError) throw profileError;
  if (profile) return profile.id as string;

  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email.toLowerCase(), { data: { name } });
  if (error || !data.user) throw error ?? new Error("Client could not be created.");
  await supabase.auth.admin.updateUserById(data.user.id, { app_metadata: { role: "client" } });
  return data.user.id;
}

async function createProjectRecord(formData: FormData) {
  const name = value(formData, "clientName");
  const email = value(formData, "clientEmail");
  const title = value(formData, "title");
  if (!name || !email.includes("@") || !title) throw new Error("Client name, email and project title are required.");

  const clientId = await getOrCreateClient(name, email);
  const budgetInput = value(formData, "budget").replace(",", ".");
  const budget = budgetInput ? Number(budgetInput) : null;
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("projects").insert({
    client_id: clientId, title, description: value(formData, "description"), status: validStatus(value(formData, "status")),
    progress: Math.min(100, Math.max(0, Number(value(formData, "progress")) || 0)),
    budget: Number.isFinite(budget) ? budget : null,
    start_date: value(formData, "startDate") || null,
    due_date: value(formData, "dueDate") || null,
  }).select("id").single();
  if (error) throw error;
  return data.id as string;
}

export async function createProject(formData: FormData) {
  await adminContext();
  const projectId = await createProjectRecord(formData);
  redirect(`/admin/projects/${projectId}`);
}

export async function createProjectFromContact(inquiryId: string, formData: FormData) {
  await adminContext();
  const projectId = await createProjectRecord(formData);
  const { error } = await createAdminClient().from("contact_inquiries").update({ status: "closed", project_id: projectId }).eq("id", inquiryId);
  if (error) throw error;
  redirect(`/admin/projects/${projectId}`);
}

export async function createProjectFromRequest(requestId: string, formData: FormData) {
  await adminContext();
  const projectId = await createProjectRecord(formData);
  const { error } = await createAdminClient().from("project_requests").update({ status: "closed", project_id: projectId }).eq("id", requestId);
  if (error) throw error;
  redirect(`/admin/projects/${projectId}`);
}

export async function updateContactInquiryStatus(inquiryId: string, formData: FormData) {
  await adminContext();
  const { error } = await createAdminClient().from("contact_inquiries").update({ status: validInquiryStatus(value(formData, "status")) }).eq("id", inquiryId);
  if (error) throw error;
  revalidatePath("/admin");
}

export async function updateProjectRequestStatus(requestId: string, formData: FormData) {
  await adminContext();
  const { error } = await createAdminClient().from("project_requests").update({ status: validInquiryStatus(value(formData, "status")) }).eq("id", requestId);
  if (error) throw error;
  revalidatePath("/admin");
}

export async function updateProject(projectId: string, formData: FormData) {
  await adminContext();
  const progress = Math.min(100, Math.max(0, Number(value(formData, "progress")) || 0));
  const { error } = await createAdminClient().from("projects").update({
    title: value(formData, "title"), description: value(formData, "description"), status: validStatus(value(formData, "status")), progress,
    budget: value(formData, "budget") ? Number(value(formData, "budget").replace(",", ".")) : null,
    start_date: value(formData, "startDate") || null, due_date: value(formData, "dueDate") || null,
  }).eq("id", projectId);
  if (error) throw error;
  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath("/admin");
}

export async function createTask(projectId: string, formData: FormData) {
  await adminContext();
  const title = value(formData, "title");
  if (!title) return;
  const { data } = await createAdminClient().from("project_tasks").select("position").eq("project_id", projectId).order("position", { ascending: false }).limit(1);
  const position = ((data?.[0]?.position as number | undefined) ?? -1) + 1;
  const { error } = await createAdminClient().from("project_tasks").insert({ project_id: projectId, title, position });
  if (error) throw error;
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function sendMessage(projectId: string, formData: FormData) {
  const { user } = await adminContext();
  const message = value(formData, "message");
  if (!message) return;
  const { error } = await createAdminClient().from("project_messages").insert({ project_id: projectId, sender_id: user.id, message });
  if (error) throw error;
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function uploadProjectFile(projectId: string, formData: FormData) {
  const { user } = await adminContext();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return;
  const maxBytes = 10 * 1024 * 1024;
  const allowedTypes = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
  if (file.size > maxBytes || !allowedTypes.has(file.type)) throw new Error("Unsupported file type or file size.");
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${projectId}/${crypto.randomUUID()}-${safeName}`;
  const supabase = createAdminClient();
  const { error: uploadError } = await supabase.storage.from("project-files").upload(path, file, { contentType: file.type || undefined, upsert: false });
  if (uploadError) throw uploadError;
  const { error } = await supabase.from("project_files").insert({ project_id: projectId, filename: file.name, url: path, uploaded_by: user.id });
  if (error) { await supabase.storage.from("project-files").remove([path]); throw error; }
  revalidatePath(`/admin/projects/${projectId}`);
}
