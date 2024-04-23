import supabase from "../../supabase";

export async function revisarPrelavado(revision, actualizacionLavado, actualizacionCargas, actualizacionDetalles, idRegistro, idWashing, id_detalle_entrada) {
    try {

        let error

        //almacena el checklist de revision de prelavado 
        const { error: errorRevision, data: dataRevision } = await supabase
            .from('prelavados_revisiones')
            .insert({ ...revision })
            .select()

        if (errorRevision) {
            throw new Error(`Error al registrar nueva ispección de prelevado: ${errorRevision.message}`)
        }

        //asigna el tipo de lavado al lavado
        const { error: errorUpdateWashing } = await supabase
            .from('lavados')
            .update({ ...actualizacionLavado })
            .eq('id', idWashing)

        if (errorUpdateWashing) {
            await supabase.from('prelavados_revisiones').delete().eq('id', dataRevision[0].id)
            throw new Error(`Error al asignar el tipo de lavado, error: ${errorUpdateWashing.message}`)
        }

        //actualiza el registro de los detalles de entrada
        const { error: errorUpdateRegister } = await supabase
            .from('registros_detalles_entradas')
            .update({ ...actualizacionDetalles })
            .eq('entrada_id', idRegistro)

        if (errorUpdateRegister) {
            await supabase.from('registros_detalles_entradas').update({ status: 'prelavado' }).eq('entrada_id', idRegistro)
            throw new Error(`Error al actualizar registro: ${errorUpdateRegister.message}`)
        }

        //mandar cargas previas a tanques_detalles si es un tanque
        const { error: errorCargasPrevias } = await supabase
            .from('tanques_detalles')
            .upsert({ ...actualizacionCargas }, { onConflict: 'tanque', ignoreDuplicates: false })

        if (errorCargasPrevias) {
            throw new Error(`Error al mandar cargas previas del lavado, error ${errorCargasPrevias.message}`)
        }

        error = errorRevision || errorUpdateWashing || errorUpdateRegister || errorCargasPrevias;

        return { error }

    } catch (error) {
        console.error(error)
    }
}

export async function retornarPrelavado(status, idLavado, id_detalle_entrada) {
    try {

        let error

        if (status === "interna" || status === "externa") {

            //actualiza el lavado a cancelado
            const { error: errorUpdateWashing } = await supabase
                .from('lavados')
                .update({ status: 'rechazado' })
                .eq('id', idLavado)

            if (errorUpdateWashing) {
                throw new Error(`Error al actualizar los detalles del tanque, error: ${errorUpdateWashing.message}`)
            }

            //actualiza el estatus del registro
            const { error: errorUpdateRegister } = await supabase
                .from('registros_detalles_entradas')
                .update({ status: "reparacion" })
                .eq('id', id_detalle_entrada)

            if (errorUpdateRegister) {
                throw new Error(`Error al actualizar los detalles del tanque, error: ${errorUpdateRegister.message}`)
            }

            //crea una nueva reparacion
            const { error: errorCreateRepair } = await supabase
                .from('reparaciones')
                .insert({ id_detalle_registro: id_detalle_entrada, tipo_reparacion: status })

            if (errorCreateRepair) {
                throw new Error(`Error al crear una reparación , error: ${errorUpdateRegister.message}`)
            }

            error = errorUpdateWashing || errorUpdateRegister || errorCreateRepair
        }

        if (status === "prelavado") {

            //actualizar los detalles del registro
            const { error: errorDetalle } = await supabase
                .from('registros_detalles_entradas')
                .update({ status: 'prelavado' })
                .eq('id', id_detalle_entrada)

            if (errorDetalle) {
                throw new Error(`Error al retornar a prelavado, error: ${errorDetalle.message}`)
            }

            //actualizar los detalles del lavado
            const { error: errorUpdateWashing } = await supabase
                .from('lavados')
                .update({ status: 'pendiente' })
                .eq('id', idLavado)

            if (errorUpdateWashing) {
                await supabase.from('registros_detalles_entradas').update({ status: 'programado' }).eq('id', id_detalle_entrada)
                throw new Error(`Error al actualizar registro de lavado, error: ${errorUpdateWashing.message}`)
            }

            error = errorDetalle || errorUpdateWashing;

        }

        return { error }

    } catch (error) {
        console.error(error)
    }
}