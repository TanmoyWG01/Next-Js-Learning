"use client";

import { useActionState } from "react";
import { Submit } from "@/components/submit";
import { updateProduct, FormState } from "./actions";

/**
 * Props for EditProductForm
 * - Receives product data from server component
 */
type EditProductFormProps = {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
  };
};

export default function EditProductForm({ product }: EditProductFormProps) {
  const initialFormState: FormState = {
    errors: {},
  };

  const [state, formAction] = useActionState(
    updateProduct,
    initialFormState
  );

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Edit Product</h1>

      <form
        action={formAction}
        className="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm"
      >
        {/* Hidden ID */}
        <input type="hidden" name="id" value={product.id} />

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            defaultValue={product.name}
            className="rounded border border-gray-300 px-3 py-2 text-sm"
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
            defaultValue={product.price}
            className="rounded border border-gray-300 px-3 py-2 text-sm"
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
            defaultValue={product.description}
            className="rounded border border-gray-300 px-3 py-2 text-sm"
          />
          {state.errors?.description && (
            <p className="text-sm text-red-600">
              {state.errors.description}
            </p>
          )}
        </div>

        <Submit />
      </form>
    </main>
  );
}
