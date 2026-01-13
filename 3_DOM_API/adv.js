let tasks = [];
let nextId = 1;
let currentFilter = "all";

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const errorMessage = document.querySelector("#error-message");
const emptyMessage = document.querySelector("#empty-message");
const filtersContainer = document.querySelector("#filters");

//Add Task
const addTask = (title) => {
  const task = {
    id: nextId,
    title: title,
    completed: false,
  };
  nextId++;
  tasks.push(task);
  return task;
};

//Find task by Id
const findTaskById = (id) => {
  return tasks.findIndex((task) => task.id === id);
};

//Delete task by Id
const deleteTaskById = (id) => {
  const index = findTaskById(id);

  if (index === -1) {
    console.log("Invalid id");
    return;
  }

  tasks.splice(index, 1);
};

//Visible tasks
const getVisibleTasks = () => {
  if (currentFilter === "active") {
    return tasks.filter((task) => task.completed === false);
  }
  if (currentFilter === "completed") {
    return tasks.filter((task) => task.completed === true);
  }

  return tasks;
};

// Render task
const renderTasks = () => {
  taskList.innerHTML = "";

  const visibleTasks = getVisibleTasks();

  //Empty message
  if (visibleTasks.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }

  visibleTasks.forEach((task) => {
    //List Tasks
    const li = document.createElement("li");

    //Including an id and storing it
    li.dataset.id = String(task.id);

    //Checkbox button
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("complete-checkbox");
    checkbox.checked = task.completed;

    //Creates a span that holds Task title
    const span = document.createElement("span");
    span.textContent = task.title;

    //Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    //Styling for checked Tasks
    const updateCompleted = () => {
      if (task.completed) {
        li.setAttribute("style", "text-decoration: line-through;");
      } else {
        li.setAttribute("style", "text-decoration: none;");
      }
    };

    updateCompleted();

    li.prepend(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });
};

//Submit eventListener
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = taskInput.value.trim();

  if (title === "") {
    errorMessage.textContent = "Please enter a task title.";
    return;
  } else {
    errorMessage.textContent = "";
  }

  addTask(title);

  renderTasks();

  taskInput.value = "";
  taskInput.focus();
});

//Universal eventListener for "click" event
taskList.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);

  if (event.target.matches(".delete-button")) {
    deleteTaskById(id);
    renderTasks();
  }
});

//Universal eventListener for "change" event
taskList.addEventListener("change", (event) => {
  const li = event.target.closest("li");

  const id = Number(li.dataset.id);

  if (event.target.matches(".complete-checkbox")) {
    const index = findTaskById(id);

    if (index === -1) return;

    tasks[index].completed = event.target.checked;
    renderTasks();
  }
});

//Filters change
filtersContainer.addEventListener("click", (event) => {
  if (!event.target.matches(".filter-button")) return;

  currentFilter = event.target.dataset.filter;

  document.querySelectorAll(".filter-button").forEach((button) => {
    if (button.dataset.filter === currentFilter) {
      button.classList.add("active-filter");
    } else {
      button.classList.remove("active-filter");
    }
  });
  renderTasks();
});
