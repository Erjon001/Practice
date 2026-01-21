// index.js
const express = require("express");

const app = express();
app.use(express.json());

// Choose a port (e.g. 3000)
const PORT = 3000;

let tasks = [
  { id: 1, title: "Example task 1", completed: false },
  { id: 2, title: "Example task 2", completed: true },
];

let nextId = 3; // next ID to assign

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required!" });
  }
  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: false,
  };
  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "invalid id!" });
  }
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found " });
  }

  tasks.splice(index, 1);

  res.status(204).json("Task deleted successfully!");
});

app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id!" });
  }

  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    return res
      .status(404)
      .json({ error: "Request body requires completed as BOOLEAN" });
  }

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found!" });
  }

  task.completed = completed;

  res.json(task);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
