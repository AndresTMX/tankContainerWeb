import { useEffect, useState } from "react";
import supabase from "../../supabase";

function useLayout(arrayTypes, level, stateDetault) {

    const [stateLayout, setStateLayout] = useState(stateDetault);

    async function CountForType() {
        try {
            const { error, data } = await supabase
                .from('registros_detalles_entradas')
                .select('* , clientes(*), transportistas(*)', { count: 'exact' })
                .in('especificacion', arrayTypes)
                .not('columna', 'is', null)
                .eq('nivel', level)

            if (error) {
                throw new Error(`Error al recuperar la disponibilidad de los tanques`)
            }

            const newState = actualizarEstadoPorDefecto(stateLayout, data)
            setStateLayout(newState)
            return { error, data }
        } catch (error) {
            console.error(error)
            return { error }
        }
    }

    function actualizarEstadoPorDefecto(estadoPorDefecto, datosAPI) {
        // Copiar el estado por defecto para evitar modificarlo directamente
        const nuevoEstado = [...estadoPorDefecto];

        // Iterar sobre los datos de la API
        datosAPI.forEach((objetoAPI) => {
            // Buscar objetos en el estado por defecto con las mismas fila y columna
            const objetoExistente = nuevoEstado.find((objeto) => {
                return objeto.fila === objetoAPI.fila && objeto.columna === objetoAPI.columna;
            });

            // Si se encuentra un objeto coincidente, actualizarlo con los datos de la API
            if (objetoExistente) {
                // Reemplazar el objeto existente con los datos de la API
                Object.assign(objetoExistente, objetoAPI);
            }
        });

        return nuevoEstado;
    }

    useEffect(() => {
        CountForType()
    }, [level])

    return { stateLayout }


}

function useAssignTank(arrayTypes, level) {

    const [tanques, setTanques] = useState([])

    async function getTanksForType() {
        try {
            const { error, data } = await supabase
                .from('registros_detalles_entradas')
                .select('*', { count: 'exact' })
                .in('especificacion', arrayTypes)
                .is('columna', null)

            if (error) {
                throw new Error(`Error al recuperar la disponibilidad de los tanques`)
            }

            setTanques(data)
            return { error }
        } catch (error) {
            console.error(error)
            return { error }
        }
    }

    async function assignTank(id, nivel, fila, columna) {
        try {
            const { error } = await supabase
                .from('registros_detalles_entradas')
                .update({ nivel, fila, columna })
                .eq('id', id)

            if (error) {
                throw new Error(`Error al actualizar posicion de tanque`)
            }

            return { error }
        } catch (error) {
            console.error(error)
            return { error }
        }
    }

    useEffect(() => {
        getTanksForType()
    },[level])

    return { tanques, assignTank }

}


export { useLayout, useAssignTank };