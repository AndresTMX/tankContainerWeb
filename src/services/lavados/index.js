import supabase from "../../supabase";

//CREAR NUEVO LAVADO
export async function createWashing(newWashing) {
    try {
        const { error } = await supabase
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
            // .is('condiciones_lavado', null)
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
            .eq('status', 'revision')
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
            .select(`*, lavados(*, tipos_lavado(*), registros_detalles_entradas(*), ordenes_lavado(*, clientes(cliente)) ) `)
            .order('created_at', { ascending: false })
            .range(0, 100)

        if (error) {
            throw new Error(`Error al recuperar prelavados realizados`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function getTypesWashing() {
    try {
        const { data, error } = await supabase
            .from('tipos_lavado')
            .select('*')

        if (error) {
            throw new Error(`Error al obtener los tipos de lavado, error:${error?.message}`)
        }


        return { error, data }
    } catch (error) {
        setLoading(false)
        setError(error.message)
    }

}

export async function getWashingForAprobe() {
    try {

        const { data, error } = await supabase
            .from('lavados')
            .select('*, registros_detalles_entradas(*, clientes(*), registros(*)), ordenes_lavado(destino_id , destinos(destino) ), tipos_lavado(*)')
            .eq('status', 'revision')
            .not('condiciones_lavado', 'is', null)

        if (error) {
            throw new Error(`Error al consultar la base de datos`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function getAllWashingSuccess() {
    try {

        const { data, error } = await supabase
            .from('lavados')
            .select(`*,registros_detalles_entradas(*, clientes(*), registros(*)), tipos_lavado(*)`)
            .not('condiciones_lavado', 'is', null)
            .order('fecha_recoleccion', { ascending: false })
            .limit(100)

        if (error) {
            throw new Error(`Error al consultar lavados pendientes , error: ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

