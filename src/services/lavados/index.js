import supabase from "../../supabase";

//CREAR NUEVO LAVADO
export async function createWashing(newWashing) {
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

export async function updateWashing(updates, id) {
    try {

        const { error } = await supabase
            .from('lavados')
            .update({ ...updates })
            .eq('id', id)

        if (error) {
            throw new Error(`Error al actualizar lavado, error: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function getWashingWithStatus(arrayStatus) {
    try {

        const { data, error } = await supabase
            .from('lavados')
            .select(`*,registros_detalles_entradas(*, clientes(*), registros(*)), tipos_lavado(*)`)
            .in('status', arrayStatus)
            .order('fecha_recoleccion', { ascending: false })

        if (error) {
            throw new Error(`Error al consultar lavados pendientes , error: ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

//CALIDAD

export async function getPrewashingForInspect() {
    try {

        const { data, error } = await supabase
            .from('lavados')
            .select(`*,registros_detalles_entradas(*, clientes(*), registros(*)), ordenes_lavado(destino_id , destinos(destino) ) `)
            .eq('status', 'programado')
            .is('id_tipo_lavado', null)
            .order('fecha_recoleccion', { ascending: false })
            .range(0, 100)

        if (error) {
            throw new Error(`Error al recuperar lavados por inspeccionar`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function getPrewashingInspect() {
    try {

        const { data, error } = await supabase
            .from('prelavados_revisiones')
            .select(`*,registros_detalles_entradas(*, clientes(*), registros(*))`)
            .eq('status', 'aprobado')
            .order('created_at', { ascending: false })
            .range(0, 100)

        if (error) {
            throw new Error(`Error al recuperar lavados por inspeccionar`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}
