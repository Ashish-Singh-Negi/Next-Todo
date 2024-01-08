import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET() {
  const cookiesStore = cookies();

  const token = cookiesStore.get("Auth");

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
        user: false,
      },
      {
        status: 401,
      }
    );
  }

  const { value } = token;
  const secret = process.env.JWT_SECRET || "";

  try {
    verify(value, secret);
    return NextResponse.json(
      {
        user: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        user: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}
