/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

import React from "react";
import SearchFilter from "../components/SearchFilter";
import SearchScreen from "../components/SearchScreen";

function SearchProduct() {
  return (
    <div className="my-8 grid gap-8 px-5 md:grid-cols-[1fr_3fr] md:gap-5 lg:gap-5 lg:px-10 xl:grid-cols-[1fr_4fr]">
      <SearchFilter />
      <SearchScreen />
    </div>
  );
}

export default SearchProduct;
