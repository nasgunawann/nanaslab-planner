"use client";

import * as React from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandFacebook,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type Content = {
  id: string;
  title: string;
  caption: string | null;
  tag: string | null;
  deadline: string;
  status: string;
  sosmed: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function getStatusBadge(status: string) {
  switch (status) {
    case "DRAFT":
      return <Badge className="bg-gray-200 text-black">Draft</Badge>;
    case "SCHEDULED":
      return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
    case "PUBLISHED":
      return <Badge className="bg-green-100 text-green-800">Published</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getSosmedBadge(sosmed: string) {
  switch (sosmed) {
    case "INSTAGRAM":
      return (
        <Badge className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white">
          <IconBrandInstagram></IconBrandInstagram>Instagram
        </Badge>
      );
    case "TIKTOK":
      return (
        <Badge className="bg-gray-600 text-white">
          <IconBrandTiktok></IconBrandTiktok>TikTok
        </Badge>
      );
    case "FACEBOOK":
      return (
        <Badge className="bg-blue-600 text-white">
          <IconBrandFacebook></IconBrandFacebook>Facebook
        </Badge>
      );
    case "YOUTUBE":
      return (
        <Badge className="bg-red-600 text-white">
          <IconBrandYoutube></IconBrandYoutube>YouTube
        </Badge>
      );
    case "TWITTER":
      return (
        <Badge className="bg-gray-900 text-white">
          <IconBrandX></IconBrandX>Twitter
        </Badge>
      );
    default:
      return <Badge variant="outline">{sosmed}</Badge>;
  }
}

export function DataTable() {
  const router = useRouter();
  const { data, error, mutate } = useSWR<Content[]>("/api/contents", fetcher);

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Yakin ingin menghapus konten ini?");
    if (!confirmed) return;

    // Optimistic update: hapus dulu di UI
    mutate((prev) => prev?.filter((item) => item.id !== id), false);

    const res = await fetch(`/api/contents/${id}`, { method: "DELETE" });

    if (res.ok) {
      toast.success("Konten berhasil dihapus");
      mutate(); // sync ulang dengan server
    } else {
      toast.error("Gagal menghapus konten");
      mutate(); // rollback
    }
  }

  const columns = React.useMemo<ColumnDef<Content>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "title",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Judul
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("title")}</div>
        ),
      },
      {
        accessorKey: "caption",
        header: "Caption",
        cell: ({ row }) => (
          <div className="line-clamp-2 text-sm text-muted-foreground truncate max-w-[200px]">
            {row.getValue("caption") || "-"}
          </div>
        ),
      },
      {
        accessorKey: "tag",
        header: "Tag",
        cell: ({ row }) => {
          const value = row.getValue("tag") as string | null;
          return <div className="truncate max-w-[150px]">{value || "-"}</div>;
        },
      },

      {
        accessorKey: "deadline",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Deadline
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const value = row.getValue("deadline") as string | null;
          return value ? format(new Date(value), "dd MMM yyyy") : "-";
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => getStatusBadge(row.getValue("status") as string),
      },
      {
        accessorKey: "sosmed",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Sosmed
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => getSosmedBadge(row.getValue("sosmed") as string),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const content = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => router.push(`/content/edit/${content.id}`)}
                >
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => handleDelete(content.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (error || !data) {
    return (
      <div className="w-full px-6">
        <div className="flex items-center py-4">
          <Skeleton className="h-9 w-64 rounded-md" />
          <Skeleton className="h-9 w-32 rounded-md ml-auto" />
        </div>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: 7 }).map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 7 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6">
      <div className="flex items-center py-4">
        <Input
          placeholder="Cari judul..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Kolom <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} dari{" "}
          {table.getFilteredRowModel().rows.length} baris dipilih.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
