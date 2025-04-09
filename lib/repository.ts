"use server";

import { v4 as uuidv4 } from "uuid";

export async function saveProfile({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return { id: uuidv4(), name, email };
}
