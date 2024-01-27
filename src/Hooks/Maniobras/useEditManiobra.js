import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import supabase from "../../supabase";
import { TableCostDetails } from "../../PDFs/components/TableCostDetails";


function useEditManiobra(updaterregisters) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    //controladores de edicion de carga independiente en registros de entrada

    const editRegisterGeneral = async (idRegister, updates) => {
        try {

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: true
            })

            const { data, error } = await supabase
                .from('registros')
                .update({ ...updates })
                .eq('id', idRegister)

            if (error) {
                throw new Error(`Error al actualizar el registro general, error: ${error.message}`)
            }

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })

            // updaterregisters()

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const addNewCarga = async ( detalles ) => {
        try {

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: true
            })

            const { data, error } = await supabase
                .from('registros_detalles_entradas')
                .insert({ ...detalles })
                .select()

            if (error) {
                throw new Error(`Error al registrar nueva carga, error: ${error.message}`)
            }

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })

            updaterregisters()

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const editRegisterCarga = async ( idRegister, newRegister) => {
        try {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: true
            })

            const { data, error } = await supabase
                .from('registros_detalles_entradas')
                .update({ ...newRegister })
                .eq('id', idRegister)

            if (error) {
                throw new Error(`Error al editar carga, error: ${error.message}`)
            }

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const deleteRegisterCarga = async (idDetalleCarga, typeRegister) => {
        try {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: true
            })

            const { data, error } = await supabase
                .from('registros_detalles_entradas')
                .delete()
                .eq('id', idDetalleCarga)

            if (error) {
                throw new Error(`Error al eliminar una carga, error:${error.message}`)
            }

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })

            updaterregisters()

        
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }
    
    //----------------------------------------------------------------------------///

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
                .update({ status: 'almacenado' })
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
        try {

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: true
            })

            const tablaDetalles = typeRegister != 'salida' ? 'registros_detalles_entradas' : 'registros_detalles_salidas';
            const idDetalles = typeRegister != 'salida' ? { entrada_id: idRegister } : { salida_id: idRegister };
            const nameFieldId = typeRegister != 'salida' ? 'entrada_id' : 'salida_id';

            //eliminar registros antiguos
            const { errorDelete } = await supabase
                .from(tablaDetalles)
                .delete()
                .eq(nameFieldId, idRegister);

            if (errorDelete) {
                throw new Error(`Error al eliminar registros anteriores, error: ${errorDelete.message}`)
            }

            //agregar nuevos registos de entrada
            const newRegisters = newDataTanks.map(async (tanque) => {
                const { errorAdd } = await supabase.from(tablaDetalles)
                    .insert({
                        ...idDetalles,
                        carga: 'tanque',
                        tracto: updates.tracto,
                        operador_id: updates.operador,
                        transportista_id: updates.transportista,
                        numero_tanque: tanque.tanque,
                        status: 'forconfirm'
                    })

                if (errorAdd) {
                    throw new Error(`Error al intentar registrar el tanque ${errorAdd.message}`)
                }

            });

            try {
                await Promise.all(newRegisters)
            } catch (error) {
                throw new Error(error.message)
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

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const editManiobraTypePipa = async (typeRegister, newDataPipes, updates, idRegister) => {
        try {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: true
            })

            const tablaDetalles = typeRegister != 'salida' ? 'registros_detalles_entradas' : 'registros_detalles_salidas';
            const idDetalles = typeRegister != 'salida' ? { entrada_id: idRegister } : { salida_id: idRegister };
            const nameFieldId = typeRegister != 'salida' ? 'entrada_id' : 'salida_id';

            //eliminar registros anteriores
            const { errorDelete } = await supabase
                .from(tablaDetalles)
                .delete()
                .eq(nameFieldId, idRegister);

            if (errorDelete) {
                throw new Error(`Error al eliminar registros anteriores, error: ${errorDelete.message}`)
            }

            //crear nuevos registros
            const arrayPipas = Object.values(newDataPipes);
            const arrayPipasFiltered = arrayPipas.filter((pipa) => pipa.trim() != '');

            const newRegisters = arrayPipasFiltered.map(async (pipa) => {
                const { error } = await supabase.from(tablaDetalles)
                    .insert({
                        ...idDetalles,
                        carga: 'pipa',
                        tracto: updates.tracto,
                        operador_id: updates.operador,
                        transportista_id: updates.transportista,
                        numero_pipa: pipa,
                        status: 'forconfirm'
                    })

                if (error) {
                    throw new Error(`Error crear nuevos registros de pipa , error: ${error.message}`)
                }

            })

            //subir nuevos registros 
            try {
                await Promise.all(newRegisters)
            } catch (error) {
                throw new Error(error.message)
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
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const editManiobrasTypeEmpty = async (typeRegister, updates, idRegister, newType, newDataPipes, newDataTanks) => {
        try {

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: true
            })

            const tablaDetalles = typeRegister != 'salida' ? 'registros_detalles_entradas' : 'registros_detalles_salidas';
            const idDetalles = typeRegister != 'salida' ? { entrada_id: idRegister } : { salida_id: idRegister };
            const nameFieldId = typeRegister != 'salida' ? 'entrada_id' : 'salida_id';

            if (newType === 'tanque') {

                //eliminar registros antiguos
                const { errorDelete } = await supabase
                    .from(tablaDetalles)
                    .delete()
                    .eq(nameFieldId, idRegister);

                if (errorDelete) {
                    throw new Error(`Error al eliminar registros anteriores, error: ${errorDelete.message}`)
                }


                //agregar nuevos registos de entrada
                const newRegisters = newDataTanks.map(async (tanque) => {
                    const { errorAdd } = await supabase.from(tablaDetalles)
                        .insert({
                            ...idDetalles,
                            carga: 'tanque',
                            tracto: updates.tracto,
                            transportista_id: updates.transportista,
                            numero_tanque: tanque.tanque,
                            status: 'forconfirm'
                        })

                    if (errorAdd) {
                        throw new Error(`Error al intentar registrar los nuevos tanques ${errorAdd.message}`)
                    }

                });

                try {
                    await Promise.all(newRegisters)
                } catch (error) {
                    throw new Error(error.message)
                }

            }

            if (newType === 'pipa') {

                //eliminar registros anteriores
                const { errorDelete } = await supabase
                    .from(tablaDetalles)
                    .delete()
                    .eq(nameFieldId, idRegister);

                if (errorDelete) {
                    throw new Error(`Error al eliminar registros anteriores, error: ${errorDelete.message}`)
                }

                //crear nuevos registros de pipa
                const arrayPipas = Object.values(newDataPipes);
                const arrayPipasFiltered = arrayPipas.filter((pipa) => pipa.trim() != '');

                const newRegisters = arrayPipasFiltered.map(async (pipa) => {
                    const { error } = await supabase.from(tablaDetalles)
                        .insert({
                            ...idDetalles,
                            carga: 'pipa',
                            tracto: updates.tracto,
                            operador_id: updates.operador,
                            transportista_id: updates.transportista,
                            numero_pipa: pipa,
                            status: 'forconfirm'
                        })

                    if (error) {
                        throw new Error(`Error crear registros de pipa, error: ${error.message}`)
                    }

                });

                //subir nuevos registros 
                try {
                    await Promise.all(newRegisters)
                } catch (error) {
                    throw new Error(`Error al crear registros de pipa , error: ${error.message}`)
                }
            }

            if (newType === '') {

                const { error } = await supabase.from(tablaDetalles)
                    .update({ operador_id: updates.operador, transportista_id: updates.transportista, tracto: updates.tracto })
                    .eq(nameFieldId, idRegister)

                if (error) {
                    throw new Error(`Error al actualizar el registro vacio con el tracto ${error.message}`)
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
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
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

    return { routerFetch, changueStatusToWashing, editRegisterGeneral, addNewCarga, editRegisterCarga, deleteRegisterCarga }

}

export { useEditManiobra };