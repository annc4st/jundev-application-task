import request from "supertest";
import { app } from "../src/app.ts";
import { resetDb } from "./helpers.ts";
import prisma from "../client.ts";
import { create } from "domain";

describe("GET /tasks", () => {
    beforeEach(async () => {
        await resetDb();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("GET /api/tasks should return code 200 and empty array initially", async () => {
        const res = await request(app).get("/api/tasks");
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });
    // POST
    it("POST /api/tasks should return code 201", async () => {
        const newTask = {
            title: "Test Task1",
            description: "This is a test task",
            dueDate: new Date(Date.now() + 86400000),
        };

        const res = await request(app).post("/api/tasks").send(newTask);
        expect(res.status).toBe(201);
                console.log(res);
        expect(res.body).toMatchObject({
            id: expect.any(Number),
            title: newTask.title,
            description: newTask.description,
            status: "NEW",
            dueDate: newTask.dueDate.toISOString(),
            createdAt: expect.any(String),
        });
    });
    it("POST /api/tasks with invalid title should return code 400 and message", async () => {
        const newTask = {
            title: "",
            description: "This is a test task with invalid title",
            dueDate: new Date(Date.now() + 86400000),
        };

        const res = await request(app).post("/api/tasks").send(newTask);
        expect(res.body.message).toMatch(/title is required/i);
        expect(res.status).toBe(400);
    });

    it("POST /api/tasks should reject title shorter than 6 chars", async () => {
        const newTask = {
            title: "abscd",
            description: "This is a test task with invalid title",
            dueDate: new Date(Date.now() + 86400000),
        };

        const res = await request(app).post("/api/tasks").send(newTask);
        expect(res.body.message).toMatch(/at least 6 characters long/i);
        expect(res.status).toBe(400);
    });

    it("POST /api/tasks should reject with description longer than 100 chars", async () => {
        const longDesc = "a".repeat(101);
        const newTask = {
            title: "title 1",
            description: longDesc,
            dueDate: new Date(Date.now() + 86400000),
        };

        const res = await request(app).post("/api/tasks").send(newTask);
        expect(res.body.message).toMatch(/cannot exceed 100 characters/i);
        expect(res.status).toBe(400);
    });

    it("POST /api/tasks should reject past dueDate", async () => {
        const pastDate = new Date(Date.now() - 5 * 1000).toISOString();
        const newTask = {
            title: "title 1",
            description: "Description",
            dueDate: pastDate,
        };

        const res = await request(app).post("/api/tasks").send(newTask);
        expect(res.body.message).toMatch(/due date cannot be in the past/i);
        expect(res.status).toBe(400);
    });

    it("POST /api/tasks should allow future dueDate", async () => {
        const futureDate = new Date(Date.now() + 5 * 1000).toISOString();
        const newTask = {
            title: "title 1",
            description: "Description",
            dueDate: futureDate,
        };

        const res = await request(app).post("/api/tasks").send(newTask);
        expect(res.status).toBe(201);
    });

    it("should return 404 for invalid URL", async () => {
        const res = await request(app).get("/api/nonexistent");
        expect(res.status).toBe(404);
    });
});
