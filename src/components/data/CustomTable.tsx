import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    Table as TableType,
    flexRender,
} from "@tanstack/react-table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import useMaxWidth from "@/hooks/use_max_width";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";

export function PaginateTable({
    pages,
    page,
    prevHref,
    nextHref,
    lastHref,
    firstHref,
    currentHref,
}: {
    pages: number;
    page: number;
    prevHref: string;
    nextHref: string;
    currentHref: string;
    lastHref: string;
    firstHref: string;
}) {
    return (
        <Pagination className="p-2 flex justify-end">
            <PaginationContent>
                {page != 1 && (
                    <PaginationItem>
                        <PaginationPrevious href={prevHref} />
                    </PaginationItem>
                )}
                {page != 1 && (
                    <PaginationItem>
                        <PaginationLink href={firstHref}>1</PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationLink isActive href={currentHref}>
                        {page}
                    </PaginationLink>
                </PaginationItem>
                {page != pages && (
                    <PaginationItem>
                        <PaginationLink href={lastHref}>{pages}</PaginationLink>
                    </PaginationItem>
                )}
                {page != pages && (
                    <PaginationItem>
                        <PaginationNext href={nextHref} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}

export function CustomTable({
    table,
    columns,
}: {
    table: TableType<any>;
    columns: ColumnDef<any>[];
}) {
    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => {
                        return (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        );
                    })
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default function TableCard({
    title,
    description,
    loading = false,
    table,
    columns,
}: {
    title: string;
    description: string;
    loading?: boolean;
    table?: TableType<any>;
    columns?: ColumnDef<any>[];
}) {
    const maxWidth = useMaxWidth({
        subMaxWidth: 300,
        subMaxWidthMobile: 100,
    });

    return (
        <Card
            className="w-fit"
            style={{
                maxWidth,
            }}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <Skeleton className="w-full h-20" />
                ) : (
                    <CustomTable table={table!} columns={columns!} />
                )}
            </CardContent>
        </Card>
    );
}
