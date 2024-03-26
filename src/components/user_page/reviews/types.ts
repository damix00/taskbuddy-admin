import { User } from "@/components/users/types";

export enum ReviewType {
    EMPLOYER = 0,
    EMPLOYEE = 1,
}

export enum ReviewFilter {
    EMPLOYER = 0,
    EMPLOYEE = 1,
    ALL = 2,
}

export interface Review {
    id: number;
    uuid: string;
    type: ReviewType;
    user_id: number;
    rating_for_id: number;
    post_id: number;
    post_title: string;
    rating: number;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    reviewed_by_user: User;
}
