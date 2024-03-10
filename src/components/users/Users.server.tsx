"use server";

import { db } from "@/lib/database/prisma";
import { UserRow } from "./types";
import UserTable from "./UserTable";

async function getData({
    sortBy,
    sortOrder,
    page,
    lastId,
}: {
    sortBy: string;
    sortOrder: string;
    page: number;
    lastId: number;
}): Promise<{
    users: UserRow[];
    pages: number;
} | null> {
    const itemsPerPage = 20;

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
                      }
                    : {},
            include: {
                profiles: true,
            },
        });

        const count = await db.users.count();

        return {
            users: data.map((user) => {
                const profile = user.profiles[0];

                return {
                    user: {
                        id: parseInt(user.id.toString()),
                        uuid: user.uuid,
                        username: user.username,
                        email: user.email,
                        email_verified: user.email_verified,
                        phone_number: user.phone_number,
                        phone_number_verified: user.phone_number_verified,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        last_login: user.last_login,
                        role: user.role,
                        token_version: parseInt(
                            user.token_version?.toString() || "0"
                        ),
                        auth_provider: user.auth_provider,
                        has_premium: user.has_premium,
                        verified: user.verified,
                        limited_access: user.limited_access,
                        deleted: user.deleted,
                        created_at: user.created_at,
                        updated_at: user.updated_at,
                    },
                    profile: {
                        id: parseInt(profile.id.toString()),
                        user_id: parseInt(profile.user_id.toString()),
                        bio: profile.bio,
                        profile_picture: profile.profile_picture ?? "",
                        rating_employer: parseFloat(
                            profile.rating_employer.toString()
                        ),
                        rating_employee: parseFloat(
                            profile.rating_employee.toString()
                        ),
                        rating_count_employer: profile.rating_count_employer,
                        rating_count_employee: profile.rating_count_employee,
                        cancelled_employer: profile.cancelled_employer,
                        cancelled_employee: profile.cancelled_employee,
                        completed_employer: profile.completed_employer,
                        completed_employee: profile.completed_employee,
                        followers: parseInt(profile.followers.toString()),
                        following: parseInt(profile.following.toString()),
                        post_count: parseInt(profile.post_count.toString()),
                        location: {
                            location_text: profile.location_text,
                            lat: profile.location_lat
                                ? parseFloat(profile.location_lat!.toString())
                                : null,
                            lon: profile.location_lon
                                ? parseFloat(profile.location_lon!.toString())
                                : null,
                        },
                        is_private: profile.is_private,
                        deleted: profile.deleted,
                    },
                };
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
}

export default async function UserData({
    sortBy = "created_at",
    sortOrder = "desc",
    page = 1,
    lastId = 0,
}: UserDataProps): Promise<any> {
    const data = await getData({ sortBy, sortOrder, page, lastId });

    return <UserTable users={data?.users} pages={data?.pages} />;
}
