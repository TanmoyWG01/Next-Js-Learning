import Link from "next/link";
import { listProducts } from "@/app/prisma-db";

export default async function ProductDbPage() {
	const products = listProducts();

	return (
		<main className="mx-auto max-w-4xl px-6 py-10">
			<h1 className="text-3xl font-bold mb-8">Product Database</h1>

			{products.length === 0 ? (
				<p className="text-gray-600">No products available yet.</p>
			) : (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{products.map((product) => (
						<Link
							key={product.id}
							href={`/product-db/${product.id}`}
							className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-400 transition-all block"
						>
							<div className="mb-3">
								<h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
									{product.name}
								</h2>
								<p className="text-2xl font-bold text-blue-600 mt-2">
									${product.price.toFixed(2)}
								</p>
							</div>
							<p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
								{product.description}
							</p>
						</Link>
					))}
				</div>
			)}
		</main>
	);
}
