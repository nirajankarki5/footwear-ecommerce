import React from "react";

function TextField({ type, label, value, onChange, placeholder }) {
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
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="my-1 block h-12 w-full rounded-full bg-white px-5 text-sm focus:border-2 md:h-14 md:text-base lg:my-3"
      />
    </>
  );
}

export default TextField;
