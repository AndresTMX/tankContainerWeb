import supabase from "../../supabase";
import dayjs from "dayjs";

// VIGILANCIA

export async function getRegistersInput() {
    try {

        const { data, error } = await supabase
            .from('registros')
            .select(`*, registros_detalles_entradas(*, transportistas(*), clientes(*)), operadores(*)`)
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
            .select(` *, operadores(*), registros_detalles_salidas(*,  transportistas (id, name), clientes (*))`)
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

export async function checkInRegister(idRegister, tanques) {
    try {

        let error

        const currentDate = new dayjs(new Date()).utc();

        //actualizar registros para confirmar la entrada
        const { error: errorUpdateRegister } = await supabase.from('registros')
            .update({ checkIn: currentDate, status: 'confirm' })
            .eq('id', idRegister)

        if (errorUpdateRegister) {
            throw new Error(`Error al intentar confirmar la entrada del registro, error: ${errorUpdateRegister.message}`)
        }

        //verificar existencia de los tanques en la base y aumentar los reingresos de ser necesario
        const updateReingresos = tanques.map(async (registro) => {

            const numero_carga = registro.numero_tanque || registro.numero_pipa;

            const { data: dataRepeat, error: errorRepeat } = await supabase
                .from('tanques_detalles')
                .select('tanque, reingresos')
                .eq('tanque', numero_carga)

            if (errorRepeat) {
                throw new Error(`Error al consultar repeticion, error: ${errorRepeat.message}`)
            }

            //si no hay tanques registrados con ese numero de tanque crear registro
            if (dataRepeat.length === 0) {
                const { data: dataDetailTank, error: errorAddDetailTank } = await supabase
                    .from('tanques_detalles')
                    .insert({ tanque: numero_carga, tipo: registro.tipo })
                    .select()

                if (errorAddDetailTank) {
                    throw new Error(`Error al crear detalles del tanque, error: ${errorAddDetailTank.message}`)
                }
            } else {
                const { error: errorUpdateReingreso } = await supabase
                    .from('tanques_detalles')
                    .update({ reingresos: dataRepeat[0].reingresos + 1 })
                    .eq('tanque', registro.numero_carga)

                if (errorUpdateReingreso) {
                    throw new Error(`Error al generar reingreso, error: ${errorUpdateReingreso.message}`)
                }
            }


        })

        try {
            await Promise.all(updateReingresos)
        } catch (error) {
            throw new Error(`Error al actualizar reingresos, error: ${error.message}`)
        }

        //actualiza el registro de entrada
        const { error: errorUpdateStatus } = await supabase
            .from('registros_detalles_entradas')
            .update({ status: 'maniobras' })
            .eq('entrada_id', idRegister)

        if (errorUpdateStatus) {
            throw new Error(`Error al intentar confirmar la entrada del registro, error: ${errorUpdateRegister.message}`)
        }

        error = errorUpdateRegister || errorUpdateStatus;

        return { error }

    } catch (error) {
        console.error(error)
    }
}

export async function checkOutRegister(idRegister) {
    try {

        let error

        const currentDate = new dayjs(new Date()).utc();

        //actualizar registros para confirmar la salida
        const { error: errorUpdateRegister } = await supabase
            .from('registros')
            .update({ checkOut: currentDate, status: 'finalizado' })
            .eq('id', idRegister)

        if (errorUpdateRegister) {
            throw new Error(`Error al intentar confirmar la entrada del registro, error: ${errorUpdateRegister.message}`)
        }

        //actualizar los detalles del registro de entrada
        const { error: errorUpdateStatusInput } = await supabase
            .from('registros_detalles_entradas')
            .update({ status: 'finalizado' })
            .eq('entrada_id', idRegister)

        if (errorUpdateStatusInput) {
            throw new Error(`Error al actualizar el estatus del registro de entrada, error:${errorUpdateStatusInput.message}`)
        }

        //actualizar los detalles del registro de salida
        const { error: errorUpdateStatus } = await supabase
            .from('registros_detalles_salidas')
            .update({ status: 'confirmado' })
            .eq('salida_id', idRegister)

        if (errorUpdateStatus) {
            throw new Error(`Error al actualizar el estatus del registro de salida, error:${errorUpdateStatus.message}`)
        }

        error = errorUpdateRegister || errorUpdateStatusInput || errorUpdateStatus;

        return { error }

    } catch (error) {
        console.error(error)
    }
}

// MANIOBRAS

export async function getManiobrasConfirmadas() {
    try {

        const { data, error } = await supabase
            .from('registros')
            .select(`*, operadores(*)`)
            .eq('status', 'confirm')
            .order('created_at', { ascending: false })
            .range(0, 100)

        if (error) {
            throw new Error(`Error al recuperar registros de maniobras, error: ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function getManiobrasPendientes() {
    try {

        const { data, error } = await supabase
            .from('registros')
            .select(`*, operadores(*)`)
            .eq('status', 'forconfirm')
            .order('created_at', { ascending: false })
            .range(0, 100)


        if (error) {
            throw new Error(`Error al recuperar registros de maniobras, error: ${error.message}`)
        }

        return { error, data }
    } catch (error) {
        console.error(error)
    }
}

export async function updateItemManiobra(id_registro_detalle_entrada, updates) {
    try {

        const { error } = await supabase
            .from('registros_detalles_entradas')
            .update({ ...updates })
            .eq('id', id_registro_detalle_entrada)

        if (error) {
            throw new Error(`Error al actualizar los detalles del registro, error: ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function addItemManiobra(item) {
    try {

        const { error } = await supabase
            .from('registros_detalles_entradas')
            .insert({ ...item })

        if (error) {
            throw new Error(`Error al registrar nuevo tanque en maniobra, ${error.message}`)
        }

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function storagePipa(idRegister) {
    try {

        let error

        //actualizar el registro
        const { error: errorUpdateRegister } = await supabase
            .from('registros')
            .update({ status: 'proceso' })
            .eq('id', idRegister)

        if (errorUpdateRegister) {
            await supabase.from('registros').update({ status: 'maniobras' }).eq('id', id);
            throw new Error(`Error al intentar actualizar el registro, error: ${errorUpdateRegister.message}`)
        }

        //actualizar los detalles del registro
        const { error: errorUpdateDetails } = await supabase
            .from('registros_detalles_entradas')
            .update({ status: 'almacenado' })
            .eq('entrada_id', idRegister)

        if (errorUpdateDetails) {
            await supabase.from('registros_detalles_entradas').update({ status: 'maniobras' }).eq('entrada_id', idRegister);
            throw new Error(`Error al intentar actualizar el registro, error: ${errorUpdateDetails.message}`)
        }

        error = errorUpdateRegister || errorUpdateDetails;

        return { error }
    } catch (error) {

    }
}

export async function deleteManiobra(idRegister) {
    try {

        let error

        const { error: errorDetails } = await supabase
            .from('registros_detalles_entradas')
            .delete()
            .eq('entrada_id', idRegister)

        if (errorDetails) {
            throw new Error(`Error al intentar actualizar los estatus de tanques, error: ${errorDetails.message}`)
        }

        const { error: errorRegister } = await supabase
            .from('registros')
            .delete()
            .eq('id', idRegister);

        if (errorRegister) {
            throw new Error(`Error al intentar actualizar los estatus de tanques, error: ${errorRegister.message}`)
        }

        error = errorDetails || errorRegister;

        return { error }
    } catch (error) {
        console.error(error)
    }
}

export async function returnTractoEmpty(idRegister, dataOutputRegister, dataOuputDetail) {
    try {

        let error

        const currentDate = new dayjs(new Date()).utc();

        //actualizar el registro general a finalizado
        const { error: errorUpdateRegister } = await supabase
            .from('registros')
            .update({ status: 'finalizado', checkOut: currentDate })
            .eq('id', idRegister)

        if (errorUpdateRegister) {
            throw new Error(`Error al intentar actualizar el registro, error: ${errorUpdateRegister.message}`)
        }

        //Se crea un nuevo registro general de salida 
        const { data: dataRegister, error: errorAddRegister } = await supabase
            .from('registros')
            .insert({ ...dataOutputRegister })
            .select()

        if (errorAddRegister) {
            await supabase.from('registros').update({ status: 'confirm', checkOut: null }).eq('id', idRegister)
            throw new Error(`Error al agregar nuevo registro de salida, error: ${errorAddRegister.message}`)
        }

        //agregar detalles de salida 
        const { error: errorDetails } = await supabase
            .from('registros_detalles_salidas')
            .insert({ salida_id: dataRegister[0].id, ...dataOuputDetail })

        if (errorDetails) {
            throw new Error(`Error al agregar detalles al registro de salida, error: ${errorDetails.message}`)
        }

        //actualizar el estatus de todos los tanques asociados al idRegistro a eir

        const { error: errorUpdateDetails } = await supabase
            .from('registros_detalles_entradas')
            .update({ status: 'eir' })
            .eq('entrada_id', idRegister)

        if (errorUpdateDetails) {
            throw new Error(`Error al actualizar status de las cargas, error: ${errorUpdateDetails.message}`)
        }

        error = errorUpdateRegister || errorAddRegister || errorDetails || errorUpdateDetails;

        return { error }

    } catch (error) {
        console.error(error)
    }
}



