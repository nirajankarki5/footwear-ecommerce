import React, { useEffect, useState } from "react";
import signupImg from "../assets/images/signup.jpg";
import TextField from "../ui/TextField";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, setNetworkError, signup } from "../features/user/userSlice";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");

  const { networkError } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password both are required");
      return;
    }
    // Error msg for password validation
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,}$/;
    if (!passwordPattern.test(password)) {
      setError(
        "Password must contain at least 5 characters, including uppercase, lowercase letters, special character and numbers.",
      );
      return;
    } else {
      setError("");
    }

    if (repassword !== password) {
      setError("Passwords do not match");
      return;
    }
    const status = await dispatch(signup({ email, password }));
    // Login if signup success
    if (status === "success") {
      const loginStatus = await dispatch(login({ email, password }));
      // navigate to home if login success
      if (loginStatus.status === "success" && loginStatus.userType === "User") {
        navigate("/");
      } else if (
        loginStatus.status === "success" &&
        loginStatus.userType === "Admin"
      ) {
        navigate("/admindashboard");
      }
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <section className="relative overflow-hidden bg-black">
      <img
        src={signupImg}
        alt="signup"
        className="h-full w-full object-cover opacity-40"
      />

      <div className="absolute left-[50%] top-[50%] z-50 h-4/5 w-4/5 translate-x-[-50%]  translate-y-[-50%] overflow-hidden rounded-3xl bg-gray-300 p-5 opacity-80 sm:p-5 md:px-8 lg:h-2/4 lg:w-2/3 lg:px-5 xl:h-2/3 xl:px-8 2xl:px-14">
        <form
          onSubmit={handleSubmit}
          className="top-[50%] flex h-full flex-col justify-center"
        >
          <h1 className="mb-4 text-center font-medium lg:text-xl">
            Enter your details
          </h1>
          <TextField
            label="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
              dispatch(setNetworkError(""));
            }}
          />
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
              dispatch(setNetworkError(""));
            }}
          />
          <TextField
            label="Re-type password"
            type="password"
            value={repassword}
            onChange={(e) => {
              setError("");
              setError("");
              dispatch(setNetworkError(""));
              setRepassword(e.target.value);
            }}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          {networkError && (
            <p className="text-sm text-red-500">{networkError}</p>
          )}

          <button className="mt-2 h-16 rounded-full bg-black text-lg font-medium text-white lg:mt-5">
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
}

export default Signup;
