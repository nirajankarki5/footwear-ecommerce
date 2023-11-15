import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-stone-200 font-body">
      <div className="grid h-[85%] w-[85%] grid-rows-[2fr_3fr] bg-white sm:h-[80%] sm:w-[70%] lg:grid-cols-[2fr_3fr] lg:grid-rows-none">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
