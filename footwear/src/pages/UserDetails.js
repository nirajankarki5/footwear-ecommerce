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

  // CHECK IF USER IS LOGGED IN ELSE RETURN "PLEASE LOGIN TO CONTINUE"

  return (
    <div className="grid h-full grid-rows-[1fr_1px_3fr] gap-8 px-5 py-4 md:grid-cols-[1fr_1px_3fr] md:grid-rows-none lg:px-10">
      <section className="mx-auto mt-5 flex h-40 w-40 items-center justify-center rounded-full bg-gray-300 lg:h-52 lg:w-52">
        <CiUser className="text-9xl lg:text-[150px]" />
      </section>
      <div className="border-2"></div>
      <section className=" md:my-5">
        <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
          My Details
        </h1>

        <aside className="my-5 grid w-2/3 grid-cols-2 justify-start gap-2 text-lg">
          <section className="font-medium">
            <p className="my-2">Email:</p>
            <p className="my-2">Created At:</p>
          </section>
          <section>
            <p className="my-2">email</p>
            <p className="my-2">created at</p>
          </section>

          <button
            onClick={logout}
            className="my-5 rounded-full bg-stone-800 py-4 text-gray-100 md:w-32"
          >
            Logout
          </button>
        </aside>
      </section>
    </div>
  );
}

export default UserDetails;
