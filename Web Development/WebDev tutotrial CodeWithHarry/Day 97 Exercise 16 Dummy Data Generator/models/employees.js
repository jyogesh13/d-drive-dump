import mongoose from "mongoose";

const employeesschema = new mongoose.Schema({
    name:String,
    salary:Number,
    language:String,
    city: String,
    isManager: Boolean
  });

export const Employees = mongoose.model('Employees', employeesschema);