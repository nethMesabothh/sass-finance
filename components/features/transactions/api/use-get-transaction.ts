import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    enabled: !!id, //it say that if you don't have an id this query not gonna run
    queryKey: ["transactions", { id }], // set a unique queryKey with an id
    queryFn: async () => {
      const res = await client.api.transactions[":id"].$get({ param: { id } });

      if (!res.ok) {
        throw new Error("failed to fetch transaction!");
      }

      const { data } = await res.json();

      return data;
    },
  });
  return query;
};
