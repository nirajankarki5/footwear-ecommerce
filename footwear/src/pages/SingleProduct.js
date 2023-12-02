import React from "react";
import { useParams } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LuTruck } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

function SingleProduct() {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="grid grid-rows-2 gap-5 px-5 py-4 md:grid-cols-2 md:grid-rows-none lg:px-10 xl:gap-10">
      <section className="rounded-lg bg-gray-300 md:my-2 lg:rounded-3xl">
        <CiImageOn className="mx-auto h-96 text-[10rem] md:h-[80vh] lg:text-[15rem]" />
      </section>
      <section className="p-3 lg:p-8">
        <h1 className="mb-2 text-2xl font-semibold md:mb-3 md:text-3xl lg:text-4xl">
          Title
        </h1>

        <div className="mb-5 flex items-center gap-2 md:mb-8">
          <FaStar className="text-xl text-yellow-400" />
          <p className="text-xl text-gray-300">4.5 rating</p>
        </div>

        <h1 className="mb-4 text-4xl font-semibold md:mb-5 md:text-4xl lg:text-5xl">
          $199
        </h1>

        <p className="mb-5 text-xl md:mb-8 md:text-2xl">Brand: Nike</p>

        <p className="mb-1 text-gray-400 md:mb-3 md:text-xl">
          Available Sizes:
        </p>
        <div className="mb-10 flex flex-wrap gap-2 md:mb-16">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((size) => {
            return (
              <div className="flex h-20 w-20 cursor-pointer items-center justify-center border-2 border-gray-400 text-lg md:text-xl">
                {size}
              </div>
            );
          })}
        </div>

        <button className="mb-3 flex items-center gap-4 rounded-2xl bg-gray-900 px-10 py-5 text-xl text-gray-200 md:mb-5 lg:px-20">
          <HiOutlineShoppingBag className="text-2xl" />
          <p>Add to cart</p>
        </button>

        <div className="flex items-center gap-2 text-lg font-medium md:tracking-wide">
          <LuTruck className="text-xl" />
          <p>Free delivery on orders over $30.0</p>
        </div>
      </section>
    </div>
  );
}

export default SingleProduct;
