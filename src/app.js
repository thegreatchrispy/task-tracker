// src/app.js

const express = require("express");
const app = express();
const port = 3000;

const taskRoutes = require("./routes/taskRoutes");
const habitRoutes = require("./routes/habitRoutes");

app.use(express.json());
app.use("/tasks", taskRoutes);
app.use("/habits", habitRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});