const express = require("express");
const blog = require('./routes/blog')
const app = express();

//application level middleware

app.use((req, res, next) => {
  `This example shows a middleware function with no mount path. The function is executed every time the app receives a request.`;
  console.log("Time:", Date.now());
  next();
});

app.use("/user/:id", (req, res, next) => {
  `This example shows a middleware function mounted on the /user/:id path. The function is executed for any type of HTTP request on the /user/:id path.`;
  console.log("Request Type:", req.method);
  next();
});


app.get('/user/:id', (req, res, next) => {
    `This example shows a route and its handler function (middleware system). The function handles GET requests to the /user/:id path.`
    res.send(`USER ${req.params.id}`)
    next()
});


//Router level middleware
app.use('/blog',blog)

app.listen(3000)