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

export async function deleteLogin({
    loginId,
}: {
    loginId: number;
}): Promise<boolean> {
    try {
        await db.logins.delete({
            where: {
                id: loginId,
            },
        });

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function logoutOfAllDevices({
    userId,
}: {
    userId: number;
}): Promise<boolean> {
    try {
        const res = await db.users.update({
            where: { id: userId },
            data: {
                logins: {
                    deleteMany: {},
                },
                token_version: {
                    increment: 1,
                },
            },
            select: {
                id: true,
            },
        });

        if (!res || !res.id) {
            return false;
        }

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}
