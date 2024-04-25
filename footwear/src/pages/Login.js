import React, { useEffect, useState } from "react";
import loginImg from "../assets/images/login.jpg";
import TextField from "../ui/TextField";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, setNetworkError } from "../features/user/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { networkError } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  // go to previous (protected) route that user wanted to go. Else, go to homepage
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password both are required");
      return;
    }

    const status = await dispatch(login({ email, password }));
    // navigate to specific route if login success
    if (status.status === "success" && status.userType === "User") {
      navigate(from, { replace: true });
    } else if (status.status === "success" && status.userType === "Admin") {
      navigate("/admindashboard");
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <section className="relative overflow-hidden bg-black">
      <img
        src={loginImg}
        alt="login"
        className="z-0 h-full w-full object-cover opacity-40"
      />

      <div className="absolute left-[50%] top-[50%] z-50 h-2/3 w-4/5 translate-x-[-50%]  translate-y-[-50%] overflow-hidden rounded-3xl bg-gray-300 p-5 opacity-80 sm:p-5 md:w-2/3 md:px-8 lg:h-2/4 lg:px-5 xl:h-2/3 xl:px-8 2xl:px-14">
        <form
          onSubmit={handleSubmit}
          className="top-[50%] flex h-full flex-col justify-center"
        >
          <h1 className="mb-4 text-center font-medium md:text-xl">
            Enter your login details
          </h1>
          <TextField
            label="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              dispatch(setNetworkError(""));
            }}
          />
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              dispatch(setNetworkError(""));
            }}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          {networkError && (
            <p className="text-sm text-red-500">{networkError}</p>
          )}

          <button
            onClick={handleSubmit}
            className="mt-5 h-16 rounded-full bg-black text-lg font-medium text-white"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
