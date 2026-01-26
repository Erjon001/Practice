What does Express do on top of Node's http module?

express adds a layer of simplicity over nodes http module. it removes the need of manually adding headers, response status code or body, instead they are made automatically and you focus only on how to handle the request, not how its supposed to be received or returned.

What are req and res in:
an Express route handler
a bare http.createServer handler?

Req and res in an express route handler are built on top of the Node's ones which mean that they act as an extension of them, their main purpose is to act as an helper, that can be used to req or get res from the node server itself. In a bare server handler they are actually raw object that allows the communication between the client and the server, they make possible the sent of requests with all its components like headers, code status, body and so on and retreival of response in the same fashion.

Why is fs.readFileSync a bad idea inside a busy HTTP request handler?

readfilesync blocks the whole code from running until it provides a response. this makes the run time slower and prevents other parts of the code that do other tasks from running. most importantly it blocks other requests from executing since the code must wait to finish the current task.

What advantages do fs.promises + async/await give you over callbacks?

promises give you the ability to write cleaner code with clean structure and error handling while also allowing you to use the the promise outside the async/await . on the callback, the logic that depends on the value must be inside the function only, this means that the flow lives inside the function which makes it messy and harder to manage.
