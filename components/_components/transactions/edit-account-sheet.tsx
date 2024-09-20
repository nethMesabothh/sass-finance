"use client";

import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useOpenEditAccount } from "@/hooks/accounts/use-open-edit-account";
import { AccountForm } from "./transaction-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useGetAccount } from "@/components/features/accounts/api/use-get-account";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "@/components/features/accounts/api/use-edit-account";
import { useDeleteAccount } from "@/components/features/accounts/api/use-delete-account";
import { useConfirm } from "@/hooks/accounts/use-confirm";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {};

export const EditAccountSheet = (props: Props) => {
  const { isOpen, onClose, id } = useOpenEditAccount();

  const accountQuery = useGetAccount(id);
  const editAccountQuery = useEditAccount(id);
  const deleteAccountQuery = useDeleteAccount(id);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete the account!"
  );

  const confirmDelete = async () => {
    const okay = await confirm();

    if (okay) {
      deleteAccountQuery.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const isPending = editAccountQuery.isPending || deleteAccountQuery.isPending;

  const handleSubmit = (values: FormValues) => {
    editAccountQuery.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const isLoading = accountQuery.isLoading;

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: "",
      };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <ConfirmDialog />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Edit your existing account</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="flex w-full h-72 justify-center items-center">
            <Loader2 className="size-8 text-slate-400 animate-spin" />
          </div>
        ) : (
          <AccountForm
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
