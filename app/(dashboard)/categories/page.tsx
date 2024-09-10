"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import React from "react";
import { useNewCategory } from "@/hooks/categories/use-new-category";

import { columns } from "./columns";
import { DataTable } from "@/components/_components/categories/data-table";
import { useGetCategories } from "@/components/features/categories/api/use-get-categories";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteBulkCategories } from "@/components/features/categories/api/use-bulk-delete-categories";

type Props = {};

const CategoryPage = (props: Props) => {
  const newCategory = useNewCategory();

  const categoryQuery = useGetCategories();

  const category = categoryQuery.data || [];

  const deleteCategory = useDeleteBulkCategories();

  const isDisabled = categoryQuery.isLoading || deleteCategory.isPending;

  if (categoryQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="flex flex-col lg:flex-row lg:items-center lg:justify-between  gap-3">
            <Skeleton className="h-8 w-48 lg:mt-1" />
            <Skeleton className="h-8 w-[37rem] lg:w-24" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 animate-spin text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Category Page</CardTitle>
          <Button size="sm" onClick={newCategory.onOpen}>
            <Plus className="size-4 mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={category}
            filterKey="name"
            onDelete={(rows) => {
              const ids = rows.map((row) => row.original.id);

              deleteCategory.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryPage;
