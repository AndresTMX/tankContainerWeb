import supabase from "../../supabase";

export async function getAllOperadores() {
    try {
        const { error, data } = await supabase
            .from('operadores')
            .select('*')

        if (error) {
            throw new Error(`Error al recuperar operadores, error ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}