"use server";

import { db } from "@/lib/database/prisma";
import { Report, ReportContentType, ReportResponse } from "./types";
import { bigintToInt } from "@/utils/utils";
import UserReportsTable from "./UserReportsTable";

interface ReportProps {
    uuid: string;
    page: number;
}

export async function fetchData({
    uuid,
    page,
}: ReportProps): Promise<ReportResponse | null> {
    try {
        const user = await db.users.findUnique({
            where: {
                uuid: uuid,
            },
        });

        if (!user) {
            return null;
        }

        const reports = await db.user_reports.findMany({
            where: {
                content_id: user.id,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        if (!reports) {
            return null;
        }

        const items = await db.user_reports.count({
            where: {
                content_id: user.id,
            },
        });

        const pages = Math.ceil(items / 10);

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

export default async function UserReports({ uuid, page = 1 }: ReportProps) {
    const reports = await fetchData({ uuid, page });

    return (
        <UserReportsTable
            reports={reports?.reports || []}
            pages={reports?.pages || 1}
            page={page}
            uuid={uuid}
        />
    );
}
