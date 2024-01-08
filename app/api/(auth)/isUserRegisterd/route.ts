import User from "@/models/Users";
import { connectToDB } from "@/utils/features";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDB();
    const { email }: { email: string } = await request.json();
    const user = await User.findOne({ email }).select("_id");

    return NextResponse.json(
      {
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
