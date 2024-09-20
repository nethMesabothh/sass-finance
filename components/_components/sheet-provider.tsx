"use client";
import { useMountedState } from "react-use";
import { NewAccountSheet } from "./accounts/new-account-sheet";
import { EditAccountSheet } from "./accounts/edit-account-sheet";
import { NewCategorySheet } from "./categories/new-category-sheet";
import { EditCategorySheet } from "./categories/edit-category-sheet";
import { NewTransactionSheet } from "./transactions/new-transaction-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />

      <NewCategorySheet />
      <EditCategorySheet />

      <NewTransactionSheet />
    </>
  );
};
