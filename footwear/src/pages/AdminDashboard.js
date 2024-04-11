/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {
  const { user, isLoading } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.userType === "User") {
      navigate("/");
    }
  }, [navigate, user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid h-full grid-cols-1 grid-rows-[auto_1fr] gap-x-2 md:grid-cols-[auto_1fr] md:grid-rows-1">
      <AdminSidebar />

      <div className="">
        <Outlet />
      </div>
    </div>
    // <div className="ml-auto mr-auto md:w-1/2">
    //   <AdminButton name="Add Admin" onClick={() => {}} />
    //   <AdminButton name="Add Product" onClick={() => {}} />
    //   <AdminButton name="View Orders" onClick={() => {}} />
    // </div>
  );
}

export default AdminDashboard;
