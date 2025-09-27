// src/controllers/habitController.js

const HabitModel = require("../models/habitModel");

// GET /habits - return all habits
function getHabits(req, res) {
    res.json(HabitModel.getAllHabits());
}

// GET /habits/:id - return a single habit
function getHabitById(req, res) {
    const id = parseInt(req.params.id, 10);
    const habit = HabitModel.getHabitById(id);

    if (!habit) {
        return res.status(404).json({error: "Habit not found"});
    }

    res.json(habit);
}

// POST /habits - create a new habit
function createHabit(req, res) {
    const { title, frequencyType, frequencyDetail } = req.body;

    // basic validation
    if (!title || !frequencyType) {
        return res.status(400).json({error: "Title and frequencyType are required"});
    }

    try {
        const newHabit = HabitModel.addHabit(title, frequencyType, frequencyDetail);
        res.status(201).json(newHabit);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

// PUT /habits/:id - update an existing habit
function updateHabit(req, res) {
    const id = parseInt(req.params.id, 10);
    const updates = req.body;
    const updatedHabit = HabitModel.updateHabit(id, updates);
    
    if (!updatedHabit) {
        return res.status(404).json({error: "Habit not found"});
    }

    res.json(updatedHabit);
}

// DELETE /habits/:id - delete a habit
function deleteHabit(req, res) {
    const id = parseInt(req.params.id, 10);
    const success = HabitModel.deleteHabit(id);

    if (!success) {
        return res.status(404).json({error: "Habit not found"});
    }

    res.json(204).send(); // 204 = No content
}

module.exports = {getHabits, getHabitById, createHabit, updateHabit, deleteHabit};