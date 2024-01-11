
//funcion para buscar dentro de vigilancia
export function filterSearchVigilancia(busqueda, array) {

    try {
        const busquedaMinuscula = busqueda.toLowerCase();
        const arrayFlat = [];
        const filtered = [];

        array.map((register) => {
            const type = register.type;
            const detalles = type === 'entrada' ? register.registros_detalles_entradas : register.registros_detalles_salidas;
            const checkIn = register.checkIn;
            const tipo = register.type;

            detalles.forEach(element => {
                const tracto = element.tracto
                const status = element.status
                const carga = element.carga
                const operador = element.operadores.nombre
                const transportista = element.transportistas.name
                const numero_tanque = element.numero_tanque
                const id = element.id;

                arrayFlat.push({ id, operador, carga, tracto, transportista, numero_tanque, checkIn, tipo, status })
            });
        })

        arrayFlat.map((register) => {
            const carga = register.carga.toLowerCase();
            const numTank = register.numero_tanque;
            const tracto = register.tracto;
            const operador = register.operador.toLowerCase();
            const transportista = register.transportista.toLowerCase();

            if (carga.includes(busquedaMinuscula) || numTank?.includes(busqueda) || tracto.includes(busquedaMinuscula) || operador.includes(busquedaMinuscula) || transportista.includes(busquedaMinuscula)) {
                filtered.push(register)
            }

        })

        if (filtered.length === 0) {
            throw new Error(`No hay coincidencias para la busqueda ${busqueda}`)
        }

        return filtered
    } catch (error) {
        return error
    }

}
//funcion para buscar dentro de las maniobras
export function filterSearchManiobras(busqueda, array) {
    try {
        const busquedaMinuscula = busqueda.toLowerCase();

        const results = []

        array.map((register) => {
            const numero_tanque = register.numero_tanque.toLowerCase();
            const operador = register.operadores.nombre.toLowerCase();
            const linea = register.transportistas.name.toLowerCase();
            const tracto = register.tracto;
            const carga = register.carga;

            if (numero_tanque.includes(busquedaMinuscula)
                || operador.includes(busquedaMinuscula)
                || linea.includes(busquedaMinuscula)
                || carga.includes(busquedaMinuscula)
                || tracto.includes(busqueda)
            ) {
                results.push(register)
            }

        })

        if (results.length === 0) {
            throw new Error(`No hay coincidencias para la busqueda: ${busqueda} `)
        }

        return results
    } catch (error) {
        return error
    }

}
//funcion para buscar dentro de los checklist realizados
export function filterSearchCheckList(busqueda, array) {
    try {
        const results = []
        const busquedaMinuscula = busqueda.toLowerCase();

        array.map((register) => {
            const folio = register.folio.toString();
            const cliente = register.clientes.cliente.toLowerCase();
            const tracto = register.registros_detalles_entradas.tracto;
            const status = register.registros_detalles_entradas.status.toLowerCase();
            const tanque = register.registros_detalles_entradas.numero_tanque.toLowerCase();


            if (folio.includes(busqueda)
                || tracto.includes(busqueda)
                || cliente.includes(busquedaMinuscula)
                || tanque.includes(busquedaMinuscula)
                || cliente.includes(busquedaMinuscula)
                || status.includes(busquedaMinuscula)) {
                return results.push(register)
            }
        })

        if (results.length === 0) {
            throw new Error(`No hay coincidencias para la busqueda: ${busqueda} `)
        }

        return results;
    } catch (error) {
        return error
    }
}

//funcion para buscar reparaciones 
export function filterSearchRepair(typeRegister, busqueda, array) {

    try {
        const results = []
        const busquedaMinuscula = busqueda.toLowerCase();

        array.map((register) => {
            const numTank = register.numero_tanque.toLowerCase();
            const tracto = register.registros_detalles_entradas.tracto;
            const type = register.tipo_reparacion.toLowerCase();

            if (numTank.includes(busquedaMinuscula) || tracto.includes(busqueda) || type.includes(busquedaMinuscula)) {
                results.push(register)
            }
        })

        if (results.length === 0) {
            throw new Error(`No hay coincidencias para la busqueda: ${busqueda} `)
        }

        return results;
    } catch (error) {
        console.error(error)
        return error
    }
}

//router filter de maniobras y vigilancia
export function routerFilterSearch(typeRegister, busqueda, array) {

    const routes = {
        pendientes: () => filterSearchManiobras(busqueda, array),
        realizados: () => filterSearchCheckList(busqueda, array)
    }

    if (routes[typeRegister]) {
        return routes[typeRegister]()
    }

}


