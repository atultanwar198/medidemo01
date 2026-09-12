import { redirect } from "next/navigation";
import { getSessionUser } from "./auth";
import type { DemoRole } from "@/data/demo";

export async function requireRole(role: DemoRole) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.role !== role) redirect(`/${user.role}/dashboard`);
  return user;
}
