import { useState } from "react";
import { Box, Stack, Button, Paper, Chip, Typography, Modal, Container, TextField, Divider, IconButton, InputAdornment, OutlinedInput, FormControl, InputLabel } from "@mui/material";
//hooks
import { useRegistersProgramer } from "../../Hooks/Programacion/useRegisters";
import { usePostProgramation } from "../../Hooks/Programacion/PostProgramation";
import { useTypeWashing } from "../../Hooks/Lavado/useTypesWashing";
import useMediaQuery from "@mui/material/useMediaQuery";
//custom components
import { NotConexionState } from "../../components/NotConectionState";
import { ItemLoadingState } from "../../components/ItemLoadingState";
import { ContainerScroll } from "../../components/ContainerScroll";
import { Notification } from "../../components/Notification";
import { LoadingState } from "../../components/LoadingState";
//helpers
import { dateInText, datetimeMXFormat, tiempoTranscurrido, timepoParaX } from "../../Helpers/date";
//DatePicker components
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
//icons
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AlarmIcon from '@mui/icons-material/Alarm';
import SearchIcon from '@mui/icons-material/Search';
//searcher
import { useSearcherProgram } from "../../Hooks/Programacion/useSearcherProgram";


function Programacion({ }) {

    const { registers, loading, error, typeRegister, changueTypeRegister } = useRegistersProgramer();
    const { search, onChangueSearch, Searcher } = useSearcherProgram(registers)

    return (
        <>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
                <Stack alignItems='center' width='100%' gap='10px' maxWidth='900px'>
                    <Paper
                        elevation={3}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            bgcolor: 'whitesmoke',
                            maxWidth: '900px',
                            flexWrap: 'wrap',
                            padding: '15px',
                            width: '96vw',
                            gap: '10px',
                        }}>
                        <Stack flexDirection='row' gap='10px'>
                            <Chip
                                label='almacenados'
                                color={typeRegister === 'almacenado' ? 'warning' : 'default'}
                                onClick={() => changueTypeRegister('almacenado')} />
                            <Chip
                                label='programados'
                                color={typeRegister != 'almacenado' ? 'info' : 'default'}
                                onClick={() => changueTypeRegister('programado')} />
                        </Stack>

                        <Stack>
                            <FormControl variant="outlined" sx={{ width: '250px' }}>
                                <InputLabel htmlFor="searcher-items-program">Buscar</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    variant='outlined'
                                    id='searcher-items-program'
                                    label='Buscar'
                                    value={search}
                                    onChange={(e) => onChangueSearch(e)}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            Searcher()
                                        }
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => Searcher()}
                                                edge="end"
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Stack>
                    </Paper>

                    <ContainerScroll height='74vh' background='whitesmoke'>
                        <Stack gap='10px' padding='0px'>

                            {(!loading && !error && typeRegister === 'almacenado') &&
                                registers.map((register) => (
                                    <ItemPrograming
                                        key={register.id}
                                        registro={register}
                                        changueTypeRegister={changueTypeRegister}
                                    />
                                ))
                            }

                            {(!loading && !error && typeRegister === 'programado') &&
                                registers.map((register) => (
                                    <ItemProgramWashing
                                        key={register.id}
                                        registro={register}
                                        changueTypeRegister={changueTypeRegister}
                                    />
                                ))
                            }

                        </Stack>
                    </ContainerScroll>

                </Stack>
            </Box>

            <Notification />

            <LoadingState duration={1000} />

        </>
    );
}

export { Programacion };

function ItemPrograming({ registro, changueTypeRegister }) {

    const movile = useMediaQuery('(max-width:720px)')

    const { carga, created_at, numero_pipa, numero_tanque, status, tracto, transportistas, registros, clientes } = registro || {};
    const { name: linea } = transportistas || {};
    const { cliente } = clientes || {};
    const { checkIn } = registros || {};

    const [programModal, setProgramModal] = useState(false);
    const toggleModalProgram = () => setProgramModal(!programModal);

    return (
        <>
            <Paper
                elevation={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '15px'
                }}
            >
                <Stack flexDirection='row' flexWrap='wrap' gap='10px'>
                    <Chip label={status} />
                    <Chip label={'hace ' + tiempoTranscurrido(checkIn)} />
                    <Chip label={'Ingreso el ' + dateInText(checkIn)} />
                    <Chip label={datetimeMXFormat(checkIn)} />
                </Stack>

                <Stack flexDirection={movile ? 'column' : 'row'} gap='20px' justifyContent='space-between'>
                    <Stack flexDirection={movile ? 'column' : 'row'} gap='20px'>
                        <Box>
                            <Typography variant="subtitle2">Cliente</Typography>
                            <Typography>{cliente}</Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography variant="subtitle2">{`N° ${carga}`}</Typography>
                            <Typography>{numero_tanque || numero_pipa}</Typography>
                        </Box>
                    </Stack>

                    <Stack flexDirection={movile ? 'column' : 'row'} gap='10px' justifyContent='space-between'>
                        <Button size="small" variant="outlined">Ver detalles</Button>
                        <Button
                            onClick={toggleModalProgram}
                            size="small"
                            variant="contained"
                        >
                            Programar lavado
                        </Button>
                    </Stack>
                </Stack>

            </Paper>

            <ModalPrograming
                item={registro}
                modal={programModal}
                toggleModal={toggleModalProgram}
                changueTypeRegister={changueTypeRegister}
            />
        </>
    )
}

function ItemProgramWashing({ registro, changueTypeRegister }) {

    const movile = useMediaQuery('(max-width:820px)')

    const { created_at, program_date, program_time, tentativeEnd, registros_detalles_entradas } = registro || {};

    const { carga, numero_pipa, numero_tanque, status, transportistas, clientes } = registros_detalles_entradas || {};
    const { name: linea } = transportistas || {};
    const { cliente } = clientes || {};

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
                <Stack flexDirection='row' gap='10px'>
                    <Chip color='warning' label={status} />
                </Stack>

                <Stack flexDirection={movile ? 'column' : 'row'} gap={movile ? '15px' : '30px'} justifyContent='flex-start'>

                    <Box>
                        <Typography variant="subtitle2">{`N° ${carga}`}</Typography>
                        <Typography>{numero_tanque || numero_pipa}</Typography>
                    </Box>
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

                        <Box sx={{ padding: '10px', bgcolor: '#ed6c02', color: 'white', width: movile ? '100%' : 'auto' }}>
                            <Typography variant="subtitle2">
                                {<ScheduleIcon fontSize="10px" />} Tiempo para entrega </Typography>
                            <Typography>{timepoParaX(tentativeEnd)}</Typography>
                        </Box>


                        <Box sx={{ padding: '10px', bgcolor: '#0288d1', color: 'white', width: movile ? '100%' : 'auto' }}>
                            <Typography variant="subtitle2">
                                {<AlarmIcon fontSize="10px" />}  Fecha de entrega tentativa</Typography>
                            <Typography>{dateInText(tentativeEnd)}</Typography>
                        </Box>

                    </Stack>

                </Stack>

            </Paper>
        </>
    )
}

function ModalPrograming({ modal, toggleModal, item, changueTypeRegister }) {

    const { types, loading, error, cache } = useTypeWashing();

    const { createProgram } = usePostProgramation()

    const defaultDate = dayjs();

    const [programing, setPrograming] = useState({ program_date: defaultDate, tentativeEnd: defaultDate });

    const typeWashingSelected = types.filter((type) => type.id === programing.id_tipo_lavado);

    //controller submit
    const submit = async (e) => {
        e.preventDefault()
        const newWashing = {
            ...programing,
            program_date: programing.program_date,
            tentativeEnd: programing.tentativeEnd,
            id_detalle_entrada: item.id
        }
        await createProgram(newWashing, item.id)
        setTimeout(() => {
            changueTypeRegister('programado')
        }, 1000)
    }

    return (
        <>
            <Modal open={modal}>
                <Container sx={{ display: 'flex', padding: '20px', justifyContent: 'center' }}>
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
                                    onClick={toggleModal}
                                    color="error"
                                    variant="contained"
                                    fullWidth
                                >
                                    Cancelar
                                </Button>
                            </Stack>
                        </Paper>
                    </form>
                </Container>
            </Modal>
        </>
    )
}