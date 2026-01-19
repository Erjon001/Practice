Base url:
API_BASE_URL = https://jsonplaceholder.typicode.com

Endpoints:
GET /todos?\_limit=5 – fetch list of tasks
POST /todos – create a new task
DELETE /todos/:id – delete a task

Data shape:
{
id: number,
title: string,
completed: boolean
}

Data Flow:

The base url is built and is given its default headers in the apiRequest function. We also make sure that we get the response in JSON format, the default method is GET, headers are the default headers we just assigned and these are the default values until we override them. The next step is to fetch from this server and check if we get a response and if its successful or not, then if the response is in JSON we return it or else we return it in html form.

We create a small try-catch function that catches any error we get from this fetch.

Then we move on to the loadTasksFromAPI function, which has the duty of getting the request and maps each data into an array in the form of data object. Here we also check for possible errors during the process.

After we map tasks to the array we call another important function which is renderTasks. This function is responsible for creating elements for example a list that has multiple spans inside, buttons etc, for each task inside the tasks array. Using this function we can display the tasks array into the HTML.

We can also add tasks ourselves and for this we use the eventListener that handles the submit event. It functions by taking the input from the user via an input field and utilizes another helping function called createTasksOnServer. This function takes as param the title provided and creates an object body that has a title and a boolean completed. A POST request is created that uses the /todo endpoint and transforms the body object into a string, so we can communicate with the server. After this request is made successfully the new task created is pushed successfully in the tasks array.

Inside renderTasks is created a delete button element that utilizes the deleteTasksOnServer function to create a delete method and uses the task id to delete any task with the endpoint /tasks/:id.
This helper can be used only if we had a server, since we are not using one we have removeTasksLocally function to actually delete tasks. It finds the task that the id provided matches the id of any of the tasks in the array and uses the method splice() to remove it from the array.

setError and setLoading are 2 handlers that improve UI. setError displays any important error that the user must see and setLoading is used to fill in the time taken for any api to complete its duty.
