// src/routes/taskRoutes.js

const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/taskController");

router.get("/", TaskController.getTasks);
router.get("/:id", TaskController.getTaskById);
router.post("/", TaskController.createTask);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

module.exports = router;