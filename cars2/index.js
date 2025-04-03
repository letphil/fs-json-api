const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = 8888;

const app = express();

// adding middleware to accept json
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   req.body.created = new Date().toISOString();
//   req.body.updatedAt = new Date().toISOString();
//   req.body.deletedAt = null;
//   next();
// });

// app.use((req, res, next) => {
//   console.log(req);
//   if (req.headers.authorization.replace("ourSecret ", "") === "rabbit") next();
//   else res.status(401).send("UNAUTHORIZED");
// });

app.get("/ping", function (req, res) {
  res.send("pong");
});

// app.get("/params-test{/:pathParam}", function (req, res) {
//   res.send({
//     body: req.body,
//     params: req.params,
//     query: req.query,
//   });
// });

function carValidator(req, res, next) {
  const car = req.body;
  if (Object.keys(car).length !== 4)
    return res.status(422).send("not enough params error");
  const { year, make, model, color } = car;
  if (
    typeof year === "number" &&
    typeof make === "string" &&
    typeof model === "string" &&
    typeof color === "string"
  ) {
    next();
  } else {
    res.status(422).send("validation error");
  }
}

app.post("/api/cars", carValidator, function (req, res) {
  const car = new Car(
    req.body.year,
    req.body.make,
    req.body.model,
    req.body.color
  );
  let files = fs.readdirSync("./data");
  files = files.toSorted(
    (a, b) => Number(a.replace(".json", "")) - Number(b.replace(".json", ""))
  );
  console.log("files =", files);
  if (!files.length) {
    fs.writeFileSync("./data/1.json", JSON.stringify(car));
    res.send({
      data: { ...car },
      createdAt: new Date().toISOString(),
      msg: "1 car inserted at " + "1.json",
    });
  } else {
    let fileName = files[files.length - 1];
    fileName = String(Number(fileName.replace(".json", "")) + 1) + ".json";
    // fileName = fileName.replace(".json", "");
    // fileName = Number(fileName);
    // ++fileName;
    // fileName = String(fileName) + ".json";
    fs.writeFileSync("./data/" + fileName, JSON.stringify(car));
    res.send({
      data: { ...car },
      createdAt: new Date().toISOString(),
      msg: "1 car inserted at " + fileName,
    });
  }
});

app.get("/api/cars{/:carId}", function (req, res) {
  const carId = req.params.carId;
  const files = fs.readdirSync("./data");
  if (carId) {
    if (files.length < Number(carId)) {
      res.send("OUT OF INDEX");
    } else {
      const car = fs.readFileSync("./data/" + carId + ".json");
      res.send(car);
    }
  } else {
    const cars = [];
    for (let i = 0; i < files.length; i++) {
      const car = fs.readFileSync("./data/" + files[i], "utf8");
      cars.push(JSON.parse(car));
    }

    res.send({ cars });
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
