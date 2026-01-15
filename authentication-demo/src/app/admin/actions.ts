"use server";

import { Roles } from "@/types/globals";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type SessionMetadata = {
  role?: Roles;
};

export async function setRole(formData: FormData) {
  const { sessionClaims } = await auth();

  const roleFromSession =
    (sessionClaims?.metadata as SessionMetadata)?.role;

  if (roleFromSession !== "admin") {
    throw new Error("Not authorized");
  }

  const client = await clerkClient();
  const id = formData.get("id") as string;
  const role = formData.get("role") as Roles;

  try {
    await client.users.updateUser(id, {
      publicMetadata: { role },
    });

    revalidatePath("/admin");
  } catch (err) {
    console.error("Error updating user metadata", err);
    throw err;
  }
}

export async function removeRole(formData: FormData) {
  const { sessionClaims } = await auth();

  const roleFromSession =
    (sessionClaims?.metadata as SessionMetadata)?.role;

  if (roleFromSession !== "admin") {
    throw new Error("Not authorized");
  }

  const client = await clerkClient();
  const id = formData.get("id") as string;

  try {
    await client.users.updateUser(id, {
      publicMetadata: { role: null },
    });

    revalidatePath("/admin");
  } catch (err) {
    console.error("Error updating user metadata", err);
    throw err;
  }
}
