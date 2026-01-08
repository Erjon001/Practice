let Task1 = {
  title: "Task 1",
  description: "This is the first task",
  completed: false,
};
let Task2 = {
  title: "Task 2",
  description: "This is the second task",
  completed: true,
};
let Task3 = {
  title: "Task 3",
  description: "This is the third task",
  completed: false,
};
let Task4 = {
  title: "Task 4",
  description: "This is the fourth task",
  completed: true,
};

let tasks = [];
tasks.push(Task1);
tasks.push(Task2);
tasks.push(Task3);
tasks.push(Task4);

console.log(tasks);

function greetUser(name) {
  return `Hello,` + name + ` Welcome back.`;
}

console.log(greetUser("Alice"));

function describeTask(task) {
  return (
    `Title: ` +
    task.title +
    `, Description: ` +
    task.description +
    `, Completed: ` +
    task.completed
  );
}

console.log(describeTask(tasks[0]));

function isTaskCompleted(task) {
  return task.completed;
}

console.log(isTaskCompleted(tasks[1]));

function printAllTasks() {
  for (let i = 0; i < tasks.length; i++) {
    console.log(`Title: ` + tasks[i].title);
  }
}

console.log(printAllTasks());

function addTask(title, completed) {
  const task = {
    title: title,
    completed: completed,
  };
  tasks.push(task);
  return tasks;
}

function deleteTask(index) {
  if (index < 0 || index >= tasks.length) {
    return "Invalid index";
  } else {
    tasks.splice(index, 1);
    return tasks;
  }
}

function completedTasksCount() {
  let count = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed) {
      count++;
    }
  }
  return count;
}

console.log("Completed Tasks: " + completedTasksCount());
