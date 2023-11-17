//imports hooks
import { useState, useContext } from "react";
//imports materialui
import { Container, Box, Tabs, Tab, Button, Stack, Fade, Typography, Paper, Modal, IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
//import custom components
import { ContainerScroll } from "../../components/ContainerScroll";
import { SelectSimple } from "../../components/SelectSimple";
import { InputText } from "../../components/InputText";
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { HistoryItem } from "../../components/HistoryItem";
//context
import { DevelopmentContext } from "../../Context";
//hook
import { useFormRegister } from "../../Hooks/useFormRegister";
import { useGetOperators } from "../../Hooks/operadoresManagment/useGetOperators";
//notification
import { Notification } from "../../components/Notification";
//loader
import { LoadingState } from "../../components/LoadingState";
import { actionTypes } from "../../Reducers";
//icon
import UpdateIcon from '@mui/icons-material/Update';

function Vigilancia() {

    const { states, functions } = useGetOperators();

    const { loadingOperators, operators } = states;

    const { updateOperators } = functions;

    const operatorsName = !loadingOperators ? operators.map((operator) => ({
        id: operator.id,
        nombre: operator.nombre
    })) : [];

    const listTransporters = [
        'transportista 1',
        'transportista 2',
        'transportista 3',
        'transportista 4',
        'transportista 5',
    ]

    const IsSmall = useMediaQuery('(max-width:900px)');
    const [state, dispatch] = useContext(DevelopmentContext);
    const { statesFormRegister, functionsFormRegister } = useFormRegister();

    const { typeChargue, tracto, select, operator, numTank, dataTank } = statesFormRegister;
    const { handleChangeList, handleNumTank, handleChangeTracto, handleChangueTypeChargue, handleChangueOperator, addRegister, setDataTank } = functionsFormRegister;

    const { registers, notification } = state

    const InputRegisters = state ? registers.filter((register) => register.checkOut === undefined) : [];
    const ExitRegisters = state ? registers.filter((register) => register.checkOut != undefined) : [];

    const [modal, setModal] = useState(false)
    const [tab, setTab] = useState(0)

    const ToggleModalForm = (event) => {
        setModal(!modal)
    }

    const ToggleModalNotification = () => {
        dispatch({ type: actionTypes.setNotification, payload: !notification })
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

                <Tabs value={tab} onChange={ToggleTab} >
                    <Tab label="Registro de entrada" />
                    <Tab label="Entadas" />
                    <Tab label="Salidas" />
                    <Tab label="Checklist de salida" />

                </Tabs>

                <CustomTabPanel value={tab} index={0}>
                    <Fade
                        timeout={500}
                        in={tab === 0 ? true : false}
                    >
                        <Container sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Paper 
                                elevation='2'
                                sx={{
                                paddingLeft:'10px',
                                paddingRight:'10px'
                                }}>
                                <Stack 
                                width='100%' 
                                flexDirection='row' 
                                alignItems='center' 
                                justifyContent='space-between'>
                                    <Typography>
                                        Actualizar operadores
                                    </Typography>
                                    <IconButton 
                                    color="primary"
                                    onClick={updateOperators}> 
                                        <UpdateIcon/>
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
                                        minWidth: '300px',
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
                                        required={true}
                                        width={'100%'}
                                        title={'Linea transportista'}
                                        value={select}
                                        options={listTransporters}
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
                            <ContainerScroll height='78vh'>
                                <Stack gap='20px'>
                                    {
                                        InputRegisters.map((item, index) => (
                                            <HistoryItem
                                                type='vigilancia'
                                                key={index}
                                                data={item}
                                            />
                                        ))
                                    }
                                </Stack>
                            </ContainerScroll>
                        </Box>
                    </Fade>
                </CustomTabPanel>

                <CustomTabPanel value={tab} index={2}>
                    <Fade
                        timeout={500}
                        in={tab === 2 ? true : false}
                    >
                        <Box>
                            <ContainerScroll height='78vh'>
                                <Stack gap='20px'>
                                    {
                                        ExitRegisters.map((item, index) => (
                                            <HistoryItem
                                                type='vigilancia'
                                                key={index}
                                                data={item}
                                            />
                                        ))
                                    }
                                </Stack>
                            </ContainerScroll>
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
                                        onClick={ToggleModalForm}>Can
                                        celar</Button>
                                </Stack>

                            </Paper>
                        </Box>
                    </Container>
                </Fade>
            </Modal>

            <Notification />

            <LoadingState duration={1000} />


        </>
    );
}

export { Vigilancia };