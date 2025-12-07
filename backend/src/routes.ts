import { Router } from "express";
import { getAllTasks, createTask } from "./controller";

const router = Router();

router.get('/', getAllTasks);
 

router.post('/', createTask);

export default router;  