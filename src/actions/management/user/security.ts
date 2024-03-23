"use server";

import { hashPassword } from "@/lib/bcrypt";
import { db } from "@/lib/database/prisma";

export async function updateVerifications({
    id,
    data,
}: {
    id: number;
    data: {
        email: boolean;
        phone: boolean;
    };
}): Promise<boolean> {
    try {
        await db.users.update({
            where: { id },
            data: {
                email_verified: data.email,
                phone_number_verified: data.phone,
            },
            select: {
                id: true,
            },
        });

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function updateLoginDetails({
    id,
    data,
}: {
    id: number;
    data: {
        email: string;
        phone: string;
    };
}): Promise<boolean> {
    try {
        await db.users.update({
            where: { id },
            data: {
                email: data.email,
                phone_number: data.phone,
            },
            select: {
                id: true,
            },
        });

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function updatePassword({
    id,
    password,
}: {
    id: number;
    password: string;
}): Promise<boolean> {
    try {
        const hashed = await hashPassword(password);

        await db.users.update({
            where: { id },
            data: {
                password_hash: hashed,
            },
            select: {
                id: true,
            },
        });

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}
