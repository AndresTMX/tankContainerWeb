import { useState } from "react";
import { usePostRegister } from "./registersManagment/usePostRegister";

function useFormRegister() {

    const {sendRegisters} = usePostRegister();
    const [typeChargue, setTypeChargue] = useState('');
    const [tracto, setTracto] = useState('');
    const [select, setSelet] = useState('');
    const [operator, setOperator] = useState('');
    const [numTank, setNumTank] = useState(0);
    const [dataTank, setDataTank] = useState({ numTank1: '', numTank2: '', numTank3: '', numTank4: '' })

    const handleChangeList = (event) => {
        setSelet(event.target.value);
    };

    const handleNumTank = (event) => {
        setNumTank(event.target.value)
    }

    const handleChangeTracto = (event) => {
        setTracto(event.target.value);
    };

    const handleChangueTypeChargue = (event) => {
        setTypeChargue(event.target.value)
    }

    const handleChangueOperator = (value) => {
        setOperator(value)
    }

    const clearInputs = () => {
        setSelet('')
        setTracto('')
        setTypeChargue('')
        setDataTank([{ numTank1: '',},{ numTank2: '',},{ numTank3: '',},{ numTank4: '',}])
        setOperator('')
        setNumTank(0)
    }

    const addRegister = () => {
        let registers = []

        if(typeChargue === 'Tanque'){
            const valuesObj =  Object.values(dataTank);
             valuesObj.forEach((value, index) => {
                if(value != ''){
                    registers.push({
                        numero:value,
                        carga: typeChargue,
                        operador:operator,
                        linea: select
                    })
                }
             });
        }else{
            registers.push({
                numero: tracto,
                carga: typeChargue,
                operador:operator,
                linea: select
            })
        }

        sendRegisters(registers)
    }

    const statesFormRegister = { typeChargue,tracto,select,operator,numTank, dataTank  }

    const functionsFormRegister = {
        handleChangeList,
        handleNumTank,
        handleChangueTypeChargue,
        handleChangeTracto,
        handleChangueOperator,
        setDataTank,
        addRegister
    }

    return { statesFormRegister, functionsFormRegister }
}

export { useFormRegister };