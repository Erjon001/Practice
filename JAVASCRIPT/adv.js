let tasks = [];
let nextId = 1;

//Exercise 2

const addTask = (title, estimatedMinutes) => {
  const task = {
    id: nextId,
    title: title,
    completed: false,
    estimatedMinutes,
  };
  nextId++;
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

const getIncompTasks = (tasks) => {
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

const getIncompleteTasks = (tasks) => {
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

const deleteTaskById = (id) => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    console.log("Invalid id");
    return;
  }

  tasks.splice(index, 1);
  console.log(`Deleted task with Id: ${id}`);
};

////////////////////////////////////////

// Exercise 6

const getCompletedTasks = (tasks) => {
  return tasks
    .filter((task) => task.completed === true)
    .map((task) => task.title);
};

const countCompletedTasks = (tasks) => {
  let count = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === true) {
      count++;
    }
  }
  return count;
};

const countIncompleteTasks = (tasks) => {
  let count = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === false) {
      count++;
    }
  }
  return count;
};

const printSummary = (tasks) => {
  tasks.forEach((task) => {
    console.log(
      `ID: ${task.id}, Task title: ${task.title}, Completed: ${task.completed}`
    );
  });
};

///////////////////////////////////

//Hw P1 already done

//Hw P2

const CloneTask = (tasks) => {
  return [...tasks];
};

const getTasksWithAllCompleted = (tasks) => {
  return tasks.map((task) => ({ ...task, completed: true }));
};

///////////////////////////////

//HW P3

const getAverageEstimatedMinutes = (tasks) => {
  let total = 0;
  let avg = 0;
  for (let i = 0; i < tasks.length; i++) {
    total += tasks[i].estimatedMinutes;
  }
  avg = total / tasks.length;
  return avg;
};

///////////////////////////////////////////

//Optional

const reduceCountIncomplete = (tasks) => {
  return tasks.reduce((total, task) => {
    if (task.completed === false) {
      return total + 1;
    }
    return total;
  }, 0);
};
