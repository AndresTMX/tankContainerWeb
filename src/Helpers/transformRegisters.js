import { dateMXFormat, datetimeMXFormat } from "./date";

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

  if (typeRegister === "entrada") {
    typeChargue = data.registros_detalles_entradas[0].carga;
    operador = data.registros_detalles_entradas[0].operadores;
    linea = data.registros_detalles_entradas[0].transportistas.name;
    tracto = data.registros_detalles_entradas[0].tracto;
    numeroTanques = data.registros_detalles_entradas.length;
    tanques = data.registros_detalles_entradas.map((registro) => ({
      id: registro.id,
      tanque: registro.numero_tanque,
      status: registro.status,
    }));
    tanquesParked = tanques.filter((tanque) => tanque.status === 'parked')
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
    tanques = data.registros_detalles_salidas.map((registro) => ({
      id: registro.id,
      tanque: registro.numero_tanque,
      status: registro.status,
    }));
    tanquesParked = tanques.filter((tanque) => tanque.status === 'parked')
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
  };
};
