## Routes in express js

In Express.js, routes are the endpoints defined in your application that handle client requests. A route specifies a combination of an HTTP method (e.g., GET, POST, PUT, DELETE) and a URL path, and it defines what action should be taken when a request matches that combination.

Key Components of a Route
HTTP Method:
Specifies the type of request (e.g., GET, POST, PUT, DELETE).
Example: app.get(), app.post().
Path:
The URL path where the route is accessible.
Example: /, /api, users.
Callback Function (Route Handler):
A function that gets executed when the route is matched.
It takes req (request) and res (response) objects as arguments.

Example of express Routes:
const express = require('express');
const app = express();
const port = 3000;

    // GET route
    app.get('/', (req, res) => {
        res.send('This is the home page');
    });

    // POST route
    app.post('/submit', (req, res) => {
        res.send('Form submitted successfully');
    });

    // PUT route
    app.put('/update', (req, res) => {
        res.send('Resource updated');
    });

    // DELETE route
    app.delete('/delete', (req, res) => {
        res.send('Resource deleted');
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

## Routers in express js

In Express.js, routers are used to organize and modularize your application’s routes. They allow you to group related routes together and manage them in a clean and maintainable way. This is especially useful for large applications where you want to separate route logic into different files or modules.

What is an Express Router?
An Express Router is a mini version of the Express application. It can handle middleware, route definitions, and other configurations, but it is isolated from the main application. You can use routers to define routes for specific parts of your application and then mount them on specific paths in the main app.

Example of Using Routers in Express
Here’s how you can use routers in your application:

1. Create a Router
You can create a router using express.Router() and define routes on it.

    const express = require('express');
    const router = express.Router();

    // Define routes on the router
    router.get('/', (req, res) => {
        res.send('Welcome to the router!');
    });

    router.get('/about', (req, res) => {
        res.send('This is the about page of the router.');
    });

    module.exports = router; // Export the router

2. Use the Router in the Main App
   You can import the router and mount it on a specific path in your main application.

   const express = require('express');
   const app = express();
   const port = 3000;

   // Import the router
   const myRouter = require('./router');

   // Mount the router on the `/router` path
   app.use('/router', myRouter);

   app.listen(port, () => {
        console.log(`Listening on port ${port}`);
   });

3. Access the Routes
   Once the router is mounted, you can access its routes using the base path /router:

   GET /router/ → "Welcome to the router!"
   GET /router/about → "This is the about page of the router."

Benefits of Using Routers
Modularity:
You can separate route logic into different files, making the codebase easier to manage.
Reusability:
Routers can be reused across different parts of the application.
Clean Code:
Keeps the main application file (main.js) clean and focused on high-level configurations.
Middleware Support:
You can apply middleware to specific routers or routes within a router.
