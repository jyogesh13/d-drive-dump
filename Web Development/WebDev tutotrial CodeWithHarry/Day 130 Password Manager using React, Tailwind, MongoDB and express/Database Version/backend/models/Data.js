import mongoose from "mongoose";


const DataSchema = new mongoose.Schema({
    id:{
        type:String,
        require:true,
    },
    site:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
},{timestamps:true});

export const Data = mongoose.model('Data', DataSchema);