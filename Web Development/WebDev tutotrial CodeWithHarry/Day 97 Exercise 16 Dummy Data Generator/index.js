import express from "express";
import mongoose from "mongoose";
import {Employees} from "./models/employees.js";

await mongoose.connect('mongodb://localhost:27017/Company')
const app = express()

let emp_name = ['Rohan', 'Rahul', 'Rohit', 'Raghav', 'Richa', 'Sonali', 'Sapna', 'Shristi', 'Seema', 'Sonali'];
let emp_lang = ['Python', 'Go', 'JavaScript', 'C#', 'C', 'C++', 'Java', 'Kotlin', 'Rust', 'Ruby'];
let emp_city = ['New York', 'Bengaluru', 'Hyderabad', 'Noida', 'Gurugram', 'London', 'Brisbon', 'California', 'Texas', 'Toronto'];



app.use(express.static('public'))


app.post('/generate',async (req,res)=>{
    await Employees.deleteMany();
    let dummy_data = Array.from({ length: 10 }, (_, i) => ({
        name: emp_name[Math.floor(Math.random()*emp_name.length)],
        salary: Math.floor(4500000 + Math.random()*200000),
        language: emp_lang[Math.floor(Math.random()*emp_lang.length)],
        city: emp_city[Math.floor(Math.random()*emp_city.length)],
        isManager: Math.random() == 0.5 ? true : false
    }));

    await Employees.insertMany(dummy_data);
    res.send('10 data points generated')
})

app.post('/delete',async (req,res)=>{
    try{
        await Employees.deleteMany()
        res.json({data:"Datapoints deleted"})
    }
    catch(err){
        console.log(err);
        
    }
})

app.get('/employees',async (req,res)=>{
    let employees = await Employees.find();
    res.json({message:"10 data points fetched", data:employees})
})



app.listen(3000, ()=>{
    console.log(`Listening on port 3000`);
})