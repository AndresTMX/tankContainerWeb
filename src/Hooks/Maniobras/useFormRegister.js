import { useState, useContext } from "react";
import { usePostRegister } from "./usePostRegister";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes } from "../../Reducers/GlobalReducer";

function useFormRegister() {

  const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

  const {
    sendInputRegisterEmptyTracto,
    sendInputRegistersTank,
    sendInputRegistersPipa,
  } = usePostRegister();

  const [dataPipa, setDataPipa] = useState({ pipa1: "", pipa2: "" });
  const [typeChargue, setTypeChargue] = useState("");
  const [dataClient, setDataClient] = useState([]);
  const [operator, setOperator] = useState("");
  const [dataTank, setDataTank] = useState([]);
  const [typePipa, setTypePipa] = useState('');
  const [cliente, setCliente] = useState('');
  const [tracto, setTracto] = useState("");
  const [select, setSelet] = useState("");

  const selectClient = (event, clientes) => {
    const customers = JSON.parse(localStorage.getItem('customers'))||[];
    const customerSelected = customers.filter((customer) => customer.id === event.target.value);
    setDataClient(customerSelected[0]);
    setCliente(event.target.value);
  }

  const handleChangeList = (event) => {
    setSelet(event.target.value);
  };

  const handleChangeTracto = (event) => {
    setTracto(event.target.value);
  };

  const handleChangueTypeChargue = (event) => {
    setTypeChargue(event.target.value);
  };

  const handleChangueOperator = (event) => {
    setOperator(event.target.value);
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
    setCliente("");
    setOperator("");
    setTypeChargue("");
    setDataPipa(
      {
        pipa1: "",
        pipa2: ""
      }
    );
    setDataTank(
      {
        numTank1: "",
        numTank2: "",
        numTank3: "",
        numTank4: ""
      }
    );
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
            cliente_id: cliente,
            numero_tanque: value.toLowerCase().trim(),
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
      cliente_id: cliente,
      numero_tanque: null,
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
          cliente_id: cliente,
          numero_pipa: item,
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
    dataTank,
    dataPipa,
    typePipa,
    cliente,
    dataClient,
  };

  const functionsFormRegister = {
    handleChangeList,
    handleChangueTypeChargue,
    handleChangeTracto,
    handleChangueOperator,
    setDataTank,
    setDataPipa,
    selectClient,
    routerRegisters,
    setTypePipa,
    setDataClient,
    toggleTank,
  };

  return { statesFormRegister, functionsFormRegister };
}

export { useFormRegister };
