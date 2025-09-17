// src/models/habitModel.js

/*
 * Habit Object structure:
 * 
 * habit = {
 *          id: number,                   // unique identifier
 *          title: string,                // short description of the habit
 *          frequencyType: string,        // "daily", "weekly", "monthly", "interval"
 *          frequencyDetail: string | number | null, 
 *                                          // depends on frequencyType:
 *                                          // weekly: 7-character string of 0/1 for days of week
 *                                          // monthly: number (day of month 1–31)
 *                                          // interval: number (every X days)
 *                                          // daily: null
 *          streak: number,               // number of consecutive completions
 *          completedDates: string[],     // array of dates in "YYYY-MM-DD" format
 *          active: boolean,              // whether the habit is currently tracked
 *          notes?: string,               // optional, extra information about the habit
 *          createdAt?: string,           // optional, date habit was created (YYYY-MM-DD)
 *          lastUpdated?: string          // optional, last modification date (YYYY-MM-DD)
 *         }
 */

let habits = [
    {id: 1, title: "Buy groceries", frequencyType: "weekly", frequencyDetail: "1000000", streak: 0, completedDates: [], active: true},
    {id: 2, title: "Pay Rent", frequencyType: "monthly", frequencyDetail: 1, streak: 5, completedDates: ["2025-01-01", "2025-02-01", "2025-03-01","2025-04-01", "2025-05-01"], active: true},
    {id: 3, title: "Exercise", frequencyType: "daily", frequencyDetail: null, streak: 2, completedDates: ["2025-09-15","2025-09-16"], active: false},
    {id: 20, title: "Learn Spanish", frequencyType: "interval", frequencyDetail: 3, streak: 0, completedDates: [], active: true},
];

/**
 * Validate frequencyType and frequencyDetail combination
 */
function validateFrequency(frequencyType, frequencyDetail) {
  switch (frequencyType) {
    case "daily":
      return frequencyDetail === null;

    case "weekly":
      return typeof frequencyDetail === "string" &&
             /^[01]{7}$/.test(frequencyDetail);

    case "monthly":
      return Number.isInteger(frequencyDetail) &&
             frequencyDetail >= 1 && frequencyDetail <= 31;

    case "interval":
      return Number.isInteger(frequencyDetail) &&
             frequencyDetail > 0;

    default:
      return false;
  }
}

function getAllHabits() {
    return habits;
}

function getHabitById(id) {
    const habit = habits.find(h => h.id === id);
    if (!habit) return null;
    return habit;
}

function createHabit(title, frequencyType, frequencyDetail) {
    // Validate frequencyType and frequencyDetail are compatible
    if (!validateFrequency(frequencyType, frequencyDetail)) {
        throw new Error("Invalid frequencyType/frequencyDetail combination");
    }

    const newHabit = {
        id: habits.length > 0 ? habits[habits.length - 1].id + 1 : 1,
        title,
        frequencyType,
        frequencyDetail,
        streak: 0,
        completedDates: [],
        active: true
    };
    habits.push(newHabit);
    return newHabit;
}

function updateHabit(id, updates) {
    const habit = habits.find(h => h.id === id);
    if (!habit) return null;

    if (updates.frequencyType || updates.frequencyDetail) {
        const newType = updates.frequencyType || habit.frequencyType;
        const newDetail = updates.frequencyDetail !== undefined ? updates.frequencyDetail : habit.frequencyDetail;
        if (!validateFrequency(newType, newDetail)) {
            throw new Error("Invalid frequencyType/frequencyDetail combination");
        }
    }

    // Update only properties that exist in updates
    Object.assign(habit, updates);
    return habit;
}

function deleteHabit(id) {
    const index = habits.findIndex(h => h.id === id);
    if (index === -1) return false;

    habits.splice(index, 1); // remove 1 element at the index
    return true;
}

function markHabitComplete(id, date = new Date()) {
    const habit = getHabitById(id);
    if (!habit) return null;

    const dateStr = date.toISOString().split("T")[0];
    if (!habit.completedDates.includes(dateStr)) {
        habit.completedDates.push(dateStr);
        habit.streak++;
    }

    return habit;
}


module.exports = {getAllHabits, getHabitById, createHabit, updateHabit, deleteHabit, markHabitComplete};