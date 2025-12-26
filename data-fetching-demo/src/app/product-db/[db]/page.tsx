import { notFound } from "next/navigation";
import EditProductForm from "./product-edit-form";
import { getProduct } from "@/app/prisma-db";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = Number(params.id);

  if (Number.isNaN(productId)) {
    throw new Error("Invalid product ID");
  }

  const product = await getProduct(productId);

  if (!product) {
    // throw new Error("Product not found");
    notFound(); 
  }

  return <EditProductForm product={product} />;
}
