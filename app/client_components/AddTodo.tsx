"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import AllTodos from "./AllTodos";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todoId, setTodoId] = useState("");
  const [newTodo, setNewTodo] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/isId");
      const { id } = await res.json();
      if (!id) return;
      const { email } = id;
      setTodoId(email);
    })();
  }, []);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() && !description.trim()) return;
    try {
      await fetch("/api/todo/add", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          todoId,
        }),
      });
      setTitle("");
      setDescription("");
      setNewTodo((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center">
      <form
        onSubmit={(e) => submitHandler(e)}
        className="top-14 relative z-0 h-1/4 w-2/3 flex flex-col items-center my-8 gap-5 mb-20"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="w-full h-10 outline-blue-400 border-b-2 p-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full h-20 resize-none outline-blue-400 border-b-2 p-2 overscroll-contain"
        ></textarea>
        <button
          className="w-1/12 bg-blue-400 my-3 py-2 text-white font-medium rounded-3xl hover:bg-blue-500"
          type="submit"
        >
          Submit
        </button>
      </form>
      <AllTodos query={todoId!} newTask={newTodo} />
    </section>
  );
};

export default AddTodo;
