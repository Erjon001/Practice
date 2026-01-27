GET : /tasks => returns an array object that contains all tasks or 404 code if empty or 500 code if theres another error.

POST : /tasks => creates a new task, body should be a string and type JSON, 400 if its invalid title and 500 if its server error.

DELETE : /tasks/:id => deletes a task using its id, 400 if invalid id,404 if the task does not exist.

PATCH : /tasks/:id => updates the task completed status via its id, 400 invalid body or id or 404 if task not found
