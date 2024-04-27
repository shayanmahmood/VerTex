import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getShares } from "../../../services/apiShares";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constants";

export function useShares() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams?.get("status");
  const queryClient = useQueryClient();

  const filter =
    !filterValue || filterValue === "All"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  const sortByRaw = searchParams.get("SortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");
  const sortBY = { field, direction };

  const page = !searchParams ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: shares, count } = {},
    isLoading,
    error: shareErrors,
  } = useQuery({
    queryKey: ["shares", filter, sortBY, page],
    queryFn: () => getShares({ filter, sortBY, page }),
  });

  const pageCount = count / PAGE_SIZE;

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["shares", filter, sortBY, page + 1],
      queryFn: () => getShares({ filter, sortBY, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["shares", filter, sortBY, page - 1],
      queryFn: () => getShares({ filter, sortBY, page: page - 1 }),
    });
  }

  return { isLoading, shares, shareErrors, count };
}
