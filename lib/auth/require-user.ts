import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { getUserRole, type AppRole } from "./roles";

export async function requireUser(allowedRoles: AppRole[] = ["admin", "client"]) {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=configuration");
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/client");
  }

  const role = getUserRole(user);
  if (!allowedRoles.includes(role)) {
    redirect("/login?error=unauthorized");
  }

  return { user, role };
}
