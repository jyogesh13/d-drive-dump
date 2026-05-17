import dotenv from "dotenv";
import { app } from "./app.js";
import {connectDB} from "./db/index.js"
dotenv.config({
    path: "./.env"
})

connectDB()
.then(()=>{
    const port = 3000;
    app.listen(port,()=>{
        console.log(`Server running at http://localhost:${port}`)
    })
})
.catch((err)=>{
    console.log("Error connecting to database\nError: ",err)
})

