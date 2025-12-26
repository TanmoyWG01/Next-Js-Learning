"use client";

import Link from "next/link";
import { useOptimistic } from "react";
import { deleteProductAction } from "@/actions/product";
import type { Product } from "@/app/prisma-db";

export default function ProductDetails({ products }: { products: Product[] }) {
	const [optimisticProducts, setOptimisticProducts] = useOptimistic(
		products,
		(currentProducts: Product[], productId: number) => {
			return currentProducts.filter((product: Product) => product.id !== productId);
		}
	);

	const removeProductById = async (productId: number) => {
		setOptimisticProducts(productId);
		try {
			await deleteProductAction(productId);
		} catch (error) {
			console.error("Failed to delete product:", error);
		}
	};

	return (
		<main className="mx-auto max-w-4xl px-6 py-10">
			<h1 className="text-3xl font-bold mb-8">Product Database</h1>

			{optimisticProducts.length === 0 ? (
				<p className="text-gray-600">No products available yet.</p>
			) : (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{optimisticProducts.map((product: Product) => (
						<div
							key={product.id}
							className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-all"
						>
							<Link href={`/product-db/${product.id}`} className="block">
								<div className="mb-3">
									<h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
										{product.name}
									</h2>
									<p className="text-2xl font-bold text-blue-600 mt-2">
										${product.price.toFixed(2)}
									</p>
								</div>
								<p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-3">
									{product.description}
								</p>
							</Link>
							<button
								onClick={() => removeProductById(product.id)}
								className="w-full mt-2 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
							>
								Delete
							</button>
						</div>
					))}
				</div>
			)}
		</main>
	);
}
