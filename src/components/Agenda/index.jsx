import { useState, useMemo } from "react";
import dayjs from "dayjs";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Box, Paper, Typography, CircularProgress, Stack, Button, Modal, Container, IconButton, Chip, Divider } from "@mui/material";
//hooks
import { useRealtime } from "../../Hooks/FetchData";
//helpers
import { currentDate, dateTimeLessMinutes, dateInText, datetimeMXFormat } from "../../Helpers/date";
//services
import { getOrdersAprobe, getOrdersCalendar } from "../../services/ordenes";
//icons
import InfoIcon from '@mui/icons-material/Info';
import ClearIcon from '@mui/icons-material/Clear';
import AlarmIcon from '@mui/icons-material/Alarm';
//components
import { CopyPaste } from "../CopyPaste";


export function AgendaProgramacion() {

    const { loading, error, data: eventos } = useRealtime(getOrdersCalendar, 'lavados-calendario', 'ordenes_lavado')

    function formatEvents(listEvents) {
        try {

            return listEvents.map((event) => ({
                start: dateTimeLessMinutes(event.fecha_recoleccion, 60).toDate(),
                end: dayjs(event.fecha_recoleccion).toDate(),
                title: `Orden de ${event.clientes.cliente} `,
                id: event.id,
            }))

        } catch (error) {
            console.error(error)
        }
    }
    const localizer = dayjsLocalizer(dayjs);

    const events = formatEvents(eventos);

    const [modal, setModal] = useState(false);
    const [itemId, setItemId] = useState('');

    function handleModal(id) {
        setModal(!modal)
        setItemId(id)
    }

    const lavadoSelect = useMemo(() => {
        return eventos.filter((item) => item.id === itemId)?.[0]
    }, [itemId]);



    const EventComponent = {


        event: (props) => {

            return (
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }} >
                        <IconButton size="small" onClick={() => handleModal(props.event.id)} >
                            <InfoIcon />
                        </IconButton>
                        <Typography fontSize='12px' >{props.title}</Typography>
                    </Box>

                </>
            )
        }

    }

    return (
        <>
            {(!loading && !error) &&
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    components={EventComponent}
                    style={{
                        height: '76vh',
                        width: '100%',

                    }}
                />}

            {(loading && !error) &&
                <Stack height='50vh' width='100%' justifyContent='center' alignItems='center' >
                    <CircularProgress color='primary' />
                </Stack>
            }

            <Modal
                open={modal}
                onClose={() => handleModal('')}
                sx={{ paddingTop: '3%' }}
            >

                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '20px',
                            width: 'fit-content',
                            gap: '10px'
                        }}>
                        <Stack flexDirection='row' alignItems='center' justifyContent='space-between' >
                            <Typography variant='subtitle2' >Orden de lavado </Typography>
                            <IconButton
                                color='error'
                                onClick={() => handleModal('')}
                            >
                                <ClearIcon />
                            </IconButton>
                        </Stack>

                        <Box sx={{ padding: '5px', width: 'fit-content' }}>
                            <CopyPaste text={lavadoSelect?.id} />
                        </Box>

                        <Stack flexDirection='row' gap='20px' flexWrap='wrap' alignItems='center' >

                            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5px' }} >
                                <Typography variant='caption' >cliente</Typography>
                                <Typography variant='button' >{lavadoSelect?.clientes.cliente}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5px' }} >
                                <Typography variant='caption' >destino</Typography>
                                <Typography variant='button' >{lavadoSelect?.destinos.destino}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5px' }} >
                                <Typography variant='caption' >status</Typography>
                                <Chip size="small" sx={{ width: 'fit-content' }} color='primary' label={lavadoSelect?.status} />
                            </Box>
                        </Stack>

                        <Divider />

                        <Stack gap='10px' padding='10px' >
                            {lavadoSelect?.tanques?.map((tanque) => (
                                <ItemTanqueWhitDetails key={tanque.id} tanque={tanque} />
                            ))}
                        </Stack>

                        <Divider />

                        <Box sx={{ padding: '10px', bgcolor: dayjs(lavadoSelect?.fecha_recoleccion).isBefore(currentDate) ? '#ed6c02' : '#0288d1', color: 'white', }}>

                            {(!dayjs(lavadoSelect?.fecha_recoleccion).isBefore(currentDate)) && <Typography variant="subtitle2">
                                {<AlarmIcon fontSize="10px" />} Fecha de entrega tentativa
                            </Typography>}

                            {(dayjs(lavadoSelect?.fecha_recoleccion).isBefore(currentDate)) && <Typography variant="subtitle2">
                                {<AlarmIcon fontSize="10px" />} Tiempo de entrega excedido
                            </Typography>}

                            <Typography>{dateInText(lavadoSelect?.fecha_recoleccion)} {datetimeMXFormat(lavadoSelect?.fecha_recoleccion)} </Typography>
                        </Box>

                    </Paper>
                </Container>

            </Modal>
        </>
    )
}

function ItemTanqueWhitDetails({ tanque }) {

    const { numero_tanque, registro_id, tipo, especificacion, descartado } = tanque || {};

    return (
        <>
            <Paper
                elevation={1}
                sx={{ display: descartado ? 'hidden' : 'flex', flexDirection: 'column', padding: '5px', border: '1px solid #E4E4E7' }}>
                <Stack flexDirection='row' gap='10px' alignItems='center' justifyContent='space-between' >

                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5px' }} >
                        <Typography variant='caption' >tanque</Typography>
                        <Typography variant='button' >{numero_tanque || 'no asignado'}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5px' }} >
                        <Typography variant='caption' >tipo</Typography>
                        <Typography variant='button' >{tipo}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '5px' }} >
                        <Typography variant='caption' >especificación</Typography>
                        <Typography variant='button' >{especificacion}</Typography>
                    </Box>
                </Stack>

            </Paper>
        </>
    )
}