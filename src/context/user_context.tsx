"use client";

import { User, UserRow } from "@/components/users/types";
import { createContext, useContext, useEffect, useState } from "react";

export type UserContextType = {
    user?: UserRow | null;
    setData: (data: UserRow) => any;
    limitedAccess: {
        isEnabled: (access: string) => boolean;
        setEnabled: (access: string, enabled: boolean) => any;
    };
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
                limitedAccess: {
                    isEnabled: (access) =>
                        userData?.user.limited_access.includes(access) || false,
                    setEnabled: (access, enabled) => {
                        if (userData) {
                            if (enabled) {
                                setUserData({
                                    ...userData,
                                    user: {
                                        ...userData.user,
                                        limited_access: [
                                            ...userData.user.limited_access,
                                            access,
                                        ],
                                    },
                                });
                            } else {
                                setUserData({
                                    ...userData,
                                    user: {
                                        ...userData.user,
                                        limited_access:
                                            userData.user.limited_access.filter(
                                                (a) => a !== access
                                            ),
                                    },
                                });
                            }
                        }
                    },
                },
            }}>
            {children}
        </UserContext.Provider>
    );
}
