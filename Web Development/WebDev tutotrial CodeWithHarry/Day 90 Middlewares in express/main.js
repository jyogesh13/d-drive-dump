const express = require('express')

const app = express()
const port = 3000


//middleware function myLogger
// const mylogger = (req,res,next)=>{
//     console.log('LOGGED');
//     next()
// }

//middleware function requestTime
// const requestTime = (req,res,next)=>{
//     req.requestTime = Date.now()
//     next()
// }

// app.use(mylogger)
// app.use(requestTime)


// app.get('/',(req,res) => {
//     res.send(`Requested at: ${req.requestTime}`)
// })




app.listen(port,() => {
    console.log(`Example app listening on port ${port}`);

})