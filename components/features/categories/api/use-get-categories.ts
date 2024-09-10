import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await client.api.categories.$get();

      if (!res.ok) {
        throw new Error("failed to fetch categories!");
      }

      const { data } = await res.json();

      return data;
    },
  });
  return query;
};
