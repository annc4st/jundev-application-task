import dotenv from "dotenv";
dotenv.config();
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../prisma/generated/prisma/client.js";


const isTest = process.env.NODE_ENV === "test";

const connectionString = isTest
  ? process.env.DATABASE_URL
  : process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL or TEST_DATABASE_URL");
}

const adapter = new PrismaBetterSqlite3({ url: connectionString });

export const prisma = new PrismaClient({ adapter });

