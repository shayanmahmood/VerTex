import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditStocks } from "../../../services/apiStocks";
import toast from "react-hot-toast";

export function useCreateStock() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: addStock } = useMutation({
    mutationFn: addEditStocks,

    onSuccess: () => {
      toast.success("New Stock has been Created");
      queryClient.invalidateQueries({
        queryKey: ["stocks"],
      });
    },

    onError: () => {
      toast.error("Failed to create new stock");
    },
  });

  return { isCreating, addStock };
}
