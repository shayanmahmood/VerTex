import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditStocks } from "../../../services/apiStocks";
import toast from "react-hot-toast";

export function useEditStock() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editStock } = useMutation({
    mutationFn: ({ newStock, id }) => addEditStocks(newStock, id),

    onSuccess: () => {
      toast.success("New Stock has been Edited");
      queryClient.invalidateQueries({
        queryKey: ["stocks"],
      });
    },

    onError: () => {
      toast.error("Failed to create new stock");
    },
  });

  return { isEditing, editStock };
}
