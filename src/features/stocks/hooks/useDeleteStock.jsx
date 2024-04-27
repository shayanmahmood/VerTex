import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStock as deleteStockApi } from "../../../services/apiStocks";
import toast from "react-hot-toast";

export function useDeleteStock() {
  const queryClient = useQueryClient();

  const { mutate: deleteStock, isLoading: isDeleting } = useMutation({
    mutationFn: deleteStockApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stocks"],
      });
      toast.success("Stocks has been Deleted Successfully!");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteStock, isDeleting };
}
