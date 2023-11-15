import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function AuthLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-stone-200 font-body">
      <div className="grid h-[85%] w-[85%] grid-rows-[2fr_3fr] bg-white sm:h-[80%] sm:w-[70%] lg:grid-cols-[2fr_3fr] lg:grid-rows-none">
        <section className="items-center py-16 text-center lg:py-44">
          <Link
            to={"/"}
            className="text-2xl font-medium text-gray-500 lg:text-3xl"
          >
            FootWear
          </Link>

          <h2 className="mb-4 mt-5 text-3xl font-medium lg:mb-8 lg:mt-10 lg:text-4xl">
            {location.pathname === "/auth/login" ? "Welcome back" : "Join Us"}
          </h2>

          <p className="px-14 text-justify leading-6 text-gray-400 lg:text-lg lg:leading-7 xl:px-20 xl:text-xl xl:leading-9">
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