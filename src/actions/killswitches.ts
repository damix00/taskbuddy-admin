"use server";

import { auth } from "@/lib/auth/auth";

export async function updateKillswitch({
    key,
    enabled,
    description,
}: {
    key: string;
    enabled: boolean;
    description: string;
}): Promise<any> {
    const session = await auth();

    console.log(session);

    // const response = await fetch(`/api/admin/killswitches/${key}/update`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     cache: "no-cache",
    //     body: JSON.stringify({ enabled, description }),
    // });

    // return response.json();

    return true;
}
