import { useState, useContext, useEffect } from "react";
import { DevelopmentContext } from "../Context";
import { actionTypes } from "../Reducers";
import { currentDate } from "../Helpers/date";


function useRegister() {

    const [data, setData ] = useState([]);

    // useEffect(()=> {
    //     getData()
    // }, [])

    const getData = async() => {
        const { response } = await supabase.from("registros").select();
        setData(response)
        console.log(response)
    }
    // const [loading, setLoading] = useState(false);
    const [state, dispatch] = useContext(DevelopmentContext)

    const { registers } = state;

    const addRegisterSuppabase = (data) => {
        const {rol, nombre, puesto, contacto  } = data
    }

    const addUserSuppabase = async() => {
        // const {rol, nombre, puesto, contacto  } = data

    //     const { error } = await supabase
    //    .from('usuarios')
    //    .insert({rol:"user", nombre:"usuario prueba", puesto:"desarrollador", contacto:"5577828470"})
    //    console.log(error)
    }

    const openAndCloseNotification = () => {
        dispatch({ type: actionTypes.setLoading, payload: true })
        setTimeout(() => {
            dispatch({ type: actionTypes.setLoading, payload: false })
            dispatch({ type: actionTypes.setNotification, payload: 'Registro enviado con exito' })
        }, 1000)
    }

    const addRegister = (newRegister) => {

        const { dataTank, numTank, operator, select, tracto, typeChargue } = newRegister;



        const newState = [...registers]

        const id = registers.length + 1;

        let mock;

        if (typeChargue === 'Pipa') {

            mock = {
                id: id,
                checkIn: currentDate,
                linea: select,
                tracto: tracto,
                operador: {
                    name: operator,
                    celular: '5577828470'
                },
                checkOut: undefined
            }

            newState.push(mock)
        } else {

            const formatDataTank = []

            Object.values(dataTank).forEach((item) => {
                if (item !== '' && item !== null && item !== undefined) {
                    formatDataTank.push({tanque:item});
                }
            })

            mock = {
                id: id,
                checkIn: currentDate,
                linea: select,
                tracto: tracto,
                numTank: numTank,
                operador: {
                    name: operator,
                    celular: '5577828470'
                },
                tanques: formatDataTank,
                checkOut: undefined
            }

            newState.push(mock)
        }

        dispatch({ type: actionTypes.setRegisters, payload: [...newState] })
        openAndCloseNotification()

    }



    return { addRegister, addUserSuppabase }
}

export { useRegister };