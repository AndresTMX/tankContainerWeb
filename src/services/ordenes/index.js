import supabase from "../../supabase";

export async function getAllOrdersDinamic(statusField, asscending) {
    try {
        const { error, data } = await supabase
            .from('ordenes_lavado')
            .select('*, destinos(*), clientes(*)')
            .eq('status', statusField)
            .order('fecha_recoleccion', { ascending: asscending })
            .limit(100)

        if (error) {
            throw new Error(`Error al recuperar ordenes de lavado, error: ${error.message}`);
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function getOrdersAprobe(asscending) {
    try {
        const { error, data } = await supabase
            .from('lavados')
            .select('*, registros_detalles_entradas(*), ordenes_lavado(*, clientes(*), destinos(destino, duracion))')
            .eq('status', 'pendiente')
            .order('fecha_recoleccion', { ascending: asscending })
            .limit(100)

        if (error) {
            throw new Error(`Error al recuperar ordenes aprobadas, error: ${error.message}`)
        }

        return { error, data }

    } catch (error) {
        console.error(error)
    }
}

export async function getRegistersWhereEspectAndType(tipo, status) {
    try {
        const { error, data } = await supabase
            .from('registros_detalles_entradas')
            .select('*, lavados(status, created_at)')
            .eq('tipo', tipo)
            .eq('status', status)

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

        const { tanques, fecha_entrega, fecha_recoleccion } = order || {};

        const { error: errorConfirm } = await supabase
            .from('ordenes_lavado')
            .update({ status: 'confirmada' })
            .eq('id', id)

        if (errorConfirm) {
            throw new Error(`Error al actualizar estatus de orden, error: ${errorConfirm.message}`)
        }

        const lavados = tanques.map((item) => ({
            orden_id: id,
            fecha_entrega: fecha_entrega,
            id_detalle_entrada: item.registro_id,
            fecha_recoleccion: fecha_recoleccion
        }))

        const updatesDetalles = lavados.map(async (tanque) => {

            const { error: errorDetalles } = await supabase
                .from('registros_detalles_entradas')
                .update({ status: 'programado' })
                .eq('id', tanque.id_detalle_entrada)

            if (errorDetalles) {
                throw new Error(`Error al crear lavados, error: ${errorDetalles.message}`)
            }

        })

        await Promise.all(updatesDetalles);

        for (let tanque of lavados) {

            const { response } = await verifyExist(tanque.id_detalle_entrada);

            if (!response) {

                const { error } = await supabase
                    .from('lavados')
                    .insert({ ...tanque })

                if (error) {
                    throw new Error(`error al insertar nuevo lavado, error: ${error.message}`)
                }

            } else {

                const { error } = await supabase
                    .from('lavados')
                    .update({ orden_id: tanque.orden_id, fecha_recoleccion: tanque.fecha_recoleccion })
                    .eq('id_detalle_entrada', tanque.id_detalle_entrada)

                if (error) {
                    throw new Error(`error al insertar nuevo lavado, error: ${error.message}`)
                }

            }


        }


        let error = errorConfirm;

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function updateOrderWhitId(id, updates) {
    try {

        const { error: errorOrder } = await supabase
            .from('ordenes_lavado')
            .update({ ...updates })
            .eq('id', id)

        if (errorOrder) {
            throw new Error(`Error al actualizar orden de lavado, error: ${errorOrder.message}`)
        }

        let error = errorOrder;

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function verifyExist(id_detalle) {
    try {

        let response

        const { error, data } = await supabase
            .from('lavados')
            .select('id_detalle_entrada')
            .eq('id_detalle_entrada', id_detalle)

        response = data?.length === 0 ? false : true

        return { response, error }

    } catch (error) {
        console.error(error)
    }
}
