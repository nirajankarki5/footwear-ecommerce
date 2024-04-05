import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

function AdminDashboard() {
  const { user, isLoading } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (user.userType === "User") {
      navigate("/");
    }
    if (user) {
      setUserInfo(user);
    }
  }, [navigate, user]);

  console.log(user);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <h1>{userInfo?.email}</h1>
    </>
  );
}

export default AdminDashboard;
