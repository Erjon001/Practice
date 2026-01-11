let tasks = [];

tasks.push({ title: "Demo task 1", completed: false });
tasks.push({ title: "Demo task 2", completed: false });

function addTask(title) {
  const task = {
    title: title,
    completed: false,
  };
  tasks.push(task);
}

//Exercise 2

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const errorMessage = document.querySelector("#error-message");

console.log(form);
console.log(taskInput);
console.log(taskList);
console.log(errorMessage);

/////////////////////////

//Exercise 3

const heading = document.querySelector("h1");
console.log(`Before: ${heading.textContent}`);

heading.textContent = "Day 4 - Interactive Task List";
console.log(`After: ${heading.textContent}`);

///////////////////////////

//Exercise 4

const renderTasks = () => {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.textContent = task.title;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.dataset.index = index;

    const updateCompleted = () => {
      if (task.completed) {
        li.setAttribute("style", "text-decoration: line-through;");
      } else {
        li.setAttribute("style", "text-decoration: none;");
      }
    };

    updateCompleted();

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      updateCompleted();
    });

    if (task.completed) {
      li.classList.add("completed");
    }

    // deleteButton.addEventListener("click", () => {
    //   deleteTask(index);
    //   renderTasks();
    // });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });
};

renderTasks();

/////////////////////////////

// Exercise 5

// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const title = taskInput.value.trim();

//   //Advanced 2

//   if (title === "") {
//     errorMessage.textContent = "Please enter a task title.";
//     return;
//   } else {
//     errorMessage.textContent = "";
//   }

//   addTask(title);

//   renderTasks();

//   taskInput.value = "";
//   taskInput.focus();
// });

////////////////////////

//Exercise 6

function deleteTask(index) {
  if (index < 0 || index >= tasks.length) {
    console.warn("Invalid index:", index);
    return;
  }
  tasks.splice(index, 1);
}
////////////////////////////

// Advanced 1

taskList.addEventListener("click", (event) => {
  if (event.target.matches("button.delete")) {
    const index = Number(event.target.dataset.index);
    deleteTask(index);
    renderTasks();
  }
});

//////////////////////

// Advanced 3

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    const title = taskInput.value.trim();
    if (!title) {
      return;
    }

    addTask(title);
    renderTasks();

    taskInput = "";
    taskInput.focus();
  }
});
