import React from "react";

function TextField({ type, label, onChange, placeholder }) {
  return (
    <>
      <label
        htmlFor={label}
        className="text-sm capitalize md:text-base lg:text-lg"
      >
        {label}
      </label>
      <input
        type={type}
        id={label}
        onChange={onChange}
        placeholder={placeholder}
        className="my-1 block h-16 w-full rounded-full bg-white px-5 focus:border-2 lg:my-3"
      />
    </>
  );
}

export default TextField;
