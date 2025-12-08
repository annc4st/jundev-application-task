import { Request, Response, NextFunction } from "express";
import { prisma } from "./lib/prisma.ts";

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
     console.error("🔥 CONTROLLER ERROR:", error);
    next(error);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, dueDate } = req.body;

    // title validation
    const titleRegex = /^[A-Za-z0-9 ]{6,}$/; // at least 6 letters/digits/space

    if (!title || typeof title !== "string" || !titleRegex.test(title)) {
      return res.status(400).json({
        message:
          "title is required and must be a string and at least 6 characters long",
      });
    }
    // validation - description should not be longer than 100 chars
    if (description && typeof description !== "string") {
      return res.status(400).json({ message: "description must be a string" });
    }

    if (description && description.length > 100) {
      return res
        .status(400)
        .json({ message: "description cannot exceed 100 characters" });
    }

    //  duedate validation
    let parsedDate: Date | null = null;

    if (dueDate) {
      const d = new Date(dueDate);

      if (isNaN(d.getTime())) {
        return res
          .status(400)
          .json({ error: "Invalid dueDate format. Use ISO 8601 string." });
      }

      parsedDate = d;
    }
    // prevent past dueDate
    if (parsedDate && parsedDate < new Date()) {
      return res
        .status(400)
        .json({ message: "Due date cannot be in the past" });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: parsedDate,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};
