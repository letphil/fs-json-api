# Cars server to save favorite cars

### DESCRIPTION: will use fs module and store cars data inside of data folder and create simple express server and create simple form in frontend to save favorite car

## setup

    npm install

## start server

    npm run dev

## stop server

    ctrl + c

### packages

    express

### endpoints

    GET /api/cars - list all cars
    POST /api/cars - save new car
    GET /api/cars/:id - get car with id
    PUT /api/cars/:id - update car
    DELETE /api/cars:id - delte car

### STEPS

    1. mkdir cars
    2. add README.md
    3. touch .gitignore && echo "node_modules" > .gitignore
    4. npm init -y
    5. npm install express
    6. update package.json to include "dev" command to "node --watch index.js" inside "scripts" key
    7. create index.js file
    8. insert into index.js file
        const express = require('express')
        const app = express()

        const PORT = 8888

        // health check
        app.get("/ping", function(req, res) {
          res.send("pong")
        })

        app.listen(PORT, function() {
          console.log("server running on port:,", PORT)
        })
