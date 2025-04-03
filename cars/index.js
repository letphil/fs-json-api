const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = 8888;

const app = express();

// middleware to receive json data
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// healthcheck
app.get("/ping", function (req, res) {
  res.send("pong");
});

// save car
app.post("/api/cars", function (req, res) {
  const car = req.body;

  const year = car.year;
  const make = car.make;
  const model = car.model;
  const color = car.color;

  if (make && model && year && color) {
    const carToInsert = new Car(
      year,
      capitalize(make),
      capitalize(model),
      color
    );

    const files = fs.readdirSync("./data", "utf8");

    files.sort(
      (a, b) => Number(a.replace(".json", "")) - Number(b.replace(".json", ""))
    );

    if (!files.length) {
      fs.writeFileSync("./data/1.json", JSON.stringify(carToInsert));
      res.send({
        msg: "CAR INSERTED",
        data: carToInsert,
        createdAt: new Date().toISOString(),
      });
    } else {
      // 1.json - ".json" "" - "1" Number - 1 + 1 + String(2) - "2" + ".json"
      const fileName = files[files.length - 1];

      const isolateNum = fileName.replace(".json", "");

      const castToNum = Number(isolateNum);

      const addOne = castToNum + 1;

      const backToFileName = String(addOne) + ".json";

      fs.writeFileSync("./data/" + backToFileName, JSON.stringify(carToInsert));
      res.send({
        msg: "CAR INSERTED",
        data: carToInsert,
        createdAt: new Date().toISOString(),
      });
    }

    // res.send(files);

    // res.send({
    //   msg: "CAR INSERTED",
    // });
  } else {
    res.status(422).send("check parameters");
  }
});

// list cars or get specific car by id
app.get("/api/cars{/:carId}", function (req, res) {
  const carId = req.params.carId;
  if (carId) {
    // readFileSync
    try {
      const car = fs.readFileSync(`./data/${carId}.json`, "utf8");
      res.send(car);
    } catch (error) {
      res.status(500).send("OUT OF INDEX");
    }
  } else {
    //
    const files = fs.readdirSync("./data");

    const cars = [];
    files.forEach((file) => {
      const car = fs.readFileSync("./data/" + file, "utf8");
      cars.push(JSON.parse(car));
    });

    res.send({
      list: cars,
    });
  }
});

app.listen(PORT, function () {
  console.log("server running on port:", PORT);
});

function Car(year, make, model, color) {
  this.year = year;
  this.make = make;
  this.model = model;
  this.color = color;
}

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
