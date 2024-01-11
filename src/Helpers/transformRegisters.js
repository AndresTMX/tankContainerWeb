import { dateMXFormat, datetimeMXFormat } from "./date";

/* 
funcion que filtra los registros y devuelve sus datos formateados 
para ser usados de manera general en registros de entrada o salida
*/
export const transformRegisters = (data) => {
  let typeRegister = data.type;
  let linea;
  let transportista;
  let tanques;
  let operador;
  let tracto;
  let typeChargue;
  let dayInput;
  let dateInput;
  let dayCreat;
  let dateCreate;
  let numeroTanques;
  let OperatorSliceName;
  let shortNameOperator;
  let tanquesParked;
  let tanquesManiobras;
  let tanquesEIR;

  if (typeRegister === "entrada") {
    typeChargue = data.registros_detalles_entradas[0].carga;
    operador = data.registros_detalles_entradas[0].operadores;
    transportista = data.registros_detalles_entradas[0].transportistas;
    linea = data.registros_detalles_entradas[0].transportistas.name;
    tracto = data.registros_detalles_entradas[0].tracto;
    numeroTanques = data.registros_detalles_entradas.length;
    tanques = data.registros_detalles_entradas.map((registro) => ({
      id: registro.id,
      tanque: registro.numero_tanque,
      status: data.status,
      tanque_status: registro.tanques?.status,
      carga: typeChargue,
      pipa: registro.numero_pipa
    }));
    tanquesParked = tanques.filter((tanque) => tanque.tanque_status === 'ready')
    tanquesManiobras = tanques.length >= 1?
    tanques.filter((tanque) => tanque.tanque_status === 'maniobras' || tanque.tanque_status === 'forconfirm'): [];
    tanquesEIR = tanques.filter((tanque) => tanque.tanque_status === 'eir')
    //Datos de fecha y hora
    dayInput = data.checkIn ? dateMXFormat(data.checkIn) : 'por confirmar';
    dateInput = data.checkIn ? datetimeMXFormat(data.checkIn) : 'por confirmar';
    dayCreat = dateMXFormat(data.create_at);
    dateCreate = datetimeMXFormat(data.create_at);

    //Nmbre corto del operador
    OperatorSliceName = operador.nombre.split(" ").slice(0, 2);
    shortNameOperator = `${OperatorSliceName[0]} ${OperatorSliceName[1]}`;
  } else {
    typeChargue = data.registros_detalles_salidas[0]?.carga;
    transportista = data.registros_detalles_salidas[0].transportistas;
    operador = data.registros_detalles_salidas[0]?.operadores;
    linea = data.registros_detalles_salidas[0]?.transportistas?.name;
    tracto = data.registros_detalles_salidas[0].tracto;
    numeroTanques = data.registros_detalles_salidas?.length;
    tanques = data.registros_detalles_salidas.map((registro) => ({
      id: registro.id,
      tanque: registro.numero_tanque,
      status: data.status,
      tanque_status: registro.tanques?.status,
      carga: typeChargue,
      pipa: registro.numero_pipa

    }));
    tanquesManiobras = tanques.length >= 1?
    tanques.filter((tanque) => tanque.tanque_status === 'maniobras' || tanque.tanque_status === 'forconfirm'): [];
    tanquesParked = tanques.filter((tanque) => tanque.tanque_status === 'onroute')
    //Datos de fecha y hora
    dayInput = data.checkIn ? dateMXFormat(data.checkIn) : 'por confirmar';
    dateInput = data.checkIn ? datetimeMXFormat(data.checkIn) : 'por confirmar';
    dayCreat = dateMXFormat(data.create_at);
    dateCreate = datetimeMXFormat(data.create_at);

    //Nmbre corto del operador
    OperatorSliceName = operador.nombre.split(" ").slice(0, 2);
    shortNameOperator = `${OperatorSliceName[0]} ${OperatorSliceName[1]}`;
  }

  return {
    typeRegister,
    linea,
    tanques,
    transportista,
    tanquesParked,
    tanquesManiobras,
    operador,
    tracto,
    numeroTanques,
    typeChargue,
    dayInput,
    dateInput,
    OperatorSliceName,
    shortNameOperator,
    dayCreat,
    dateCreate,
    tanquesEIR
  };
};

export const transformManiobras = (data) => {

  const filterData = data.reduce((array, currentElement) => {

    const idRegister = currentElement.registros.id;

    if (!array[idRegister]) {
      array[idRegister] = [];
    }

    array[idRegister].push(currentElement)

    return array
  }, {});

  return Object.values(filterData);
} 

/* 
DEPRECADA
funcion que filtra los registros de entrada y devuelve solo los 
registros que tienen el status 'maniobras' para ser usados en la
pagina de maniobras y posteriormente hacerles checklist
*/
export const filterInputRegistersForStatus = (arrayRegisters, status) => {

  const registersFiltered = []

  arrayRegisters.map((register) => {
    const arrayDetails = register.registros_detalles_entradas;
    const checkIn = register.checkIn;
    const linea = register.registros_detalles_entradas[0].transportistas.name;
    const dayInput = dateMXFormat(register.checkIn);
    const dateInput = datetimeMXFormat(register.checkIn);

    const filteredDetails = arrayDetails.filter((detail) => detail.status === status && detail.carga === 'tanque');

    filteredDetails.map((item) => {
      const id = item.id
      const carga = item.carga
      const operador = item.operadores
      const status = item.status
      const tracto = item.tracto
      const numero_tanque = item.numero_tanque
      const OperatorSliceName = operador.nombre.split(" ").slice(0, 2);
      const shortNameOperator = `${OperatorSliceName[0]} ${OperatorSliceName[1]}`;

      registersFiltered.push({ id, carga, operador, status, tracto, numero_tanque, checkIn, linea, dayInput, dateInput, OperatorSliceName, shortNameOperator })
    });

  })

  return registersFiltered
}

/* 
funcion que filtra los registros de reparacion y devuelve solo los 
registros que tienen el status 'reparación' para ser usados en la
pagina de reparacion
*/
export const filterInputRegistersForRaparacion = (arrayRegisters) => {
  const registersFiltered = []

  arrayRegisters.map((register) => {
    const arrayDetails = register.registros_detalles_entradas;
    const checkIn = register.checkIn;
    const linea = register.registros_detalles_entradas[0].transportistas.name;
    const dayInput = dateMXFormat(register.checkIn);
    const dateInput = datetimeMXFormat(register.checkIn);

    const filteredDetails = arrayDetails.filter((detail) => detail.status === 'reparacion');

    filteredDetails.map((item) => {

      const id = item.id
      const carga = item.carga
      const operador = item.operadores
      const status = item.status
      const tracto = item.tracto
      const numero_tanque = item.numero_tanque
      const OperatorSliceName = operador.nombre.split(" ").slice(0, 2);
      const shortNameOperator = `${OperatorSliceName[0]} ${OperatorSliceName[1]}`;

      registersFiltered.push({ id, carga, operador, status, tracto, numero_tanque, checkIn, linea, dayInput, dateInput, OperatorSliceName, shortNameOperator })
    });

  })

  return registersFiltered
}

/*funcion que filtra los registros cuya carga sea del tipo y estatus 
especifico y devuelve la misma estructura*/

export const filterManiobrasForStatus = (data, status) => {

  const dataFiltered = []

  data.forEach(element => {

    const type = element.type;
    const arrayDetails = type === 'entrada' ?
      element.registros_detalles_entradas : element.registros_detalles_entradas;

    const detailsFiltered = arrayDetails.filter((detail) => {

      if (detail.status === status) {
        return detail
      }
    })

   dataFiltered.push({...element, detailsFiltered})
    
  });
  
  return dataFiltered
}

/*funcion que divide un array en otros mas pequeños*/
export function dividirArray(array, tamanoMaximo) {
  const arraysDivididos = [];

  for (let i = 0; i < array.length; i += tamanoMaximo) {
    const subarray = array.slice(i, i + tamanoMaximo);
    arraysDivididos.push(subarray);
  }

  return arraysDivididos;
}

/*funcion que divide un array en otros mas pequeños segun una propiedad especifica*/
export function dividirArrayPorPropiedad(array, propiedad) {
  const subarrays = [];
  let subarrayActual = [];

  for (const elemento of array) {
      if (elemento.hasOwnProperty(propiedad)) {
          // Si encontramos un elemento con la propiedad deseada, guardamos el subarray actual y comenzamos uno nuevo
          if (subarrayActual.length > 0) {
              subarrays.push(subarrayActual);
          }
          subarrayActual = [];
      }

      subarrayActual.push(elemento);
  }

  // Asegurarnos de agregar el último subarray
  if (subarrayActual.length > 0) {
      subarrays.push(subarrayActual);
  }

  return subarrays;
}
