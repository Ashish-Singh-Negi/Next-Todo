import mongoose, { models } from "mongoose";
import { Schema } from "mongoose";

const TodoSchema = new Schema({
  todosId: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  completed: {
    type: Boolean,
    require: true,
  },
  edit: {
    type: Boolean,
    require: true,
  },
  createdAt: {
    type: String,
    require: true,
  },
  updatedAt: {
    type: String,
    require: true,
  },
});

const Todo = models.Todo || mongoose.model("Todo", TodoSchema);

export default Todo;
