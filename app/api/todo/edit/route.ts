import Todo from "@/models/Todo";
import { connectToDB } from "@/utils/features";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { isEdit, _id } = await request.json();

    await connectToDB();

    await Todo.findByIdAndUpdate(_id, { edit: isEdit });

    return NextResponse.json(
      {
        message: "edit Updated",
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
