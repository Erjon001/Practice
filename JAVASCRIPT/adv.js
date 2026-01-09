let tasks = [];
let nextId = 1;

//Exercise 2

const addTask = (title) => {
  const task = {
    id: nextId,
    title: title,
    completed: false,
  };
  nextId += nextId;
  tasks.push(task);
  return task;
};

const completeTask = (index) => {
  if (index < 0 || index >= tasks.length) {
    console.log("Invalid index");
    return;
  }

  tasks[index].completed = true;
};

////////////////

//Exercise 3

const getIncompleteTasks = (tasks) => {
  let incTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === false) {
      incTasks.push(tasks[i]);
    }
  }
  return incTasks;
};

///////////////////////////////

//Exercise 4

const incompleteTasks = (tasks) => {
  return tasks
    .filter((task) => task.completed === false)
    .map((task) => task.title);
};

/////////////////////////////////

//Exercise 5

const findTaskById = (id) => {
  return tasks.find((task) => task.id === id);
};

const completeTaskById = (id) => {
  const task = findTaskById(id);

  if (!task) {
    console.log("Invalid id");
    return;
  }

  task.completed = true;
  console.log(`Task completed: ${task.title}, Id: ${id}`);
};

const deleteTask = (id, index) => {
  const task = findTaskById(id);

  if (!task) {
    console.log("Invalid id");
    return;
  }

  tasks.splice(index, 1);
  console.log(`Deleted task with Id: ${id}`);
};

////////////////////////////////////////
