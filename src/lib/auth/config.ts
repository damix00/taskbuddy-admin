import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "@/lib/bcrypt";
import { db } from "@/lib/database/prisma";
import { API_URL } from "@/config";

export default {
    trustHost: true,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const result = await fetch(`${API_URL}/v1/accounts/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(credentials),
                    });

                    if (result.ok) {
                        const data = await result.json();

                        if (data.user.role != "admin") {
                            return null;
                        }

                        return {
                            id: data.user.uuid,
                            name: data.token,
                            email: data.user.email,
                        };
                    }

                    return null;
                } catch (error) {
                    console.error(error);

                    return null;
                }
            },
        }),
    ],
} satisfies NextAuthConfig;
