const express = require('express')
const port = 3000
const app = express()

app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.render('index', {foo: "World!!"});
})


app.listen(3000, ()=> console.log('Example app listening on port 3000!'));