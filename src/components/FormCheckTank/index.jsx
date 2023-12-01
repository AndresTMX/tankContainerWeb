import { useState, useContext } from "react";
import { SelectSimple } from "../SelectSimple";
import { Box, Stack, Paper, Typography, Button, IconButton } from "@mui/material";
//Hooks
import { useGetTransporters } from "../../Hooks/transportersManagment/useGetTransporters";
import { useGetOperators } from "../../Hooks/operadoresManagment/useGetOperators";
import { usePostRegister } from "../../Hooks/registersManagment/usePostRegister";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { actionTypes } from "../../Reducers/ManiobrasReducer";
//helpers
import { transformRegisters } from "../../Helpers/transformRegisters";
import { InputText } from "../InputText";
//icons
import CheckIcon from '@mui/icons-material/Check';
import { ManiobrasContext } from "../../Context/ManiobrasContext";


function FormCheckTank() {

    const { sendOutputRegisters } = usePostRegister();
    const { transporters } = useGetTransporters();
    const { states } = useGetOperators();
    const { operators } = states;
    const [stateGlobal, dispatchglobal] = useContext(GlobalContext);
    const [state, dispatch] = useContext(ManiobrasContext)

    const allTransporters = transporters.map((transporter) => ({
        id: transporter.id,
        nombre: transporter.name,
    }))

    const [selected, setSelected] = useState([]);

    const [selectTransporter, setSelectTransporter] = useState('');
    const [selectOperator, setSelectOperator] = useState('');
    const [selectTracto, setSelectTracto] = useState('');

    //datos
    // const {
    //     typeRegister,
    //     linea,
    //     tanques,
    //     tanquesParked,
    //     operador,
    //     tracto,
    //     numeroTanques,
    //     typeChargue,
    //     dayInput,
    //     dateInput,
    //     OperatorSliceName,
    //     shortNameOperator,
    // } = transformRegisters(data);

    const validateExist = (idItem) => {
        return selected.find((value) => value.id === idItem);
    }

    const addItemSelected = (item) => {
        let newState
        if (selected?.length >= 1) {
            newState = [...selected, item]
        } else {
            newState = [item]
        }
        setSelected(newState);

    }

    const removeSelectItem = (item) => {
        const index = selected.findIndex((element) => element.id === item.id)
        const newState = selected.filter((element) => element.id != item.id);
        setSelected(newState);
    }

    const toggleSelected = (item) => {

        const validate = validateExist(item.id);

        if (validate) {
            removeSelectItem(item)
        } else {
            addItemSelected(item)
        }

    }

    const includeSelected = (id) => selected.find((element) => element.id === id);

    const validateSelected = () => {
        let validate = selected?.length >= 1 ? true : false;

        if (validate) {
            return true
        } else {
            dispatchglobal({ type: actionTypesGlobal.setNotification, payload: 'Agregue al menos una carga para confirmar su salida' })
        }
    }

    const validateTransporter = () => {
        if (selectTransporter != '') {
            return true
        } else {
            dispatchglobal({ type: actionTypesGlobal.setNotification, payload: 'Selecciona la linea transportista' })
        }
    }

    const validateOperator = () => {
        if (selectOperator != '') {
            return true
        } else {
            dispatchglobal({ type: actionTypesGlobal.setNotification, payload: 'Selecciona el operador' })
        }
    }

    const sendExitRegister = () => {

        if (validateSelected() && validateTransporter() && validateOperator()) {

            let registers = []

            if (typeChargue === "Tanque") {
                selected.map((value, index) => {
                    registers.push({
                        id: tanques[index].id,
                        tracto: tracto,
                        carga: typeChargue,
                        operador: selectOperator,
                        transportista: selectTransporter,
                        numero_tanque: value.tanque
                    });

                })
            } else {
                registers.push({
                    id: tanques[0].id,
                    tracto: selectTracto,
                    carga: typeChargue,
                    operador: selectOperator,
                    transportista: selectTransporter,
                    numero_tanque: null
                });
            }

            console.log(registers)

            sendOutputRegisters(registers, 'complete')
            toggleModal()
            setSelectOperator('')
            setSelectTransporter('')
            setSelected([])

        }

    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    alignItems: 'start',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: 'auto',
                    minWidth: '300px',
                    padding: '20px',
                    borderRadius: '4px'
                }}
            >
                <Typography variant='h6'>Confirma la salida</Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                        width: '100%'
                    }}>
                    <Stack width='100%' spacing='10px'>
                        <Typography variant='caption'>{`${selected.length} de ${state.selectOutputRegisters.length} agregados`}</Typography>
                        {state.selectOutputRegisters.map((tank) => (
                            <Stack
                                key={tank.numero_tanque}
                                flexDirection='row'
                                gap='10px'
                                >
                                <Paper
                                    onClick={() => toggleSelected(tank)}
                                    elevation={4}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: '10px',
                                        backgroundColor: includeSelected(tank.id) ? '#0288d1' : 'white',
                                        color: includeSelected(tank.id) ? 'white' : 'black',
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        cursor:'pointer'

                                    }}
                                >
                                    <Typography>{`${typeChargue} ${tank.tanque ? tank.tanque : ''}`}</Typography>

                                    <IconButton
                                    >
                                        <CheckIcon sx={{ color: includeSelected(tank.id) ? 'white' : 'black' }} />
                                    </IconButton>
                                </Paper>

                            </Stack>
                        ))}
                    </Stack>

                    <SelectSimple
                        type={'obj'}
                        title="linea transportista"
                        value={selectTransporter}
                        options={allTransporters}
                        onChange={(e) => setSelectTransporter(e.target.value)}
                        width={'100%'}
                        required={true}
                    />

                    <InputText
                    label='tracto'
                    value={selectTracto}
                    onChangue={(e) => setSelectTracto(e.target.value)}
                    required={true}
                    width={'100%'}
                    />

                    <SelectSimple
                        type='obj'
                        title="Operadores"
                        value={selectOperator}
                        options={operators}
                        onChange={(e) => setSelectOperator(e.target.value)}
                        width={'100%'}
                        required={true}
                    />

                </Box>

                <Button
                    onClick={sendExitRegister}
                    fullWidth
                    color="success"
                    variant="contained">
                    confirmar seleccionados
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    color='error'
                    onClick={() => dispatch({type: actionTypes.setModalRegister, payload: false})}>
                    cerrar
                </Button>

            </Box>
        </>
    );
}

export { FormCheckTank };