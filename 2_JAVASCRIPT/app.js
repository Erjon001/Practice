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

//Exercise 3

let tasks = [];
tasks.push(Task1);
tasks.push(Task2);
tasks.push(Task3);
tasks.push(Task4);

// console.log(tasks);

// /////////////////////////

// function greetUser(name) {
//   return `Hello, ${name} Welcome back.`;
// }
// console.log(greetUser("Alice"));

// //Exercise 4

// function describeTask(task) {
//   return `Title: ${task.title}, Description: ${task.description}, Completed: ${task.completed}`;
// }
// console.log(describeTask(tasks[0]));

// /////////////////////////////////

// //Exercise 5

// function isTaskCompleted(task) {
//   return task.completed;
// }

// console.log(isTaskCompleted(tasks[1]));

// ////////////////////////////////

// //Exercise 6

// function printAllTaskTitles() {
//   for (let i = 0; i < tasks.length; i++) {
//     console.log(`Title: ${tasks[i].title}`);
//   }
// }

// console.log(printAllTaskTitles());

// //////////////////////////////////

// //Exercise 7

// function addTask(title) {
//   const task = {
//     title: title,
//     completed: false,
//   };
//   tasks.push(task);
//   return tasks;
// }

// /////////////////////////////////

// //Exercise 8

// function deleteTask(index) {
//   if (index < 0 || index >= tasks.length) {
//     return "Invalid index";
//   } else {
//     tasks.splice(index, 1);
//     return tasks;
//   }
// }

// ///////////////////////////////

// //Exercise 9

// function completedTasksCount() {
//   let count = 0;
//   for (let i = 0; i < tasks.length; i++) {
//     if (tasks[i].completed) {
//       count++;
//     }
//   }
//   return count;
// }

// console.log("Completed Tasks: " + completedTasksCount());

// ///////////////////////////////

//HW P1

//A

let name = "Erjon";
let age = 21;
let likeJS = true;

console.log(
  `My name is ${name}, I am ${age} years old and it is ${likeJS} that I like JavaScript.`
);

////////////////

//B

const favoriteFood = ["Pizza", "Sushi", "Burger", "Pasta", "Salad"];

console.log(favoriteFood[1]);
console.log(favoriteFood[3]);

const student = {
  name: "John",
  cohort: "Web Development",
  isActive: true,
};
console.log(student.name);
console.log(student.cohort);
console.log(student.isActive);

//////////////////////

//C
function square(number) {
  return Math.pow(number, 2);
}

console.log(square(2));
console.log(square(5));
console.log(square(10));

//////////////////////

//D

function printNumbersUpTo(n) {
  for (let i = 1; i <= n; i++) {
    console.log(i);
  }
  return;
}
printNumbersUpTo(5);

function printEvenNumbersUpTo(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 2 === 0) {
      console.log(i);
    }
  }
  return;
}

printEvenNumbersUpTo(10);

const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function printEvenOddNumbers(num) {
  for (let i = 0; i < num.length; i++) {
    if (num[i] % 2 === 0) {
      console.log(`Even ${num[i]}`);
    } else console.log(`Odd ${num[i]}`);
  }
  return;
}

printEvenOddNumbers(num);

/////////////////////////

////////// HW 1 P2 ////////////

function addTask(title) {
  const task = {
    title: title,
    completed: false,
  };
  tasks.push(task);
  console.log(`Added task: ${task.title}`);
  return tasks;
}

function deleteTask(index) {
  if (index < 0 || index >= tasks.length) {
    console.log("Invalid index");
    return;
  } else {
    tasks.splice(index, 1);
  }

  return tasks;
}

function completeTask(index) {
  if (index < 0 || index >= tasks.length) {
    console.log("Invalid index");
    return;
  }

  tasks[index].completed = !tasks[index].completed;
  return tasks;
}

///Optional Exercise + Conversion to Arrow func

const countCompletedTasks = (tasks) => {
  let count = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === true) {
      count++;
    }
  }
  return count;
};

const completedCount = countCompletedTasks(tasks);
console.log("Completed tasks:", completedCount);

////////////////////////////////////

//Advanced HW1

tasks.forEach((task, index) => {
  console.log(`${index} : ${task.title} . Completed : ${task.completed}`);
});
