"use server";

import { saveProfile as saveProfileRepository } from "@/lib/repository";

export async function saveProfile({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return await saveProfileRepository({ name, email });
}
