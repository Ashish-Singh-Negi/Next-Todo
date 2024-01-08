import Todo from "@/models/Todo";
import { connectToDB } from "@/utils/features";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { _id, editedTitle, editedDescription ,edit } = await request.json();

    await connectToDB();

    await Todo.findByIdAndUpdate(_id, {
      title: editedTitle,
      description: editedDescription,
      edit
    });

    return NextResponse.json(
      {
        success: true,
        message: "Todo Updated Successfully",
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
