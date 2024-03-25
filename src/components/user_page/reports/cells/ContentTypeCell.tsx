import { CellContext } from "@tanstack/react-table";
import { Report, ReportContentType } from "../types";

export default function ContentTypeCell({ row }: CellContext<Report, any>) {
    const type = row.original.content_type;

    if (type == ReportContentType.ACCOUNT) {
        return <>Account</>;
    }

    if (type == ReportContentType.POST) {
        return <>Post</>;
    }

    if (type == ReportContentType.REVIEW) {
        return <>Review</>;
    }

    return <>Unknown</>;
}
