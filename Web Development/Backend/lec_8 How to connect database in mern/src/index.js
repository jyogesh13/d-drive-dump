import dotenv from "dotenv"
import connectDb  from "./db/index.js"

dotenv.config({
    path: './.env'
})




connectDb()





























/*
// first approach iffy way
import express from 'express'
const app = express();

(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log('ERROR: ',error);
            throw error
        })

        console.log(process.env.PORT);
        
        app.listen(process.env.PORT, ()=>{
            console.log(`App is running at http://localhost:${process.env.PORT}`);
            
        })

    }catch(err){
        console.error("ERROR: ",err);
        throw err;
    }
})();
*/