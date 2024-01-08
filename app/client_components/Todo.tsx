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
  return edit ? (
    <EditTodo
      _id={_id}
      title={title}
      description={description}
      updateHandler={updateHandler}
    />
  ) : (
    <>
      <div className="h-40 w-2/3 mt-1 border-blue-400  rounded-2xl p-3 pb-3 hover:border-2 ">
        <div className="h-6 w-full flex justify-between tracking-widest">
          <p className="font-bold text-blue-800">{title}</p>
          <div className="flex h-full items-center gap-3">
            {completed ? (
              ""
            ) : (
              <CiEdit
                size={32}
                onClick={() => editHandler(_id, true)}
                className="h-6 w-6 text-blue-500 flex justify-center items-center rounded-full cursor-pointer"
              />
            )}
            {completed ? (
              <p
                className="text-green-500 font-medium cursor-pointer"
                onClick={() => completeHandler(_id, !completed)}
              >
                completed
              </p>
            ) : (
              <p
                className="text-red-500 font-medium cursor-pointer"
                onClick={() => completeHandler(_id, !completed)}
              >
                not completed
              </p>
            )}
            <p className=" font-semibold">{dateIs}</p>
            <RxCross2
              size={32}
              className="h-6 w-6 text-red-600 flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => deleteHandler(_id)}
            />
          </div>
        </div>
        <div className="h-28 text-gray-600 tracking-wide overflow-auto ">
          {description}
        </div>
      </div>
    </>
  );
};

export default Todo;
