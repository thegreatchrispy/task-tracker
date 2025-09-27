### **Project: Personal Task & Habit Tracker API + Frontend**

#### Core Idea

Build a simple web app where users can:

* Create, read, update, and delete (CRUD) **tasks** and **habits**
* Track daily completion of habits
* See summaries (e.g., tasks done today, streaks for habits)

You’ll write:

1. A **backend** (Node.js + Express or Fastify) that exposes a REST or GraphQL API
2. A **frontend** (vanilla JS or small framework later) that consumes that API

---

### **Phase 1 – Backend in JavaScript**

* Use **Node.js with Express** to expose basic routes:

  * `POST /tasks` → create a task
  * `GET /tasks` → list tasks
  * `PUT /tasks/:id` → update task
  * `DELETE /tasks/:id` → delete task
* Store data in-memory (array of objects) at first.

This gets you used to **JavaScript, routing, and HTTP basics**.

---

### **Phase 2 – Convert to TypeScript**

* Add TypeScript for type safety:

  * Define interfaces for `Task` and `Habit`.
  * Add types for request/response objects.
* You’ll start appreciating how TypeScript prevents silly bugs.

---

### **Phase 3 – Persistence**

* Swap the in-memory array with a real database (SQLite or PostgreSQL).
* Use an ORM like Prisma or TypeORM.
* Practice writing migrations and queries.

This teaches **data modeling and persistence in Node**.

---

### **Phase 4 – Frontend**

* Make a simple frontend with plain JS/TS:

  * A form to add a task
  * A list of tasks pulled from your API
  * A button to mark a task complete
* Eventually you could move to React/Next.js if you want.

This connects your backend to the real world.

---

### **Phase 5 – Extras / Advanced**

* Add authentication (JWT or session cookies).
* Add habit streak tracking logic.
* Add CI/CD with GitHub Actions (run tests, lint, build).
* Containerize with Docker.
* Deploy to something free like Render, Railway, or Vercel.

---

👉 This project is great because:

* It starts simple but grows naturally into advanced territory.
* You’ll touch **JavaScript, TypeScript, Node.js, REST, databases, and deployment**.
* It’s useful for you personally (you can actually track your habits).

---

