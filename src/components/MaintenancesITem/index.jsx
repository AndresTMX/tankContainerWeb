import { useState } from "react";
//imports materialui
import { TextGeneral } from "../TextGeneral";
import { Box, Button, Stack, Fade, Chip, Divider, Modal, Paper, Typography } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestoreIcon from '@mui/icons-material/Restore';
import useMediaQuery from "@mui/material/useMediaQuery";
//helpers
import { datetimeMXFormat, tiempoTranscurrido, dateMXFormat, } from "../../Helpers/date";

function MaintenancesItem({ maintance, selectItem, typeRepair, }) {

    const [modal, setModal] = useState({ modal1: false, modal2: false })

    const { checkIn, checkOut, id_usuario, id_detalle_registro, registros_detalles_entradas, status, tipo_reparacion, data } = maintance;

    const IsSmall = useMediaQuery('(max-width:950px)');
    const IsExtraSmall = useMediaQuery('(max-width:680px)');

    const time = tiempoTranscurrido(checkIn)
    const dayTransform = dateMXFormat(checkIn);
    const dateTransform = datetimeMXFormat(checkIn);
    const dayEndTransform = checkOut != null ? dateMXFormat(checkOut) : false;

    const statusColor = status === 'completado' ? 'success' : status === 'proceso' ? 'primary' : 'warning'

    const { numero_tanque, carga, tipo } = registros_detalles_entradas;

    const { tracto } = registros_detalles_entradas.registros || {};

    const ToggleInfo = () => {
        setModal({ ...modal, modal1: !modal.modal1 })
    }

    const ToggleFormRepair = () => {
        setModal({ ...modal, modal2: !modal.modal2 })
    }

    return (
        <>
            <Paper elevation={3}>
                <Stack
                    sx={{
                        display: 'flex',
                        gap: '10px',
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '4px',
                    }}
                >

                    <Stack flexDirection='row' flexWrap='wrap' gap='15px' alignItems='center' justifyContent={'space-between'} >
                        <Stack flexDirection='row' flexWrap='wrap' alignItems='center' gap='15px'>
                            <Chip size="small" label={status} color={statusColor} />
                            <Chip size="small" label={dayEndTransform ? dayEndTransform : dayTransform} color="info" icon={<CalendarMonthIcon />} />
                            <Chip size="small" label={dayEndTransform ? dayEndTransform : dateTransform} color="info" icon={<AccessTimeIcon />} />
                            <Chip size="small" label={time} color="info" icon={<RestoreIcon />} />
                        </Stack>
                        <Stack flexDirection={'row'} gap={'10px'} width={IsExtraSmall ? '100%' : 'auto'}>
                            {(typeRepair === 'pending') &&
                                <Button
                                    fullWidth
                                    size="small"
                                    variant="contained"
                                    onClick={() => selectItem(maintance)}
                                >
                                    iniciar reparación
                                </Button>}

                            {(typeRepair === 'proces') &&
                                <Button
                                    fullWidth
                                    size="small"
                                    variant="contained"
                                    onClick={() => selectItem(maintance)}
                                >
                                    completar reparación
                                </Button>}

                            {(typeRepair === 'complet') &&
                                <Button
                                    fullWidth
                                    size="small"
                                    variant="contained"
                                    onClick={() => selectItem(maintance)}
                                >
                                    ver detalles
                                </Button>}

                        </Stack>
                    </Stack>

                    <Stack
                        width={'100%'}
                        flexDirection={IsExtraSmall ? 'column' : 'row'}
                        flexWrap='wrap'
                        gap='15px'>
                        <TextGeneral
                            label='Tipo de reparación'
                            text={tipo_reparacion}
                        />
                        <Divider orientation={IsExtraSmall ? 'horizontal' : 'vertical'} flexItem />
                        <TextGeneral
                            label={`N° de ${carga}`}
                            text={tracto}
                        />
                        <Divider orientation={IsExtraSmall ? 'horizontal' : 'vertical'} flexItem />
                        <TextGeneral
                            label='N° tanque'
                            text={numero_tanque}
                        />
                        {tipo != null &&
                            <>
                                <Divider orientation={IsExtraSmall ? 'horizontal' : 'vertical'} flexItem />
                                <TextGeneral
                                    label='Tipo'
                                    text={tipo}
                                />
                            </>
                        }
                        {/* {status != 'pendiente' && <Divider orientation={IsExtraSmall ? 'horizontal' : 'vertical'} flexItem />} */}
                    </Stack>

                </Stack>
            </Paper>

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
                            display: 'flex',
                            placeItems: 'center',
                            height: '100vh'
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
                                    {status === 'pending' ? 'reparar' : 'completar'}
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

export { MaintenancesItem };