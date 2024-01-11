"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const registerHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setErr("All feilds are Necessary");
      return;
    }

    try {
      setLoading(true);
      const resIs = await fetch("/api/isUserRegisterd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resIs.json();

      if (user) {
        setErr("User already Exist.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (res.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        setErr("");
        router.push("/login");
        setLoading(false);
      } else {
        console.log("user registeration Fail :(");
      }
    } catch (error) {
      console.log("error while registering " + error);
    }
  };
  return (
    <>
      {loading ? (
        <Loader top={10}/>
      ) : (
        err && (
          <div className=" absolute top-10 text-red-500 font-semibold">
            {err}
          </div>
        )
      )}
      <p className="text-4xl mt-6 font-extrabold relative ">SignUp</p>
      <form
        onSubmit={registerHandler}
        className="h-3/4 w-full flex flex-col gap-10 items-center justify-center"
      >
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder=" username"
          className="w-3/5 outline-blue-400 h-10 border-b-2 border-blue-400 px-1"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder=" email"
          className="w-3/5 outline-blue-400 h-10 border-b-2 border-blue-400 px-1"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder=" password"
          className="w-3/5 outline-blue-400 h-10 border-b-2 border-blue-400 px-1"
        />
        <button
          type="submit"
          className="m-6 bg-blue-400 px-6 py-2 rounded-xl text-white hover:bg-blue-600 font-normal shadow-md shadow-sky-700"
        >
          SignUp
        </button>
      </form>
    </>
  );
};

export default Register;
