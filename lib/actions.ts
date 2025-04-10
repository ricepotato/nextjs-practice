"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { saveProfile as saveProfileService } from "@/lib/service";

const ProfileFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  date: z.string(),
});

const ProfileForm = ProfileFormSchema.omit({ id: true, date: true });

export async function saveProfile(
  prev: any,
  formData: FormData
): Promise<{
  success: boolean;
  fieldErrors?: {
    name?: string[];
    email?: string[];
  };
}> {
  const profile = ProfileForm.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!profile.success) {
    return {
      success: false,
      fieldErrors: profile.error.flatten().fieldErrors,
    };
  }

  const newProfile = await saveProfileService({
    name: profile.data.name,
    email: profile.data.email,
  });

  console.log("[action] newProfile", newProfile);

  revalidatePath("/profile");

  return { success: true };
}
