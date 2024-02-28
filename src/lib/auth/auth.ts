import { API_URL } from "@/config";
import NextAuth from "next-auth";
import { db, getUserByEmail } from "@/lib/database/prisma";
import config from "./config";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: { strategy: "jwt" },
    callbacks: {
        async session({ session, token }) {
            // @ts-ignore
            session.user = token.user;
            // @ts-ignore
            session.profile = token.profile;
            return session;
        },

        async jwt({ token }) {
            if (!token.sub) return token;

            const user = await getUserByEmail(token.email as string);

            if (!user) {
                return null;
            }

            if (user.role != "admin") {
                return null;
            }

            token.id = user.uuid;
            token.user = {
                uuid: user.uuid,
                email: user.email,
                username: user.username,
                phone_number: user.phone_number,
                last_login: user.last_login,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                created_at: user.created_at,
            };

            const profile = user.profiles[0];

            token.profile = {
                profile_picture: profile.profile_picture,
                bio: profile.bio,
            };

            return token;
        },
    },
    ...config,
});
