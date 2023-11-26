import React from "react";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";

function UserDetails() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(false);
  };

  return (
    <div className="grid h-full grid-rows-[1fr_1px_3fr] gap-8 px-5 py-4 md:grid-cols-[1fr_1px_3fr] md:grid-rows-none lg:px-10">
      {/* <p>User Details</p>
      <button onClick={logout}>Logout</button> */}
      <section className="mx-auto mt-5 flex h-40 w-40 items-center justify-center rounded-full bg-gray-300 lg:h-52 lg:w-52">
        <CiUser className="text-9xl lg:text-[150px]" />
      </section>
      <div className="border-2"></div>
      <section className=" md:my-5">
        <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
          My Details
        </h1>
      </section>
    </div>
  );
}

export default UserDetails;
