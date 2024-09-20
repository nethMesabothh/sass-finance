import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { transactions } from "@/db/schema";
import { convertAmountFromMiliunits } from "@/lib/utils";

export const useGetTransactions = () => {
  const params = useSearchParams(); // return query string from url
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    queryKey: ["transactions", { from, to, accountId }],
    queryFn: async () => {
      const res = await client.api.transactions.$get({
        query: {
          from,
          to,
          accountId,
        },
      });

      if (!res.ok) {
        throw new Error("failed to fetch transactions!");
      }

      const { data } = await res.json();

      return data.map((values) => ({
        ...values,
        amount: convertAmountFromMiliunits(values.amount),
      }));
    },
  });
  return query;
};
