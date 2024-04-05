import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiBars3BottomLeft } from "react-icons/hi2";
import AdminButton from "./AdminButton";

function AdminSidebar() {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <HiBars3BottomLeft
        className="z-50 m-2 cursor-pointer text-4xl md:hidden"
        onClick={() => setIsShowSidebar(!isShowSidebar)}
      />

      <div
        className={`fixed z-30 h-full w-80 translate-x-[-100%] border-x-2 bg-white  p-4 pt-14 transition-all md:translate-x-0 ${
          isShowSidebar && "translate-x-0"
        }`}
      >
        <AdminButton
          name="Add Admin"
          onClick={() => {
            navigate("add-admin");
            setIsShowSidebar(false);
          }}
        />
        <AdminButton
          name="Our Products"
          onClick={() => {
            navigate("our-products");
            setIsShowSidebar(false);
          }}
        />
        <AdminButton
          name="View Orders"
          onClick={() => {
            navigate("admin-orders");
            setIsShowSidebar(false);
          }}
        />
      </div>
    </>
  );
}

export default AdminSidebar;
