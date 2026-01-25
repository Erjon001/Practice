const http = require("http");
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "public");

const PORT = 4000;

const server = http.createServer((req, res) => {
  console.log("Incoming request:", req.method, req.url);

  if (req.url === "/" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Hello from the bare Node.js HTTP server!\n");
    return;
  }

  if (req.url === "/health" && req.method === "GET") {
    const body = JSON.stringify({ status: "ok" });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(body);
    return;
  }

  if (req.url === "/echo" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      console.log(`Received chunk: ${chunk.toString()}`);
      body += chunk;
    });

    req.on("end", () => {
      let parsed = null;
      try {
        parsed = JSON.parse(body);
      } catch (error) {
        console.log("Body was not a valid JSON");
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json; charset=utf-8");

      res.end(
        JSON.stringify({
          rawBody: body,
          parsedBody: parsed,
        }),
      );
    });
    return;
  }

  if (req.url === "/stream" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    res.write("Chunk 1\n");
    res.write("Chunk 2\n");
    res.write("Chunk 3\n");
    res.end("Final chunk-response completed\n");
    return;
  }

  if (req.url === "/page" && req.method === "GET") {
    const filePath = path.join(publicDir, "page.html");
    fs.readFile(filePath, "utf-8", (error, content) => {
      if (error) {
        console.error("Error reading file:", error);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("Internal Server Error");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(content);
    });
    return;
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`Bare HTTP server running at http://localhost:${PORT}`);
});
