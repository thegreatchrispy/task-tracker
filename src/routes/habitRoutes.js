// src/routes/taskRoutes.js

const express = require("express");
const router = express.Router();
const HabitController = require("../controllers/habitController");

router.get("/", HabitController.getHabits);
router.get("/:id", HabitController.getHabitById);
router.post("/", HabitController.createHabit);
router.put("/:id", HabitController.updateHabit);
router.delete("/:id", HabitController.deleteHabit);

module.exports = router;