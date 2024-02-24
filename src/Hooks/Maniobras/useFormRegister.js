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
  const [economico, setEconomico] = useState("")
  const [dataTank, setDataTank] = useState({ tanque1: '', tanque2: '', tanque3: '', tanque4: '' });
  const [typeTank, setTypeTank] = useState({ tanque1: '', tanque2: '', tanque3: '', tanque4: '' });
  const [espectTank, setEspectTank] = useState({ tanque1: '', tanque2: '', tanque3: '', tanque4: '' })
  const [typePipa, setTypePipa] = useState('');
  const [cliente, setCliente] = useState('');
  const [tracto, setTracto] = useState("");
  const [select, setSelet] = useState("");

  const selectClient = (event, clientes) => {
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
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

    const arrayTanks = Object.values(dataTank);
    const arrayTypes = Object.values(typeTank);
    const arrayEspects = Object.values(espectTank);


    arrayTanks.map((register, index) => {
      if (register.trim() != '') {
        registers.push({
          carga: typeChargue,
          transportista_id: select,
          cliente_id: cliente,
          especificacion: arrayEspects[index],
          tipo: arrayTypes[index],
          numero_tanque: register.numero_tanque || register.toLowerCase().trim(),
        });
      }
    })

    await sendInputRegistersTank(registers, economico, tracto, operator)
    clearInputs()
  }


  const routeEmptyTank = async () => {
    const data = {
      carga: 'vacio',
      transportista_id: select,
      cliente_id: cliente,
      numero_tanque: null,
    }
    await sendInputRegisterEmptyTracto(data, economico, tracto, operator)
    clearInputs()
  }

  const routePipa = async () => {

    const registers = [];
    const dataObjects = Object.values(dataPipa);

    dataObjects.map((item) => {
      if (item != '') {
        registers.push({
          carga: typeChargue,
          transportista_id: select,
          cliente_id: cliente,
          numero_pipa: item.trim().toLowerCase(),
        })
      }
    })

    await sendInputRegistersPipa(registers, economico, tracto, operator)
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
    typeTank,
    economico,
    espectTank
  };

  const functionsFormRegister = {
    handleChangeList,
    handleChangueTypeChargue,
    handleChangeTracto,
    handleChangueOperator,
    setDataTank,
    setDataPipa,
    selectClient,
    setTypeTank,
    setEconomico,
    routerRegisters,
    setTypeChargue,
    setTypePipa,
    setDataClient,
    validateNumTank,
    setEspectTank,
  };

  return { statesFormRegister, functionsFormRegister };
}

export { useFormRegister };
