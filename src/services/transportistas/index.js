import supabase from "../../supabase";

export async function getAllTransportistas() {
    try {
        const { error, data } = await supabase
            .from('transportistas')
            .select('*')

        if (error) {
            throw new Error(`Error al recuperar transportistas, error : ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}