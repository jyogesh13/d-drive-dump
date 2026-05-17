import express from 'express'
import {Data} from "../models/Data.js"
const router = express.Router();

//saving data to DB
router.post("/", async (req,res)=>{
    const newData = new Data(req.body);
    try{
        const savedData = await newData.save();
        res.status(200).json(savedData);
    }catch(err){
        res.status(500).json(err);
    }
})


//fetching data from DB
router.get("/", async (req,res)=>{
    try{
        const data = await Data.find();
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err)
    }
})

//deleting a password
router.delete("/",async (req,res)=>{
    try{
        const deletedData = await Data.deleteOne({id:`${req.body.id}`})
        res.status(200).json(deletedData);
    }catch(err){
        res.status(500).json(err);
    }
})

export default router