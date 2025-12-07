# Task Manager Backend (Express + TypeScript + Prisma + SQLite)

A mini backend project for managing tasks, built with:

- Node.js + TypeScript  
- Express.js  
- Prisma ORM with SQLite  
- dotenv for environment variables  

### **1. Install Dependencies**

Make sure you have Node.js >= 18 installed.

```bash
# Install npm dependencies
npm install
```

### **2. Configure Environmental variables**

```
DATABASE_URL="file:./dev.db"
PORT=9000 
```


### **3. Set up Prisma**

follow official documentation: https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite

### **4. Start Backend server**
```
npm run dev
```
### **5. API Endpoints**

| Method | Endpoint | Description       | Body (JSON)                                                                       |
| ------ | -------- | ----------------- | --------------------------------------------------------------------------------- |
| GET    | `/api/tasks` | Get all tasks     | -                                                                                 |
| POST   | `/api/tasks` | Create a new task | `{ "title": "Task name", "description": "Optional", "dueDate": "ISO 8601 date" }` |


### **Example POST body:**
{
  "title": "Finish project",
  "description": "Complete the backend",
  "dueDate": "2025-01-08T20:15:00.000Z"
}
