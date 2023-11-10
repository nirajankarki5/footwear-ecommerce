import React, { useEffect, useState } from "react";
import { HiAdjustments } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import SearchDropdown from "../components/SearchDropdown";
import { fetchProducts } from "../features/product/productSlice";
import Loading from "../components/Loading";

function SearchProduct() {
  const [isFilterShown, setIsFilterShown] = useState(false);

  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [queryStringBrand, setQueryStringBrand] = useState("");
  const [queryStringSize, setQueryStringSize] = useState("");

  let url = "";

  const { products, isLoading, productSearchTerm } = useSelector(
    (store) => store.product,
  );
  const dispatch = useDispatch();

  // everytime we change value from the dropdown
  const handleChange = (e, type) => {
    console.log(type, e.target.value);

    if (type === "Brand") {
      setBrand(e.target.value);
      setQueryStringBrand("brand=" + e.target.value);
      if (e.target.value === "Select Brand") {
        setQueryStringBrand("");
      }
    }
    if (type === "Size") {
      setSize(e.target.value);
      setQueryStringSize("size=" + e.target.value);
      if (e.target.value === "Select Size") {
        setQueryStringSize("");
      }
    }
  };

  const fetchSearchProducts = () => {
    // console.log(url + queryString);
    if (queryStringBrand) {
      url = `?searchTerm=${productSearchTerm}&${queryStringBrand}`;
    }
    if (queryStringSize) {
      url = `?searchTerm=${productSearchTerm}&${queryStringSize}`;
    }
    if (queryStringBrand && queryStringSize) {
      url = `?searchTerm=${productSearchTerm}&${queryStringBrand}&${queryStringSize}`;
    }
    console.log(queryStringBrand);
    console.log(url);
    dispatch(fetchProducts(url));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // When reloading search page, display all the products
  useEffect(() => {
    // do not refetch data if there is search Term bacause we have already fetched data in navbar page
    if (!productSearchTerm) {
      fetchSearchProducts();
    }
  }, [dispatch]);

  return (
    <div className="my-8 grid gap-8 px-5 md:grid-cols-[1fr_3fr] md:gap-5 lg:gap-5 lg:px-10 xl:grid-cols-[1fr_4fr]">
      {/****************  FILTER SECTION ******************/}
      <section
        className={`${
          isFilterShown ? "pb-5 pl-5 shadow-sm" : "shadow-none"
        } md:shadow-none`}
      >
        <HiAdjustments
          className="mb-5 ml-auto cursor-pointer border-2 border-gray-300 bg-gray-100 p-1 text-5xl md:hidden"
          onClick={() => setIsFilterShown(!isFilterShown)}
        />

        {/* from mdeium size, it is always block */}
        <div
          className={`${
            isFilterShown ? "block" : "hidden"
          } text-center md:block`}
        >
          <SearchDropdown
            value={brand}
            type={"Brand"}
            options={[
              { label: "Select Brand", value: null },
              { label: "Nike", value: "Nike" },
              { label: "Under Armour", value: "Under%20Armour" },
              { label: "New Balance", value: "New%20Balance" },
            ]}
            handleChange={handleChange}
          />

          <SearchDropdown
            value={size}
            type={"Size"}
            options={[
              { label: "Select Size", value: null },
              { label: "7", value: "7" },
              { label: "7.5", value: "7.5" },
              { label: "8", value: "8" },
              { label: "8.5", value: "8.5" },
              { label: "9", value: "9" },
              { label: "9.5", value: "9.5" },
              { label: "10", value: "10" },
              { label: "10.5", value: "10.5" },
              { label: "11", value: "11" },
              { label: "11.5", value: "11.5" },
              { label: "12", value: "12" },
              { label: "12.5", value: "12.5" },
            ]}
            handleChange={handleChange}
          />

          <button
            onClick={fetchSearchProducts}
            className="block rounded-full border-none bg-stone-900 px-5 py-3 text-sm text-gray-200 lg:px-5 lg:py-4"
          >
            Apply Filters
          </button>
          <button
            onClick={() => {
              dispatch(fetchProducts(`?searchTerm=${productSearchTerm}`));
              setBrand("");
              setSize("");
            }}
            className="mt-3 block rounded-full border-none bg-gray-200 px-5 py-3 text-sm text-stone-900 lg:px-5 lg:py-4"
          >
            Remove Filters
          </button>
        </div>
      </section>

      {/***********************  PRODUCT DISPLAY SECTION ******************/}
      <section>
        {isLoading && <Loading />}
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
