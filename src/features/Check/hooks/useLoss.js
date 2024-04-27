import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShares } from "../../../services/apiShares";
import { toast } from 'react-hot-toast'

export function useLoss() {

    const queryClient = useQueryClient()

    const { mutate: loss, isLoading: isLoss } = useMutation({
        mutationFn: (id) => updateShares(id, {
            status: "in-loss",
        })
        ,
        onSuccess: (data) => {
            toast.success(`Shares #${data.id} successfully Checked to loss`)
            queryClient.invalidateQueries({ active: true })
        },
        onError: () => {
            toast.error("There is an error while Checking for loss")
        }
    })


    return { loss, isLoss }
}