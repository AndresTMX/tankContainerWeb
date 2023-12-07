import { useState } from "react";
import { usePostRegister } from "./registersManagment/usePostRegister";

function useFormRegister() {
  const {
    sendInputRegisterEmptyTracto,
    sendInputRegistersTank,
    sendInputRegistersPipa,
  } = usePostRegister();
  const [typeChargue, setTypeChargue] = useState("");
  const [tracto, setTracto] = useState("");
  const [select, setSelet] = useState("");
  const [operator, setOperator] = useState("");
  const [numTank, setNumTank] = useState(0);
  const [dataTank, setDataTank] = useState({ numTank1: "", numTank2: "", numTank3: "", numTank4: "" });

  const handleChangeList = (event) => {
    setSelet(event.target.value);
  };

  const handleNumTank = (event) => {
    setNumTank(event.target.value);
  };

  const handleChangeTracto = (event) => {
    setTracto(event.target.value);
  };

  const handleChangueTypeChargue = (event) => {
    setTypeChargue(event.target.value);
  };

  const handleChangueOperator = (value) => {
    setOperator(value);
  };

  const clearInputs = () => {
    setSelet("");
    setTracto("");
    setTypeChargue("");
    setDataTank({ numTank1: "", numTank2: "", numTank3: "", numTank4: "" });
    setOperator("");
    setNumTank(0);
  };

  const routeTank = async () => {
    let registers = [];

    if (typeChargue === "Tanque") {
      const valuesObj = Object.values(dataTank);

      valuesObj.forEach((value, index) => {
        if (value != "") {
          registers.push({
            tracto: tracto.trim(),
            carga: typeChargue,
            operador: operator,
            transportista: select,
            numero_tanque: value
          });
        }
      });
    }
    console.log(registers)
    const request = await sendInputRegistersTank(registers)
    clearInputs()
  }

  const routeEmptyTank = async () => {
    const data = {
      tracto: tracto.trim(),
      carga: 'vacio',
      operador: operator,
      transportista: select,
      numero_tanque: null
    }
    console.log(data)
    const request = await sendInputRegisterEmptyTracto(data)
    clearInputs()
  }

  const routePipa = async () => {

    const register = {
      tracto: tracto.trim(),
      carga: typeChargue,
      operador: operator,
      transportista: select,
      numero_tanque: null
    }

    console.log(register)
    const request = await sendInputRegistersPipa(register)
    clearInputs()
  }

  const routerRegisters = () => {

    const actions = {
      Tanque: () => routeTank(),
      Pipa: () => routePipa(),
      Vacio: () => routeEmptyTank(),
    }

    if (actions[typeChargue]) {
      actions[typeChargue]();
    }

  }

  const statesFormRegister = {
    typeChargue,
    tracto,
    select,
    operator,
    numTank,
    dataTank,
  };

  const functionsFormRegister = {
    handleChangeList,
    handleNumTank,
    handleChangueTypeChargue,
    handleChangeTracto,
    handleChangueOperator,
    setDataTank,
    routerRegisters,
  };

  return { statesFormRegister, functionsFormRegister };
}

export { useFormRegister };
