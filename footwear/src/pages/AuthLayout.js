import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function AuthLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-stone-200 font-body">
      <div className="grid h-[90%] w-[90%] grid-rows-[2fr_5fr] bg-white sm:h-[85%] sm:w-[75%] lg:grid-cols-[2fr_3fr] lg:grid-rows-none">
        <section className="items-center py-10 text-center sm:py-14 md:py-20 lg:py-44">
          <Link
            to={"/"}
            className="text-xl font-medium text-gray-500 md:text-2xl lg:text-3xl"
          >
            FootWear
          </Link>

          <h2 className="mb-4 mt-5 text-2xl font-medium md:text-3xl lg:mb-8 lg:mt-10 lg:text-4xl">
            {location.pathname === "/auth/login" ? "Welcome back" : "Join Us"}
          </h2>

          <p className="px-8 text-justify text-base leading-6 text-gray-400 sm:text-lg md:px-12 lg:leading-7 xl:px-20 xl:text-xl xl:leading-9">
            Footwear was designed and founded in 2023. It's main goal is to
            provide all sorts of products to individuals looking to get a new
            pair of sneakers.
          </p>

          {location.pathname === "/auth/login" && (
            <p className="mt-5 text-gray-400">
              Don't have an account?{" "}
              <Link className="text-blue-600 underline" to={"/auth/signup"}>
                Sign up
              </Link>
            </p>
          )}

          {location.pathname === "/auth/signup" && (
            <p className="mt-5 text-gray-400">
              Already have an account?{" "}
              <Link className="text-blue-600 underline" to={"/auth/login"}>
                Login
              </Link>
            </p>
          )}
        </section>

        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
