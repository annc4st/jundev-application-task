import request from "supertest";
import {app} from "../src/app.ts"; 


describe("GET /tasks", () => {
//      beforeAll(async () => {
//     // Clean DB before tests
//     await prisma.task.deleteMany();
//   });

  afterAll(async () => {
    // await prisma.$disconnect();
  });
   it("GET /api/tasks should return 200 and empty array initially", async () => {
    const res = await request(app).get("/api/tasks");
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

