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
