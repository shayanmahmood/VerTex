import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteShare } from '../../../services/apiShares'
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
export function useDelShare() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate: delShare, isLoading: isdelShare } = useMutation({
        mutationFn: (id) => deleteShare(id)
        ,
        onSuccess: () => {
            toast.success(`Shares successfully deleted`)
            queryClient.invalidateQueries({ active: true })
            navigate("/")
        },
        onError: (error) => {
            toast.error("There is an error while deleting")
            console.log(error)
        }
    }
    )

    return { delShare, isdelShare }
}