import supabase from "../../supabase";

function useAddOutputManiobra() {

    const addOutputRegisterForManiobra = async (idRegistro, dataTanques, tracto, numero_economico, operador_id, transportista_id, clienteId) => {

        try {

            //crear un nuevo registro de salida 
            const { data: outputRegister, error: errorCreateOutputRegister } = await supabase
                .from('registros')
                .insert({
                    type: 'salida',
                    tracto,
                    numero_economico,
                    operador_id,
                })
                .select()

            if (errorCreateOutputRegister) {
                throw new Error(`Error al crear el registro de salida, error: ${errorCreateOutputRegister.message}`)
            }

            const dataId = outputRegister[0].id

            //actualizar el registro de entrada a finalizado 
            const { errorRegiser } = await supabase
                .from('registros')
                .update({ status: 'finalized' })
                .eq('id', idRegistro)

            if (errorRegiser) {
                throw new Error(`Error al intentar actualizar el estatus del registro, error: ${errorRegiser.message}`)
            }

            //agregear registros de detalles 
            const outputDetails = dataTanques.map(async (tanque) => {
                const { data, error: errorAddDetailsOutput } = await supabase
                    .from('registros_detalles_salidas')
                    .insert({
                        salida_id: dataId,
                        carga: tanque.carga,
                        numero_tanque: tanque.numero_tanque,
                        transportista_id: transportista_id,
                        tipo: tanque.tipo,
                        cliente_id: clienteId

                    })
                if (errorAddDetailsOutput) {
                    throw new Error(`Error al crear los detalles de la salida del tanque ${errorAddDetailsOutput.message}`)
                }
            })

            try {
                await Promise.all(outputDetails);
            } catch (error) {
                throw new Error(`Error al crear detalles de salida , error: ${error.message}`)
            }

            //actualizar el estatus de los tanques 
            const updatesStatusTanques = dataTanques.map(async (tanque) => {
                const { error: errorUpdateStatusTanks } = await supabase
                    .from('lavados')
                    .update({ status: 'entregado' })
                    .eq('id', tanque.idLavado)

                if (errorUpdateStatusTanks) {
                    throw new Error(`Error al actualizar status de los tanques , error: ${errorUpdateStatusTanks.message}`)
                }
            });

            try {
                await Promise.all(updatesStatusTanques);
            } catch (error) {
                throw new Error(error.message)
            }

        } catch (error) {
            console.error(error?.message)
        }

    }

    return { addOutputRegisterForManiobra }

}

export { useAddOutputManiobra };