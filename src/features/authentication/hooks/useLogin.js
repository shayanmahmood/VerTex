import { useMutation, useQueryClient } from "@tanstack/react-query";
import Login from "../../../services/apiAuthentication";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => Login({
            email,
            password
        })
        ,
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user)
            toast.success("User Has Been LogIn")
            navigate('/dashboard')
        },
        onError: (err) => {
            toast.error(err.message);
        }
    })

    return { login, isLoading }
}