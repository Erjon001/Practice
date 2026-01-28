const API_BASE_URL = "http://localhost:3000";
const TASKS_URL = `${API_BASE_URL}/tasks`;

const errorBox = document.querySelector("#error");
const loadingBox = document.querySelector("#loading");
const taskList = document.querySelector("#task-list");
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const submitButton = form.querySelector("button[type=submit]");

let tasks = [];

//Error handler (UI)
const setError = (message) => {
  if (!errorBox) return;
  errorBox.textContent = message;
};

//Load handler(IU)
const setLoading = (isLoading) => {
  if (!loadingBox) return;
  loadingBox.textContent = isLoading ? "Loading tasks..." : "";
};

//Request helper(API)
const apiRequest = async (endpoint, options = {}) => {
  const url = `${TASKS_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const finalOptions = {
    method: "GET",
    ...options,
    headers: { ...defaultHeaders, ...(options.headers || {}) },
  };

  const response = await fetch(url, finalOptions);

  if (!response.ok) {
    const error = new Error(`HTTP error! status : ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const contentType = response.headers.get("Content-Type");

  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
};

//Delete tasks(UI)
const removeTasksLocally = async (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
};

//Handle delete (UI)
taskList.addEventListener("click", async (event) => {
  if (!event.target.matches(".delete-button")) return;

  const li = event.target.closest("li");
  const id = Number(li.dataset.id);

  event.target.disabled = true;

  try {
    await apiRequest(`/${id}`, {
      method: "DELETE",
    });
    removeTasksLocally(id);
    renderTasks();
  } catch (error) {
    console.error(`Failed to delete task`, error);
    setError(`Could not delete task`);
    event.target.disabled = false;
  }
});

//Loading tasks(UI)
const loadTasksFromAPI = async () => {
  try {
    setError("");
    setLoading(true);

    const response = await apiRequest("");
    tasks = response;
    renderTasks();
  } catch (error) {
    console.error("Failed to load tasks", error);
    setError("Could not load tasks.");
  } finally {
    setLoading(false);
  }
};

//Handle submit(UI)
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = taskInput.value.trim();

  if (!title) {
    setError("Please add a task title !");
    return;
  }

  setError("");
  try {
    const response = await apiRequest("", {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    tasks.push(response);
    renderTasks();
    taskInput.value = "";
  } catch (error) {
    console.error("Failed to create task", error);
    setError("Could not create task.");
  }
  console.log(title);
});

const updateTaskCompleted = async (id, completed) => {
  setError("");
  try {
    const response = await apiRequest(`/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed }),
    });
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks[index] = response;
      renderTasks();
    }
  } catch (error) {
    console.error("Failed to update task", error);
    setError("Could not update task.");
  }
};

//Render tasks(UI)
const renderTasks = () => {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.title;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("complete-checkbox");
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      updateTaskCompleted(task.id, checkbox.checked);
    });
    li.dataset.id = task.id;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    if (task.completed) {
      span.style.textDecoration = "line-through";
    }

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
};

loadTasksFromAPI();
