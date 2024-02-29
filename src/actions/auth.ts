"use server";

import { signIn, signOut } from "@/lib/auth/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

export async function login(
    email: string,
    password: string
): Promise<{ success: boolean }> {
    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        return { success: true };
    } catch (error) {
        console.error("Error logging in", error);

        if (isRedirectError(error)) {
            return { success: true };
        }

        return { success: false };
    }
}

export async function logout() {
    await signOut({
        redirect: false
    });
}
