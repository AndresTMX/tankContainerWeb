import { useState } from "react";
//imports materialui
import { Box, Button, Stack, Fade, Chip, Divider, Modal, Paper, IconButton, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import useMediaQuery from "@mui/material/useMediaQuery";

function MaintenancesItem({maintance}) {

    const [modal, setModal] = useState({modal1:false, modal2: false})

    const { hora, linea, tracto, tanque, operador, celular, status, tipo, date_end } = maintance;

    const IsSmall = useMediaQuery('(max-width:940px)');
    const IsExtraSmall = useMediaQuery('(max-width:450px)');


    const dateTransform = `${hora.$H}:${hora.$m}`

    const dayTransform = `${hora.$D}/${hora.$H}/${hora.$y}`

    const dayEndTransform = `${date_end.$D}/${date_end.$H}/${date_end.$y}`

    const statusColor = status === 'complete'? 'success' : status === 'proces'? 'primary' : 'warning'

    const ToggleInfo = () => {
        setModal({...modal, modal1:!modal.modal1})
    }

    const ToggleFormRepair = () => {
        setModal({...modal, modal2:!modal.modal2})
    }

    return ( 
        <>
        <Box
        sx={{
            display:'flex',
            gap:'15px',
            alignItems:IsSmall? 'start' : 'center',
            flexDirection:IsSmall? 'column' : 'row',
            backgroundColor:'whitesmoke',
            padding:'20px',
            borderRadius:'4px',
            width: IsSmall? '100%' : 'auto',
        }}
        >

            <Stack flexDirection='row' gap='15px' alignItems='center'>
                 <Chip label={date_end? dayEndTransform : dayTransform} icon={<CalendarMonthIcon/>} />
                 <span>{tipo}</span>
            </Stack>
            
            <Stack 
            width={IsSmall? 'auto': '400px'}
            flexDirection={IsExtraSmall? 'column':'row'} 
            justifyContent={IsSmall? 'flex-start' : 'space-between'}
            alignItems={IsSmall? 'start':'center'} 
            gap='10px'>
            <span>{linea}</span>
            <Divider orientation={IsExtraSmall ? 'horizontal' : 'vertical'} flexItem />
            <span>{tracto}</span>
            <Divider orientation={IsExtraSmall ? 'horizontal' : 'vertical'} flexItem />
            <span>{tanque}</span>
            <Divider orientation={IsExtraSmall ? 'horizontal' : 'vertical'} flexItem />
            </Stack>

            <Stack flexDirection='row' alignItems='center' gap='10px'>
            <Chip label={status} color={statusColor} />
            {(status === 'pending' || status === 'proces' )&& 
            <Button
            size="small"
            variant="contained"
            onClick={ToggleFormRepair}
            >
                {status === 'pending'? 'reparar' : 'completar'}
            </Button>}
            <IconButton
            color="primary"
            onClick={ToggleInfo}
            >
                <InfoIcon/>
            </IconButton>
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
                <Fade in={modal.modal1} timeout={500} >
                    <Box 
                    sx={{
                        display:'flex',
                        placeItems:'center',
                        height:'100vh'
                    }} 
                    >
                        <Paper
                            elevation={4}
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
                            <Typography variant="h6">Detalles de ingreso</Typography>

                            <Stack spacing='0px'>
                                <strong>Hora de ingreso</strong>
                                <p>{dateTransform}</p>
                            </Stack>

                            <Stack spacing='0px'>
                                <strong>Nombre del operador</strong>
                                <p>{operador}</p>
                            </Stack>

                            <Stack spacing='0px'>
                                <strong>Contacto</strong>
                                <p>{celular}</p>
                            </Stack>

                            {status === 'proces' && 
                            <Stack spacing='0px'>
                                <strong>El mantenimiento se inicio</strong>
                                <p>{dateTransform}</p>
                            </Stack>}

                            {status === 'complete' && 
                            <Stack spacing='0px'>
                                <strong>El mantenimiento finalizo</strong>
                                <p>{dateTransform}</p>
                            </Stack>}

                            <Button
                                fullWidth
                                variant="contained"
                                color='error'
                                onClick={ToggleInfo}>
                                cerrar
                            </Button>

                        </Paper>
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
                <Fade in={modal.modal2} timeout={500} >
                    <Box
                    sx={{
                        display:'flex',
                        placeItems:'center',
                        height:'100vh'
                    }}
                    >
                        <Paper
                            elevation={4}
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
                            <Typography variant="h6">Formulario de reparación</Typography>

                           <Stack flexDirection='row' alignItems='center' justifyContent='space-between' width='100%' gap='10px'>
                           <Button
                                fullWidth
                                variant="contained"
                                color='primary'
                                onClick={ToggleFormRepair}>
                                {status === 'pending'? 'reparar' : 'completar'}
                            </Button>

                            <Button
                                fullWidth
                                variant="contained"
                                color='error'
                                onClick={ToggleFormRepair}>
                                cerrar
                            </Button>
                           </Stack>

                        </Paper>
                    </Box>
                </Fade>

            </Modal>

        </>
     );
}

export {MaintenancesItem};