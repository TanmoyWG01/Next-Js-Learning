"use client";

import { useActionState } from "react";
import { getProduct, products } from "@/app/prisma-db"; 
import { Submit } from "@/components/submit";
import { addProduct, FormState } from "./actions";


export default function EditProductPage({ params }: {params:Promise<{db:string}>}) {
  
  const initialFormState: FormState = {
    errors: {},
  };

  const {id} = await params;
  const product = await getProduct(Number(id));

  // Fixed: Passing the correct action and initial state
  const [state, formAction] = useActionState(addProduct, initialFormState);

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold">
        Create Product (Server Actions)
      </h1>

      <form
        action={formAction}
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
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="e.g. Aurora Lamp"
          />
          {state.errors?.title && (
            <p className="text-sm text-red-600">{state.errors.title}</p>
          )}
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
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="e.g. 79.99"
          />
          {state.errors?.price && (
            <p className="text-sm text-red-600">{state.errors.price}</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="Short summary"
          />
          {state.errors?.description && (
            <p className="text-sm text-red-600">{state.errors.description}</p>
          )}
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