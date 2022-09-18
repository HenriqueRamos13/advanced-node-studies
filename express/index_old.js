const cluster = require("cluster");
process.env.UV_THREADPOOL_SIZE = 1;

// console.log(cluster.isMaster);
// The master is the first process that is created when i ran the app

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
} else {
  const express = require("express");
  const app = express();
  const crypto = require("crypto");

  //Simulate a work in database
  function doWork(duration) {
    const start = Date.now();

    while (Date.now() - start < duration) {}
  }

  // This is a route that simulate a real work in the server
  app.get("/real", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("Hi there");
    });
  });

  app.get("/user/:id", (req, res) => {
    doWork(5000);

    res.send("Hi there!");
  });

  app.get("/fast", (req, res) => {
    res.send("Fast");
  });

  app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
  });
}
