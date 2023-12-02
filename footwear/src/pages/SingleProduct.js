import React from "react";
import { useParams } from "react-router-dom";

function SingleProduct() {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="grid grid-rows-2 gap-5 px-5 py-4 md:grid-cols-2 md:grid-rows-none lg:px-10 xl:gap-10">
      <section className="bg-blue-300">1</section>
      <section className="bg-yellow-300">2</section>
    </div>
  );
}

export default SingleProduct;
