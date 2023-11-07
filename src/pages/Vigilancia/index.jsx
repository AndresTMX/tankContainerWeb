//imports hooks
import { useState, useContext } from "react";
//imports materialui
import { Container, Box, Tabs, Tab, Button, Stack, Fade, Typography, Paper, Modal,  } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
//import custom components
import { SelectSimple } from "../../components/SelectSimple";
import { InputText } from "../../components/InputText";
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { HistoryItem } from "../../components/HistoryItem";
//context
import { DevelopmentContext } from "../../Context";
//hook
import { useRegister } from "../../Hooks/useRegister";
//notification
import { Notification } from "../../components/Notification";
//loader
import {LoadingState} from "../../components/LoadingState";

function Vigilancia() {

    const [state, dispatch] = useContext(DevelopmentContext);
    console.log("🚀 ~ file: index.jsx:23 ~ Vigilancia ~ state:", state)
    const {addRegister } = useRegister()

    const {registers} = state

    const IsSmall = useMediaQuery('(max-width:900px)');

    const listTransporters = [
        'transportista 1',
        'transportista 2',
        'transportista 3',
        'transportista 4',
        'transportista 5',
    ]

    const listOperators = [
        'operador 1',
        'operador 2',
        'operador 3',
        'operador 4',
        'operador 5',
        'operador 6',
        'operador 7',
    ]

    const InputRegisters = state? registers.filter( (register) => register.checkOut === undefined ) : [];
    const ExitRegisters = state? registers.filter( (register) => register.checkOut != undefined ) : [];

    const [modal, setModal] = useState(false)
    const [select, setSelet] = useState('');
    const [tracto, setTracto] = useState('');
    const [typeChargue, setTypeChargue] = useState('');
    const [operator, setOperator] = useState('')
    const [tab, setTab] = useState(0)
    const [numTank, setNumTank] = useState(0)
    const [dataTank, setDataTank] = useState({numTank1: '', numTank2: '', numTank3: '', numTank4: ''})

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

    const ToggleTab = (event, newValue) => {
        setTab(newValue)
    }

    const ToggleModalRegister = (event) => {
        event.preventDefault();
        setModal(!modal)
    }

    const submitRegister = () => {
        const register = {select, tracto, typeChargue, operator, numTank, dataTank }
        addRegister(register)
        CancelSubmit()
        
    }

    const CancelSubmit = () => {
        setModal(!modal)
    }

    const clearInputs = () => {
        setSelet('')
        setTracto('')
        setTypeChargue('')
        setDataTank([
            {
                numTank1: '',
            },
            {
                numTank2: '',
            },
            {
                numTank3: '',
            },
            {
                numTank4: '',
            },
        ])
        setOperator('')
        setNumTank(0)
    }

    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
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
                            <Typography variant="h6">Formulario de registro</Typography>
                            <form onSubmit={ToggleModalRegister}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '15px',
                                    backgroundColor: 'whitesmoke',
                                    width: '90vw',
                                    maxWidth: '400px',
                                    minWidth: '300px',
                                    padding: '20px',
                                    borderRadius: '4px'
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
                                        onChangue={(event) => setDataTank({...dataTank, numTank1: event.target.value})}
                                    />
                                )}

                                {numTank >= 2 && typeChargue === 'Tanque' && (
                                    <InputText
                                        required={true}
                                        width='100%'
                                        label={'Tanque #2'}
                                        value={dataTank.numTank2}
                                        onChangue={(event) => setDataTank({...dataTank, numTank2: event.target.value})}

                                    />
                                )}

                                {numTank >= 3 && typeChargue === 'Tanque' && (
                                    <InputText
                                        required={true}
                                        width='100%'
                                        label={'Tanque #3'}
                                        value={dataTank.numTank3}
                                        onChangue={(event) => setDataTank({...dataTank, numTank3: event.target.value})}

                                    />
                                )}

                                {numTank >= 4 && typeChargue === 'Tanque' && (
                                    <InputText
                                        required={true}
                                        width='100%'
                                        label={'Tanque #4'}
                                        value={dataTank.numTank4}
                                        onChangue={(event) => setDataTank({...dataTank, numTank4: event.target.value})}

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
                                    required={true}
                                    width={'100%'}
                                    title={'Operador'}
                                    value={operator}
                                    options={listOperators}
                                    onChange={(e) => handleChangueOperator(e.target.value)}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained">
                                    Registrar
                                </Button>


                            </Box>
                                </form>
                        </Container>
                    </Fade>
                </CustomTabPanel>

                <CustomTabPanel value={tab} index={1}>
                    <Fade
                        timeout={500}
                        in={tab === 1 ? true : false}
                    >
                        <Container sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Typography variant="h6">Entradas</Typography>
                            <Box>
                                <Paper elevation={4} sx={{ padding: '20px'}}>
                                    <Stack spacing='5px'>
                                        {
                                            InputRegisters.map((item, index) => (
                                                <HistoryItem
                                                    key={index}
                                                    data={item}
                                                />
                                            ))
                                        }
                                    </Stack>
                                </Paper>
                            </Box>
                        </Container>
                    </Fade>
                </CustomTabPanel>

                <CustomTabPanel value={tab} index={2}>
                    <Fade
                        timeout={500}
                        in={tab === 2 ? true : false}
                    >
                        <Container sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Typography variant="h6">Salidas</Typography>
                            <Box>
                                <Paper elevation={4} sx={{ padding: '20px' }}>
                                    <Stack spacing='5px'>
                                        {
                                            ExitRegisters.map((item, index) => (
                                                <HistoryItem
                                                    key={index}
                                                    data={item}
                                                />
                                            ))
                                        }
                                    </Stack>
                                </Paper>
                            </Box>
                        </Container>
                    </Fade>
                </CustomTabPanel>

            </Container>

            <Modal open={modal}>
                <Fade in={modal} timeout={500}>
                    <Container>
                        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100vh'}}>
                            <Paper sx={{display: 'flex', flexDirection:'column', padding:'20px', gap:'20px'}}>
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
                                    onClick={CancelSubmit}>Can
                                    celar</Button>
                                </Stack>

                            </Paper>
                        </Box>
                    </Container>
                </Fade>
            </Modal>

            <Notification/>

            <LoadingState duration={1000}/>

            
        </>
    );
}

export { Vigilancia };