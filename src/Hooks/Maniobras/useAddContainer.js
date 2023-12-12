import supabase from "../../supabase";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { actionTypes } from "../../Reducers/ManiobrasReducer";

function useAddContainer() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const [state, dispatch] = useContext(ManiobrasContext);

    const addContainerToManiobra = async (idRegistro, registers) => {

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: true
        })

        const updatesContenedores = registers.map(async (contenedor) => {
            try {
                const { error } = await supabase.from('tanques')
                    .update({ status: 'maniobras' })
                    .eq('tanque', contenedor.numero_tanque)

                if (error) {
                    throw new Error(error)
                }

            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: `Error al agregar un contenedor al tracto ${registers[0].tracto}`
                })
            }
        });

        try {
            await Promise.all(updatesContenedores);
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: `Error al agregar un contenedor al tracto ${registers[0].tracto}`
            })
        }

        const arrayPromises = registers.map(async (register) => {
            try {
                const { error } = await supabase.from('registros_detalles_entradas')
                    .insert({
                        registro_id: idRegistro,
                        carga: register.carga,
                        tracto: register.tracto,
                        operador_id: register.operador,
                        numero_tanque: register.numero_tanque,
                        transportista_id: register.transportista,
                        status: register.status
                    })

                if (error) {
                    throw new Error(error)
                }

            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: `Error al agregar un contenedor al tracto ${registers[0].tracto}`
                })
            }
        })

        try {
            await Promise.all(arrayPromises)
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: `Error al agregar un contenedor al tracto ${registers[0].tracto}`
            })
        }

        setTimeout(() => {

            dispatch({
                type: actionTypes.setUpdate,
                payload: !state.update
            })

            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            })
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: `Tanques añadidos correctamente`
            })
        }, 1000)





    }

    return { addContainerToManiobra }

}

export { useAddContainer };