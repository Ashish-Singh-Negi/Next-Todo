import React, { FormEvent, useEffect, useState } from "react";

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
  const [titleWordCount, setTitleWordCount] = useState(0);

  useEffect(() => {
    if (editedTitle.length < 71) setTitleWordCount(editedTitle.length);
    setEditedTitle(editedTitle.slice(0, 70));
  }, [editedTitle]);
  return (
    <form
      onSubmit={(e) => updateHandler(e, _id, editedTitle, editedDescription)}
      className="h-40 relative w-full my-1 bg-white  rounded-2xl p-3 pb-3 border-2 border-blue-400 flex flex-col justify-center dark:bg-gray-900 dark:hover:bg-gray-900 "
    >
      <input
        type="text"
        className="h-6 tracking-widest font-bold text-blue-800 border-none outline-none dark:bg-gray-900 dark:text-blue-200"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <span className="absolute right-28 top-3 text-xs">
        {titleWordCount}/70
      </span>
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        className="h-28 w-full tracking-widest text-gray-500 outline-none resize-none dark:bg-gray-900 dark:text-gray-100"
      ></textarea>
      <button
        className="w-[5.5%] bg-blue-400 my-1 py-1 absolute top-[2px] right-4  text-white font-medium rounded-3xl hover:bg-blue-500 hover:scale-105 active:scale-100 "
        type="submit"
      >
        save
      </button>
    </form>
  );
};

export default EditTodo;
