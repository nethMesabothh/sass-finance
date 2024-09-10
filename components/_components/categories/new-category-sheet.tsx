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
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useNewCategory } from "@/hooks/categories/use-new-category";
import { useCreateCategory } from "@/components/features/categories/api/use-create-categories";

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {};

export const NewCategorySheet = (props: Props) => {
  const { isOpen, onClose } = useNewCategory();

  const mutation = useCreateCategory();
  const handleSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to track your expenses
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          defaultValues={{
            name: "",
          }}
          onSubmit={(values) => handleSubmit(values)}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
