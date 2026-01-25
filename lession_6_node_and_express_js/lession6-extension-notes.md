What does Express do on top of Node's http module?

express adds a layer of simplicity over nodes http module. it removes the need of manually adding headers, response status code or manually closing the response chunk, instead they are made automatically

What are req and res in:
an Express route handler
a bare http.createServer handler?

Req and res in an express route handler are ..., while in a bare server handler they are the request of the client and the server response.

Why is fs.readFileSync a bad idea inside a busy HTTP request handler?

readfilesync blocks the whole code from running until it provides a response. this makes the run time slower and prevents other parts of the code that do other tasks from running.

What advantages do fs.promises + async/await give you over callbacks?

fs. promises immediately returns a promise that can be used as a response. this allows the code to continue running until the function has come up with a response.
async/await returns the response after the code has run so when it comes then the execution happens like backwards, so you get the response at the end.
