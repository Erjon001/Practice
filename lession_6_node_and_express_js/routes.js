const express = require("express");

const router = express.Router();

const tasks = [
  { id: 1, title: "Learn Express basics", completed: false },
  { id: 2, title: "Build first API route", completed: false },
  { id: 3, title: "Test API in browser", completed: true },
];

router.get("/", (req, res) => {
  res.send("Welcome to my first Express server!");
});

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.get("/tasks", (req, res) => {
  res.json(tasks);
});

router.get("/info", (req, res) => {
  res.json({
    appName: "Task Manager",
    version: "1.0",
    author: "Your Name",
  });
});

module.exports = router;
