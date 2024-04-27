import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShares } from "../../../services/apiShares";
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function useCheck() {

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate: checkin, isLoading: isChecking } = useMutation({
        mutationFn: ({ id, obj }) => updateShares(id, {
            status: "in-profit",
            ...obj
        })
        ,
        onSuccess: (data) => {
            toast.success(`Shares #${data.id} successfully Checked`)
            queryClient.invalidateQueries({ active: true })
            navigate('/')
        },
        onError: () => {
            toast.error("There is an error while Checking")
        }
    })


    return { checkin, isChecking }
}