/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

import React from "react";

function AdminButton({ name, onClick }) {
  return (
    <button className=" w-full p-4 hover:bg-gray-200" onClick={onClick}>
      {name}
    </button>
  );
}

export default AdminButton;
