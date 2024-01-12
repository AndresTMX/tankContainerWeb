import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import supabase from "../../supabase";


function useEditManiobra(updaterregisters) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const changueStatusToWashing = async (idRegister) => {

        try {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: true
            })

            //actualizar el registro
            const { error: errorUpdateRegister } = await supabase.from('registros')
                .update({ status: 'proceso' })
                .eq('id', idRegister)

            if (errorUpdateRegister) {
                throw new Error(`Error al intentar actualizar el registro, error: ${errorUpdateRegister.message}`)
            }


            //actualizar los detalles del registro
            const { error: errorUpdateDetails } = await supabase.from('registros_detalles_entradas')
                .update({ status: 'prelavado' })
                .eq('entrada_id', idRegister)

            if (errorUpdateDetails) {
                throw new Error(`Error al intentar actualizar el registro, error: ${errorUpdateDetails.message}`)
            }

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Estatus actualizado'
            });

            updaterregisters();
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            });
        }





    }

    const editManiobraTypeTank = async (typeRegister, oldDataTanks, newDataTanks, updates, idRegister) => {

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: true
        })

        const tablaDetalles = typeRegister != 'salida' ? 'registros_detalles_entradas' : 'registros_detalles_salidas';

        //eliminar registros antiguos
        try {
            const { errorDelete } = await supabase.from(tablaDetalles).delete().eq('registro_id', idRegister);

            if (errorDelete) {
                throw new Error('Error al eliminar registros anteriores')
            }
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })
        }

        //agregar nuevos registos de entrada
        const newRegisters = newDataTanks.map(async (tanque) => {
            try {
                const { errorAdd } = await supabase.from(tablaDetalles)
                    .insert({
                        registro_id: idRegister,
                        carga: 'tanque',
                        tracto: updates.tracto,
                        operador_id: updates.operador,
                        transportista_id: updates.transportista,
                        numero_tanque: tanque.tanque,
                        status: 'forconfirm'
                    })

                if (errorAdd) {
                    throw new Error(`Error al intentar registrar el tanque ${tanque.tanque}`)
                }
            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: error.message
                })
            }
        });

        try {
            await Promise.all(newRegisters)
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })
        }

        //actualizar los tanques incluidos en los nuevos registros
        const updatesTanksForNewRegister = newDataTanks.map(async (tanque) => {
            try {
                const { error } = await supabase.from('tanques')
                    .update({ status: 'forconfirm' })
                    .eq('tanque', tanque.tanque)

                if (error) {
                    throw new Error(`Error al intentar actualizar el estatus del tanque ${tanque.tanque}`)
                }
            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: error.message
                })
                dispatchGlobal({
                    type: actionTypesGlobal.setLoading,
                    payload: false
                })
            }
        });

        try {
            await Promise.all(updatesTanksForNewRegister);
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })
        }

        //actualizar los tanques descartados para estar listos
        const updatesTankDiscard = oldDataTanks.map(async (tanque) => {
            try {
                const { error } = await supabase.from('tanques')
                    .update({ status: 'ready' })
                    .eq('tanque', tanque.tanque)

                if (error) {
                    throw new Error(`Error al actualizar tanque descartado ${tanque.tanque}`)
                }
            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: error.message
                })
                dispatchGlobal({
                    type: actionTypesGlobal.setLoading,
                    payload: false
                })
            }
        });

        try {
            await Promise.all(updatesTankDiscard);
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })
        }

        setTimeout(() => {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registros actualizados con exito'
            })

        }, 1500)
    }

    const editManiobraTypePipa = async (typeRegister, newDataPipes, updates, idRegister) => {
        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: true
        })

        const tablaDetalles = typeRegister != 'salida' ? 'registros_detalles_entradas' : 'registros_detalles_salidas';

        //eliminar registros anteriores
        try {
            const { errorDelete } = await supabase.from(tablaDetalles).delete().eq('registro_id', idRegister);

            if (errorDelete) {
                throw new Error('Error al eliminar registros anteriores')
            }
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })
        }

        //crear nuevos registros
        const arrayPipas = Object.values(newDataPipes);
        const arrayPipasFiltered = arrayPipas.filter((pipa) => pipa.trim() != '');
        const newRegisters = arrayPipasFiltered.map(async (pipa) => {
            try {
                const { error } = await supabase.from(tablaDetalles)
                    .insert({
                        registro_id: idRegister,
                        carga: 'pipa',
                        tracto: updates.tracto,
                        operador_id: updates.operador,
                        transportista_id: updates.transportista,
                        numero_pipa: pipa,
                        status: 'forconfirm'
                    })

                if (error) {
                    throw new Error(`Error al subir la pipa ${pipa}`)
                }
            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: error.message
                })

                dispatchGlobal({
                    type: actionTypesGlobal.setLoading,
                    payload: false
                })
            }
        })

        //subir nuevos registros 
        try {
            await Promise.all(newRegisters)
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })
        }

        setTimeout(() => {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registros actualizados con exito'
            })

        }, 1500)

    }

    const editManiobrasTypeEmpty = async (typeRegister, updates, idRegister, newType, newDataPipes, newDataTanks) => {

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: true
        })

        const tablaDetalles = typeRegister != 'salida' ? 'registros_detalles_entradas' : 'registros_detalles_salidas';

        if (newType === 'tanque') {

            //eliminar registros antiguos
            try {
                const { errorDelete } = await supabase.from(tablaDetalles).delete().eq('registro_id', idRegister);

                if (errorDelete) {
                    throw new Error('Error al eliminar registros anteriores')
                }
            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: error.message
                })

                dispatchGlobal({
                    type: actionTypesGlobal.setLoading,
                    payload: false
                })
            }

            //agregar nuevos registos de entrada
            const newRegisters = newDataTanks.map(async (tanque) => {
                try {
                    const { errorAdd } = await supabase.from(tablaDetalles)
                        .insert({
                            registro_id: idRegister,
                            carga: 'tanque',
                            tracto: updates.tracto,
                            operador_id: updates.operador,
                            transportista_id: updates.transportista,
                            numero_tanque: tanque.tanque,
                            status: 'forconfirm'
                        })

                    if (errorAdd) {
                        throw new Error(`Error al intentar registrar el tanque ${tanque.tanque}`)
                    }
                } catch (error) {
                    dispatchGlobal({
                        type: actionTypesGlobal.setNotification,
                        payload: error.message
                    })
                }
            });

            try {
                await Promise.all(newRegisters)
            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: error.message
                })
                dispatchGlobal({
                    type: actionTypesGlobal.setLoading,
                    payload: false
                })
            }

            //actualizar los tanques incluidos en los nuevos registros
            const updatesTanksForNewRegister = newDataTanks.map(async (tanque) => {
                try {
                    const { error } = await supabase.from('tanques')
                        .update({ status: 'forconfirm' })
                        .eq('tanque', tanque.tanque)

                    if (error) {
                        throw new Error(`Error al intentar actualizar el estatus del tanque ${tanque.tanque}`)
                    }
                } catch (error) {
                    dispatchGlobal({
                        type: actionTypesGlobal.setNotification,
                        payload: error.message
                    })
                    dispatchGlobal({
                        type: actionTypesGlobal.setLoading,
                        payload: false
                    })
                }
            });

            try {
                await Promise.all(updatesTanksForNewRegister);
            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: error.message
                })
                dispatchGlobal({
                    type: actionTypesGlobal.setLoading,
                    payload: false
                })
            }

        }

        if (newType === 'pipa') {

            //eliminar registros anteriores
            const { errorDelete } = await supabase.from(tablaDetalles).delete().eq('registro_id', idRegister);

            if (errorDelete) {
                throw new Error('Error al eliminar registros anteriores')
            }

            //crear nuevos registros de pipa
            const arrayPipas = Object.values(newDataPipes);
            const arrayPipasFiltered = arrayPipas.filter((pipa) => pipa.trim() != '');
            const newRegisters = arrayPipasFiltered.map(async (pipa) => {
                try {
                    const { error } = await supabase.from(tablaDetalles)
                        .insert({
                            registro_id: idRegister,
                            carga: 'pipa',
                            tracto: updates.tracto,
                            operador_id: updates.operador,
                            transportista_id: updates.transportista,
                            numero_pipa: pipa,
                            status: 'forconfirm'
                        })

                    if (error) {
                        throw new Error(`Error al subir la pipa ${pipa}`)
                    }
                } catch (error) {
                    dispatchGlobal({
                        type: actionTypesGlobal.setNotification,
                        payload: error.message
                    })

                    dispatchGlobal({
                        type: actionTypesGlobal.setLoading,
                        payload: false
                    })
                }
            });

            //subir nuevos registros 
            try {
                await Promise.all(newRegisters)
            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: error.message
                })

                dispatchGlobal({
                    type: actionTypesGlobal.setLoading,
                    payload: false
                })
            }
        }

        if (newType === '') {
            try {
                const { error } = await supabase.from(tablaDetalles)
                    .update({ operador_id: updates.operador, transportista_id: updates.transportista, tracto: updates.tracto })
                    .eq('registro_id', idRegister)

                if (error) {
                    throw new Error(`Error al actualizar el registro vacio con el tracto ${updates.tracto}`)
                }
            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: error.message
                })
            }
        }

        setTimeout(() => {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registros actualizados con exito'
            })

        }, 1500)
    }

    const routerFetch = async (typeChargue, newType, typeRegister, oldDataTanks, newDataTanks, newDataPipes, updates, idRegister) => {

        const routes = {
            tanque: async () => await editManiobraTypeTank(typeRegister, oldDataTanks, newDataTanks, updates, idRegister),
            pipa: async () => await editManiobraTypePipa(typeRegister, newDataPipes, updates, idRegister),
            vacio: async () => await editManiobrasTypeEmpty(typeRegister, updates, idRegister, newType, newDataPipes, newDataTanks)
        }

        if (routes[typeChargue]) {
            try {
                await routes[typeChargue]();
            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: `Error al ejecutar la acción para ${typeChargue}: ${error.message}`
                })
            }
        } else {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: `No se encontro una accion predeterminada para carga tipo ${typeChargue}`
            })
        }

    }

    return { routerFetch, changueStatusToWashing }

}

export { useEditManiobra };