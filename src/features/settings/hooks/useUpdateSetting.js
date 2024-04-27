import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSetting as updateSettingApi } from "../../../services/apiSettings"
import toast from "react-hot-toast";

function useUpdateSetting() {
    const queryClient = useQueryClient();
    const { isLoading: isUpdating, mutate: Updatesetting } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success(" Settings has been Updated");
            queryClient.invalidateQueries({
                queryKey: ["settings"],
            });
        },

        onError: () => {
            toast.error("Failed to Update new Settings");
        },
    })

    return { isUpdating, Updatesetting }
}

export default useUpdateSetting
