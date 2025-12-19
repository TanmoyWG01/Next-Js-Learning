"use client";

import { FormEvent, useEffect, useState } from "react";

type ProductInput = {
	title: string;
	price: string;
	description: string;
};

type StoredProduct = {
	id: number;
	name: string;
	price: number;
	description: string;
};

export default function ReactFormsPage() {
	const [form, setForm] = useState<ProductInput>({ title: "", price: "", description: "" });
	const [products, setProducts] = useState<StoredProduct[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	// Fetch products on mount
	useEffect(() => {
		fetch("/react-forms/api")
			.then((res) => res.json())
			.then((json) => {
				if (json.data) setProducts(json.data);
			})
			.catch(() => setError("Failed to load products"));
	}, []);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setLoading(true);

		const priceValue = Number(form.price);
		if (!form.title.trim() || !form.description.trim()) {
			setError("Title and description are required.");
			setLoading(false);
			return;
		}
		if (Number.isNaN(priceValue) || priceValue <= 0) {
			setError("Price must be a positive number.");
			setLoading(false);
			return;
		}

		try {
			const response = await fetch("/react-forms/api", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: form.title.trim(),
					price: priceValue,
					description: form.description.trim(),
				}),
			});

			const result = await response.json();

			if (!response.ok) {
				setError(result.error || "Failed to save product");
				setLoading(false);
				return;
			}

			// Add new product to the list
			if (result.data) {
				setProducts((prev) => [...prev, result.data]);
			}

			setForm({ title: "", price: "", description: "" });
		} catch (err) {
			setError("Network error. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="mx-auto max-w-2xl px-6 py-10">
			<h1 className="text-2xl font-semibold mb-6">Create Product</h1>

			<form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm">
				<div className="flex flex-col gap-1">
					<label className="text-sm font-medium" htmlFor="title">
						Title
					</label>
					<input
						id="title"
						name="title"
						className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
						value={form.title}
						onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
						placeholder="e.g. Aurora Lamp"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label className="text-sm font-medium" htmlFor="price">
						Price
					</label>
					<input
						id="price"
						name="price"
						type="number"
						step="0.01"
						className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
						value={form.price}
						onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
						placeholder="e.g. 79.99"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label className="text-sm font-medium" htmlFor="description">
						Description
					</label>
					<textarea
						id="description"
						name="description"
						className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
						rows={4}
						value={form.description}
						onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
						placeholder="Short summary"
					/>
				</div>

				{error && <p className="text-sm text-red-600">{error}</p>}

				<button
					type="submit"
					disabled={loading}
					className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{loading ? "Saving..." : "Save Product"}
				</button>
			</form>

			<section className="mt-8 space-y-3">
				<h2 className="text-lg font-semibold">Stored Products</h2>
				{products.length === 0 && <p className="text-sm text-gray-600">No products yet.</p>}
				{products.map((product) => (
					<article key={product.id} className="rounded border border-gray-200 p-3 shadow-sm">
						<div className="flex items-baseline justify-between">
							<h3 className="text-base font-semibold">{product.name}</h3>
							<span className="text-sm text-gray-700">${product.price.toFixed(2)}</span>
						</div>
						<p className="mt-2 text-sm text-gray-700">{product.description}</p>
					</article>
				))}
			</section>
		</main>
	);
}
