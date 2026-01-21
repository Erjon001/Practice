const API_BASE_URL = "https://jsonplaceholder.typicode.com";

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
const apiRequest = async (path, options = {}) => {
  const url = `${API_BASE_URL}${path}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const finalOptions = {
    method: "GET",
    headers: defaultHeaders,
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

  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
};

//Delete helper(API)
const deleteTasksOnServer = async (id) => {
  await apiRequest(`/todos/${id}`, {
    method: "DELETE",
  });
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
    await deleteTasksOnServer(id);
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

    const data = await apiRequest("/todos?_limit=5");

    tasks = data.map((item) => ({
      id: item.id,
      title: item.title,
      completed: Boolean(item.completed),
    }));

    renderTasks();
  } catch (error) {
    console.error(`Failed to load tasks`, error);
    if (error.status >= 500) setError("Server error");
    else if (error.status >= 400) setError("Request error");
    else setError("Network problem");
  } finally {
    setLoading(false);
  }
};

//Create tasks(API)
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

//Handle submit(UI)
const handleFormSubmit = async (event) => {
  event.preventDefault();
  setError("");

  const title = taskInput.value.trim();

  if (!title) {
    setError("Please add a task title !");
    return;
  }
  submitButton.disabled = true;

  try {
    const createdTaskFromServer = await createTasksOnServer(title);
    console.log(createdTaskFromServer);

    const task = {
      id: createdTaskFromServer.id,
      title: createdTaskFromServer.title,
      completed: Boolean(createdTaskFromServer.completed),
    };

    tasks.push(task);
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
  } catch (error) {
    console.error(`Failed to create task`, error);
    setError("Could not create task.");
  } finally {
    submitButton.disabled = false;
  }
};
form.addEventListener("submit", handleFormSubmit);

//Render tasks(UI)
const renderTasks = () => {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.title;

    li.dataset.id = task.id;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
};

loadTasksFromAPI();
