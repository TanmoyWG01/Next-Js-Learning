"use server";

import { revalidatePath } from "next/cache";
import { createProduct } from "@/app/prisma-db";

export type Errors = {
  title?: string;
  price?: string;
  description?: string;
};

export type FormState = {
  errors: Errors;
};

// Fixed signature: must accept prevState as the first argument
export async function addProduct(prevState: FormState, formData: FormData): Promise<FormState> {
  // 1. Extract form data
  const title = formData.get("title") as string;
  const priceStr = formData.get("price") as string;
  const description = formData.get("description") as string;
  const price = Number(priceStr);

  const errors: Errors = {};

  // 2. Validation (This fixes the "Cannot find name title" errors)
  if (!title || !title.trim()) {
    errors.title = "Title is required";
  }

  if (!priceStr || Number.isNaN(price) || price <= 0) {
    errors.price = "Price must be a positive number";
  }

  if (!description || !description.trim()) {
    errors.description = "Description is required";
  }

  // 3. Return errors if validation fails
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // 4. Create product
  try {
    await createProduct({
      name: title.trim(),
      price,
      description: description.trim(),
      imageUrl: "/images/placeholder.jpg",
    });
  } catch (err) {
    return { errors: { title: "Database error occurred" } };
  }

  // 5. Revalidate the path to update the list
  revalidatePath("/product-db-create");
  
  // Return empty errors on success
  return { errors: {} };
}