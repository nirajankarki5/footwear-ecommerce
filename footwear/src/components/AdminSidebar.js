import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import AdminButton from "./AdminButton";

function AdminSidebar() {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <HiBars3BottomLeft
        className="m-2 cursor-pointer text-4xl md:hidden"
        onClick={() => setIsShowSidebar(!isShowSidebar)}
      />

      <div
        className={`fixed z-30 h-full w-80 border-x-2 bg-white p-4  transition-all md:static md:translate-x-0 ${
          isShowSidebar ? "translate-x-100" : "translate-x-[-100%]"
        }`}
      >
        {isShowSidebar && (
          <h1 className="absolute right-4 top-2 cursor-pointer text-3xl">
            <RxCross1 onClick={() => setIsShowSidebar(false)} />
          </h1>
        )}
        <AdminButton
          name="Add Admin"
          onClick={() => {
            navigate("/admindashboard");
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
          name="Add Product"
          onClick={() => {
            navigate("admin-add-product");
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
