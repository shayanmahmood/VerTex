import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOutUser } from "../../../services/apiAuthentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogOut() {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate: logOut, isLoading } = useMutation({
        mutationFn: LogOutUser
        ,
        onSuccess: () => {
            queryClient.removeQueries()
            toast.success("User LogOut successfully")
            navigate("/login", { relative: true })
        }
    }
    )

    return { logOut, isLoading }
}