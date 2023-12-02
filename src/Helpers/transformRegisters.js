import { dateMXFormat, datetimeMXFormat } from "./date";

/* 
funcion que filtra los registros y devuelve sus datos formateados 
para ser usados de manera general en registros de entrada o salida
*/
export const transformRegisters = (data) => {
  let typeRegister = data.type;
  let linea;
  let tanques;
  let operador;
  let tracto;
  let numeroTanques;
  let typeChargue;
  let dayInput;
  let dateInput;
  let OperatorSliceName;
  let shortNameOperator;
  let tanquesParked;
  let tracto_status;

  if (typeRegister === "entrada") {
    typeChargue = data.registros_detalles_entradas[0].carga;
    operador = data.registros_detalles_entradas[0].operadores;
    linea = data.registros_detalles_entradas[0].transportistas.name;
    tracto = data.registros_detalles_entradas[0].tracto;
    numeroTanques = data.registros_detalles_entradas.length;
    tracto_status = data.registros_detalles_entradas[0].tractos.status
    tanques = data.registros_detalles_entradas.map((registro) => ({
      id: registro.id,
      tanque: registro.numero_tanque,
      status: registro.status,
      tanque_status: registro.tanques?.status,
      carga: typeChargue
    }));
    tanquesParked = tanques.filter((tanque) => tanque.tanque_status === 'ready')
    //Datos de fecha y hora
    dayInput = dateMXFormat(data.checkIn);
    dateInput = datetimeMXFormat(data.checkIn);

    //Nmbre corto del operador
    OperatorSliceName = operador.nombre.split(" ").slice(0, 2);
    shortNameOperator = `${OperatorSliceName[0]} ${OperatorSliceName[1]}`;
  } else {
    typeChargue = data.registros_detalles_salidas[0]?.carga;
    operador = data.registros_detalles_salidas[0].operadores;
    linea = data.registros_detalles_salidas[0].transportistas.name;
    tracto = data.registros_detalles_salidas[0].tracto;
    numeroTanques = data.registros_detalles_salidas?.length;
    tracto_status = data.registros_detalles_salidas[0].tractos.status
    tanques = data.registros_detalles_salidas.map((registro) => ({
      id: registro.id,
      tanque: registro.numero_tanque,
      status: registro.status,
      tanque_status: registro.tanques?.status,
      carga: typeChargue

    }));
    tanquesParked = tanques.filter((tanque) => tanque.tanque_status === 'onroute')
    //Datos de fecha y hora
    dayInput = dateMXFormat(data.checkIn);
    dateInput = datetimeMXFormat(data.checkIn);

    //Nmbre corto del operador
    OperatorSliceName = operador.nombre.split(" ").slice(0, 2);
    shortNameOperator = `${OperatorSliceName[0]} ${OperatorSliceName[1]}`;
  }

  return {
    typeRegister,
    linea,
    tanques,
    tanquesParked,
    operador,
    tracto,
    numeroTanques,
    typeChargue,
    dayInput,
    dateInput,
    OperatorSliceName,
    shortNameOperator,
    tracto_status
  };
};

/* 
funcion que filtra los registros de entrada y devuelve solo los 
registros que tienen el status 'maniobras' para ser usados en la
pagina de maniobras y posteriormente hacerles checklist
*/
export const filterInputRegistersForManiobras = (arrayRegisters) => {

  const registersFiltered = []

  arrayRegisters.map((register) => {
      const arrayDetails = register.registros_detalles_entradas;
      const checkIn = register.checkIn;
      const linea = register.registros_detalles_entradas[0].transportistas.name;
      const dayInput = dateMXFormat(register.checkIn);
      const dateInput = datetimeMXFormat(register.checkIn);

      const filteredDetails = arrayDetails.filter((detail) => detail.status === 'maniobras' && detail.carga === 'Tanque');

      filteredDetails.map((item) => {

        const id = item.id
        const carga = item.carga
        const operador = item.operadores
        const status = item.status
        const tracto = item.tracto
        const numero_tanque = item.numero_tanque
        const OperatorSliceName = operador.nombre.split(" ").slice(0, 2);
        const shortNameOperator = `${OperatorSliceName[0]} ${OperatorSliceName[1]}`;
        
          registersFiltered.push({id, carga, operador, status, tracto, numero_tanque, checkIn, linea, dayInput, dateInput, OperatorSliceName, shortNameOperator })
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
        
          registersFiltered.push({id, carga, operador, status, tracto, numero_tanque, checkIn, linea, dayInput, dateInput, OperatorSliceName, shortNameOperator })
      });

  })

  return registersFiltered
}