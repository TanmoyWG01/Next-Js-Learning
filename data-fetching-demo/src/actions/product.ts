"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createProduct, updateProduct, deleteProduct } from "@/app/prisma-db";

export async function createProductAction(formData: FormData) {
	const name = formData.get("name") as string;
	const priceStr = formData.get("price") as string;
	const description = formData.get("description") as string;
	const imageUrl = (formData.get("imageUrl") as string) || "/images/placeholder.jpg";

	const price = Number(priceStr);

	// Validation
	if (!name?.trim()) {
		throw new Error("Product name is required");
	}
	if (!description?.trim()) {
		throw new Error("Description is required");
	}
	if (Number.isNaN(price) || price <= 0) {
		throw new Error("Price must be a positive number");
	}

	// Create the product
	const newProduct = createProduct({
		name: name.trim(),
		price,
		description: description.trim(),
		imageUrl: imageUrl.trim(),
	});

	// Revalidate relevant pages
	revalidatePath("/product-db");
	revalidatePath("/product-db-create");

	return newProduct;
}

export async function updateProductAction(id: number, formData: FormData) {
	const name = formData.get("name") as string;
	const priceStr = formData.get("price") as string;
	const description = formData.get("description") as string;
	const imageUrl = formData.get("imageUrl") as string;

	const updates: any = {};

	if (name?.trim()) updates.name = name.trim();
	if (description?.trim()) updates.description = description.trim();
	if (imageUrl?.trim()) updates.imageUrl = imageUrl.trim();

	if (priceStr) {
		const price = Number(priceStr);
		if (!Number.isNaN(price) && price > 0) {
			updates.price = price;
		}
	}

	const updated = updateProduct(id, updates);

	if (!updated) {
		throw new Error("Product not found");
	}

	revalidatePath("/product-db");
	revalidatePath(`/product-db/${id}`);

	return updated;
}

export async function deleteProductAction(id: number) {
	const deleted = deleteProduct(id);

	if (!deleted) {
		throw new Error("Product not found");
	}

	revalidatePath("/product-db");
	redirect("/product-db");
}
