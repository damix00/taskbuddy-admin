"use server";

import {
    ReportContentType,
    ReportResponse,
} from "@/components/user_page/reports/types";
import { UserCookie } from "@/hooks/use_user";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/database/prisma";
import { bigintToInt } from "@/utils/utils";

export interface ReportProps {
    userUuid?: string;
    postUuid?: string;
    reviewUuid?: string;
    reportId?: number;
    page: number;
    itemsPerPage?: number;
    contentType?: ReportContentType;
}

export async function getReports({
    contentType,
    userUuid,
    postUuid,
    reviewUuid,
    reportId,
    page,
    itemsPerPage = 10,
}: ReportProps): Promise<ReportResponse | null> {
    try {
        let contentId = null;

        if (contentType == ReportContentType.ACCOUNT) {
            const user = await db.users.findUnique({
                where: {
                    uuid: userUuid,
                },
            });

            if (!user) {
                return null;
            }

            contentId = user.id;
        } else if (contentType == ReportContentType.POST) {
            const post = await db.posts.findUnique({
                where: {
                    uuid: postUuid!,
                },
            });

            if (!post) {
                return null;
            }

            contentId = post.id;
        } else if (contentType == ReportContentType.REVIEW) {
            const review = await db.reviews.findUnique({
                where: {
                    uuid: reviewUuid!,
                },
            });

            if (!review) {
                return null;
            }

            contentId = review.id;
        }

        const reports = await db.user_reports.findMany({
            where: {
                content_id: contentId ?? undefined,
                content_type: contentType,
                id: reportId ? reportId : undefined,
            },
            orderBy: {
                created_at: "desc",
            },
            skip: (page - 1) * itemsPerPage,
            take: itemsPerPage,
        });

        if (!reports) {
            return null;
        }

        const items = await db.user_reports.count({
            where: {
                content_id: contentId ?? undefined,
                content_type: contentType ?? undefined,
                id: reportId ? reportId : undefined,
            },
        });

        const pages = Math.ceil(items / itemsPerPage);

        const res = [];

        for (const report of reports) {
            const createdBy = await db.users.findUnique({
                where: {
                    id: report.user_id,
                },
            });

            let reviewedBy = null;

            if (report.reviewed) {
                reviewedBy = await db.users.findUnique({
                    where: {
                        id: report.reviewed_by,
                    },
                });
            }

            res.push({
                ...report,
                id: bigintToInt(report.id),
                user_id: bigintToInt(report.user_id),
                content_id: bigintToInt(report.content_id),
                reviewed_by: bigintToInt(report.reviewed_by),
                reviewed_by_user: report.reviewed
                    ? {
                          ...reviewedBy,
                          id: bigintToInt(reviewedBy!.id),
                          token_version: bigintToInt(reviewedBy!.token_version),
                      }
                    : null,
                created_by_user: {
                    ...createdBy!,
                    id: bigintToInt(createdBy!.id),
                    token_version: bigintToInt(createdBy!.token_version),
                },
            });
        }

        return {
            // @ts-ignore
            reports: res,
            pages,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateReport({
    reportId,
    verdict,
}: {
    reportId: number;
    verdict: boolean;
}): Promise<boolean> {
    const user = await auth();

    if (!user) {
        return false;
    }

    const userData = user!.user as UserCookie["user"];

    try {
        await db.user_reports.update({
            where: {
                id: reportId,
            },
            data: {
                reviewed: true,
                verdict,
                reviewed_by: userData!.user_id,
                updated_at: new Date(),
            },
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
