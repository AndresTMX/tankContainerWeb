import { useState } from "react";
import { Box, Chip, Stack, Button, IconButton, Typography, Modal, Paper, Divider, Fade } from "@mui/material";
import { TextGeneral } from "../TextGeneral";
import {SelectSimple} from '../SelectSimple';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import InfoIcon from '@mui/icons-material/Info';
import useMediaQuery from "@mui/material/useMediaQuery";

function DetailsCheckList({ data, action, submit, ChangueNextStep, nextStep }) {

    const IsSmall = useMediaQuery('(max-width:750px)');
    const IsExtraSmall = useMediaQuery('(max-width:500px)');
     //datos
     const checkIn = data.checkIn;
     const linea = data.linea;
     const tracto = data.tracto;
     const pipa = data.tanques? false: true;
     const tanques = data?.tanques;
     const operador =  data?.operador;
     const checkOut = data?.checkOut;
     //numero de tanques por carga
     const tanquesNum = tanques? tanques.length: 0;
     //tipo de carga
     const typeRegister =  checkOut === undefined? 'Entrada' : 'Salida';
     const typeChargue = pipa? 'Pipa': 'Tanques';
     //fecha y hora de entrada formateada
     const dayInput = checkIn ? `${checkIn.$D}/${checkIn.$H}/${checkIn.$y}`:'00:00'
     const dateInput = checkIn ? `${checkIn.$H}:${checkIn.$m}`:'00:00'
     //fecha y hora de salida formateada
     const dayOutput = checkOut ? `${checkOut.$D}/${checkOut.$H}/${checkOut.$y}`: '00:00';
     const dateOutput = checkOut ? `${checkOut.$H}:${checkOut.$m}`: '00:00';
     //Nmbre corto del operador
     const OperatorSliceName = operador.name.split(' ').slice(0, 2);
     const shortNameOperator = `${OperatorSliceName[0]} ${OperatorSliceName[1]}`;
    const [modal, setModal] = useState({modal1:false, modal2:false, modal3:false});

    const ToggleModal = () => {
        setModal({...modal, modal1: !modal.modal1})
    }

    const ShowModalWarning = () => {
        setModal({...modal, modal2: !modal.modal2})
    }

    const ToggleAction = () => {
        if (action) {
            action()
        }
    }

    const ToggleModalDetailsDate = () => {
        setModal({...modal, modal3: !modal.modal3})
    }

    return (
        <>
            <Paper
                elevation={4}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap:'wrap',
                        alignItems: 'center',
                        gap: '20px',
                        backgroundColor: 'whitesmoke',
                        padding: '20px',
                        borderRadius: '4px',
                    }}
                >
                    <Chip color='info' 
                    label={dateInput} 
                    icon={<AccessTimeIcon />} 
                    onClick={ToggleModalDetailsDate}
                    sx={{ 
                        fontWeight: 500, 
                        paddingRight: '2px' 
                    }} />
                  
                    <Stack 
                    flexDirection={IsExtraSmall? 'column' :'row'} 
                    flexWrap={IsExtraSmall? 'wrap' :'nowrap'} 
                    gap='10px' 
                    width={IsExtraSmall? '100%': '400px'} >
                        <TextGeneral label='Linea' text={linea} />
                        <Divider orientation={IsExtraSmall? 'horizontal':'vertical'} flexItem />
                        <TextGeneral label='Tracto' text={tracto} />
                        <Divider orientation={IsExtraSmall? 'horizontal':'vertical'} flexItem />
                        {!pipa && <TextGeneral label='N° Tanques' text={tanquesNum} />}
                    </Stack>

                    <IconButton
                        color="primary"
                        onClick={ToggleModal}>
                        <InfoIcon />
                    </IconButton>

                    <Button
                        variant='contained'
                        onClick={ShowModalWarning}
                    >
                        Check
                    </Button>
                    
                    <IconButton
                        variant="contained"
                        color='error'
                        onClick={ToggleAction}
                    >
                        <DoDisturbIcon />
                    </IconButton>
                    
                </Box>
            </Paper>

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
                 in={modal.modal1}
                 timeout={500}
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
                    <Typography variant="h6">Informacion del operador</Typography>

                    <TextGeneral label='Operador' text={operador.name} />
                    <TextGeneral label='Contacto' text={operador.celular} />

                    <Button
                        fullWidth
                        variant="contained"
                        color='error'
                        onClick={ToggleModal}>
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
                in={modal.modal2}
                timeout={500}
                >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        width: 'auto',
                        padding: '20px',
                        borderRadius: '4px'
                    }}
                >
                    <Typography variant="h6">¿Desea completar el check list?</Typography>

                    <SelectSimple 
                    width={'100%'}
                    title='Siguiente etapa'
                    value={nextStep}
                    options={['prelavado', 'reparación']}
                    onChange={ChangueNextStep}
                    helperText={'Selecciona a que etapa pasa este contedor'}
                    />
                    
                    <Stack 
                    width={'100%'}
                    gap='10px'
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    >

                    <Button
                        fullWidth
                        variant="contained"
                        color='primary'
                        size="small"
                        onClick={ShowModalWarning}>
                        completar
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        color='error'
                        size="small"
                        onClick={ShowModalWarning}>
                        cancelar
                    </Button>
                    </Stack>

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
                in={modal.modal3}
                timeout={500}
                >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        width: 'auto',
                        padding: '20px',
                        borderRadius: '4px'
                    }}
                >
                    <Typography variant="h6">Información de ingreso</Typography>

                    <TextGeneral label="Fecha de ingreso" text={dayInput}/>
                    <TextGeneral label="Hora de ingreso" text={dateInput}/>

                    <Button
                        fullWidth
                        variant="contained"
                        color='error'
                        size="small"
                        onClick={ToggleModalDetailsDate}>
                        cerrar
                    </Button>

                </Box>
                </Fade>
            </Modal>
        </>
    );
}

export { DetailsCheckList };