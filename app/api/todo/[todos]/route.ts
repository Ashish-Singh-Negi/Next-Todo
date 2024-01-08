import Todo from "@/models/Todo";
import { connectToDB } from "@/utils/features";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    const todosId = request.nextUrl.pathname.split("todo/");
    const data = await Todo.find({ todosId: todosId[1] });
    return NextResponse.json(
      {
        message: "success",
        dataIS: data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "No Todo Found",
        err: error,
      },
      {
        status: 400,
      }
    );
  }
}
