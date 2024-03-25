"use client";

import { useContext, useEffect } from "react";
import { UserSession } from "../user_page/sessions/types";
import { SessionContext } from "@/context/session_context";

export default function SessionUpdater({ session }: { session: UserSession }) {
    const context = useContext(SessionContext);

    useEffect(() => {
        context?.setData(session);
    }, [session]);

    return <></>;
}
