import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetAccount = (id?: string) => {
  const query = useQuery({
    enabled: !!id, //it say that if you don't have an id this query not gonna run
    queryKey: ["account", { id }], // set a unique queryKey with an id
    queryFn: async () => {
      const res = await client.api.accounts[":id"].$get({ param: { id } });

      if (!res.ok) {
        throw new Error("failed to fetch account!");
      }

      const { data } = await res.json();

      return data;
    },
  });
  return query;
};
