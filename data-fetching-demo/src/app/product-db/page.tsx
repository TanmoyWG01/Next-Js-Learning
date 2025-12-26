import { listProducts } from "@/app/prisma-db";
import ProductDetails from "./product.details";

export default async function ProductDbPage() {
	const products = listProducts();

	return <ProductDetails products={products} />;
}
