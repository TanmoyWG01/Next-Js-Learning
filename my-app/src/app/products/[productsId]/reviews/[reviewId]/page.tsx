import React from "react";
import { notFound, redirect } from "next/navigation";

// function getRandomInt(count: number) {
//   return Math.floor(Math.random() * count);
// }

const Page = async ({
  params,
}: {
  params: { productsId: string; reviewId: string };
}) => {
  // const random = getRandomInt(2);
  // if(random === 1) {
  //   throw new Error("Error loading review!");
  // }
  // console.log("Random number generated:", random);
  const { productsId, reviewId } = await params;
  if (parseInt(reviewId) > 1000) {
    notFound();
    // redirect("/products")
  }
  return (
    <h1>
      Review {reviewId} for product {productsId}
    </h1>
  );
};

export default Page;
