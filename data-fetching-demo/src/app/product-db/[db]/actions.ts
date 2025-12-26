"use server";

import { revalidatePath } from "next/cache";
import {
  createProduct,
  updateProduct as updateProductInDb,
} from "@/app/prisma-db";

/**
 * Validation error structure
 */
export type Errors = {
  title?: string;
  price?: string;
  description?: string;
};

/**
 * Form state returned to useActionState
 */
export type FormState = {
  errors: Errors;
};

/**
 * Create Product Action
 */
export async function addProduct(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validation = validateProductForm(formData);

  if ("errors" in validation) {
    return { errors: validation.errors };
  }

  try {
    await createProduct(validation.data);
  } catch {
    return { errors: { title: "Failed to create product" } };
  }

  revalidatePath("/products");

  return { errors: {} };
}

/**
 * Update Product Action
 */
export async function updateProduct(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const id = Number(formData.get("id"));

  if (Number.isNaN(id)) {
    return { errors: { title: "Invalid product ID" } };
  }

  const validation = validateProductForm(formData);

  if ("errors" in validation) {
    return { errors: validation.errors };
  }

  try {
    const updated = updateProductInDb(id, validation.data);

    if (!updated) {
      return { errors: { title: "Product not found" } };
    }
  } catch {
    return { errors: { title: "Failed to update product" } };
  }

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);

  return { errors: {} };
}

/**
 * Shared validation logic
 */
function validateProductForm(
  formData: FormData
):
  | {
      data: {
        name: string;
        price: number;
        description: string;
        imageUrl: string;
      };
    }
  | { errors: Errors } {
  const title = formData.get("title")?.toString().trim();
  const priceStr = formData.get("price")?.toString();
  const description = formData.get("description")?.toString().trim();
  const price = Number(priceStr);

  const errors: Errors = {};

  if (!title) {
    errors.title = "Title is required";
  }

  if (!priceStr || Number.isNaN(price) || price <= 0) {
    errors.price = "Price must be a positive number";
  }

  if (!description) {
    errors.description = "Description is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    data: {
      name: title!,
      price,
      description: description!,
      imageUrl: "/images/placeholder.jpg",
    },
  };
}
