import React, { useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/user/userSlice";
import Loading from "../components/Loading";

function UserDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isUser, isLoading, user } = useSelector((store) => store.user);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(false);
  };

  useEffect(() => {
    document.title = "My details";
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      dispatch(fetchUser(JSON.parse(tokenString)));
    }
  }, [dispatch]);

  // CHECK IF USER IS LOGGED IN ELSE RETURN "PLEASE LOGIN TO CONTINUE"
  // if (!isUser) {
  //   return (
  //     <section className="my-10 text-center sm:my-14 lg:my-20">
  //       <h1 className=" text-3xl font-medium md:text-4xl lg:text-5xl">
  //         Unauthorized
  //       </h1>
  //       <p className="my-3 leading-6 text-gray-400 md:my-4 md:text-lg lg:my-5 lg:text-xl">
  //         Please login to continue
  //         <br />
  //         <Link
  //           to={"/auth/login"}
  //           className="mt-5 inline-block text-blue-600 underline"
  //         >
  //           Login
  //         </Link>
  //       </p>
  //     </section>
  //   );
  // }

  // Check if user is logged in. If not, navigate to login page
  // if user wants to go to a protected route without logging in, navigates to login page.
  // and after logging in, it redirects to that protected route that user previously wanted to go
  if (!isUser) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return (
    <div className="grid h-full grid-rows-[1fr_1px_3fr] gap-8 px-5 py-4 md:grid-cols-[1fr_1px_3fr] md:grid-rows-none lg:px-10">
      <section className="mx-auto mt-5 flex h-40 w-40 items-center justify-center rounded-full bg-gray-300 lg:h-52 lg:w-52">
        <CiUser className="text-9xl lg:text-[150px]" />
      </section>
      <div className="border-2"></div>
      {isLoading && <Loading />}
      {!isLoading && (
        <section className=" md:my-5">
          <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
            My Details
          </h1>

          <aside className="my-5 grid w-2/3 grid-cols-2 justify-start gap-2 text-lg">
            <section className="font-medium">
              <p className="my-2">Email:</p>
              <p className="my-2">Type:</p>
              <p className="my-2">Created At:</p>
            </section>
            <section>
              <p className="my-2">{user.email}</p>
              <p className="my-2">{user.userType}</p>
              <p className="my-2">{user.createdAt}</p>
            </section>
          </aside>
          <Link
            to={"orders"}
            className="my-5 mr-5 block rounded-full border-2 bg-gray-100 py-4 text-center text-stone-800 md:inline-block md:w-32"
          >
            My Orders
          </Link>

          <button
            onClick={logout}
            className="my-5 block w-full rounded-full bg-stone-800 py-4 text-gray-100 md:inline-block md:w-32"
          >
            Logout
          </button>
        </section>
      )}
    </div>
  );
}

export default UserDetails;
