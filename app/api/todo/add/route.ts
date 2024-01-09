import Todo from "@/models/Todo";
import { connectToDB } from "@/utils/features";
import { NextResponse } from "next/server";

type Task = {
  title: string;
  description: string;
  todoId: string;
};

export async function POST(request: Request) {
  try {
    const { title, description, todoId }: Task = await request.json();

    await connectToDB();

    await Todo.create({
      title,
      description,
      todosId: todoId,
      completed: false,
      edit: false,
    });

    return NextResponse.json(
      {
        message: "task Added Successfully",
        success: true,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: err,
    });
  }
}
