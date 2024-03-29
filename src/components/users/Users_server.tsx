"use server";

import { db } from "@/lib/database/prisma";
import { UserRow, getUserResponse } from "./types";
import UserTable from "./UserTable";

async function getData({
    sortBy,
    sortOrder,
    page,
    lastId,
    query,
    itemsPerPage = 10,
}: {
    sortBy: string;
    sortOrder: string;
    page: number;
    lastId: number;
    query: string;
    itemsPerPage?: number;
}): Promise<{
    users: UserRow[];
    pages: number;
} | null> {
    try {
        const data = await db.users.findMany({
            orderBy: {
                [sortBy]: sortOrder,
            },
            take: itemsPerPage,
            skip: (page - 1) * itemsPerPage,
            where:
                lastId > 0
                    ? {
                          id: {
                              lt: lastId,
                          },
                          username: {
                              contains: query,
                              mode: "insensitive",
                          },
                      }
                    : {
                          username: {
                              contains: query,
                              mode: "insensitive",
                          },
                      },
            include: {
                profiles: true,
            },
        });

        const count = await db.users.count({
            where: {
                username: {
                    contains: query,
                    mode: "insensitive",
                },
            },
        });

        return {
            users: data.map((user) => {
                const profile = user.profiles[0];

                return getUserResponse(user, profile);
            }),
            pages: Math.ceil(count / itemsPerPage),
        };
    } catch (err) {
        console.error(err);
        return null;
    }
}

interface UserDataProps {
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    lastId?: number;
    query?: string;
}

export default async function UserData({
    sortBy = "created_at",
    sortOrder = "desc",
    page = 1,
    lastId = 0,
    query = "",
}: UserDataProps): Promise<any> {
    const data = await getData({ sortBy, sortOrder, page, lastId, query });

    return (
        <UserTable
            search={query}
            page={page}
            users={data?.users}
            pages={data?.pages}
        />
    );
}
