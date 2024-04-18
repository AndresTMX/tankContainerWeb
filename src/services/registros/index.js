import supabase from "../../supabase";

export async function getRegistersInput() {
    try {

        const { data, error } = await supabase
            .from('registros')
            .select(`*, operadores(*)`)
            .eq('type', 'entrada')
            .is('checkIn', null)
            .order('created_at', { ascending: false })
            .range(0, 100)

        if (error) {
            throw new Error(`Error al recuperar registros de entrada, error: error: ${error}`)
        }

        return { error, data }

    } catch (error) {
        console.error(error)
    }
}

export async function getRegistersOutput() {
    try {

        const { data, error } = await supabase
            .from('registros')
            .select(` *, operadores(*), registros_detalles_salidas(*)`)
            .eq('type', 'salida')
            .is('checkOut', null)
            .order('created_at', { ascending: false })
            .range(0, 100)
        if (error) {
            throw new Error(`Error al recuperar registros de entrada, error: error: ${error}`)
        }

        return { error, data }

    } catch (error) {
        console.error(error)
    }
}