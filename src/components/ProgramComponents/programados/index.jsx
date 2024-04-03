import { useState, useEffect, useMemo, useRef } from "react"
// custom components
import { ContainerScroll } from "../../ContainerScroll"
import { ItemLoadingState } from "../../ItemLoadingState"
// components
import { Stack, Alert, Chip, Button, Paper, Box, Divider, Typography, IconButton, Modal, Pagination, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import { DemoContainer, DemoItem, } from "@mui/x-date-pickers/internals/demo"
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
//hooks
import useMediaQuery from "@mui/material/useMediaQuery"
import { useContextProgramacion } from "../../../Context/ProgramacionContext"
import { useNavigate, useParams, Outlet } from "react-router-dom"
//helpers
import { dateInText, datetimeMXFormat, timepoParaX, currentDate, minutosXhoras, diferenciaEnHoras } from "../../../Helpers/date"
//libraries
import dayjs from "dayjs"
import { toast } from "sonner"
//icons
import AlarmIcon from '@mui/icons-material/Alarm';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
//services
import { updateWashing } from "../../../services/programacion"

export function TanquesProgramados() {

    const movile = useMediaQuery('(max-width:820px)');
    const { states } = useContextProgramacion();
    const { searchValue, dataDinamic, loading, error, mode } = states;

    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const rowsPerPage = 5;

    const pages = Math.ceil(dataDinamic?.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return dataDinamic.slice(start, end);
    }, [page, dataDinamic]);



    return (
        <>
            <ContainerScroll height={movile ? '70vh' : '76vh'} background='whitesmoke'>

                <Stack gap='10px' padding='0px' >


                    {(loading && !error && dataDinamic.length < 1) &&
                        <>
                            <ItemLoadingState />
                            <ItemLoadingState />
                            <ItemLoadingState />
                            <ItemLoadingState />
                        </>
                    }

                    {(!loading && !error && dataDinamic.length === 0 && mode === 'data') &&
                        <Alert severity='info'>Sin registros añadidos</Alert>
                    }

                    {(!error && !loading && dataDinamic.length >= 1 && mode === 'search') &&
                        <Alert severity='info'>Resultados de busqueda {searchValue.current?.value} </Alert>
                    }

                    {(!error && !loading && dataDinamic.length === 0 && mode === 'search') &&
                        <Alert severity='warning'>No se encontraron coincidencias para tu busqueda, {searchValue.current?.value}</Alert>
                    }

                    {
                        dataDinamic.map((tanque, index) => (
                            <TanqueProgramado
                                key={index}
                                tanque={tanque}
                            />
                        ))
                    }
                </Stack>
            </ContainerScroll>

            <Pagination variant="outlined" shape="rounded" color="primary" count={pages} page={page} onChange={handleChange} />

            <Outlet />
        </>
    )
}

function TanqueProgramado({ tanque }) {

    const [vencimiento, setVencimiento] = useState(false)

    const movile = useMediaQuery('(max-width:820px)')
    const navigate = useNavigate();

    const { created_at, tentativeEnd, registros_detalles_entradas } = tanque || {};

    const { carga, numero_pipa, numero_tanque, status, transportistas, clientes, especificacion, tipo } = registros_detalles_entradas || {};
    const { name: linea } = transportistas || {};
    const { cliente } = clientes || {};

    const [modalEdit, setModalEdit] = useState(false);
    const entregaTentativa = dayjs(tentativeEnd);

    const reprogramar = () => {
        const tanqueString = encodeURIComponent(JSON.stringify(tanque));
        navigate(`/programacion/programados/reprogramar/${tanqueString}`)
    }

    useEffect(() => {
        if (entregaTentativa.isBefore(currentDate)) {
            setVencimiento(true)
        } else {
            setVencimiento(false)
        }
    }, [tanque])

    return (
        <>
            <Paper
                elevation={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: movile ? '10px' : '15px'
                }}
            >
                <Stack flexDirection='row' gap='10px' justifyContent='space-between'>
                    <Chip color='warning' label={status} />

                    <IconButton onClick={reprogramar} variant="outlined" color='info'>
                        <EditCalendarIcon />
                    </IconButton>
                </Stack>

                <Stack flexDirection={movile ? 'column' : 'row'} gap={movile ? '15px' : '30px'} justifyContent='flex-start'>

                    <Box>
                        <Typography variant="subtitle2">{`N° ${carga}`}</Typography>
                        <Typography>{tipo}  {numero_tanque || numero_pipa}</Typography>
                    </Box>
                    <Divider />
                    {especificacion &&
                        <Box>
                            <Typography variant="subtitle2">Especificacion</Typography>
                            <Typography>{especificacion}</Typography>
                        </Box>}
                    <Divider />
                    <Box>
                        <Typography variant="subtitle2">Cliente</Typography>
                        <Typography>{cliente}</Typography>
                    </Box>


                </Stack>

                <Stack flexDirection={movile ? 'column' : 'row'} alignItems='center' justifyContent='space-between' bgcolor='whitesmoke' width={'100%'} >

                    <Box sx={{ padding: '10px', bgcolor: !vencimiento ? '#ed6c02' : '#d32f2f', color: 'white', width: movile ? '100%' : '50%' }}>
                        <Typography variant="subtitle2">
                            {<ScheduleIcon fontSize="10px" />} {!vencimiento ? 'Tiempo para entrega' : 'Tiempo excedido'} </Typography>
                        <Typography>
                            {vencimiento ? timepoParaX(tentativeEnd) : ''} {!vencimiento ? diferenciaEnHoras(tentativeEnd) : ''}
                        </Typography>
                    </Box>


                    <Box sx={{ padding: '10px', bgcolor: '#0288d1', color: 'white', width: movile ? '100%' : '50%' }}>
                        <Typography variant="subtitle2">
                            {<AlarmIcon fontSize="10px" />} Fecha de entrega tentativa</Typography>
                        <Typography>{dateInText(tentativeEnd)} {datetimeMXFormat(tentativeEnd)} </Typography>
                    </Box>

                </Stack>

            </Paper>


        </>
    )
}

export function ReprogramarLavado() {

    const { tanque } = useParams();
    const navigate = useNavigate();

    const tanqueJson = JSON.parse(decodeURI(tanque));

    const { id, tentativeEnd } = tanqueJson;

    const defaultDate = dayjs();

    const destinoRef = useRef();

    const oldEnd = dayjs(tentativeEnd)

    const [programing, setPrograming] = useState({ tentativeEnd: oldEnd });

    //controller submit
    const submit = async (e) => {
        try {
            e.preventDefault()

            const destinoSeleccionado = destinos.find((destino) => destino.id === destinoRef.current.value);

            const tiempoDeViaje = parseInt(destinoSeleccionado?.duracion);

            const fechaDeEntrga = dayjs(programing.tentativeEnd).utc()

            const entregaMenosViaje = fechaDeEntrga.subtract(tiempoDeViaje, 'minute');

            if (entregaMenosViaje.isBefore(currentDate)) {
                throw new Error('La fecha y hora selecionada menos el tiempo de viaje resulta en una fecha pasada');
            } 

            const newWashing = {
                tentativeEnd: entregaMenosViaje,
                destino_id: destinoRef.current.value
            }

            const { error } = await updateWashing(id, newWashing)

            if (error) {
                throw new Error('Error al reprogramar lavado')
            } else {
                toast.success('Lavado reprogramado')
                navigate('/programacion/programados')
            }

        } catch (error) {
            toast.error(error?.message)
        }
    }

    const destinos = JSON.parse(localStorage.getItem('destinos') || '[]');


    return (
        <>
            <Modal open={true}>
                <Box sx={{ display: 'flex', paddingTop: '3%', justifyContent: 'center' }}>
                    <form onSubmit={submit}>
                        <Paper sx={{ padding: '20px', width: '90vw', maxWidth: '500px' }}>
                            <Stack gap='10px'>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer
                                        components={[
                                            'DateTimePicker',
                                            'DateTimePicker',
                                        ]}
                                    >

                                        <DemoItem label="Fecha y hora tentativa de recolección">
                                            <DateTimePicker
                                                required
                                                value={programing.tentativeEnd}
                                                onChange={(newValue) => setPrograming({ ...programing, tentativeEnd: newValue })}
                                            />
                                        </DemoItem>

                                    </DemoContainer>
                                </LocalizationProvider>

                                <FormControl>
                                    <InputLabel>Planta destino</InputLabel>
                                    <Select
                                        label="Planta destino"
                                        defaultValue=""
                                        inputRef={destinoRef}
                                    >
                                        {destinos.map((destino) => (
                                            <MenuItem
                                                key={destino.id}
                                                value={destino.id}>
                                                {destino.destino} <span style={{ fontSize: '14px', color: 'gray', padding: '2px', marginLeft: '10px' }} >{minutosXhoras(destino.duracion / 60, destino.duracion % 60)} horas</span>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>


                                <Button
                                    type='submit'
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                >
                                    Programar
                                </Button>

                                <Button
                                    onClick={() => navigate('/programacion/programados')}
                                    color="error"
                                    variant="contained"
                                    fullWidth
                                >
                                    Cancelar
                                </Button>
                            </Stack>
                        </Paper>
                    </form>
                </Box>
            </Modal>
        </>
    )
}