import Todo from "@/models/Todo";
import { connectToDB } from "@/utils/features";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { isCompleted, _id } = await request.json();

    await connectToDB();

    await Todo.findByIdAndUpdate(_id, { completed: isCompleted });

    return NextResponse.json(
      {
        message: "isCompleted Updated",
        success: true,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      {
        status: 400,
      }
    );
  }
}
