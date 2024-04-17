import supabase from "../../supabase";

export async function getPending() {
    try {
        const { data, error } = await supabase
            .from('lavados')
            .select(` *, registros_detalles_entradas(*), ordenes_lavado(destino_id, cliente_id, clientes(cliente), destinos(destino, duracion))`)
            .eq('status', 'pendiente')
            .order('fecha_recoleccion', { ascending: true })
            .limit(100)


        if (error) {
            throw new Error(`Error al consultar lavados pendientes, error: ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}