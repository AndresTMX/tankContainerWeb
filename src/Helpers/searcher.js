import { filterInputRegistersForManiobras } from "./transformRegisters";

//funcion para buscar dentro de vigilancia
export function filterSearchVigilancia( busqueda, array) {

    try {
        const busquedaMinuscula = busqueda.toLowerCase();
        const arrayFlat = [];
        const filtered = []

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
        
        return filtered
    } catch (error) {
        return error
    }

}
//funcion para buscar dentro de las maniobras
export function filterSearchManiobras(busqueda, array) {
    try {
        const busquedaMinuscula = busqueda.toLowerCase();

        const data = filterInputRegistersForManiobras(array)

        const results = []

        data.map((register) => {
            const linea = register.linea.toLowerCase();
            const tracto = register.tracto;
            const numero_tanque = register.numero_tanque.toLowerCase();
            const operador = register.operador.nombre.toLowerCase();

            if (numero_tanque.includes(busquedaMinuscula) || tracto.includes(busqueda) || operador.includes(busquedaMinuscula) || linea.includes(busquedaMinuscula)) {
                results.push(register)
            }

        })

        if (results.length === 0) {
            throw new Error('sin resultados')
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
            const cliente = register.nombre_cliente.toLowerCase();
            const tanque = register.registros_detalles_entradas.numero_tanque.toLowerCase();
            const tracto = register.registros_detalles_entradas.tracto;
            const status = register.registros_detalles_entradas.status.toLowerCase();

            if (folio.includes(busqueda) || cliente.includes(busquedaMinuscula) || tanque.includes(busquedaMinuscula) || tracto.includes(busqueda) || status.includes(busquedaMinuscula)) {
                return results.push(register)
            }
        })

        if (results.length === 0) {
            throw new Error('sin resultados')
        }

        return results;
    } catch (error) {
        return error
    }
}

//funcion para buscar reparaciones 
export function filterSearchRepair( typeRegister, busqueda, array){
    
    try {
        const results = []
        const busquedaMinuscula = busqueda.toLowerCase();
        
        array.map((register) => {
            const numTank = register.numero_tanque.toLowerCase();
            const tracto = register.registros_detalles_entradas.tracto;
            const type = register.tipo_reparacion.toLowerCase();

            if(numTank.includes(busquedaMinuscula) || tracto.includes(busqueda) || type.includes(busquedaMinuscula)){
                results.push(register)
            }
        })

        return results;
    } catch (error) {
        console.error(error)
        return error
    }
}

//router filter de maniobras y vigilancia
export function routerFilterSearch(typeRegister, busqueda, array) {

    if (typeRegister === 'entrada') {
        return filterSearchManiobras(busqueda, array)
    }

    if (typeRegister === 'checklist_realizados') {
        return filterSearchCheckList(busqueda, array)
    }

}


// //router filter de reparaciones
// export function routerFilterSearchRepairs(typeRegister, busqueda, array){

//     if(typeRegister === 'pendiente'){

//     }

//     if(typeRegister === 'proceso'){
        
//     }

//     if(typeRegister === 'realizado'){
        
//     }

// }

