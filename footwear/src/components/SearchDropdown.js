import React from "react";

function SearchDropdown({ type, options, handleChange }) {
  return (
    <select
      onChange={(e) => handleChange(e, type)}
      className="mb-2 w-full cursor-pointer rounded-full border-red-500 bg-stone-100 px-5 py-4 text-lg xl:mb-5 2xl:w-2/3"
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
