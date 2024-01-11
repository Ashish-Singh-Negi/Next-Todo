"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Todo from "./Todo";
import Loader from "../components/Loader";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

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
  const [show, setShow] = useState(false);
  const [completeCount, setCompleteCount] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (!query) return;
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

  const showCompletedTasks = () => {
    setShow((prev) => !prev);
  };

  useEffect(() => {
    setCompleteCount(0);
    data.map((val) => {
      if (val.completed === true) setCompleteCount((prev) => prev + 1);
    });
  }, [data]);

  return (
    <section className="min-h-screen w-2/3 flex flex-col">
      {loading ? (
        <div className="h-6 w-full flex justify-center">
          <Loader />
        </div>
      ) : data.length != 0 ? (
        data.map((value, index) => {
          return value.completed ? (
            ""
          ) : (
            <Todo
              title={value.title}
              description={value.description}
              dateIs={value.createdAt}
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
        <div className="text-blue-600 text-2xl text-center">No Tasks Added Yet</div>
      )}
      <div className="min-h-screen w-full flex flex-col items-center relative border-t-2 mt-4">
        {data && (
          <div
            onClick={() => showCompletedTasks()}
            className="group h-10 w-full px-2 font-semibold text-base flex items-center cursor-pointer"
          >
            <IoIosArrowForward
              size={16}
              className={`mx-1 transition ${show && "rotate-90"}`}
            />
            Completed {completeCount}
          </div>
        )}
        <div className="w-full absolute top-10 border-b-2">
          <div className="min-h-min w-full flex flex-col items-center opacity-80">
            {show
              ? data.map((value, index) => {
                  return value.completed ? (
                    <Todo
                      title={value.title}
                      description={value.description}
                      dateIs={value.createdAt}
                      _id={value._id}
                      edit={value.edit}
                      completed={value.completed}
                      key={index}
                      deleteHandler={deleteHandler}
                      completeHandler={completeHandler}
                      editHandler={editHandler}
                      updateHandler={updateHandler}
                    />
                  ) : (
                    ""
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllTodos;
