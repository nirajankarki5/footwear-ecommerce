import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import Loading from "./Loading";
import { fetchProducts } from "../features/product/productSlice";

function SearchScreen() {
  const { products, isLoading } = useSelector((store) => store.product);

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  //  adding searchParams as dependency array so that-
  // when on search screen, when we type and click enter, the page reloads
  useEffect(() => {
    // get string after ?
    dispatch(fetchProducts("?" + window.location.href.split("?")[1]));
  }, [dispatch, searchParams]);

  return (
    <section>
      {isLoading && <Loading />}
      {!isLoading && products.length === 0 && (
        <p className="mb-10 text-center text-2xl text-gray-300">No products</p>
      )}
      {!isLoading && products.length > 0 && (
        <div className="mx-auto mb-20 grid w-[85%] gap-5 sm:w-[95%] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default SearchScreen;
