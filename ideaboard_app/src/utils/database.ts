import {Pool} from "pg";
import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from "@/src/generated/prisma/client";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({adapter});

const pool = new Pool({
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME || "idea",
});

export {pool};