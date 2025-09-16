// src/controllers/taskController.js

const TaskModel = require("../models/taskModel");

function getTasks(req, res) {
    res.json(TaskModel.getAllTasks());
}

function getTaskById(req, res) {
    const id = parseInt(req.params.id, 10);
    const task = TaskModel.getTaskById(id);

    if (!task) {
        return res.status(404).json({error: "Task not found"});
    }

    res.json(task);
}

function createTask(req, res) {
    const { title, dueDate } = req.body;

    if (!title || !dueDate) {
        return res.status(400).json({error: "Title and dueDate are required"});
    }

    const newTask = TaskModel.createTask(title, dueDate);
    res.status(201).json(newTask);
}

function updateTask(req, res) {
    const id = parseInt(req.params.id, 10);
    const updates = req.body;
    const updatedTask = TaskModel.updateTask(id, updates);
    
    if (!updatedTask) {
        return res.status(404).json({error: "Task not found"});
    }

    res.json(updatedTask);
}

function deleteTask(req, res) {
    const id = parseInt(req.params.id, 10);
    const success = TaskModel.deleteTask(id);

    if (!success) {
        return res.status(404).json({error: "Task not found"});
    }

    res.json(204).send(); // 204 = No content
}

module.exports = {getTasks, getTaskById, createTask, updateTask, deleteTask};