"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const responseIs = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const { message, success } = await responseIs.json();

      if (!success) {
        setErr(message);
        setLoading(false);
        return;
      }
      setLoading(false);
      push(`/dashboard`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader top={10}/>
      ) : (
        err && (
          <div className="absolute top-10 text-red-500 font-semibold">
            {err}
          </div>
        )
      )}
      <form
        onSubmit={(e) => loginHandler(e)}
        className="h-1/2 w-full flex flex-col gap-10 items-center"
      >
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="email"
          className="w-3/5 outline-blue-400 h-10 border-b-2 border-blue-400 px-1"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="w-3/5 outline-blue-400 h-10 border-b-2 border-blue-400 px-1"
        />
        <button className="m-6 bg-blue-400 px-6 py-2 rounded-xl text-white hover:bg-blue-600 font-normal shadow-md shadow-sky-700">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
