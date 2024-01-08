"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { isAuthUser } = await getUserAuth();
      const user = isAuthUser;

      if (!user) {
        push("/login");
        return;
      }
      push("/dashboard");
      setIsLogin(true);
    })();
  }, [push, isLogin]);

  const logoutHandler = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
      setIsLogin(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="h-14 w-full bg-blue-500 flex items-center p-5 justify-around fixed z-10">
      <p className="text-3xl font-bold text-white">Todo.</p>
      <div className="h-14 w-full"></div>
      <div className="h-10 w-1/12 flex justify-end gap-4 items-center">
        {isLogin ? (
          <div
            onClick={logoutHandler}
            className="text-2xl text-blue-800 font-semibold rounded-sm hover:text-white cursor-pointer"
          >
            logout
          </div>
        ) : (
          <Link
            href={"/login"}
            className="text-2xl text-blue-800 font-semibold rounded-sm hover:text-white"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

async function getUserAuth() {
  try {
    const res = await fetch("api/isAuth");
    const { user }: { user: boolean } = await res.json();

    return {
      isAuthUser: user,
    };
  } catch (error) {
    console.error(error);
    return {
      isAuthUser: null,
    };
  }
}

export default Header;
