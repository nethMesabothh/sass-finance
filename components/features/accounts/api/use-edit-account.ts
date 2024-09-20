import { toast } from "sonner";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { revalidatePath } from "next/cache";

type ResType = InferResponseType<(typeof client.api.accounts)[":id"]["$patch"]>;
type ReqType = InferRequestType<
  (typeof client.api.accounts)[":id"]["$patch"]
>["json"];

export const useEditAccount = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResType, Error, ReqType>({
    mutationFn: async (json) => {
      const res = await client.api.accounts[":id"]["$patch"]({
        json,
        param: { id },
      });

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", { id }] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Account updated!");
    },
    onError: () => {
      toast.error("Failed to edit account");
    },
  });

  return mutation;
};
