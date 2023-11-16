import React from "react";
import { useNavigate } from "react-router-dom";

function UserDetails() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(false);
  };

  return (
    <div>
      <p>User Details</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default UserDetails;
