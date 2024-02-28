import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV != "production") {
    globalThis.prisma = db;
}

export async function getUserByEmail(email: string) {
    return await db.users.findFirst({
        where: {
            email,
        },
        include: {
            profiles: true,
        },
    });
}
