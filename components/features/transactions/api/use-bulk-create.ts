import { toast } from "sonner";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResType = InferResponseType<
  (typeof client.api.transactions)["bulk-create"]["$post"]
>;
type ReqType = InferRequestType<
  (typeof client.api.transactions)["bulk-create"]["$post"]
>["json"];

export const useCreateBulkTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResType, Error, ReqType>({
    mutationFn: async (json) => {
      const res = await client.api.transactions["bulk-create"]["$post"]({
        json,
      });
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Transactions created!");
      queryClient.invalidateQueries({ queryKey: ["transactions"] }); // Can use enum for more type-safety
    },
    onError: () => {
      toast.error("Failed to create transactions");
    },
  });

  return mutation;
};
