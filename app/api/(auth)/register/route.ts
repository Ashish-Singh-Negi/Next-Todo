import { connectToDB } from "@/utils/features";
import User from "@/models/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

type T = {
  username: string;
  email: string;
  password: string;
};

export async function POST(request: Request) {
  try {
    const { username, email, password }: T = await request.json();
    const hashedPass = await bcrypt.hash(password, 10);

    await connectToDB();

    await User.create({
      username,
      email,
      password: hashedPass,
    });

    return NextResponse.json(
      {
        message: "user registerd sucessfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "error occur in registering user",
    });
  }
}
