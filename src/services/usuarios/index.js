import supabase from "../../supabase";

export async function createUser(email, password, apdata) {
    try {

        const { error, data: dataUser } = await supabase.auth.signUp(
            {
                email: email,
                password: password,
                options: {
                    data: { ...apdata }
                }
            }
        );

        if (error) {
            throw new Error(`Error al crear nuevo usuario, error: ${error.message}`)
        }

        const idUser = dataUser.user.id;

        const { error: errorCreate } = await supabase
            .from('users_data')
            .insert({ id: idUser, ...apdata })

        if (errorCreate) {
            throw new Error(`Error al crear nuevo usuario, error: ${errorCreate.message}`)
        }


        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function getAllUsers() {
    try {

        const { error, data } = await supabase
            .from('users_data')
            .select('*')

        if (error) {
            throw new Error(`Error al recuperar usuarios, error:${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function getCurrentUser(id) {
    try {
        const { error, data } = await supabase
            .from('users_data')
            .select('*')
            .eq('id', id)

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function updateCurrentUser(id, updates) {
    try {
        const { error } = await supabase
            .from('users_data')
            .update({ ...updates })
            .eq('id', id)

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function updateMetaData(updates) {
    try {

        const { data, error } = await supabase.auth.updateUser({ data: { ...updates } })

        if (error) {
            throw new Error(`Error al actualizar datos de usuario, error: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}