import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createProduct, listProducts } from "@/app/prisma-db";
import { Submit } from "@/components/submit";

// Server Action to handle form submission
async function addProduct(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const priceStr = formData.get("price") as string;
  const description = formData.get("description") as string;

  const price = Number(priceStr);

  // Validation
  if (!title?.trim() || !description?.trim()) {
    throw new Error("Title and description are required");
  }

  if (Number.isNaN(price) || price <= 0) {
    throw new Error("Price must be a positive number");
  }

  // Create product
  await createProduct({
    name: title.trim(),
    price,
    description: description.trim(),
    imageUrl: "/images/placeholder.jpg",
  });

  // Revalidate and redirect
  revalidatePath("/product-db-create");
  redirect("/product-db-create");
}

// Server Component
export default async function AddProductPage() {
  const products = listProducts();

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold">
        Create Product (Server Actions)
      </h1>

      <form
        action={addProduct}
        className="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm"
      >
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="e.g. Aurora Lamp"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="text-sm font-medium">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            required
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="e.g. 79.99"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="Short summary"
          />
        </div>

        <Submit />
      </form>

      {/* Product List */}
      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold">Stored Products</h2>

        {products.length === 0 && (
          <p className="text-sm text-gray-600">No products yet.</p>
        )}

        {products.map((product) => (
          <article
            key={product.id}
            className="rounded border border-gray-200 p-3 shadow-sm"
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-base font-semibold">{product.name}</h3>
              <span className="text-sm text-gray-700">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-700">
              {product.description}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
