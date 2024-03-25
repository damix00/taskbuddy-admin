import { User } from "@/components/users/types";

export enum ReportContentType {
    POST = 1,
    ACCOUNT = 2,
    REVIEW = 3,
}

export interface Report {
    id: number;
    user_id: number;
    content_type: ReportContentType;
    content_id: number;
    reason: string;
    reviewed: boolean;
    verdict: boolean;
    reviewed_by: number;
    created_at: Date;
    updated_at: Date;
    created_by_user: User;
    reviewed_by_user?: User | null;
}

export interface ReportResponse {
    reports: Report[];
    pages: number;
}
