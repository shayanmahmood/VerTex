import { useMutation } from "@tanstack/react-query";
import { SignUp as signUpapi} from "../../../services/apiAuthentication";
import toast from "react-hot-toast";

export function useSignUp() {

    const { mutate: SignUpUser, isLoading } = useMutation({
        mutationFn: signUpapi,
        onSuccess: (user) => {
            console.log(user)
            toast.success("User has been successfully signUp Please Verified Email")
        }
    })

    return { SignUpUser, isLoading }
}