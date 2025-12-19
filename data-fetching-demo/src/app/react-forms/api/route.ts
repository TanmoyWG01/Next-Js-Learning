import { NextResponse } from "next/server";

import {
	createProduct,
	listProducts,
	Product,
} from "@/app/prisma-db";

type CreateBody = {
	title?: string;
	price?: number;
	description?: string;
};

export async function GET() {
	const data = listProducts();
	return NextResponse.json({ data });
}

export async function POST(request: Request) {
	let body: CreateBody;
	try {
		body = await request.json();
	} catch (error) {
		return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
	}

	const title = body.title?.trim();
	const description = body.description?.trim();
	const price = Number(body.price);

	if (!title) {
		return NextResponse.json({ error: "Title is required" }, { status: 400 });
	}
	if (!description) {
		return NextResponse.json({ error: "Description is required" }, { status: 400 });
	}
	if (Number.isNaN(price) || price <= 0) {
		return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
	}

	const newProduct: Product = createProduct({
		name: title,
		price,
		description,
		imageUrl: "/images/placeholder.jpg",
	});

	return NextResponse.json({ data: newProduct }, { status: 201 });
}
