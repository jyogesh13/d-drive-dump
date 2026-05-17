import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import data from './routes/data.js'
import cors from 'cors'

const app = express()
const port = 3000
const dataRoute = data;

dotenv.config()
app.use(express.json());
app.use(cors())

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=>console.log(err));


app.use("/api/data",dataRoute);



app.listen(port,()=>{
    console.log(`Server running on port http://localhost:${port}`)
})