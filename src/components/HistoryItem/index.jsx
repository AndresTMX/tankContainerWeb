import { useState } from "react";
import { Box, Button, IconButton, Chip, Stack, Modal, Typography, Divider, Fade, Paper } from "@mui/material";
import { TextGeneral } from "../TextGeneral";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoIcon from '@mui/icons-material/Info';

function HistoryItem({ data, id, type, select }) {

    const IsSmall = useMediaQuery('(max-width:900px)');
    // const IsExtraSmall = useMediaQuery('(max-width:450px)');
    //datos
    const checkIn = data.checkIn;
    const linea = data.linea;
    const tracto = data.tracto;
    const tanques = data?.tanques;
    const operador = data?.operador;
    const checkOut = data?.checkOut;
    //numero de tanques por carga
    const tanquesNum = tanques ? tanques.length : 0;
    //tipo de carga
    const typeRegister = checkOut === undefined ? 'Entrada' : 'Salida';
    const typeChargue = tanques ? 'Tanques' : 'Pipa';
    //fecha y hora de entrada formateada
    const dayInput = checkIn ? `${checkIn.$D}/${checkIn.$H}/${checkIn.$y}` : '00:00'
    const dateInput = checkIn ? `${checkIn.$H}:${checkIn.$m}` : '00:00'
    //fecha y hora de salida formateada
    const dayOutput = checkOut ? `${checkOut.$D}/${checkOut.$H}/${checkOut.$y}` : '00:00';
    const dateOutput = checkOut ? `${checkOut.$H}:${checkOut.$m}` : '00:00';
    //Nmbre corto del operador
    const OperatorSliceName = operador.name.split(' ').slice(0, 2);
    const shortNameOperator = `${OperatorSliceName[0]} ${OperatorSliceName[1]}`;

    const [modal, setModal] = useState({ modal1: false, modal2: false, modal3: false });

    const ToggleModalInfoOperator = () => {
        setModal({ ...modal, modal1: !modal.modal1 })
    }

    const ToggleModalInfoDate = () => {
        setModal({ ...modal, modal2: !modal.modal2 })
    }

    const ToggleModalInfoChargue = () => {
        setModal({ ...modal, modal3: !modal.modal3 })
    }

    return (
        <Paper sx={{ padding: '5px' }} elevation={4}>

            {type === 'vigilancia' &&
                <Stack
                    gap='10px'
                    sx={{
                        minWidth: '250px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: IsSmall ? 'column' : 'row',
                            gap: '10px',
                            justifyContent: 'space-between',
                            alignItems: !IsSmall ? 'center' : 'start',
                            backgroundColor: 'whitesmoke',
                            padding: '20px',
                            borderRadius: '4px',
                        }}>

                        <Chip
                            color='info'
                            label={typeRegister === 'Entrada' ? dateInput : dateOutput}
                            icon={<AccessTimeIcon />}
                            sx={{ fontWeight: 500, paddingRight: '2px' }}
                            onClick={ToggleModalInfoDate}
                        />

                        <Stack
                            sx={{ maxWidth: '700px' }}
                            width={IsSmall ? '100%' : '450px'}
                            flexDirection={IsSmall ? 'column' : 'row'}
                            justifyContent={IsSmall ? 'flex-start' : 'space-around'}
                            alignItems={IsSmall ? 'start' : 'center'}
                            gap='10px'>
                            <TextGeneral text={linea} label="Linea" />
                            <Divider orientation={IsSmall ? 'horizontal' : 'vertical'} flexItem />
                            <TextGeneral label='Tracto' text={tracto} />
                            <Divider orientation={IsSmall ? 'horizontal' : 'vertical'} flexItem />
                            <TextGeneral label='Tipo de carga' text={typeChargue} />
                        </Stack>

                        <Stack
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent='space-between'
                            gap='10px'>
                            {!IsSmall && <Divider orientation='vertical' flexItem />}
                            <TextGeneral label='Operador' text={shortNameOperator} />
                            <Stack flexDirection='row' gap='10px'>
                                <IconButton
                                    color="info"
                                    onClick={ToggleModalInfoOperator}>
                                    <InfoIcon />
                                </IconButton>
                            </Stack>

                        </Stack>
                    </Box>

                    {typeChargue === 'Tanques' && (
                        <Stack
                            spacing='5px'
                            justifyContent='center'
                            sx={{
                                padding: '20px',
                                borderRadius: '4px',
                                backgroundColor: 'whitesmoke'
                            }}>
                            <strong>Tanques</strong>
                            {tanques.map((tanque, index) => (
                                <>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                        <TextGeneral
                                            variant='row'
                                            label={`# ${index + 1}`}
                                            text={tanque.tanque} />
                                    </Box>
                                    {tanquesNum != (index + 1) && <Divider orientation={'horizontal'} flexItem />}
                                </>
                            ))}
                        </Stack>
                    )}
                </Stack>}

            {type === 'maniobras' &&
                <Stack
                    gap='10px'
                    sx={{
                        minWidth: '250px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: IsSmall ? 'column' : 'row',
                            gap: '10px',
                            justifyContent: 'space-between',
                            alignItems: !IsSmall ? 'center' : 'start',
                            backgroundColor: 'whitesmoke',
                            padding: '20px',
                            borderRadius: '4px',
                        }}>

                        <Chip
                            color='info'
                            label={typeRegister === 'Entrada' ? dateInput : dateOutput}
                            icon={<AccessTimeIcon />}
                            sx={{ fontWeight: 500, paddingRight: '2px' }}
                            onClick={ToggleModalInfoDate}
                        />

                        <Stack
                            sx={{ maxWidth: '700px' }}
                            width={IsSmall ? '100%' : '450px'}
                            flexDirection={IsSmall ? 'column' : 'row'}
                            justifyContent={IsSmall ? 'flex-start' : 'space-around'}
                            alignItems={IsSmall ? 'start' : 'center'}
                            gap='10px'>
                            <TextGeneral text={linea} label="Linea" />
                            <Divider orientation={IsSmall ? 'horizontal' : 'vertical'} flexItem />
                            <TextGeneral label='Tracto' text={tracto} />
                            <Divider orientation={IsSmall ? 'horizontal' : 'vertical'} flexItem />
                            <TextGeneral label='Tipo de carga' text={typeChargue} />
                            <Divider orientation={IsSmall ? 'horizontal' : 'vertical'} flexItem />
                        </Stack>

                        <Stack
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent='space-between'
                            gap='10px'>
                            <TextGeneral label='Operador' text={shortNameOperator} />
                            <Stack flexDirection='row' gap='10px'>
                                <IconButton
                                    color="info"
                                    onClick={ToggleModalInfoOperator}>
                                    <InfoIcon />
                                </IconButton>
                            </Stack>

                        </Stack>
                    </Box>

                    {typeChargue === 'Tanques' && (
                        <Stack
                            spacing='5px'
                            justifyContent='center'
                            sx={{
                                padding: '20px',
                                borderRadius: '4px',
                                backgroundColor: 'whitesmoke'
                            }}>
                            <strong>Tanques</strong>
                            {tanques.map((tanque, index) => (
                                <>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                        <TextGeneral
                                            variant='row'
                                            label='N° Tanque'
                                            text={tanque.tanque} />
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => select(id, tanque.tanque)}
                                        >Check
                                        </Button>
                                    </Box>
                                    {tanquesNum != (index + 1) && <Divider orientation={'horizontal'} flexItem />}
                                </>
                            ))}
                        </Stack>
                    )}
                </Stack>}



            <Modal
                open={modal.modal1}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center'

                }}
            >
                <Fade
                    timeout={500}
                    in={modal.modal1}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            alignItems: 'start',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            width: 'auto',
                            padding: '20px',
                            borderRadius: '4px'
                        }}
                    >
                        <Typography variant='h6'>Información del operador</Typography>

                        <TextGeneral text={operador.name} label="Nombre del operador" />
                        <TextGeneral text={operador.celular} label="Contacto del operador" />

                        <Button
                            fullWidth
                            variant="contained"
                            color='error'
                            onClick={ToggleModalInfoOperator}>
                            cerrar
                        </Button>

                    </Box>
                </Fade>


            </Modal>

            <Modal
                open={modal.modal2}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center'

                }}
            >
                <Fade
                    timeout={500}
                    in={modal.modal2}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            alignItems: 'start',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            width: 'auto',
                            padding: '20px',
                            borderRadius: '4px'
                        }}
                    >
                        <Typography variant='h6'>{`Informacion de ${typeRegister}`}</Typography>

                        <TextGeneral label={`Fecha de ${typeRegister}`} text={typeRegister != 'Salida' ? dayInput : dayOutput} />
                        <TextGeneral label={`Hora de ${typeRegister}`} text={typeRegister != 'Salida' ? dateInput : dateOutput} />

                        <Button
                            fullWidth
                            variant="contained"
                            color='error'
                            onClick={ToggleModalInfoDate}>
                            cerrar
                        </Button>

                    </Box>
                </Fade>


            </Modal>

            <Modal
                open={modal.modal3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center'

                }}
            >
                <Fade
                    timeout={500}
                    in={modal.modal3}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            alignItems: 'start',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            width: 'auto',
                            padding: '20px',
                            borderRadius: '4px'
                        }}
                    >
                        <Typography variant='h6'>{`Informacion de la carga `}</Typography>

                        {typeChargue === 'Tanques' && (
                            tanques.map((tanque) => (
                                <TextGeneral key={tanque.tanque} label={'N° de tanque'} text={tanque.tanque} />
                            ))
                        )}

                        <Button
                            fullWidth
                            variant="contained"
                            color='error'
                            onClick={ToggleModalInfoChargue}>
                            cerrar
                        </Button>

                    </Box>
                </Fade>


            </Modal>
        </Paper>
    );
}

export { HistoryItem };