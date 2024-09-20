"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import React from "react";

import { columns } from "./columns";
import { DataTable } from "@/components/_components/transactions/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewTransaction } from "@/hooks/transactions/use-new-transaction";
import { useGetTransactions } from "@/components/features/transactions/api/use-get-transactions";
import { useDeleteBulkTransactions } from "@/components/features/transactions/api/use-bulk-delete";

type Props = {};

const TransactionPage = (props: Props) => {
  const newTransaction = useNewTransaction();

  const transactionQuery = useGetTransactions();

  const transaction = transactionQuery.data || [];

  const deleteTransaction = useDeleteBulkTransactions();

  const isDisabled = transactionQuery.isLoading || deleteTransaction.isPending;

  if (transactionQuery.isLoading) {
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
          <CardTitle className="text-xl line-clamp-1">
            Transaction Page
          </CardTitle>
          <Button size="sm" onClick={newTransaction.onOpen}>
            <Plus className="size-4 mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transaction}
            filterKey="date"
            onDelete={(rows) => {
              const ids = rows.map((row) => row.original.id);

              deleteTransaction.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionPage;
