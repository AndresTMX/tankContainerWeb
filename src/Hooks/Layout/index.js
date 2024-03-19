import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import supabase from "../../supabase";

function useLayout(arrayTypes, level, stateDetault, bloque) {

    const { pathname } = useLocation()

    const [stateLayout, setStateLayout] = useState(stateDetault);

    async function CountForType() {
        try {
            const { error, data } = await supabase
                .from('registros_detalles_entradas')
                .select('* , clientes(*), transportistas(*), registros(*)')
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
        }
    }

    function actualizarEstadoPorDefecto(estadoPorDefecto, datosAPI) {
        // Crear un objeto Map para indexar los objetos del estado por su clave única
        const estadoPorDefectoMap = new Map(
            estadoPorDefecto.map((objetoEstado) => [
                `${objetoEstado.bloque}-${objetoEstado.nivel}-${objetoEstado.fila}-${objetoEstado.columna}`,
                objetoEstado
            ])
        );

        // Iterar sobre los datos de la API y actualizar los objetos del estado si es necesario
        datosAPI.forEach((objetoAPI) => {
            const clave = `${objetoAPI.bloque}-${objetoAPI.nivel}-${objetoAPI.fila}-${objetoAPI.columna}`;
            if (estadoPorDefectoMap.has(clave)) {
                const objetoEstado = estadoPorDefectoMap.get(clave);
                // Actualizar el objeto existente con los datos de la API
                estadoPorDefectoMap.set(clave, { ...objetoEstado, ...objetoAPI });
            }
        });

        // Devolver los valores del Map como un array para obtener el nuevo estado
        return [...estadoPorDefectoMap.values()];
    }

    const changes = supabase
        .channel('schema-db-changes')
        .on(
            'postgres_changes',
            {
                schema: 'public',
                event: '*',
                table: 'registros_detalles_entradas'
            },
            (payload) => {
                CountForType()
                console.log('reload')
            }
        )
        .subscribe()

    useEffect(() => {
        CountForType()
        return () => {
            changes.unsubscribe();
        };

    }, [level, pathname,]);


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

    async function assignTank(dataAssign) {

        const { id, nivel, columna, fila, bloque } = dataAssign;

        try {
            const { error } = await supabase
                .from('registros_detalles_entradas')
                .update({ nivel, columna, fila, bloque })
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
    }, [level])

    return { tanques, assignTank }

}

async function clearPosition(id) {
    try {
        const { error } = await supabase
            .from('registros_detalles_entradas')
            .update({ nivel: null, columna: null, fila: null, bloque: null })
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

function useGetRepairs(id) {

    const [repairs, setRepairs] = useState([]);
    const [loading, setLoading] = useState(null);

    async function getRepairs() {
        try {
            setLoading(true)
            const { error, data } = await supabase
                .from('reparaciones')
                .select('*')
                .eq('id_detalle_registro', id)

            if (error) {
                throw new Error(`Error al reuperar reparaciones, error: ${error.message}`)
            }

            setRepairs(data)
            setLoading(null)
            return { error }
        } catch (error) {
            console.error(error)
            return { error }
        }
    }

    useEffect(() => {
        getRepairs();
    }, [id])

    return { repairs, loading }

}

export { useLayout, useAssignTank, clearPosition, useGetRepairs };