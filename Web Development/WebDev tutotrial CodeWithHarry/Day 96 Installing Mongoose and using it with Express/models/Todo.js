import mongoose from "mongoose";

const todoschema = new mongoose.Schema({
    title: String, // String is shorthand for {type: String}
    desc: String,
    isDone: {type: Boolean, default: false},
  });

export const Todo = mongoose.model('Todo', todoschema);