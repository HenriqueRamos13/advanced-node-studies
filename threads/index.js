// Change the threadpool size using by node
process.env.UV_THREADPOOL_SIZE = 5;

const crypto = require("crypto");

const start = Date.now();

// in this file, we are prooving that some libraries is not single thread like the event loop.
crypto.pbkdf2("a", "b", 500000, 512, "sha512", () => {
  console.log("1:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 500000, 512, "sha512", () => {
  console.log("2:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 500000, 512, "sha512", () => {
  console.log("3:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 500000, 512, "sha512", () => {
  console.log("4:", Date.now() - start);
});

crypto.pbkdf2("a", "b", 500000, 512, "sha512", () => {
  console.log("5:", Date.now() - start);
});

// setTimeout(() => {
//   console.log("1");
// }, 2000);

// setTimeout(() => {
//   console.log("2");
// }, 2000);

// setTimeout(() => {
//   console.log("3");
// }, 2000);

// setTimeout(() => {
//   console.log("4");
// }, 2000);

// setTimeout(() => {
//   console.log("5");
// }, 2000);
