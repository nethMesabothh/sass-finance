"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useGetCategory } from "@/components/features/categories/api/use-get-category";
import { Loader2 } from "lucide-react";
import { useEditCategory } from "@/components/features/categories/api/use-edit-category";
import { useDeleteCategory } from "@/components/features/categories/api/use-delete-category";
import { useConfirm } from "@/hooks/accounts/use-confirm";
import { useOpenEditCategory } from "@/hooks/categories/use-open-edit-category";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {};

export const EditCategorySheet = (props: Props) => {
  const { isOpen, onClose, id } = useOpenEditCategory();

  const categoryQuery = useGetCategory(id);
  const editCategoryQuery = useEditCategory(id);
  const deleteCategoryQuery = useDeleteCategory(id);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete the category!"
  );

  const confirmDelete = async () => {
    const okay = await confirm();

    if (okay) {
      deleteCategoryQuery.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const isPending =
    editCategoryQuery.isPending || deleteCategoryQuery.isPending;

  const handleSubmit = (values: FormValues) => {
    editCategoryQuery.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const isLoading = categoryQuery.isLoading;

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
      }
    : {
        name: "",
      };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <ConfirmDialog />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Category</SheetTitle>
          <SheetDescription>Edit your existing Category</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="flex w-full h-72 justify-center items-center">
            <Loader2 className="size-8 text-slate-400 animate-spin" />
          </div>
        ) : (
          <CategoryForm
            id={id}
            defaultValues={defaultValues}
            onSubmit={(values) => handleSubmit(values)}
            disabled={isPending}
            onDelete={confirmDelete}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
