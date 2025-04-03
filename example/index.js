const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = 8888;

const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/ping", function (req, res) {
  res.send("pong");
});

app.post("/api/data", function (req, res) {
  const files = fs.readdirSync("./data", "utf8");
  console.log("files =", files);

  if (!files.length) {
    fs.writeFileSync(
      "./data/1.json",
      JSON.stringify({
        test: "insert",
      })
    );
  } else {
    const fileName =
      String(Number(files[files.length - 1].replace(".json", "")) + 1) +
      ".json";

    fs.writeFileSync(`./data/${fileName}`, JSON.stringify("test"));

    res.send(fileName);
  }

  // res.send("HELLO");
});

app.listen(PORT, function () {
  console.log("server running on port:", PORT);
});
