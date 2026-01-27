const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");

const publicDir = path.join(__dirname, "data");

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

router.get("/file-tasks", async (req, res) => {
  try {
    const filePath = path.join(publicDir, "tasks.json");
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    const json = JSON.parse(fileContent);
    res.json(json);
  } catch (error) {
    console.error("Error reading tasks from file:", error);
    res.status(500).json({ error: "Failed to read tasks from file" });
  }
});

module.exports = router;
