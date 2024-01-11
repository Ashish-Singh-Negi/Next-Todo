import React, { FormEvent, useState } from "react";

type Props = {
  _id: string;
  title: string;
  description: string;
  updateHandler: (
    e: FormEvent<HTMLFormElement>,
    _id: string,
    newEditTitle: string,
    newEditDescription: string
  ) => void;
};

const EditTodo = ({ _id, title, description, updateHandler }: Props) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  return (
    <form
      onSubmit={(e) => updateHandler(e, _id, editedTitle, editedDescription)}
      className="h-40 relative w-full my-1 bg-white  rounded-2xl p-3 pb-3 hover:border-2 border-blue-400 flex flex-col"
    >
      <input
        type="text"
        className="h-6 tracking-widest font-bold text-blue-800 border-none outline-none"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        className="h-28 w-full tracking-widest text-gray-500 outline-none resize-none"
      ></textarea>
      <button
        className="w-1/12 bg-blue-400 my-3 py-2 absolute bottom-1 right-4  text-white font-medium rounded-3xl hover:bg-blue-500 "
        type="submit"
      >
        save
      </button>
    </form>
  );
};

export default EditTodo;
