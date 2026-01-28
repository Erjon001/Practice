const express = require("express");
const router = express.Router();

let tasks = [
  { id: 1, title: "Example task 1", completed: false },
  { id: 2, title: "Example task 2", completed: true },
];

let nextId = 3;

const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
};

//Get all tasks, with optional filtering by completion status
router.get("/tasks", (req, res) => {
  console.log(tasks);
  const { completed } = req.query;
  let result = tasks;
  if (completed === "true") {
    result = tasks.filter((task) => task.completed === true);
  } else if (completed === "false") {
    result = tasks.filter((task) => task.completed === false);
  }
  res.json(result);
});

//Create a new task
router.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return sendError(res, 400, "Title is required!");
  }
  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: false,
  };
  tasks.push(newTask);

  res.status(201).json(newTask);
});

//Delete a task by ID
router.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return sendError(res, 400, "invalid id!");
  }
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return sendError(res, 404, "Task not found ");
  }

  tasks.splice(index, 1);

  res.status(204).json("Task deleted successfully!");
});

//Update a task's completion status by ID
router.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return sendError(res, 400, "Invalid id!");
  }

  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    return sendError(res, 404, "Request body requires completed as BOOLEAN");
  }

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return sendError(res, 404, "Task not found!");
  }

  task.completed = completed;

  res.json(task);
});

module.exports = router;
