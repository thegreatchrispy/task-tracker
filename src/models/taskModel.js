// src/models/taskModel.js

/*
 * Task Object structure:
 * 
 * task = {
 *          id: number,           // unique identifier for the task
 *          title: string,        // short description of the task
 *          dueDate: string,      // date in "YYYY-MM-DD" format for when the task is due
 *          completed: boolean,   // true if task is done, false otherwise
 *          notes?: string,       // optional, extra information about the task
 *          createdAt?: string,   // optional, date task was created (YYYY-MM-DD)
 *          lastUpdated?: string  // optional, last modification date (YYYY-MM-DD)
 *         }
 */

// TODO: Remove hardcoded sample tasks. Replace with data loaded from persistence (JSON/DB).
let tasks = [
    {id: 1, title: "Buy groceries", dueDate: "2025-09-20", completed: false},
    {id: 2, title: "Pay Rent", dueDate: "2025-10-01", completed: false},
    {id: 3, title: "Exercise", dueDate: "2025-09-16", completed: false},
    {id: 20, title: "Fill gas tank", dueDate: "2025-09-16", completed: true}
];

// TODO: Replace this helper with auto-incrementing IDs when persistence (JSON/DB) is implemented.
//       Remove this function entirely once IDs are handled by the storage layer.
function getNextId(list) {
    if (list.lenth === 0) return 1;
    return Math.max(...list.map(item => item.id)) + 1;
}

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
        id: getNextId(tasks),
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