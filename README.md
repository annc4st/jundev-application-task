# Task Manager Backend 

## 1. Express + TypeScript + Prisma + SQLite

video 
https://github.com/user-attachments/assets/5e47524a-9a12-4b3b-b6af-2aadaa04360b


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


Project Structure
```
backend/
├── package.json               # npm metadata, scripts, "type": "module"
├── tsconfig.json              # TypeScript configuration
|── jest.config.js             # jest configuration
|── prisma.config.ts           # Prisma config module
├── .env                       # environment variables (not committed)
├── prisma/
│   └── schema.prisma          # Prisma schema
├── src/
│   ├── index.ts               # App entry — sets up Express, middleware, routes
│   ├── app.ts                 # Optional: express app creation (used by tests)
│   ├── lib/
│   │   └── prisma.ts          # Prisma client initialization (export const prisma = new PrismaClient())
│   ├── routes.ts      # Express Router for /api/tasks (use explicit .ts/.js extensions in imports)
│   ├── controller.ts # Request handlers (getAllTasks, createTask)
│   └── middlewares/
│       └── errorHandler.ts    # Central error handler (next(err) -> formatted response)
├── tests/                     # Optional: Jest or vitest test files
│   └── controller.test.ts
|   |-- integration.test.ts
|   |-- helper.ts             # wipes test data between runs
|   ├──mocks/


└── dev.db                     # SQLite database (usually ignored and generated locally)
```

## 2. .NET Minimal API
A mini backend project for managing tasks, built with:

- .NET 10 Minimal API
- Entity Framework Core with In-Memory database (can be swapped with SQLite or SQL Server)
- OpenAPI/SWwagger for Interactive API

### 1. Install .NET sdk

### 2. Restore Dependencies

```
cd webapi+react/MiniBackend.Api
dotnet restore
```
### 2. Run the api

```
dotnet run
```

### 3. API endpointts

| Method | Endpoint      | Description       | Body (JSON)                                                                                        |            |                                      |
| ------ | ------------- | ----------------- | -------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------ |
| GET    | `/tasks`      | Get all tasks     | -                                                                                                  |            |                                      |
| GET    | `/tasks/{id}` | Get task by ID    | -                                                                                                  |            |                                      |
| POST   | `/tasks`      | Create a new task | `{ "title": "Task name", "description": "Optional", "status": "New", "dueDate": "ISO 8601 date" }` |            |                                      |
| PUT    | `/tasks/{id}` | Update a task     | `{ "title": "...", "description": "...", "status": "New                                            | InProgress | Done", "dueDate": "ISO 8601 date" }` |
| DELETE | `/tasks/{id}` | Delete a task     | -                                                                                                  |            |                                      |


## FRONTEND
Both backend APIs are connected to the React app

