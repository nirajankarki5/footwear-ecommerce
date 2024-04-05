import React from "react";

function AdminButton({ name, onClick }) {
  return (
    <button className=" w-full p-4 hover:bg-gray-200" onClick={onClick}>
      {name}
    </button>
  );
}

export default AdminButton;
