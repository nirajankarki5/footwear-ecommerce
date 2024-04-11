/*
Submitted By :
  Ajay Shrestha (C0885384)  
  Gaurab Pokharel (C0886046)
  Nirajan Karki (C0885390)
  Sakar Thapa (C0890972)
*/

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNetworkError, signup } from "../features/user/userSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");

  const { networkError } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  //   Toast notification
  const notifyAdded = () => toast.success("User has been added as Admin");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password both are required");
      return;
    }

    if (repassword !== password) {
      setError("Passwords do not match");
      return;
    }
    const status = await dispatch(
      signup({ email, password, userType: "Admin" }),
    );
    // Signup success
    if (status === "success") {
      setEmail("");
      setPassword("");
      setRepassword("");
      setError("");

      notifyAdded();
      return;
    }
  };

  return (
    <form className="w-full max-w-sm p-6" onSubmit={handleSubmit}>
      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/3">
          <label
            className="mb-1 block pr-4 text-gray-700 md:mb-0 md:text-right"
            htmlFor="inline-full-name"
          >
            Email
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white"
            id="inline-full-name"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
              dispatch(setNetworkError(""));
            }}
          />
        </div>
      </div>
      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/3">
          <label
            className="mb-1 block pr-4 text-gray-700 md:mb-0 md:text-right"
            htmlFor="inline-password"
          >
            Password
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white"
            id="inline-password"
            type="password"
            placeholder="**********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
              dispatch(setNetworkError(""));
            }}
          />
        </div>
      </div>
      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/3">
          <label
            className="mb-1 block pr-4 text-gray-700 md:mb-0 md:text-right"
            htmlFor="inline-retype-password"
          >
            Re-type Password
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white"
            id="inline-retype-password"
            type="password"
            placeholder="**********"
            value={repassword}
            onChange={(e) => {
              setRepassword(e.target.value);
              setError("");
              dispatch(setNetworkError(""));
            }}
          />
        </div>
      </div>
      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/3">
          <label
            className="mb-1 block pr-4 text-gray-700 md:mb-0 md:text-right"
            htmlFor="inline-type"
          >
            User Type
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white"
            id="inline-type"
            type="text"
            placeholder="Admin"
            disabled
          />
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {networkError && <p className="text-sm text-red-500">{networkError}</p>}
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="focus:shadow-outline rounded bg-purple-500 px-4 py-2 text-white shadow hover:bg-purple-400 focus:outline-none"
            type="button"
            onClick={handleSubmit}
          >
            Add Admin
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-left" />
    </form>
  );
}

export default AddAdmin;
