import supabase, { supabaseUrl } from "./supabase";

export default async function Login({ email, password }) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    if (error) {
        throw new Error("Unable to login with provided credentials");
    }

    return data
}


export async function SignUp({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email, password, options: {
            data: {
                fullName,
                avatar: "",
            }
        }
    })

    if (error) {
        console.log(error)
        throw new Error("Unable to SignUp with provided credentials");
    }

    return data
}

export async function CurrentUser() {
    const { data: session } = await supabase.auth.getSession()

    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser()

    if (error) {
        throw new Error("Unable to fetch current user")
    }

    return data?.user
}

export async function LogOutUser() {

    const { error } = await supabase.auth.signOut()

    if (error) {
        throw new Error("Unable to LogOut")
    }
}




export async function UpdateUser({ password, avatar, fullName }) {

    let userData;



    if (password) userData = { password }
    if (fullName) userData = { data: { fullName } }

    const { data, error } = await supabase.auth.updateUser(userData)

    if (error) {
        throw new Error(error.message)
    }

    if (!avatar) return data


    let fileName = `avatar-${data.user.id}-${crypto.randomUUID()}`

    const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, avatar)


    if (uploadError) {
        throw new Error(uploadError.message)
    }

    const { data: updateUser, error: error2 } = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
        }
    })


    if (error2) {
        throw new Error(error2.message)
    }

    return updateUser
}