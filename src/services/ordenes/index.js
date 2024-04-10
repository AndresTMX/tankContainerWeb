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

export async function getOrdersAprobe() {
    try {
        const { error, data } = await supabase
            .from('lavados')
            .select('*, registros_detalles_entradas(*), ordenes_lavado(*, clientes(*))')
            .eq('status', 'pendiente')
            .order('fecha_entrega', { ascending: true })

        if (error) {
            throw new Error(`Error al recuperar ordenes aprobadas, error: ${error.message}`)
        }

        return { error, data }

    } catch (error) {
        console.error(error)
    }
}

export async function getRegistersWhereEspectAndType(tipo) {
    try {
        const { error, data } = await supabase
            .from('registros_detalles_entradas')
            .select('*')
            .eq('tipo', tipo)
            .eq('status', 'almacenado')

        if (error) {
            throw new Error(`Error al recuperar registros fitrados, error: ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function assignTankOfItemOrder(id, updates, idTanque) {
    try {

        const { error: errorUpdate } = await supabase
            .from('registros_detalles_entradas')
            .update({ status: 'asignado' })
            .eq('id', idTanque)

        if (errorUpdate) {
            throw new Error(`Error al actualizar estatus de tanque, error: ${errorUpdate.message}`)
        }


        const { error } = await supabase
            .from('ordenes_lavado')
            .update({ ...updates })
            .eq('id', id)

        if (error) {
            throw new Error(`Error al actualizar orden de lavado`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function removeTankOfItemOrder(id, updates, idTanque) {

    try {

        const { error: errorRegistros } = await supabase
            .from('registros_detalles_entradas')
            .update({ status: 'almacenado' })
            .eq('id', idTanque)

        if (errorRegistros) {
            throw new Error(`Error al actualizar status de tanque: ${errorRegistros.message}`)
        }

        const { error: errorOrder } = await supabase
            .from('ordenes_lavado')
            .update({ ...updates })
            .eq('id', id)

        if (errorOrder) {
            throw new Error(`Error al actualizar orden de lavado, error: ${errorOrder.message}`)
        }

        let error = errorRegistros || errorOrder;

        return { error }
    } catch (error) {
        console.error(error)
    }

}

export async function confirmOrderWhitId(id, order) {
    try {

        const { tanques, fecha_entrega } = order || {};

        const { error: errorConfirm } = await supabase
            .from('ordenes_lavado')
            .update({ status: 'confirmada' })
            .eq('id', id)

        if (errorConfirm) {
            throw new Error(`Error al actualizar estatus de orden, error: ${errorConfirm.message}`)
        }

        const lavados = tanques.map((item) => ({
            orden_id: id,
            fecha_entrega:fecha_entrega,
            id_detalle_entrada: item.registro_id
        }))

        const { error: errorLavados } = await supabase
            .from('lavados')
            .insert(lavados)

        if (errorLavados) {
            throw new Error(`Error al crear lavados, error: ${errorLavados.message}`)
        }

        let error = errorConfirm || errorLavados;

        return { error }
    } catch (error) {
        console.error(error)
    }
}