/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

import React from "react";

function SearchDropdown({ type, options, handleChange, value }) {
  return (
    <select
      value={value}
      onChange={(e) => handleChange(e, type)}
      className="mb-5 block w-full cursor-pointer rounded-full border-red-500 bg-stone-100 px-5 py-4 text-lg"
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SearchDropdown;
