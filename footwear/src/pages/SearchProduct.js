import React from "react";
import { useSearchParams } from "react-router-dom";

function SearchProduct() {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get("searchTerm"));

  return <div>{searchParams.get("searchTerm")}</div>;
}

export default SearchProduct;
