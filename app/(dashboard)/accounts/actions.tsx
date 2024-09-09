import { useDeleteAccount } from "@/components/features/accounts/api/use-delete-account";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { useOpenEditAccount } from "@/hooks/use-open-edit-account";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import React from "react";

type Props = {
  id: string;
};

const Actions = (props: Props) => {
  const { onOpen, onClose } = useOpenEditAccount();
  const deleteAccountQuery = useDeleteAccount(props.id);

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete the account!"
  );

  const isPending = deleteAccountQuery.isPending;

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

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => onOpen(props.id)}
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isPending}
            onClick={confirmDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
