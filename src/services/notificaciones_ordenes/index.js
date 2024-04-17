import supabase from "../../supabase";

export async function getNotificationsWhitLimit(limit, status) {
    try {
        const { error, data } = await supabase
            .from('notificaciones_ordenes')
            .select('*, ordenes_lavado(clientes(cliente))')
            .order('created_at', { ascending: false })
            .eq('visto', status)
            .limit(limit)

        if (error) {
            throw new Error(`Error al recuperar notificaciones , error: ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function updateNotification(updates, id) {
    try {
        const { error } = await supabase
            .from('notificaciones_ordenes')
            .update({ ...updates })
            .eq('id', id)

        if (error) {
            throw new Error(`Error al actualizar notificaicon, error: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}