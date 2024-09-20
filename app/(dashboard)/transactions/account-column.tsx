import React from "react";
import { useOpenEditAccount } from "@/hooks/accounts/use-open-edit-account";

type Props = {
  id: string;
  account: string;
  accountId: string;
};

export const AccountColumn = (props: Props) => {
  const { id, account, accountId } = props;

  const { onOpen: onOpenAccount } = useOpenEditAccount();

  const onClick = () => {
    console.log(accountId);
    onOpenAccount(accountId);
  };

  return (
    <div
      className="flex items-center cursor-pointer hover:underline"
      onClick={onClick}
    >
      {account}
    </div>
  );
};
