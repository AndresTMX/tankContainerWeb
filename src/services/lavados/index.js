import supabase from "../../supabase";

//CREAR NUEVO LAVADO
export async function createWashing( newWashing ) {
    try {
        const { error, data } = await supabase
            .from('lavados')
            .insert({ ...newWashing })

        if (error) {
            throw new Error(`Error al crear nuevo lavado, ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}