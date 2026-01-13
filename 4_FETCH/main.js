let tasks = [];

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const errorMessage = document.querySelector("#error-message");

//Add Task
const addTask = (title) => {
  const task = {
    title: title,
    completed: false,
  };
  console.log(task);
  tasks.push(task);
};

const deleteTask = (index) => {
  if (index < 0 || index >= tasks.length) {
    console.warn("Invalid index:", index);
    return;
  }
  tasks.splice(index, 1);
};

const renderTasks = () => {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");

    // const checkbox = document.createElement("input");
    // checkbox.type = "checkbox";
    // checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.textContent = task.title;
    // const deleteButton = document.createElement("button");
    // deleteButton.textContent = "Delete";
    // deleteButton.classList.add("delete");
    // deleteButton.dataset.index = index;

    // const updateCompleted = () => {
    //   if (task.completed) {
    //     li.setAttribute("style", "text-decoration: line-through;");
    //   } else {
    //     li.setAttribute("style", "text-decoration: none;");
    //   }
    // };

    // updateCompleted();

    // checkbox.addEventListener("change", () => {
    //   task.completed = checkbox.checked;
    //   updateCompleted();
    // });

    // if (task.completed) {
    //   li.classList.add("completed");
    // }

    // li.appendChild(checkbox);
    // li.appendChild(deleteButton);
    li.appendChild(span);
    taskList.appendChild(li);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = taskInput.value.trim();

  //Advanced 2

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
