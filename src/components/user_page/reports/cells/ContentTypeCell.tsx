import { CellContext } from "@tanstack/react-table";
import { Report, ReportContentType } from "../types";

export default function ContentTypeCell({ row }: CellContext<Report, any>) {
    const type = row.original.content_type;

    if (type == ReportContentType.ACCOUNT) {
        return <div>Account</div>;
    }

    if (type == ReportContentType.POST) {
        return <div>Post</div>;
    }

    if (type == ReportContentType.REVIEW) {
        return <div>Review</div>;
    }

    return <div>Unknown</div>;
}
