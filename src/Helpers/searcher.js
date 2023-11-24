
export function filterSearchVigilancia(busqueda, array) {

    const busquedaMinuscula = busqueda.toLowerCase();
    const arrayFlat = [];
    const filtered = []

    array.map((register, index) => {
        const type = register.type;
        const detalles = type === 'entrada'? register.registros_detalles_entradas: register.registros_detalles_salidas;
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

        if (carga.includes(busquedaMinuscula) || numTank?.includes(busqueda) || tracto.includes(busquedaMinuscula) || operador.includes(busquedaMinuscula) || transportista.includes(busquedaMinuscula) ) {
            filtered.push(register)
        }

    })
    return filtered;
    
}

export function filterSearchManiobras(busqueda, array){

    const busquedaMinuscula = busqueda.toLowerCase();

    const results = []

    array.map((register) => {
        const linea = register.linea.toLowerCase();
        const carga = register.carga.toLowerCase();
        const tracto = register.tracto;
        const operador = register.operador.nombre.toLowerCase();
        const numero_tanque = register.numero_tanque;

        if (carga.includes(busquedaMinuscula) || numero_tanque?.includes(busqueda) || tracto.includes(busquedaMinuscula) || operador.includes(busquedaMinuscula) || linea.includes(busquedaMinuscula) ) {
            results.push(register)
        }
       
    })

    return results

}
