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
import { ComponentType, useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export function CustomTable({
    table,
    columns,
    rowWrapper,
}: {
    table: TableType<any>;
    columns: ColumnDef<any>[];
    rowWrapper?: ComponentType<{ row: any; children: any }>;
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
                        if (rowWrapper) {
                            const RowWrapper = rowWrapper;

                            return (
                                <RowWrapper key={row.id} row={row}>
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </RowWrapper>
                            );
                        }
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
    const [maxWidth, setMaxWidth] = useState(1e9);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setMaxWidth(window.innerWidth - 100);
            } else {
                setMaxWidth(window.innerWidth - 350);
            }
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
