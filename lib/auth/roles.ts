import type { User } from "@supabase/supabase-js";

export const roles = ["admin", "client"] as const;
export type AppRole = (typeof roles)[number];

export function getUserRole(user: User): AppRole {
  const role = user.app_metadata.role;
  return role === "admin" ? "admin" : "client";
}
