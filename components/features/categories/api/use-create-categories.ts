import { toast } from "sonner";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResType = InferResponseType<typeof client.api.categories.$post>;
type ReqType = InferRequestType<typeof client.api.categories.$post>["json"];

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResType, Error, ReqType>({
    mutationFn: async (json) => {
      const res = await client.api.categories.$post({ json });

      return await res.json();
    },
    onSuccess: () => {
      toast.success("Categories created!");
      queryClient.invalidateQueries({ queryKey: ["categories"] }); // Can use enum for more type-safety
    },
    onError: () => {
      toast.error("Failed to create category");
    },
  });

  return mutation;
};
