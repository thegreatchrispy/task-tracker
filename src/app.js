// src/app.js

const express = require("express");
const app = express();
const port = 3000;

const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());
app.use("/tasks", taskRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});