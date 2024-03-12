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
