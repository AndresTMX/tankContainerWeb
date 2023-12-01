//imports hooks
import { useState, useEffect, useContext } from "react";
import { actionTypes } from "../../Reducers/ManiobrasReducer";
import useMediaQuery from "@mui/material/useMediaQuery";
//imports materialui
import { Container, Box, Tabs, Tab, Button, Stack, Fade, Typography, Paper, Modal, IconButton } from "@mui/material";
//import custom components
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { SelectSimple } from "../../components/SelectSimple";
import { InputText } from "../../components/InputText";
import { FormCheckTank } from "../../components/FormCheckTank";
//context
//hook
import { useFormRegister } from "../../Hooks/useFormRegister";
import { useGetOperators } from "../../Hooks/operadoresManagment/useGetOperators";
import { useGetTransporters } from "../../Hooks/transportersManagment/useGetTransporters";
//notification
import { Notification } from "../../components/Notification";
//loader
import { LoadingState } from "../../components/LoadingState";
//icon
import UpdateIcon from '@mui/icons-material/Update';
//TabsComponents
import { RegisterVigilancia } from "../../components/RegistersVigilancia";
import { ManiobrasContext } from "../../Context/ManiobrasContext";

function Vigilancia() {

    useEffect(() => {
        dispatch({ type: actionTypes.setTypeRegister, payload: 'entrada' })
    }, [])

    const IsSmall = useMediaQuery('(max-width:900px)');
    const [state, dispatch] = useContext(ManiobrasContext)
    //hook de operadores
    const { states, functions } = useGetOperators();
    const { loadingOperators, operators } = states;
    const { updateOperators } = functions;
    const operatorsName = !loadingOperators ? operators.map((operator) => ({
        id: operator.id,
        nombre: operator.nombre
    })) : [];
    //hook de formulario
    const { statesFormRegister, functionsFormRegister } = useFormRegister();
    const { typeChargue, tracto, select, operator, numTank, dataTank } = statesFormRegister;
    const { handleChangeList, handleNumTank, handleChangeTracto, handleChangueTypeChargue, handleChangueOperator, addRegister, setDataTank } = functionsFormRegister;
    //hook de transportistas
    const { transporters, updateAllTransports } = useGetTransporters();
    const arrayTransporters = transporters.length >= 1 ? transporters.map((transporter) => ({
        id: transporter.id,
        nombre: transporter.name
    })) : [];

    const [modal, setModal] = useState(false)
    const [tab, setTab] = useState(0)

    const ToggleModalForm = (event) => {
        setModal(!modal)
    }

    const ToggleTab = (event, newValue) => {
        setTab(newValue)
    }

    const submitRegister = () => {
        setModal(!modal)
        addRegister()
    }

    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: IsSmall ? '' : 'center',
                    justifyContent: 'center',
                }}
            >

                <Tabs
                    value={tab}
                    onChange={ToggleTab}
                    variant={IsSmall ? "scrollable" : null}
                >
                    <Tab label="Registro" />
                    <Tab label="Historial" />
                </Tabs>

                <CustomTabPanel value={tab} index={0}>
                    <Fade
                        timeout={500}
                        in={tab === 0 ? true : false}
                    >
                        <Container sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '50px' }}>
                            <Paper
                                elevation={2}
                                sx={{
                                    paddingLeft: '10px',
                                    paddingRight: '10px'
                                }}>
                                <Stack
                                    width='100%'
                                    flexDirection='row'
                                    alignItems='center'
                                    justifyContent='space-between'>
                                    <Typography color='GrayText'>
                                        Actualizar datos
                                    </Typography>
                                    <IconButton
                                        color="primary"
                                        onClick={() => { updateOperators(); updateAllTransports(); }}>
                                        <UpdateIcon />
                                    </IconButton>
                                </Stack>
                            </Paper>
                            <form onSubmit={ToggleModalForm}>
                                <Paper
                                    elevation={4}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '15px',
                                        width: '100%',
                                        minWidth: '200px',
                                        padding: '20px',
                                        borderRadius: '4px',
                                    }}
                                >
                                    <SelectSimple
                                        required={true}
                                        width={'100%'}
                                        title={'Tipo de carga'}
                                        value={typeChargue}
                                        options={['Tanque', 'Pipa']}
                                        onChange={handleChangueTypeChargue}
                                    />

                                    {typeChargue === 'Tanque' &&
                                        <SelectSimple
                                            required={true}
                                            width={'100%'}
                                            title={'Numero de tanques'}
                                            value={numTank}
                                            options={[1, 2, 3, 4]}
                                            onChange={handleNumTank}
                                        />}

                                    {numTank >= 1 && typeChargue === 'Tanque' && (
                                        <InputText
                                            required={true}
                                            width='100%'
                                            label={'Tanque #1'}
                                            value={dataTank.numTank1}
                                            onChangue={(event) => setDataTank({ ...dataTank, numTank1: event.target.value })}
                                        />
                                    )}

                                    {numTank >= 2 && typeChargue === 'Tanque' && (
                                        <InputText
                                            required={true}
                                            width='100%'
                                            label={'Tanque #2'}
                                            value={dataTank.numTank2}
                                            onChangue={(event) => setDataTank({ ...dataTank, numTank2: event.target.value })}

                                        />
                                    )}

                                    {numTank >= 3 && typeChargue === 'Tanque' && (
                                        <InputText
                                            required={true}
                                            width='100%'
                                            label={'Tanque #3'}
                                            value={dataTank.numTank3}
                                            onChangue={(event) => setDataTank({ ...dataTank, numTank3: event.target.value })}

                                        />
                                    )}

                                    {numTank >= 4 && typeChargue === 'Tanque' && (
                                        <InputText
                                            required={true}
                                            width='100%'
                                            label={'Tanque #4'}
                                            value={dataTank.numTank4}
                                            onChangue={(event) => setDataTank({ ...dataTank, numTank4: event.target.value })}

                                        />
                                    )}

                                    <SelectSimple
                                        type='obj'
                                        required={true}
                                        width={'100%'}
                                        title={'Linea transportista'}
                                        value={select}
                                        options={arrayTransporters}
                                        onChange={handleChangeList}
                                    />

                                    <InputText
                                        required={true}
                                        width={'100%'}
                                        label='Numero de tracto'
                                        value={tracto}
                                        onChangue={handleChangeTracto}
                                    />

                                    <SelectSimple
                                        type={'obj'}
                                        required={true}
                                        width={'100%'}
                                        title={'Operador'}
                                        value={operator}
                                        options={operatorsName}
                                        onChange={(e) => handleChangueOperator(e.target.value)}
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained">
                                        Registrar
                                    </Button>

                                </Paper>
                            </form>
                        </Container>
                    </Fade>
                </CustomTabPanel>

                <CustomTabPanel value={tab} index={1}>
                    <Fade
                        timeout={500}
                        in={tab === 1 ? true : false}
                    >
                        <Box>
                            <RegisterVigilancia />
                        </Box>
                    </Fade>
                </CustomTabPanel>

            </Container>

            <Modal open={modal}>
                <Fade in={modal} timeout={500}>
                    <Container>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                            <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px' }}>
                                <Typography>¿Seguro que quiere enviar este registro?</Typography>
                                <Stack flexDirection='row' justifyContent='space-between' gap='10px'>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={submitRegister}
                                    >Enviar</Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="error" on
                                        onClick={ToggleModalForm}>
                                        Cancelar</Button>
                                </Stack>

                            </Paper>
                        </Box>
                    </Container>
                </Fade>
            </Modal>

            <Modal
                open={state.modalSendRegisters}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Fade timeout={500} in={state.modalSendRegisters}>
                    <Box>
                        <FormCheckTank />
                    </Box>
                </Fade>
            </Modal>

            <Notification />

            <LoadingState duration={1000} />


        </>
    );
}

export { Vigilancia };