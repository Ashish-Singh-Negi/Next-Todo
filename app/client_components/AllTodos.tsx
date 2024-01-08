"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Todo from "./Todo";
import Loader from "../components/Loader";

type Data = {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  edit: boolean;
  completed: boolean;
};

const AllTodos = ({ query, newTask }: { query: string; newTask: number }) => {
  const [data, setdata] = useState<Data[]>([]);
  const [todo, setTodo] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (!query) return;
        setLoading(true);
        const res = await fetch(`/api/todo/${query}`);
        const { dataIS } = await res.json();
        setdata([...dataIS]);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    })();
  }, [query, newTask, todo]);

  const deleteHandler = async (id: string) => {
    await fetch("/api/todo/delete", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    setTodo((prev) => prev + 1);
  };

  const completeHandler = async (_id: string, isCompleted: boolean) => {
    await fetch("/api/todo/complete", {
      method: "PUT",
      body: JSON.stringify({ _id, isCompleted }),
    });
    setTodo((prev) => prev + 1);
  };

  const editHandler = async (_id: string, isEdit: boolean) => {
    await fetch("/api/todo/edit", {
      method: "PUT",
      body: JSON.stringify({ _id, isEdit }),
    });
    setTodo((prev) => prev + 1);
  };

  const updateHandler = async (
    e: FormEvent<HTMLFormElement>,
    _id: string,
    editedTitle: string,
    editedDescription: string
  ) => {
    e.preventDefault();

    await fetch("/api/todo/update", {
      method: "PUT",
      body: JSON.stringify({
        _id,
        editedTitle,
        editedDescription,
        edit: false,
      }),
    });

    setTodo((prev) => prev + 1);
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center">
      {loading ? (
        <Loader top={96} />
      ) : data.length != 0 ? (
        data.map((value, index) => {
          return (
            <Todo
              title={value.title}
              description={value.description}
              dateIs={value.createdAt.slice(0, 10)}
              _id={value._id}
              edit={value.edit}
              completed={value.completed}
              key={index}
              deleteHandler={deleteHandler}
              completeHandler={completeHandler}
              editHandler={editHandler}
              updateHandler={updateHandler}
            />
          );
        })
      ) : (
        <div className="text-blue-600 text-2xl">No Tasks Added Yet</div>
      )}
    </section>
  );
};

export default AllTodos;
