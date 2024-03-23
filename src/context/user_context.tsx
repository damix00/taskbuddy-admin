"use client";

import { User, UserRow } from "@/components/users/types";
import { createContext, useContext, useEffect, useState } from "react";

export type UserContextType = {
    user?: UserRow | null;
    setData: (data: UserRow) => any;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserContextCreator({ user }: { user: UserRow }) {
    const context = useContext(UserContext);

    useEffect(() => {
        if (context) {
            context.setData(user);
        }
    }, [user]);

    return <></>;
}

export function UserContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [userData, setUserData] = useState<UserRow | null>(null);

    return (
        <UserContext.Provider
            value={{
                user: userData,
                setData: setUserData,
            }}>
            {children}
        </UserContext.Provider>
    );
}
