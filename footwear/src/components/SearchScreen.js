import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import Loading from "./Loading";
import { fetchProducts } from "../features/product/productSlice";
import Pagination from "./Pagination";

function SearchScreen() {
  const { products, isLoading } = useSelector((store) => store.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(15);

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  //   PAGINATION
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = products.slice(firstProductIndex, lastProductIndex);

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
          {currentProducts.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      )}
      <Pagination
        totalProducts={products.length}
        productsPerPage={productsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </section>
  );
}

export default SearchScreen;
