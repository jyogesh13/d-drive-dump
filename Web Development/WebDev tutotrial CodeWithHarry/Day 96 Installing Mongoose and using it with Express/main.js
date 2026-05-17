//Explore:  https://www.npmjs.com/package/mongodb
import mongoose from "mongoose";
import express from "express";
import {Todo} from "./models/Todo.js";

let conn = await mongoose.connect('mongodb://localhost:27017/todo');
const app = express();
const port = 3000;


app.get('/',async(req,res)=>{
    let todo = await Todo.findOne({})
    res.json({title: todo.title, desc: todo.desc, isDone: todo.isDone})
})

app.post('/',(req,res)=>{
    const todo = new Todo({title: "first", desc: "first todo"})
    todo.save()
    res.send("Hello world!!")
})



app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});