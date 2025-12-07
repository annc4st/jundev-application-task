import { Request, Response, NextFunction } from "express";
import { prisma} from "./lib/prisma.ts";


export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, dueDate } = req.body;

     const titleRegex = /^[A-Za-z0-9 ]{6,}$/; // at least 6 letters/digits/space

if (!title || typeof title !== "string" || !titleRegex.test(title)) {
      return res.status(400).json({ message: "title is required and must be a string and at least 6 characters long" });
    }

    let parsedDate: Date | null = null;

    if (dueDate) {
      const d = new Date(dueDate);

      if (isNaN(d.getTime())) {
        return res.status(400).json({ error: "Invalid dueDate format. Use ISO 8601 string." });
      }

      parsedDate = d;
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
