import * as dotenv from "dotenv";

dotenv.config({ path: ".env.test" });
// Ensure tests run with NODE_ENV=test
process.env.NODE_ENV = "test";


// Clean DB before each test
import { prisma } from "../src/lib/prisma";

export default async () => {
  await prisma.task.deleteMany();
};
