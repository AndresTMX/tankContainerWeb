import { useState } from "react";
import { Box, Stack, Button, Paper, Chip, Typography, Modal, Container, TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
//hooks
import { useRegistersProgramer } from "../../Hooks/Programacion/useRegisters";
import { useTypeWashing } from "../../Hooks/Lavado/useTypesWashing";
import { usePostProgramation } from "../../Hooks/Programacion/PostProgramation";
//custom components
import { NotConexionState } from "../../components/NotConectionState";
import { ItemLoadingState } from "../../components/ItemLoadingState";
import { ContainerScroll } from "../../components/ContainerScroll";
import { Notification } from "../../components/Notification";
import { LoadingState } from "../../components/LoadingState";
//helpers
import { dateInText, dateMXFormat, datetimeMXFormat, tiempoTranscurrido, timepoParaX } from "../../Helpers/date";
//DatePicker components
import dayjs from "dayjs";
import { DatePicker, TimeField, DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
//icons
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AlarmIcon from '@mui/icons-material/Alarm';


function Programacion({ }) {

    const { registers, loading, error, typeRegister, changueTypeRegister } = useRegistersProgramer();

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
                            <TextField />
                        </Stack>
                    </Paper>

                    <ContainerScroll height='74vh' background='whitesmoke'>
                        <Stack gap='10px'>

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
                <Stack flexDirection='row' gap='10px'>
                    <Chip label={status} />
                    <Chip label={dateMXFormat(checkIn)} />
                    <Chip label={datetimeMXFormat(checkIn)} />
                    <Chip label={tiempoTranscurrido(checkIn)} />
                </Stack>

                <Stack flexDirection='row' gap='20px' justifyContent='space-between'>
                    <Stack flexDirection='row' gap='20px'>
                        <Box>
                            <Typography variant="subtitle2">Cliente</Typography>
                            <Typography>{cliente}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2">{`N° ${carga}`}</Typography>
                            <Typography>{numero_tanque || numero_pipa}</Typography>
                        </Box>
                    </Stack>

                    <Stack flexDirection='row' gap='10px' justifyContent='space-between'>
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

    const { created_at, program_date, program_time, tentativeEnd, registros_detalles_entradas } = registro || {};

    const { carga, numero_pipa, numero_tanque, status, transportistas, clientes } = registros_detalles_entradas || {};
    const { name: linea } = transportistas || {};
    const { cliente } = clientes || {};

    // const timeProgram = program_time?.split(':', 2);
    // const AMPM = timeProgram[0] >= 12 ? 'PM' : 'AM' || '00:00';


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
                <Stack flexDirection='row' gap='10px'>
                    <Chip color='warning' label={status} />
                </Stack>

                <Stack flexDirection='row' gap='30px' justifyContent='flex-start'>

                    <Box>
                        <Typography variant="subtitle2">{`N° ${carga}`}</Typography>
                        <Typography>{numero_tanque || numero_pipa}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2">Cliente</Typography>
                        <Typography>{cliente}</Typography>
                    </Box>

                </Stack>

                <Stack flexDirection='row' alignItems='center' justifyContent='space-between' bgcolor='whitesmoke'>

                    <Stack
                        gap='10px'
                        flexDirection='row'
                        alignItems='center'
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

                    <Stack flexDirection={'row'}>
                        <Box sx={{ padding: '10px', bgcolor: '#ed6c02', color: 'white', }}>
                            <Typography variant="subtitle2">
                                {<ScheduleIcon fontSize="10px" />} Tiempo para entrega </Typography>
                            <Typography>{timepoParaX(tentativeEnd)}</Typography>
                        </Box>


                        <Box sx={{ padding: '10px', bgcolor: '#0288d1', color: 'white' }}>
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