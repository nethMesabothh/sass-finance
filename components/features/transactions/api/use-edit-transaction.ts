import { toast } from "sonner";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$patch"]
>;
type ReqType = InferRequestType<
  (typeof client.api.transactions)[":id"]["$patch"]
>["json"];

export const useEditTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResType, Error, ReqType>({
    mutationFn: async (json) => {
      const res = await client.api.transactions[":id"]["$patch"]({
        json,
        param: { id },
      });

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction updated!");
    },
    onError: () => {
      toast.error("Failed to edit transaction");
    },
  });

  return mutation;
};
