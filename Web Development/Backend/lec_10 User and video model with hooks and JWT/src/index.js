import dotenv from "dotenv"
import connectDB  from "./db/index.js"
import {app} from "./app.js"

dotenv.config({
    path: "./.env"
})

connectDB()
.then(()=>{
    const port = process.env.PORT || 8000;
    app.listen(port, ()=>{
        console.log(`Server running at http://localhost:${port}`);
    })
})
.catch((error)=>{
    console.log(`Database connection failed !!! Error: ${error}`);
})