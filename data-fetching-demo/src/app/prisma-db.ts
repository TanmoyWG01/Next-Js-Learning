// Simple in-memory product sample data used as a Prisma replacement for demos.

export type Product = {
	id: number;
	name: string;
	price: number;
	description: string;
	imageUrl: string;
};

export const products: Product[] = [
	{
		id: 1,
		name: "Aurora Lamp",
		price: 79.99,
		description: "Dimmable glass lamp that shifts through warm ambient tones.",
		imageUrl: "/images/aurora-lamp.jpg",
	},
	{
		id: 2,
		name: "Atlas Backpack",
		price: 129.0,
		description: "Water-resistant 28L pack with padded laptop sleeve and quick access pockets.",
		imageUrl: "/images/atlas-backpack.jpg",
	},
	{
		id: 3,
		name: "Sienna Mug",
		price: 22.5,
		description: "Hand-glazed stoneware mug with a heat-retaining double wall.",
		imageUrl: "/images/sienna-mug.jpg",
	},
];

let nextId = products.length + 1;

// CRUD helpers for demo usage; replace with real Prisma calls in production.
export function listProducts(): Product[] {
	return products;
}

export function getProduct(id: number): Product | undefined {
	return products.find((p) => p.id === id);
}

export function createProduct(input: Omit<Product, "id">): Product {
	const newProduct: Product = { id: nextId++, ...input };
	products.push(newProduct);
	return newProduct;
}

export function updateProduct(id: number, input: Partial<Omit<Product, "id">>): Product | undefined {
	const idx = products.findIndex((p) => p.id === id);
	if (idx === -1) return undefined;
	const updated = { ...products[idx], ...input } as Product;
	products[idx] = updated;
	return updated;
}

export function deleteProduct(id: number): boolean {
	const idx = products.findIndex((p) => p.id === id);
	if (idx === -1) return false;
	products.splice(idx, 1);
	return true;
}
