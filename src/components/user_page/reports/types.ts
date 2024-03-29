import { getUserUuid } from "@/actions/management/user/users";
import { getPostUuid } from "@/actions/posts";
import { getReviewUuid } from "@/actions/reviews";
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

function _openLink(url: string) {
    setTimeout(() => {
        // This is a workaround for Safari
        window.open(url, "_blank");
    });
}

export async function openReportContent(type: ReportContentType, id: number) {
    if (type == ReportContentType.ACCOUNT) {
        const userUuid = await getUserUuid({ id });

        _openLink(`/dashboard/users/${userUuid}`);
    } else if (type == ReportContentType.POST) {
        const uuid = await getPostUuid(id);

        if (uuid) {
            _openLink(`/dashboard/posts/${uuid}`);
        }
    } else if (type == ReportContentType.REVIEW) {
        const reviewUuid = await getReviewUuid(id);

        if (reviewUuid) {
            _openLink(`/dashboard/reviews/${reviewUuid}`);
        }
    }
}
