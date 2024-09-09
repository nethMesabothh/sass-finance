import { toast } from "sonner";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResType = InferResponseType<typeof client.api.accounts.$post>;
type ReqType = InferRequestType<typeof client.api.accounts.$post>["json"];

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResType, Error, ReqType>({
    mutationFn: async (json) => {
      const res = await client.api.accounts.$post({ json });

      return await res.json();
    },
    onSuccess: () => {
      toast.success("Account created!");
      queryClient.invalidateQueries({ queryKey: ["accounts"] }); // Can use enum for more type-safety
    },
    onError: () => {
      toast.error("Failed to create account");
    },
  });

  return mutation;
};
