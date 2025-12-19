import { jest, describe, it, beforeEach, expect } from '@jest/globals';
// import {prisma} from "../src/lib/prisma.ts";
import {prismaMock, resetPrismaMock} from "./mocks/singleton.ts";

jest.mock("../src/lib/prisma.ts", () => ({
    prisma: prismaMock,
}));

import { Request, Response, NextFunction } from "express";
import { Status } from "@prisma/client";
import { getAllTasks, createTask } from "../src/controller.ts";


describe("Controller Tests", () => {


 let req: Partial<Request>;
  let res: jest.Mocked<Response>;
  let next: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    resetPrismaMock();
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as jest.Mocked<Response>;

    next = jest.fn() as unknown as jest.MockedFunction<NextFunction>;
  });

  it("getAllTasks should return list of tasks", async () => {

    const fakeTasks = [
        { id: 1, title: "Test Task 1", description: "desc", status: Status.NEW, dueDate: new Date('2025-12-30T22:00:35.950Z'), createdAt: new Date('2025-12-19T22:00:35.982Z') },
        { id: 2, title: "Test Task 2", description: "desc", status: Status.NEW, dueDate: new Date('2025-12-30T22:00:35.950Z'), createdAt: new Date('2025-12-18T22:00:35.982Z') },
      ];

      prismaMock.task.findMany.mockResolvedValue(fakeTasks);

      await getAllTasks(req as Request, res as Response, next);

      console.log("RES :", res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeTasks);

  });

    it("createTask should create a new task with valid data", async () => {
// { id: 1, title: "Test Task 1", description: "desc", status: Status.NEW, dueDate: new Date('2025-12-30T22:00:35.950Z'), createdAt: new Date('2025-12-19T22:00:35.982Z') },
        req.body = {title: "Test Task 1", description: "desc",dueDate:  '2025-12-30T22:00:35.950Z'};

    const newTask ={
        id: 1,
        title: "Test Task 1",
        description: "desc",
        status: Status.NEW,
        dueDate: new Date('2025-12-30T22:00:35.950Z'),
        createdAt: new Date('2025-12-19T22:00:35.982Z'),
      }

      prismaMock.task.create.mockResolvedValue(newTask);

      await createTask(req as Request, res as Response, next);
       console.log("1 :",res.json)

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newTask);
    });


})