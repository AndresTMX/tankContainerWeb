import { useState, useEffect, useMemo } from "react"
// custom components
import { ContainerScroll } from "../../ContainerScroll"
import { ItemLoadingState } from "../../ItemLoadingState"
// components
import { Stack, Alert, Chip, Button, Paper, Box, Divider, Typography, IconButton, Modal, Pagination } from "@mui/material"
import { DemoContainer, DemoItem, } from "@mui/x-date-pickers/internals/demo"
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
//hooks
import useMediaQuery from "@mui/material/useMediaQuery"
import { useContextProgramacion } from "../../../Context/ProgramacionContext"
import { useNavigate, useParams, Outlet } from "react-router-dom"
//helpers
import { dateInText, datetimeMXFormat, timepoParaX, currentDate } from "../../../Helpers/date"
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

    const { created_at, program_date, program_time, tentativeEnd, registros_detalles_entradas } = tanque || {};

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
        if (entregaTentativa.isBefore(currentDate, 'day')) {
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

                <Stack flexDirection={movile ? 'column' : 'row'} alignItems='center' justifyContent='space-between' bgcolor='whitesmoke'>

                    <Stack
                        gap='10px'
                        width={movile ? '100%' : 'auto'}
                        flexDirection={movile ? 'column' : 'row'}
                        alignItems={movile ? 'start' : 'center'}
                        justifyContent='flex-start'
                        sx={{ padding: '10px', bgcolor: 'whitesmoke' }}>
                        <Box>
                            <Typography variant="subtitle2">
                                {<EditCalendarIcon fontSize="10px" color='info' />} Fecha agendada
                            </Typography>
                            <Typography>{dateInText(program_date)}</Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2">
                                {<ScheduleIcon fontSize="10px" color='info' />} Hora agendada </Typography>
                            <Typography>{datetimeMXFormat(program_date)}</Typography>
                        </Box>

                    </Stack>

                    <Stack
                        width={movile ? '100%' : 'auto'}
                        flexDirection={movile ? 'column' : 'row'}
                        alignItems={movile ? 'start' : 'center'}>

                        <Box sx={{ padding: '10px', bgcolor: !vencimiento ? '#ed6c02' : '#d32f2f', color: 'white', width: movile ? '100%' : 'auto' }}>
                            <Typography variant="subtitle2">
                                {<ScheduleIcon fontSize="10px" />} {!vencimiento ? 'Tiempo para entrega' : 'Tiempo excedido'} </Typography>
                            <Typography>
                                {timepoParaX(tentativeEnd)}
                            </Typography>
                        </Box>


                        <Box sx={{ padding: '10px', bgcolor: '#0288d1', color: 'white', width: movile ? '100%' : 'auto' }}>
                            <Typography variant="subtitle2">
                                {<AlarmIcon fontSize="10px" />}  Fecha de entrega tentativa</Typography>
                            <Typography>{dateInText(tentativeEnd)} {datetimeMXFormat(tentativeEnd)} </Typography>
                        </Box>

                    </Stack>

                </Stack>

            </Paper>


        </>
    )
}

export function ReprogramarLavado() {

    const { tanque } = useParams();
    const navigate = useNavigate();

    const tanqueJson = JSON.parse(decodeURI(tanque));

    const { id, program_date, tentativeEnd } = tanqueJson;

    const defaultDate = dayjs()

    const oldDate = dayjs(program_date)
    const oldEnd = dayjs(tentativeEnd)

    const [programing, setPrograming] = useState({ program_date: oldDate, tentativeEnd: oldEnd });

    //controller submit
    const submit = async (e) => {
        try {
            e.preventDefault()
            const newWashing = {
                program_date: dayjs(programing.program_date).utc(),
                tentativeEnd: dayjs(programing.tentativeEnd).utc(),
            }

            const { error } = await updateWashing(id, newWashing)

            if (error) {
                toast.error('Error al reprogramar lavado')
            } else {
                toast.success('Lavado reprogramado')
                navigate('/programacion/programados')
            }

        } catch (error) {
            console.error(error)
        }
    }



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
                                        <DemoItem label='Fecha y hora de lavado'>
                                            <DateTimePicker
                                                required
                                                value={programing.program_date}
                                                onChange={(newValue) => setPrograming({ ...programing, program_date: newValue })}
                                            />
                                        </DemoItem>

                                        <DemoItem label="Fecha y hora tentativa de recolección">
                                            <DateTimePicker
                                                required
                                                value={programing.tentativeEnd}
                                                onChange={(newValue) => setPrograming({ ...programing, tentativeEnd: newValue })}
                                            />
                                        </DemoItem>

                                    </DemoContainer>
                                </LocalizationProvider>

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