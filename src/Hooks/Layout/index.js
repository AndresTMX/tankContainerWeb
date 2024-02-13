import { useState } from "react";
import supabase from "../../supabase";

function useLayout() {

    const tipos = ['NFC', 'FCOJ / NFC', 'FCOJ']

    const [count, setCount] = useState(null);
    const [espect, setEspect] = useState(null);
    const [types, SetTypes] = useState(null);


    async function CountForType(stateColumn) {
        try {
            const { error, data } = await supabase
                .from('registros_detalles_entradas')
                .select('*', { count: 'exact' })
                .in('especificacion', tipos)
                .eq('nivel', '1')

            if (error) {
                throw new Error(`Error al recuperar la disponibilidad de los tanques`)
            }

            const newState = actualizarEstadoPorDefecto(stateColumn, data)
            SetTypes(newState)
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
    
    
    return { CountForType, actualizarEstadoPorDefecto, espect, types, count }


}

export { useLayout };