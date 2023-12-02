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
import { useGetTractos } from "../../Hooks/tractosManagment/useGetTractos";
//helpers
import { InputText } from "../InputText";
import { ToggleItem } from "../../Helpers/crud";
//icons
import ClearIcon from '@mui/icons-material/Clear';
import { ManiobrasContext } from "../../Context/ManiobrasContext";

function FormCheckTank() {

    const [stateGlobal, dispatchglobal] = useContext(GlobalContext);
    const [state, dispatch] = useContext(ManiobrasContext)
    const { sendOutputRegisters } = usePostRegister();
    const { updateTractoWhitId } = useGetTractos();
    const { transporters } = useGetTransporters();
    const { states } = useGetOperators();
    const { selectOutputRegisters } = state;
    const { operators } = states;

    const typeRegister = selectOutputRegisters.length >= 1 ? selectOutputRegisters[0].carga : null;

    const allTransporters = transporters.map((transporter) => ({
        id: transporter.id,
        nombre: transporter.name,
    }))

    const [selectTransporter, setSelectTransporter] = useState('');
    const [selectOperator, setSelectOperator] = useState('');
    const [selectTracto, setSelectTracto] = useState('');

    const validateSelected = () => {
        let validate = selectOutputRegisters?.length >= 1 ? true : false;

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

    const toggleSelectRegisters = (item) => {
        const newState = ToggleItem(item, selectOutputRegisters)
        dispatch({ type: actionTypes.setSelectOutputRegister, payload: newState })
    }

    const sendExitRegister = () => {

        if (validateSelected() && validateTransporter() && validateOperator()) {

            let registers = []

            selectOutputRegisters.map((value, index) => {

                if (value.carga === 'Tanque') {
                    registers.push({
                        id: value.registro_id,
                        tracto: selectTracto,
                        carga: value.carga,
                        operador: selectOperator,
                        transportista: selectTransporter,
                        numero_tanque: value.numero_tanque
                    });
                }

            })


            // console.log(registers)
            sendOutputRegisters(registers, 'complete')
            dispatch({ type: actionTypes.setSelectOutputRegister, payload: [] })
            dispatch({ type: actionTypes.setModalRegister, payload: false })
            toggleModal()
            setSelectOperator('')
            setSelectTransporter('')
            setSelected([])
        }

    }

    const sendOutputRegisterPipa = async () => {

        if (validateSelected() && validateTransporter() && validateOperator()) {

            let registers = []

            selectOutputRegisters.map(async(value, index) => {

                registers.push({
                    id: value.registro_id,
                    tracto: value.tracto,
                    carga: value.carga,
                    operador: selectOperator,
                    transportista: selectTransporter,
                });


            })
        }
    }

    const sendOutputRegisterEmptyTracto = async () => {

        if (validateOperator()) {

            selectOutputRegisters.map(async(value, index) => {

            let registers = []

            registers.push({
                id: value.registro_id,
                tracto: value.tracto,
                carga: 'vacio',
                operador: selectOperator,
            });

            const promises = registers.map(async (promise) => {
                await updateTractoWhitId(promise.id, 'onroute')
            });

            await Promise.all(promises)
        })
    }}


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

                        {(state.selectOutputRegisters.length === 0) &&
                            <Typography variant='body1'>
                                Sin salidas pendientes
                            </Typography>}

                        {state.selectOutputRegisters.map((tank) => (
                            <Stack
                                key={tank.registro_id}
                                flexDirection='row'
                                gap='10px'
                            >
                                <Paper
                                    onClick={() => toggleSelectRegisters(tank)}
                                    elevation={4}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: '10px',
                                        backgroundColor: '#0288d1',
                                        color: 'white',
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer'

                                    }}
                                >

                                    {typeRegister === 'Tanque' && <Typography>{`N° de tanque ${tank.numero_tanque}`}</Typography>}

                                    {typeRegister === 'Pipa' && <Typography>{`N° de tracto ${tank.tracto}`}</Typography>}

                                    {typeRegister === 'Vacio' && <Typography>{`Tractocamion vacio # ${tank.tracto}`}</Typography>}

                                    <IconButton
                                    >
                                        <ClearIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                </Paper>

                            </Stack>
                        ))}
                    </Stack>

                    {typeRegister != 'Vacio' &&
                        <SelectSimple
                            type={'obj'}
                            title="linea transportista"
                            value={selectTransporter}
                            options={allTransporters}
                            onChange={(e) => setSelectTransporter(e.target.value)}
                            width={'100%'}
                            required={true}
                        />}

                    {(typeRegister === 'Tanque') &&
                        <InputText
                            label='tracto'
                            value={selectTracto}
                            onChangue={(e) => setSelectTracto(e.target.value)}
                            required={true}
                            width={'100%'}
                        />
                    }
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
                    color="primary"
                    variant="contained">
                    confirmar seleccionados
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    color='error'
                    onClick={() => dispatch({ type: actionTypes.setModalRegister, payload: false })}>
                    cerrar
                </Button>

            </Box>
        </>
    );
}

export { FormCheckTank };