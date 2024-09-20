import { toast } from "sonner";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$delete"]
>;

export const useDeleteTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResType, Error>({
    mutationFn: async () => {
      const res = await client.api.transactions[":id"]["$delete"]({
        param: { id },
      });

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction deleted!");
    },
    onError: () => {
      toast.error("Failed to delete transaction");
    },
  });

  return mutation;
};
