"use server";

import { signIn, signOut } from "@/lib/auth";

export async function login(
    email: string,
    password: string
): Promise<{ success: boolean }> {
    try {
        await signIn("credentials", {
            email,
            password,
        });

        return { success: true };
    } catch (error) {
        return { success: false };
    }
}

export async function logout() {
    await signOut();
}
