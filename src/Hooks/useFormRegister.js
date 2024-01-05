import { useState, useContext } from "react";
import { usePostRegister } from "./Maniobras/usePostRegister";
import { GlobalContext } from "../Context/GlobalContext";
import { actionTypes } from "../Reducers/GlobalReducer";

function useFormRegister() {

  const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

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
  const [dataTank, setDataTank] = useState([]);
  const [dataPipa, setDataPipa] = useState({ pipa1: "", pipa2: "" });
  const [typePipa, setTypePipa] = useState('')


  const handleChangeList = (event) => {
    setSelet(event.target.value);
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

  const validateNumTank = () => {
    if (dataTank.length >= 4) {
      dispatchGlobal({
        type: actionTypes.setNotification,
        payload: 'No puedes agregar más de 4 tanques'
      })

      return false
    } else {
      return true
    }
  }

  const validateTank = () => {
    if (dataTank.length < 1) {
      dispatchGlobal({
        type: actionTypes.setNotification,
        payload: 'No puedes enviar este registro sin tanques'
      })
      return false
    } else {
      return true
    }
  }

  const toggleTank = (tank) => {

    const newState = dataTank.length >= 1 ? [...dataTank] : [];
    const index = dataTank.findIndex((item) => item === tank);
    const repeat = dataTank.find((item) => item === tank)

    if (index < 1 && repeat === undefined && validateNumTank()) {
      newState.push(tank);
    }

    if (index >= 0 && repeat) {
      newState.splice(index, 1);
    }

    setDataTank(newState)

  }

  const clearInputs = () => {
    setSelet("");
    setTracto("");
    setTypeChargue("");
    setDataTank({ numTank1: "", numTank2: "", numTank3: "", numTank4: "" });
    setDataPipa({ pipa1: "", pipa2: "" });
    setOperator("");
  };

  const routeTank = async () => {
    let registers = [];

    if (typeChargue === "tanque" && validateTank()) {

      dataTank.map((value, index) => {
        if (value != "") {
          registers.push({
            tracto: tracto.trim(),
            carga: typeChargue,
            operador_id: operator,
            transportista_id: select,
            numero_tanque: value,
            status: 'forconfirm'
          });
        }
      });
      await sendInputRegistersTank(registers)
      clearInputs()
    }
  }

  const routeEmptyTank = async () => {
    const data = {
      tracto: tracto.trim(),
      carga: 'vacio',
      operador_id: operator,
      transportista_id: select,
      numero_tanque: null,
      status:'forconfirm'
    }
    await sendInputRegisterEmptyTracto(data)
    clearInputs()
  }

  const routePipa = async () => {

    const registers = [];
    const dataObjects = Object.values(dataPipa);

    dataObjects.map((item) => {
      if (item != '') {
        registers.push({
          tracto: tracto.trim(),
          carga: typeChargue,
          operador_id: operator,
          transportista_id: select,
          numero_pipa: item,
          status: 'forconfirm'
        })
      }
    })

    await sendInputRegistersPipa(registers)
    clearInputs()
  }

  const routerRegisters = () => {

    const actions = {
      tanque: () => routeTank(),
      pipa: () => routePipa(),
      vacio: () => routeEmptyTank(),
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
    dataPipa,
    typePipa,
  };

  const functionsFormRegister = {
    handleChangeList,
    handleChangueTypeChargue,
    handleChangeTracto,
    handleChangueOperator,
    setDataTank,
    setDataPipa,
    routerRegisters,
    setTypePipa,
    toggleTank,
  };

  return { statesFormRegister, functionsFormRegister };
}

export { useFormRegister };
