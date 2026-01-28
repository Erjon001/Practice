// index.js
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const app = express();

// Choose a port (e.g. 3000)
const PORT = 3000;

//cors middleware

app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  }),
);

//Middleware to parse JSON bodies
app.use(express.json());

app.use("/", routes);

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
