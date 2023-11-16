import React, { useState } from "react";
import signupImg from "../assets/images/signup.jpg";
import TextField from "../ui/TextField";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();
      if (response.status === 422) {
        setError(data.msg);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Re-type password"
            type="password"
            value={repassword}
            onChange={(e) => {
              setError("");
              setRepassword(e.target.value);
            }}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}

          <button className="mt-2 h-16 rounded-full bg-black text-lg font-medium text-white lg:mt-5">
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
}

export default Signup;
