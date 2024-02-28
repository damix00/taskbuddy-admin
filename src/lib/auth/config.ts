import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "@/lib/bcrypt";
import { db } from "@/lib/database/prisma";

export default {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const user = await db.users.findFirst({
                    where: {
                        email: credentials.email as string,
                    },
                    include: {
                        profiles: true,
                    },
                });

                if (!user || user.role != "admin") {
                    return null;
                }

                // Bcrypt is used to hash the password in the database
                if (
                    await comparePassword(
                        credentials.password as string,
                        user.password_hash
                    )
                ) {
                    return {
                        id: user.uuid,
                        email: user.email,
                    };
                }

                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
