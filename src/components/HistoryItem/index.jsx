import { useState } from "react";
import { Box, Button, IconButton, Chip, Stack, Modal, Typography, Divider, Fade, Icon } from "@mui/material";
import { TextGeneral } from "../TextGeneral";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoIcon from '@mui/icons-material/Info';

function HistoryItem({ data, children }) {

    const IsSmall = useMediaQuery('(max-width:900px)');
    // const IsExtraSmall = useMediaQuery('(max-width:450px)');
    //datos
    const checkIn = data.checkIn;
    const linea = data.linea;
    const tracto = data.tracto;
    const tanques = data?.tanques;
    const operador =  data?.operador;
    const checkOut = data?.checkOut;
    //numero de tanques por carga
    const tanquesNum = tanques? tanques.length: 0;
    //tipo de carga
    const typeRegister =  checkOut === undefined? 'Entrada' : 'Salida';
    const typeChargue = tanques? 'Tanques': 'Pipa';
    //fecha y hora de entrada formateada
    const dayInput = checkIn ? `${checkIn.$D}/${checkIn.$H}/${checkIn.$y}`:'00:00'
    const dateInput = checkIn ? `${checkIn.$H}:${checkIn.$m}`:'00:00'
    //fecha y hora de salida formateada
    const dayOutput = checkOut ? `${checkOut.$D}/${checkOut.$H}/${checkOut.$y}`: '00:00';
    const dateOutput = checkOut ? `${checkOut.$H}:${checkOut.$m}`: '00:00';
    //Nmbre corto del operador
    const OperatorSliceName = operador.name.split(' ').slice(0, 2);
    const shortNameOperator = `${OperatorSliceName[0]} ${OperatorSliceName[1]}`;

    const [modal, setModal] = useState({modal1: false, modal2:false, modal3:false});

    const ToggleModalInfoOperator = () => {
        setModal({...modal, modal1: !modal.modal1})
    }

    const ToggleModalInfoDate = () => {
        setModal({...modal, modal2: !modal.modal2})
    }

    const ToggleModalInfoChargue = () => {
        setModal({...modal, modal3: !modal.modal3})
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: IsSmall ? 'column' : 'row',
                    gap: '10px',
                    justifyContent: 'space-between',
                    alignItems:!IsSmall? 'center': 'start',
                    backgroundColor: 'whitesmoke',
                    padding: '20px',
                    borderRadius: '4px',
                    minWidth:'250px'
                }}>

                    <Chip 
                    color='info' 
                    label={typeRegister === 'Entrada'? dateInput: dateOutput} 
                    icon={<AccessTimeIcon />} 
                    sx={{ fontWeight: 500, paddingRight: '2px' }}
                    onClick={ToggleModalInfoDate}
                    />

                <Stack
                    sx={{maxWidth:'700px'}}
                    width={IsSmall ? '100%' : '450px'}
                    flexDirection={IsSmall ? 'column' : 'row'}
                    justifyContent={IsSmall ? 'flex-start' : 'space-around'}
                    alignItems={IsSmall ? 'start' : 'center'}
                    gap='10px'>
                    <TextGeneral text={linea} label="Linea" />
                    <Divider orientation={IsSmall ? 'horizontal' : 'vertical'} flexItem />
                    <TextGeneral label='Tracto' text={tracto}/>
                    <Divider orientation={IsSmall ? 'horizontal' : 'vertical'} flexItem />
                    <TextGeneral label='Tipo de carga' text={typeChargue}/>
                    {typeChargue === 'Tanques' && 
                    <>
                    <Divider orientation={IsSmall ? 'horizontal' : 'vertical'} flexItem />
                    <TextGeneral variant='chip' label='Cantidad' text={tanquesNum} onClick={ToggleModalInfoChargue}/>
                    </>}
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
                            <InfoIcon/>
                        </IconButton>
                        {children}
                    </Stack>

                </Stack>
            </Box>

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

                        <TextGeneral text={operador.name} label="Nombre del operador"/>
                        <TextGeneral text={operador.celular} label="Contacto del operador"/>

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

                        <TextGeneral label={`Fecha de ${typeRegister}`} text={typeRegister != 'Salida'? dayInput:dayOutput }/>
                        <TextGeneral label={`Hora de ${typeRegister}`} text={typeRegister != 'Salida'? dateInput:dateOutput }/>

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
                                <TextGeneral key={tanque.tanque} label={'N° de tanque'} text={tanque.tanque}/>
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
        </>
    );
}

export { HistoryItem };