//imports hooks
import { useState } from "react";
//imports materialui
import { Container, Box, Tabs, Tab, Button, Stack, Fade, Typography, Paper, } from "@mui/material";
//import custom components
import { SelectSimple } from "../../components/SelectSimple";
import { InputText } from "../../components/InputText";
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { HistoryItem } from "../../components/HistoryItem";
//days
import { currentDate } from "../../Helpers/date";

function Vigilancia() {

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

    const mockHistory = [
        {
            hora: currentDate,
            linea: 'Linea random',
            tracto: 'Un tracto chido',
            tipo: 'Salida',
            tanque: 'C-2356',
            operador: 'Juan Miguel Salazar Perez',
            celular: '5577828470'
        },
        {
            hora: currentDate,
            linea: 'Linea random2',
            tracto: 'Un tracto maso',
            tipo: 'Entrada',
            tanque: 'C-2352',
            operador: 'Lucas Ascencio Lopez',
            celular: '5577828470'
        },
        {
            hora: currentDate,
            linea: 'Linea random3',
            tracto: 'Un tracto ñe',
            tipo: 'Salida',
            tanque: 'C-8299',
            operador: 'Armando Mendoza Lopez',
            celular: '5577828470'
        }
    ]

    const ExitRegisters = mockHistory? mockHistory.filter( (register) => register.tipo === 'Salida' ) : [];
    const InputRegisters = mockHistory? mockHistory.filter( (register) => register.tipo === 'Entrada' ) : [];


    const [select, setSelet] = useState('');
    const [tracto, setTracto] = useState('');
    const [typeChargue, setTypeChargue] = useState('');
    const [operator, setOperator] = useState('')
    const [tab, setTab] = useState(0)
    const [numTank, setNumTank] = useState(0)
    const [dataTank, setDataTank] = useState([
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

    const handleChangeList = (event) => {
        setSelet(event.target.value);
    };

    const OnChangueDataTank = (event, index) => {
        const update = dataTank[index] = event.target.value
        setDataTank({
            ...dataTank,
            update
        })
    }

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
                                    width={'100%'}
                                    title={'Tipo de carga'}
                                    value={typeChargue}
                                    options={['Tanque', 'Pipa']}
                                    onChange={handleChangueTypeChargue}
                                />

                                {typeChargue === 'Tanque' &&
                                    <SelectSimple
                                        width={'100%'}
                                        title={'Numero de tanques'}
                                        value={numTank}
                                        options={[1, 2, 3, 4]}
                                        onChange={handleNumTank}
                                    />}

                                {numTank >= 1 && typeChargue === 'Tanque' && (
                                    <InputText
                                        width='100%'
                                        label={'Tanque #1'}
                                        value={dataTank.numTank1}
                                        onChangue={(event) => OnChangueDataTank(event, 0)}
                                    />
                                )}

                                {numTank >= 2 && typeChargue === 'Tanque' && (
                                    <InputText
                                        width='100%'
                                        label={'Tanque #2'}
                                        value={dataTank.numTank1}
                                        onChangue={(event) => OnChangueDataTank(event, 1)}
                                    />
                                )}

                                {numTank >= 3 && typeChargue === 'Tanque' && (
                                    <InputText
                                        width='100%'
                                        label={'Tanque #3'}
                                        value={dataTank.numTank1}
                                        onChangue={(event) => OnChangueDataTank(event, 2)}
                                    />
                                )}

                                {numTank >= 4 && typeChargue === 'Tanque' && (
                                    <InputText
                                        width='100%'
                                        label={'Tanque #4'}
                                        value={dataTank.numTank1}
                                        onChangue={(event) => OnChangueDataTank(event, 3)}
                                    />
                                )}

                                <SelectSimple
                                    width={'100%'}
                                    title={'Linea transportista'}
                                    value={select}
                                    options={listTransporters}
                                    onChange={handleChangeList}
                                />

                                <InputText
                                    width={'100%'}
                                    label='Numero de tracto'
                                    value={tracto}
                                    onChangue={handleChangeTracto}
                                />

                                <SelectSimple
                                    width={'100%'}
                                    title={'Operador'}
                                    value={operator}
                                    options={listOperators}
                                    onChange={(e) => handleChangueOperator(e.target.value)}
                                />

                                <Button fullWidth variant="contained">Registrar</Button>

                            </Box>
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
                                <Paper elevation={4} sx={{ padding: '20px' }}>
                                    <Stack spacing='5px'>
                                        {
                                            ExitRegisters.map((item, index) => (
                                                <HistoryItem
                                                    key={index}
                                                    hora={item.hora}
                                                    linea={item.linea}
                                                    tracto={item.tracto}
                                                    tipo={item.tipo}
                                                    tanque={item.tanque}
                                                    operador={item.operador}
                                                    celular={item.celular}
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
                                            InputRegisters.map((item, index) => (
                                                <HistoryItem
                                                    key={index}
                                                    hora={item.hora}
                                                    linea={item.linea}
                                                    tracto={item.tracto}
                                                    tipo={item.tipo}
                                                    tanque={item.tanque}
                                                    operador={item.operador}
                                                    celular={item.celular}
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
        </>
    );
}

export { Vigilancia };