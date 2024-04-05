import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { fetchUser } from "../features/user/userSlice";

function AdminDashboard() {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Dashboard";
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      dispatch(fetchUser(JSON.parse(tokenString)));
    }
  }, [dispatch]);

  if (user.userType === "User") {
    return <h1>Please login as Admin to view this page</h1>;
  }

  return (
    <>
      {isLoading && <Loading />}
      <h1>{user.email}</h1>
    </>
  );
}

export default AdminDashboard;
