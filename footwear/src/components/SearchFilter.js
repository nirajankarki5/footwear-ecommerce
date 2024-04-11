/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

import React, { useCallback, useEffect, useState } from "react";
import { HiAdjustments } from "react-icons/hi";
import { useDispatch } from "react-redux";
import SearchDropdown from "./SearchDropdown";
import { fetchProducts } from "../features/product/productSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchFilter() {
  const [isFilterShown, setIsFilterShown] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [queryStringBrand, setQueryStringBrand] = useState("");
  const [queryStringSize, setQueryStringSize] = useState("");

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const fetchSearchProducts = useCallback(() => {
    let url = "";
    if (queryStringBrand) {
      navigate(`?searchTerm=${searchTerm}&${queryStringBrand}`);
    }
    if (queryStringSize) {
      navigate(`?searchTerm=${searchTerm}&${queryStringSize}`);
    }
    if (queryStringBrand && queryStringSize) {
      navigate(
        `?searchTerm=${searchTerm}&${queryStringBrand}&${queryStringSize}`,
      );
    }
    // console.log(queryStringBrand);
    console.log(url);
    dispatch(fetchProducts(url));
  }, [dispatch, navigate, searchTerm, queryStringBrand, queryStringSize]);

  useEffect(() => {
    setSearchTerm(searchParams.get("searchTerm"));
  }, [searchParams]);

  return (
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
        className={`${isFilterShown ? "block" : "hidden"} text-center md:block`}
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
            dispatch(
              fetchProducts(`?searchTerm=${searchParams.get("searchTerm")}`),
            );
            setBrand("");
            setSize("");
          }}
          className="mt-3 block rounded-full border-none bg-gray-200 px-5 py-3 text-sm text-stone-900 lg:px-5 lg:py-4"
        >
          Remove Filters
        </button>
      </div>
    </section>
  );
}

export default SearchFilter;
