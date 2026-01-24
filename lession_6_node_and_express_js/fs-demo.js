const { error } = require("console");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "sample.txt");

console.log("Synchronous read");
try {
  const contentSync = fs.readFileSync(filePath, "utf-8");
  console.log("Content (sync):\n", contentSync);
} catch (error) {
  console.error("Sync read error:", error);
}

console.log("Async callback");

fs.readFile(filePath, "utf-8", (error, content) => {
  if (error) {
    console.error("Async read error:", error);
    return;
  }
  console.log("Content (async callback):", content);
});

console.log("Async Promise");

fs.promises
  .readFile(filePath, "utf-8")
  .then((content) => {
    console.log("Content (async Promise):\n", content);
  })
  .catch((error) => {
    console.error("Async Promise read error:", error);
  });

console.log("This line comes after scheduling async reads.");
