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
    Row,
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
import useMaxWidth from "@/hooks/use_max_width";

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
