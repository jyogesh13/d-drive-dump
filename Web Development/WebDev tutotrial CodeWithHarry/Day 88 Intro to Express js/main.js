const express = require('express');
const app = express();
const port = 3000;


//to serve a static file
// app.use(express.static('folder_name'))
app.use(express.static('public'))

// app.get(path, handler(any function))
app.get('/',(req,res)=>{
    res.send('Hello Worldewsfd')
})

//for many endpoints
// app.get('/home',(req,res)=>{
//     res.send('Home page')
// })
// app.get('/about',(req,res)=>{
//     res.send('About us')
// })

//to avoid all this we use 
//input: http://localhost:3000/blog/Intro-to-python
//output: hello Intro-to-python
//:(url-parameters)
app.get('/blog/:slug', (req,res)=>{
    //logic to fetch {slug} from db
    //for url: http://localhost:3000/blog/Intro-to-python?mode=dark&region=in
    console.log(req.params); //will output { slug: 'Intro-to-python' }
    console.log(req.query); //will output { mode: 'dark', region: 'in' }
    
    res.send(`hello ${req.params.slug}`);
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})