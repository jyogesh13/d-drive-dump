const express = require('express')
const blog = require('./routes/blog')

const app= express()
const port = 3000

app.use(express.static('public'));
app.use('/blog', blog)

//Handling post requests 
app.post('/', (req,res)=>{
    console.log('This is a POST request');
    res.send('HTML post req made!!');
})

//request chaining
app.post('/', (req,res)=>{
    console.log('This is a POST request');
    res.send('HTML post req made!!');
}).put('/', (req,res)=>{
    console.log('This is a POST request');
    res.send('HTML post req made!!');
}).delete('/', (req,res)=>{
    console.log('This is a POST request');
    res.send('HTML post req made!!');
})

//serving html files
app.get('/index',(req,res)=>{
    console.log('This is a POST request');
    res.sendFile('templates/index.html', {root: __dirname}); //either provide absolute path or specify the root directory
})
app.get('/api',(req,res)=>{
    console.log('This is a POST request');
    res.json({a:1,b:2,c:5,name:['first','second']}); //to provide data in json format.
})

//express router
// for handling diff routes we create a seperate folder for all, named routes


app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})