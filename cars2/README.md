# dream car list saver

node project to save favorite cars as json file using fs module and express to expose endpoints

## packages

    express

## install

    npm install

## run project

    npm run dev

## stop server

    ctrl + c

### steps

    1. mkdir <directoryName>
    2. touch README.md && touch .gitignore && echo "node_modules" > .gitignore
    3. npm init -y
    4. npm install express
    5. update package.json file add "dev" command to "node --watch index.js" into `scripts`
    6. touch index.js
    7. update index.js with
        const express = require('express')

        const PORT = 8888;

        const app = express()

        app.get("/ping", function(req, res) {
          res.send("pong")
        })

        app.listen(PORT, function() {
          console.log('server running on port:', PORT)
        })

### endpoints

    /ping - healthcheck

    GET /api/cars{/:carId} - if no car id is passed with path param it will list cars and if carId is present, get specific car by id
        responses:
        get:
        { ...carDetails }

        list:
        {
          cars: [
            { ...carDetails },
            { ...carDetails }
          ]

        }

    POST /api/cars - save cars with newest id
      response:
      {
        data: { ...carDetails },
        createdAt: new Date().toISOString(),
        msg: "1 car inserted at <filename>"
      }

    PUT /api/cars/:carId - update car at carId
      response:
      {
        data: { ...carDetails },
        updatedAt: new Date().toISOString(),
        msg: "1 car updated"
      }

    DELETE /api/cars/:carId - delete car at carId
      response:
        {
          deletedAt: new Date().toISOString(),
          msg: "carId removed from cars
        }
