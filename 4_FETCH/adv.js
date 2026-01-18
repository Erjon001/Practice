const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const errorBox = document.querySelector("#error");
const loadingBox = document.querySelector("#loading");
const taskList = document.querySelector("#task-list");
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const submitButton = form.querySelector("button[type=submit]");

let tasks = [];

const apiRequest = async (path, options = {}) => {
  const url = `${API_BASE_URL}${path}`;

  const defaultHeaders = {
    "Content-Type": "application / json",
  };

  const finalOptions = {
    method: "GET",
    headers: defaultHeaders,
    ...options,
    headers: { ...defaultHeaders, ...(options.headers || {}) },
  };

  const response = await fetch(url, finalOptions);

  if (!response) {
    const error = new Error(`HTTP error! status : ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const contentType = response.headers.get("Content-Type");

  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
};

const setError = (message) => {
  if (!errorBox) return;
  errorBox.textContent = message;
};

const setLoading = (isLoading) => {
  if (!loadingBox) return;
  loadingBox.textContent = isLoading ? "Loading tasks..." : "";
};

const loadTasksFromAPI = async () => {
  try {
    setError("");
    setLoading(true);

    const data = await apiRequest("/todos?_limit=5");

    tasks = data.map((item) => ({
      id: item.id,
      title: item.title,
      completed: Boolean(item.completed),
    }));

    renderTasks();
  } catch (error) {
    console.error(`Failed to load tasks`, error);
    setError("Could not load tasks");
  } finally {
    setLoading(false);
  }
};

const createTasksOnServer = async (title) => {
  const body = {
    title,
    completed: false,
  };

  const createdTask = await apiRequest("/todos", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return createdTask;
};

const renderTasks = () => {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.title;

    li.appendChild(span);
    taskList.appendChild(li);
  });
};
createTasksOnServer("Task1");

loadTasksFromAPI();
