import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IoMdFunnel } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

function SearchProduct() {
  const [isFilterShown, setIsFilterShown] = useState(false);

  const { products, isLoading } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  return (
    <div className="my-8 grid gap-8 px-5 md:grid-cols-[1fr_3fr] md:gap-5 lg:gap-5 lg:px-10 xl:grid-cols-[1fr_4fr]">
      <section
        className={`${
          isFilterShown ? "pb-5 pl-5 shadow-sm" : "shadow-none"
        } md:shadow-none`}
      >
        <IoMdFunnel
          className="ml-auto cursor-pointer border-2 border-gray-400 bg-gray-200 p-1 text-5xl md:hidden"
          onClick={() => setIsFilterShown(!isFilterShown)}
        />

        {/* from mdeium size, it is always block */}
        <div
          className={`${
            isFilterShown ? "block" : "hidden"
          } text-right md:block`}
        >
          filter list
        </div>
      </section>

      <section>
        {isLoading && (
          <p className="mb-10 text-center text-2xl text-gray-300">
            Loading.....
          </p>
        )}
        {!isLoading && products.length === 0 && (
          <p className="mb-10 text-center text-2xl text-gray-300">
            No products
          </p>
        )}
        {!isLoading && products.length > 0 && (
          <div className="mx-auto mb-20 grid w-[85%] gap-5 sm:w-[95%] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default SearchProduct;
