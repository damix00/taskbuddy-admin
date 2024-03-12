export type User = {
    id: number;
    uuid: string;
    username: string;
    email: string;
    email_verified: boolean;
    phone_number: string;
    phone_number_verified: boolean;
    first_name: string;
    last_name: string;
    last_login: Date;
    role: string;
    token_version: number;
    auth_provider: string;
    has_premium: boolean;
    verified: boolean;
    limited_access: string[];
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
};

export type DisplayUser = {
    id: number;
    uuid: string;
    username: string;
    email: string;
    email_verified: boolean;
    phone_number: string;
    phone_number_verified: boolean;
    first_name: string;
    last_name: string;
    last_login: Date;
    role: string;
    token_version: number;
    auth_provider: string;
    has_premium: boolean;
    verified: boolean;
    limited_access: string[];
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
    created_at_display: string;
    updated_at_display: string;
    profile: Profile;
};

export type Profile = {
    id: number;
    user_id: number;
    bio: string;
    profile_picture: string;
    rating_employer: number;
    rating_employee: number;
    rating_count_employer: number;
    rating_count_employee: number;
    cancelled_employer: number;
    cancelled_employee: number;
    completed_employer: number;
    completed_employee: number;
    followers: number;
    following: number;
    post_count: number;
    location: {
        location_text?: string | null;
        lat?: number | null;
        lon?: number | null;
    };
    is_private: boolean;
    deleted: boolean;
};

export type UserRow = {
    user: User;
    profile: Profile;
};

export function getUserResponse(user: any, profile: any) {
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
            token_version: parseInt(user.token_version?.toString() || "0"),
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
            rating_employer: parseFloat(profile.rating_employer.toString()),
            rating_employee: parseFloat(profile.rating_employee.toString()),
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
}

export function getDefaultParams(
    params: URLSearchParams,
    {
        search,
        sort_order,
        sort_by,
        page,
        last_id,
    }: {
        search?: string;
        sort_order?: string;
        sort_by?: string;
        page?: string;
        last_id?: string;
    }
) {
    const sortOrder = sort_order || params.get("sort_order") || "desc";
    const sortBy = sort_by || params.get("sort_by") || "created_at";
    const pageNum = page || params.get("page") || "1";
    const lastId = last_id || params.get("last_id") || "0";

    return `sort_order=${sortOrder}&sort_by=${sortBy}&page=${pageNum}&last_id=${lastId}${
        search ? `&search=${search}` : ""
    }`;
}

export function getParamValues(params: URLSearchParams) {
    return {
        search: params.get("search") || "",
        sort_order: params.get("sort_order") || "desc",
        sort_by: params.get("sort_by") || "created_at",
        page: params.get("page") || "1",
        last_id: params.get("last_id") || "0",
    };
}
