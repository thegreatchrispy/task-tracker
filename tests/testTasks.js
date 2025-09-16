// tests/testTasks.js

const axios = require("axios");
const port = 3000;
const testValue = 99999;

const BASE_URL = `http://localhost:${port}/tasks`;

// Set up dates for test Tasks
const today = new Date();                   // Date object
const tomorrow = new Date(today);           // create copy of today
tomorrow.setDate(tomorrow.getDate() + 1);   // increment day by 1
const tomorrowDate = tomorrow.toISOString().split("T")[0]; // convert "YYYY-MM-DD"

// Set up test numbers
const testTotal = 13;
let testPass = 0;
let testFail = 0;

async function testTasksAPI() {
    try { // Try all tests | Numbering = Phase.Test.Case
        console.log("=============== TASKS API TESTS ===============");

        // 1.1 Positive POST - create a valid task
        console.log("1.1 Positive POST: Creating a new task...");
        let response = await axios.post(BASE_URL, {
            title: "Positive Test Task 1",
            dueDate: tomorrowDate,
            completed: false
        });

        const task = response.data;
        console.log("Created task: ", task, "\n");
        testPass++;

        // 1.2 Negative POST - create an invalid task
        try {
            // 1.2.1 missing title
            console.log("1.2.1 Negative POST: Creating a task with missing title...");
            await axios.post(BASE_URL, {
                dueDate: tomorrowDate,
                completed: false
            });
            testPass++;
        } catch (err) {
            if (err.response && err.response.status === 400) {
                console.log("Correctly failed with 400\n");
            } else {
                testFail++;
                throw err;
            }
        }
        try {
            // 1.2.2 missing dueDate
            console.log("1.2.2 Negative POST: Creating a task with missing dueDate...");
            await axios.post(BASE_URL, {
                title: "Negative Test Task 1",
                completed: false
            });
            testPass++;
        } catch (err) {
            if (err.response && err.response.status === 400) {
                console.log("Correctly failed with 400\n");
            } else {
                testFail++;
                throw err;
            }
        }
        try {
            // 1.2.3 missing title/dueDate
            console.log("1.2.3 Negative POST: Creating a task with missing title/dueDate...");
            await axios.post(BASE_URL, {
                completed: false
            });
            testPass++;
        } catch (err) {
            if (err.response && err.response.status === 400) {
                console.log("Correctly failed with 400\n");
            } else {
                testFail++;
                throw err;
            }
        }

        // 1.3 Positive GET - get all tasks
        console.log("1.3 Positive GET: Getting all tasks...");
        response = await axios.get(BASE_URL);
        console.log("All tasks: ", response.data, "\n");
        testPass++;

        // 1.4 Negative GET - get task(s) with invalid ID
        try {
            // 1.4.1 non-existent ID
            console.log("1.4.1 Negative GET: Getting non-existent task...");
            await axios.get(`${BASE_URL}/${testValue}`);
            testPass++;
        } catch (err) {
            if (err.response && err.response.status === 404) {
                console.log("Correctly returned 404\n");
            } else {
                testFail++;
                throw err;
            }
        }

        // 1.5 Positive GET - get single valid task
        console.log("1.5 Positive GET: Getting a single task...");
        response = await axios.get(`${BASE_URL}/${task.id}`);
        console.log("Single task: ", response.data, "\n");
        testPass++;

        // 1.6 Positive PUT - update valid task
        console.log("1.6 Positive PUT: Updating task...");
        response = await axios.put(`${BASE_URL}/${task.id}`, { completed: true });
        console.log("Updated task: ", response.data, "\n");
        testPass++;

        // 1.7 Negative PUT - update invalid task
        try {
            // 1.7.1 non-existent ID
            console.log("1.7.1 Negative PUT: Updating task with invalid ID...");
            response = await axios.put(`${BASE_URL}/${testValue}`, { completed: true });
            console.log("Updated task: ", response.data, "\n");
            testPass++;
        } catch (err) {
            if (err.response && err.response.status === 404) {
                console.log("Correctly returned 404\n");
            } else {
                testFail++;
                throw err;
            }
        }
        try {
            // 1.7.2 no body
            console.log("1.7.2 Negative PUT: Updating task with no body...");
            response = await axios.put(`${BASE_URL}/${task.id}`);
            console.log("Updated task: ", response.data, "\n");
            testPass++;
        } catch (err) {
            if (err.response && err.response.status === 404) {
                console.log("Correctly returned 404\n");
            } else {
                testFail++;
                throw err;
            }
        }

        // 1.8 Positive DELETE - delete valid task
        console.log("1.8 Positive DELETE: Deleting task...");
        await axios.delete(`${BASE_URL}/${task.id}`);
        console.log(`Deleted task ${testValue}\n`);
        testPass++;

        // 1.9 Negative DELETE - delete invalid task
        try {
            // 1.9.1 non-existent ID
            console.log("1.9.1 Negative DELETE: Deleting task with invalid ID...");
            response = await axios.delete(`${BASE_URL}/${testValue}`);
            console.log(`Attempted deleting task ${testValue}\n`);
            testPass++;
        } catch (err) {
            if (err.response && err.response.status === 404) {
                console.log("Correctly returned 404\n");
            } else {
                testFail++;
                throw err;
            }
        }

        // 1.10 Confirm Deletion - confirm deleted task
        try {
            // 1.10.1 confirm deletion
            console.log("1.10.1 Positive DELETE: Deleted task!");
            await axios.get(`${BASE_URL}/${task.id}`);
            testPass++;
        } catch (err) {
            if (err.response && err.response.status === 404) {
                console.log("Confirmed task is deleted\n");
            } else {
                testFail++;
                throw err;
            }
        } 
    } catch (err) { // Catch ANY errors in tests
        testFail++;
        console.error("Error during API test: ", err.message);
    }

    console.log("Tests Passed/Tests Total: ", testPass, "/", testTotal);
    console.log("Tests Failed/Tests Total: ", testFail, "/", testTotal);
}

testTasksAPI();