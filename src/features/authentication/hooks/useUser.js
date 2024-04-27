import { useQuery } from "@tanstack/react-query";
import { CurrentUser } from "../../../services/apiAuthentication";
import toast from "react-hot-toast";

export function useUser() {

    const { isLoading, data: user } = useQuery({
        queryKey: ["user"],
        queryFn: CurrentUser
    })

    return { isLoading, user, isAuthenticated: user?.role === 'authenticated' }

}