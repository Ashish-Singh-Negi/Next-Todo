import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (request: Request, response: Response) => {
  cookies().delete("Auth");
  cookies().delete("id")
  return NextResponse.json(
    {
      message: "Logout Successfuly",
    },
    {
      status: 200,
    }
  );
};
