// index.js
const express = require("express");
const routes = require("./routes");
const app = express();

// Choose a port (e.g. 3000)
const PORT = 3000;

app.use("/api", routes);

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
