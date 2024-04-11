/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

import React from "react";
import { Link } from "react-router-dom";

function BlackButton({ children }) {
  return (
    <Link
      to={"search"}
      className="rounded-full border-none bg-stone-900 px-6 py-4 text-lg text-gray-200 lg:px-8 lg:py-4 lg:text-xl"
    >
      {children}
    </Link>
  );
}

export default BlackButton;
