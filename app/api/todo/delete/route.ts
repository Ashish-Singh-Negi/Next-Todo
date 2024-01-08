import Todo from "@/models/Todo";
import { connectToDB } from "@/utils/features";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    await connectToDB();

    await Todo.deleteOne({ _id: id });

    return NextResponse.json(
      {
        message: "Deleted Successfully",
        success: true,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
