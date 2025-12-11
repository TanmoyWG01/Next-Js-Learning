import { Suspense } from "react";

import  Product from "@/components/product"
import  Reviews from "@/components/reviews"


export default function ProductReviewsPage() {
    return (
        <div>
            <h1>Product reviews</h1>
            <Suspense fallback={<div>Loading Product Details...</div>}>
            <Product/>
            </Suspense>
            <Suspense fallback={<div>Loading Reviews...</div>}>
            <Reviews/>
            </Suspense>
        </div>
    );
}