import React from "react";
import { useOpenEditCategory } from "@/hooks/categories/use-open-edit-category";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  category: string | null;
  categoryId: string | null;
};

export const CategoryColumn = (props: Props) => {
  const { id, categoryId, category } = props;

  const { onOpen: onOpenCategory } = useOpenEditCategory();

  const onClick = () => {
    if (categoryId) {
      onOpenCategory(categoryId);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500"
      )}
      onClick={onClick}
    >
      {!category && <TriangleAlert className="mr-2 size-4 shrink-0" />}
      {category || "UnCategorized"}
    </div>
  );
};
