import Login from "@/app/client_components/Login";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div className="h-full w-full flex items-center flex-col gap-10 justify-center">
      <p className="text-3xl  font-extrabold">Login</p>
      <Login />
      <p>
        dont have account?
        <Link href={"/register"} className="text-blue-500">
          register now
        </Link>
      </p>
    </div>
  );
}
