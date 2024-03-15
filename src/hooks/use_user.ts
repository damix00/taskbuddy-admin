import { useSession } from "next-auth/react";

export interface UserCookie {
    user?: {
        user_id: number;
        uuid: string;
        email: string;
        username: string;
        phone_number: string;
        last_login: string;
        first_name: string;
        last_name: string;
        role: string;
        created_at: Date;
    };
    profile?: {
        profile_picture: string;
        bio: string;
    };
    jwt?: string;
}

export default function useUser(): UserCookie {
    const session = useSession();

    return {
        // @ts-ignore
        user: session.data?.user,
        // @ts-ignore
        profile: session.data?.profile,
        // @ts-ignore
        jwt: session.data?.jwt,
    };
}
