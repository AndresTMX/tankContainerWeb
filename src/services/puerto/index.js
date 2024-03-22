import supabase from "../../supabase";

export async function createMultipleRegisters(arrayRegisters) {
    try {

        const { error } = await supabase
            .from('puerto')
            .insert(arrayRegisters)

        if (error) {
            throw new Error(`Error al cargar registros, error ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}