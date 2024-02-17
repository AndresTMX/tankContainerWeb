import { useEffect, useState, } from "react";
import { usePostProgramation } from "../../Hooks/Programacion/PostProgramation";
import { useTypeWashing } from "../../Hooks/Lavado/useTypesWashing";
import useMediaQuery from "@mui/material/useMediaQuery";
//helpers
import { dateInText, datetimeMXFormat, tiempoTranscurrido, timepoParaX, currentDate } from "../../Helpers/date";
//DatePicker components
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
//icons
import AlarmIcon from '@mui/icons-material/Alarm';
import { ContainerScroll } from "../ContainerScroll";
import ScheduleIcon from '@mui/icons-material/Schedule';
import { ItemLoadingState } from "../ItemLoadingState";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { Stack, Alert, Paper, Chip, Box, Modal, Typography, Divider, Button, IconButton, } from "@mui/material";

function ProgramList({ Requestloading, RequestError, registers, loadingSearch, errorSearch, results, search, OnKeySearch, typeRegister, changueTypeRegister }) {

    const movile = useMediaQuery(`(max-width:540px)`)

    return (
        <ContainerScroll height={movile ? '70vh' : '76vh'} background='whitesmoke'>

            <Stack gap='10px' padding='0px' >

                {(Requestloading && !RequestError) &&
                    <>
                        <ItemLoadingState />
                        <ItemLoadingState />
                        <ItemLoadingState />
                        <ItemLoadingState />
                    </>
                }

                {(!Requestloading && !RequestError && !errorSearch && registers.length === 0) &&
                    <Alert severity='info'>Sin registros añadidos</Alert>
                }

                {(!errorSearch && results.length >= 1) &&
                    <Alert severity='info'>Resultados de busqueda {search} </Alert>
                }

                {(errorSearch && !loadingSearch && results.length === 0) &&
                    <Alert severity='warning'>No se encontraron coincidencias para tu busqueda, {search}</Alert>
                }

                {/* Request de fetch*/}
                {(!Requestloading && !RequestError && !errorSearch && registers.length > 0) &&
                    registers.map((register) => (
                        <Item
                            key={register.id}
                            registro={register}
                            typeRegister={typeRegister}
                            changueTypeRegister={changueTypeRegister}
                        />
                    ))
                }

                {/* Request del searcher */}
                {(search.length >= 3 && results.length > 0) &&
                    results.map((register) => (
                        <Item
                            key={register.id}
                            typeRegister={typeRegister}
                            registro={register}
                            changueTypeRegister={changueTypeRegister}
                        />
                    ))
                }

            </Stack>
        </ContainerScroll>

    )
}

export { ProgramList };

function Item({ registro, changueTypeRegister, typeRegister }) {
    return (
        <>

            {(typeRegister === 'programado') &&
                <ItemProgramWashing
                    registro={registro}
                    changueTypeRegister={changueTypeRegister}
                />
            }

            {(typeRegister === 'almacenado') &&
                <ItemPrograming
                    registro={registro}
                    changueTypeRegister={changueTypeRegister}
                />
            }

        </>
    )
}

function ItemPrograming({ registro, changueTypeRegister }) {

    const movile = useMediaQuery('(max-width:750px)')

    const { carga, created_at, numero_pipa, numero_tanque, status, tracto, transportistas, registros, clientes, especificacion, tipo } = registro || {};
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
                            <Typography>{tipo}  {numero_tanque || numero_pipa}</Typography>
                        </Box>
                    </Stack>

                    <Stack flexDirection={movile ? 'column' : 'row'} gap='20px'>

                        <Divider />
                        <Box>
                            <Typography variant="subtitle2">Especificación</Typography>
                            <Typography>{especificacion}</Typography>
                        </Box>
                    </Stack>

                    <Stack flexDirection={movile ? 'column' : 'row'} gap='10px' justifyContent='space-between'>
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
                action={'programar'}
            />
        </>
    )
}

function ItemProgramWashing({ registro, changueTypeRegister }) {

    const [vencimiento, setVencimiento] = useState(false)

    const movile = useMediaQuery('(max-width:820px)')

    const { created_at, program_date, program_time, tentativeEnd, registros_detalles_entradas } = registro || {};

    const { carga, numero_pipa, numero_tanque, status, transportistas, clientes, especificacion, tipo } = registros_detalles_entradas || {};
    const { name: linea } = transportistas || {};
    const { cliente } = clientes || {};

    const [modalEdit, setModalEdit] = useState(false);
    const toggleModalEdit = () => setModalEdit(!modalEdit);
    const entregaTentativa = dayjs(tentativeEnd);

    useEffect(() => {
        if (entregaTentativa.isBefore(currentDate, 'day')) {
            setVencimiento(true)
        } else {
            setVencimiento(false)
        }
    }, [registro])

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

                    <IconButton onClick={toggleModalEdit} variant="outlined" color='info'>
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

            <ModalPrograming
                item={registros_detalles_entradas}
                modal={modalEdit}
                toggleModal={toggleModalEdit}
                changueTypeRegister={changueTypeRegister}
                oldProgramDate={program_date}
                oldTentativeDate={tentativeEnd}
                action={'reprogramar'}

            />
        </>
    )
}

function ModalPrograming({ modal, toggleModal, item, changueTypeRegister, oldProgramDate, oldTentativeDate, action }) {

    const { types, loading, error, cache } = useTypeWashing();

    const { createProgram } = usePostProgramation()

    const defaultDate = dayjs();

    const oldDate = oldProgramDate ? dayjs(oldProgramDate) : defaultDate;
    const oldEnd = oldTentativeDate ? dayjs(oldTentativeDate) : defaultDate;

    const [programing, setPrograming] = useState({ program_date: oldDate, tentativeEnd: oldEnd });

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
        await createProgram(newWashing, item.id, action)
        setTimeout(() => {
            changueTypeRegister('programado')
        }, 1000)
    }

    return (
        <Modal open={modal}>
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
            </Box>
        </Modal>
    )
}