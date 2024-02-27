import { PrismaClient } from "@prisma/client";

declare global {
    var db: PrismaClient | undefined;
}

export const db = global.db || new PrismaClient();

if (process.env.NODE_ENV === "development") {
    global.db = db;
}
