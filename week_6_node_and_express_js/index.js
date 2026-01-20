// index.js
const express = require("express");

const app = express();

// Choose a port (e.g. 3000)
const PORT = 3000;

const tasks = [
  { id: 1, title: "Learn Express basics", completed: false },
  { id: 2, title: "Build first API route", completed: false },
  { id: 3, title: "Test API in browser", completed: true },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/info", (req, res) => {
  res.json({
    appName: "Task Manager",
    version: "1.0",
    author: "Me",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
