import React, { useState } from "react";
import loginImg from "../assets/images/login.jpg";
import TextField from "../ui/TextField";
import useToken from "../hooks/useToken";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useToken();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password both are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();

      setToken(data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}

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
