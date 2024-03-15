import { API_URL } from "@/config";
import NextAuth from "next-auth";
import { db, getUserByEmail } from "@/lib/database/prisma";
import config from "./config";
import { signToken, verifyToken } from "@/utils/jwt";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },
    callbacks: {
        async session({ session, token, user }) {
            if (!token) {
                return session;
            }

            // @ts-ignore
            if (token.user.role != "admin") {
                return session;
            }

            // @ts-ignore
            session.user = token.user;
            // @ts-ignore
            session.profile = token.profile;
            // @ts-ignore
            session.jwt = token.jwt;

            return session;
        },

        async jwt({ token }) {
            if (!token.sub) return token;

            const dbUser = await getUserByEmail(token.email as string);

            if (!dbUser) {
                return null;
            }

            if (dbUser.role != "admin") {
                return null;
            }

            token.jwt = token.name;
            token.id = dbUser.uuid;

            const jwt = verifyToken(token.jwt as string);

            if (!jwt) {
                return null;
            }

            const newJwt = signToken({
                id: parseInt(dbUser.id.toString()),
                uuid: dbUser.uuid,
                email: dbUser.email,
                phone_number: dbUser.phone_number,
                username: dbUser.username,
                token_version: parseInt(
                    dbUser.token_version?.toString() || "0"
                ),
                created_at: dbUser.created_at,
                login_id: jwt.login_id,
            });

            token.jwt = newJwt;

            token.user = {
                user_id: parseInt(dbUser.id.toString()),
                uuid: dbUser.uuid,
                email: dbUser.email,
                username: dbUser.username,
                phone_number: dbUser.phone_number,
                last_login: dbUser.last_login,
                first_name: dbUser.first_name,
                last_name: dbUser.last_name,
                role: dbUser.role,
                created_at: dbUser.created_at,
            };

            const profile = dbUser.profiles[0];

            token.profile = {
                profile_picture: profile.profile_picture,
                bio: profile.bio,
            };

            return token;
        },
    },
    ...config,
});
