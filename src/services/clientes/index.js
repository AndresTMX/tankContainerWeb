import supabase from "../../supabase";

export async function getAllClientes() {
    try {
        const { error, data } = await supabase
            .from('clientes')
            .select('*')

        if (error) {
            throw new Error(`Error al recuperar clientes, error: ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}