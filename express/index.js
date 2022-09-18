const express = require("express");
const app = express();
const crypto = require("crypto");
const { BroadcastChannel } = require("worker_threads");

//START COMMAND pm2 start index.js -i 0

//Simulate a work in database
function doWork(duration) {
  const start = Date.now();

  while (Date.now() - start < duration) {}
}

// This is a route that simulate a real work in the server
app.get("/real", (req, res) => {
  const worker = new BroadcastChannel(__filename, function () {
    this.onmessage = function () {
      let counter = 0;

      while (counter < 1e9) {
        counter++;
      }

      postMessage(counter);
    };
  });

  worker.onmessage = function (myCounter) {
    console.log(myCounter);
  };

  worker.postMassage();

  // crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  //   res.send("Hi there");
  // });
});

app.get("/", (req, res) => {
  doWork(5000);

  res.send("Hi there!");
});

app.get("/fast", (req, res) => {
  res.send("Fast");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
