import { API_URL } from "@/config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const result = await fetch(`${API_URL}/v1/accounts/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                if (result.status === 200) {
                    const json = await result.json();

                    const user: {
                        uuid: string;
                        email: string;
                        username: string;
                        first_name: string;
                        last_name: string;
                        role: string;
                    } = json.user;

                    const profile: {
                        profile_picture: string;
                        bio: string;
                    } = json.profile;

                    if (!user || !profile) {
                        return null;
                    }

                    return {
                        user,
                        profile,
                        jwt: json.token,
                    };
                }

                return null;
            },
        }),
    ],
});
