// src/models/taskModel.js

let tasks = [
    {id: 1, title: "Buy groceries", dueDate: "2025-09-20", completed: false},
    {id: 2, title: "Pay Rent", dueDate: "2025-10-01", completed: false},
    {id: 3, title: "Exercise", dueDate: "2025-09-16", completed: false},
    {id: 20, title: "Fill gas tank", dueDate: "2025-09-16", completed: true}
];

function getAllTasks() {
    return tasks;
}

function getTaskById(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return null;
    return task;
}

function createTask(title, dueDate) {
    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title,
        dueDate,
        completed: false
    };
    tasks.push(newTask);
    return newTask;
}

function updateTask(id, updates) {
    const task = tasks.find(t => t.id === id);
    if (!task) return null;

    // Update only properties that exist in updates
    Object.assign(task, updates);
    return task;
}

function deleteTask(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;

    tasks.splice(index, 1); // remove 1 element at the index
    return true;
}

module.exports = {getAllTasks, getTaskById, createTask, updateTask, deleteTask};