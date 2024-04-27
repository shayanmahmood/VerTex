import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UpdateUser } from "../../../services/apiAuthentication";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { isLoading: isUpdating, mutate: updateUser } = useMutation({
        mutationFn: UpdateUser,

        onSuccess: ({user}) => {
            toast.success("User successfully Updated");

            queryClient.setQueryData(["user"], user)

            // queryClient.invalidateQueries({
            //     queryKey: ["user"],
            // });
        },

        onError: () => {
            toast.error("Failed to Upload User");
        },
    });

    return { updateUser, isUpdating };
}
