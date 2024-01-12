"use client";

import React, { FormEvent } from "react";
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import EditTodo from "./EditTodo";

type Data = {
  title: string;
  description: string;
  dateIs: string;
  _id: string;
  edit: boolean;
  completed: boolean;
  deleteHandler: (_id: string) => void;
  completeHandler: (_id: string, isCompleted: boolean) => void;
  editHandler: (_id: string, edit: boolean) => void;
  updateHandler: (
    e: FormEvent<HTMLFormElement>,
    _id: string,
    newEditTitle: string,
    newEditDescription: string
  ) => void;
};

const Todo = ({
  title,
  description,
  dateIs,
  _id,
  completed,
  edit,
  deleteHandler,
  completeHandler,
  editHandler,
  updateHandler,
}: Data) => {
  const date = `${dateIs.slice(8, 10)}/${dateIs.slice(5, 7)}/${dateIs.slice(
    2,
    4
  )}`;

  return edit ? (
    <EditTodo
      _id={_id}
      title={title}
      description={description}
      updateHandler={updateHandler}
    />
  ) : (
    <>
      <div className="min-h-min w-full mt-2 rounded-2xl p-3 pb-3 border-2 hover:bg-gray-50 transition-transform hover:-translate-y-1 shadow-md shadow-gray-200 dark:border-gray-600 dark:shadow-gray-700 dark:hover:bg-gray-900">
        <div className="h-6 w-full flex justify-between tracking-wider">
          <p className="font-bold text-lg text-blue-700 dark:text-blue-200">{title}</p>
          <div className="flex h-full items-center gap-3">
            {completed ? (
              ""
            ) : (
              <CiEdit
                size={32}
                onClick={() => editHandler(_id, true)}
                className="h-6 w-6 text-blue-600 flex justify-center items-center rounded-full cursor-pointer hover:scale-105 active:scale-100 duration-50 dark:text-blue-200"
              />
            )}
            {completed ? (
              <p
                className="text-white px-2 py-1 rounded-2xl font-medium cursor-pointer bg-green-500 shadow-md shadow-green-700 transition-transform transform hover:scale-105 active:scale-100 duration-50"
                onClick={() => completeHandler(_id, !completed)}
              >
                Completed
              </p>
            ) : (
              <p
                className="text-white bg-red-500 px-2 py-1 rounded-2xl font-medium cursor-pointer shadow-sm shadow-pink-600 hover:scale-105 active:scale-100 duration-50"
                onClick={() => completeHandler(_id, !completed)}
              >
                Not Completed
              </p>
            )}
            <p className=" font-semibold text-blue-500 dark:text-blue-200">{date}</p>
            <RxCross2
              size={32}
              className="h-6 w-6 text-white bg-red-500 flex justify-center items-center rounded cursor-pointer shadow-sm shadow-red-500 transition-transform transform hover:scale-105 active:scale-100 duration-50"
              onClick={() => deleteHandler(_id)}
            />
          </div>
        </div>
        <div className="h-22 text-gray-600 pt-2 tracking-normal overflow-y-scroll dark:text-white ">
          {description}
        </div>
      </div>
    </>
  );
};

export default Todo;
