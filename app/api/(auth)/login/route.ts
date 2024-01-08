import { connectToDB } from "@/utils/features";
import User from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

const MAX_AGE = 60 * 60 * 24 * 15;

type Data = {
  email: string;
  password: string;
};

export const POST = async (request: NextRequest) => {
  try {
    await connectToDB();

    const { email, password }: Data = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "user not exists",
        },
        {
          status: 401,
        }
      );
    }

    const isPassMatch = await bcrypt.compare(password, user.password);

    if (!isPassMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invaild Password",
        },
        {
          status: 401,
        }
      );
    }

    const secret = process.env.JWT_SECRET || "";

    const token = sign({ email }, secret, {
      expiresIn: MAX_AGE,
    });

    // const serialized = serialize("Auth", token, {
    //   httpOnly: true,
    //   maxAge: MAX_AGE,
    //   path: "/",
    // });
    // const serialized1 = serialize("id", token, {
    //   httpOnly: true,
    //   maxAge: MAX_AGE,
    //   path: "/",
    // });

    cookies().set("Auth", token, {
      httpOnly: true,
      maxAge: MAX_AGE,
      path: "/",
    });
    cookies().set("id", token, {
      httpOnly: true,
      maxAge: MAX_AGE,
      path: "/",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Login  successfully",
      },
      {
        status: 202,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "error Occure during Login ",
      },
      {
        status: 401,
      }
    );
  }
};
