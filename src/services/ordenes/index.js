import supabase from "../../supabase";

export async function getAllOrders() {
    try {
        const { error, data } = await supabase
            .from('ordenes_lavado')
            .select('*, destinos(*), clientes(*)')
            .eq('status', 'por confirmar')
            .order('fecha_entrega', { ascending: true })
            .limit(50)


        if (error) {
            throw new Error(`Error al recuperar ordenes de lavado, error: ${error.message}`);
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}