import { useState } from "react"
// custom components
import { ContainerScroll } from "../../ContainerScroll"
import { ItemLoadingState } from "../../ItemLoadingState"
// components
import { Stack, Alert, Chip, Button, Paper, Box, Divider, Typography, Modal, } from "@mui/material"
import { DemoContainer, DemoItem, } from "@mui/x-date-pickers/internals/demo"
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
//hooks
import useMediaQuery from "@mui/material/useMediaQuery"
import { useContextProgramacion } from "../../../Context/ProgramacionContext"
//helpers
import { tiempoTranscurrido, dateInText, datetimeMXFormat } from "../../../Helpers/date"
//libreries
import dayjs from "dayjs"
import { toast } from "sonner"
import { Outlet, useNavigate, useParams } from "react-router-dom"
//services
import { programNewWashing } from "../../../services/programacion"

export function TanquesAlmacenados() {

    const movile = useMediaQuery('(max-width:820px)');
    const { states } = useContextProgramacion();

    const { searchValue, dataDinamic, loading, error, mode } = states;

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

                    {(!loading && !error && dataDinamic.length === 0 && mode === 'data' ) &&
                        <Alert severity='info'>Sin registros añadidos</Alert>
                    }

                    {(!error && !loading && dataDinamic.length >= 1 && mode === 'search') &&
                        <Alert severity='info'>Resultados de busqueda {searchValue.current?.value} </Alert>
                    }

                    {(!error && !loading && dataDinamic.length === 0 && mode === 'search') &&
                        <Alert severity='warning'>No se encontraron coincidencias para tu busqueda, {searchValue.current?.value}</Alert>
                    }


                    {
                        dataDinamic.map((tanque) => (
                            <TanqueAlmacenado
                                key={tanque.id}
                                tanque={tanque}
                            />
                        ))
                    }

                </Stack>
            </ContainerScroll>

            <Outlet />

        </>
    )
}

function TanqueAlmacenado({ tanque }) {

    const movile = useMediaQuery('(max-width:750px)')

    const { carga, created_at, numero_pipa, numero_tanque, status, tracto, transportistas, registros, clientes, especificacion, tipo } = tanque || {};
    const { name: linea } = transportistas || {};
    const { cliente } = clientes || {};
    const { checkIn } = registros || {};

    const [programModal, setProgramModal] = useState(false);
    const toggleModalProgram = () => setProgramModal(!programModal);

    const navigate = useNavigate();

    const programTank = () => {
        try {
            const tanqueString = encodeURIComponent(JSON.stringify(tanque));
            navigate(`/programacion/almacenados/programar/${tanqueString}`)
        } catch (error) {
            toast.error(error)
        }
    }

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
                            onClick={programTank}
                            size="small"
                            variant="contained"
                        >
                            Programar lavado
                        </Button>
                    </Stack>
                </Stack>

            </Paper>
        </>
    )
}

export function ProgramarLavadado() {

    const { tanque } = useParams();
    const navigate = useNavigate();

    const tanqueJson = JSON.parse(decodeURI(tanque));

    const { id } = tanqueJson;

    const defaultDate = dayjs().tz('America/Mexico_City');

    const [programing, setPrograming] = useState({ program_date: defaultDate, tentativeEnd: defaultDate });

    //controller submit
    const submit = async (e) => {
        try {
            e.preventDefault()
            const newWashing = {
                program_date: dayjs(programing.program_date).utc(),
                tentativeEnd: dayjs(programing.tentativeEnd).utc(),
                id_detalle_entrada: id
            }

            const { error } = await programNewWashing(newWashing)

            if (error) {
                toast.error('Error al programar lavado')
            } else {
                toast.success('Lavado programado')
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
                                    onClick={() => navigate('/programacion/almacenados')}
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