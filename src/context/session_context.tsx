"use client";

import { UserSession } from "@/components/user_page/sessions/types";
import { createContext, useState } from "react";

export type SessionContextType = {
    session?: UserSession | null;
    setData: (data: UserSession) => any;
};

export const SessionContext = createContext<SessionContextType | null>(null);

export function SessionContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sessionData, setSessionData] = useState<UserSession | null>(null);

    return (
        <SessionContext.Provider
            value={{
                session: sessionData,
                setData: setSessionData,
            }}>
            {children}
        </SessionContext.Provider>
    );
}
