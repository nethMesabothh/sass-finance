"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewTransaction } from "@/hooks/transactions/use-new-transaction";
import { TransactionForm } from "./transaction-form";
import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateTransaction } from "@/components/features/transactions/api/use-create-transactions";
import { useGetCategories } from "@/components/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/components/features/categories/api/use-create-categories";
import { useGetAccounts } from "@/components/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/components/features/accounts/api/use-create-accounts";
import { Loader2 } from "lucide-react";

const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {};

export const NewTransactionSheet = (props: Props) => {
  const { isOpen, onClose } = useNewTransaction();

  const transactionMutation = useCreateTransaction();

  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();

  const onCreateCategory = (name: string) =>
    categoryMutation.mutate({
      name,
    });

  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isPending =
    transactionMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

  const handleSubmit = (values: FormValues) => {
    transactionMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Create a new Transaction</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={handleSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
