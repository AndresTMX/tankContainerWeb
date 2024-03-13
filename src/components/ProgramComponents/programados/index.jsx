// custom components
import { ContainerScroll } from "../../ContainerScroll"
import { ItemLoadingState } from "../../ItemLoadingState"
// components
import { Stack, Alert, Chip, Button, Paper, Box, Divider, Typography, } from "@mui/material"
//hooks
import useMediaQuery from "@mui/material/useMediaQuery"
import { useContextProgramacion } from "../../../Hooks/Programacion/context"
//helpers
import { tiempoTranscurrido, dateInText, datetimeMXFormat } from "../../../Helpers/date"

export function TanquesProgramados() {

    const movile = useMediaQuery('(max-width:820px)');
    const { pathname } = useContextProgramacion()


    return (
        <>
            <ContainerScroll height={movile ? '70vh' : '76vh'} background='whitesmoke'>

                <Stack gap='10px' padding='0px' >

                    {/* {(loading && !error) &&
                        <>
                            <ItemLoadingState />
                            <ItemLoadingState />
                            <ItemLoadingState />
                            <ItemLoadingState />
                        </>
                    } */}

                    {/* {(!loading && !error && !errorSearch && tanques.length === 0) &&
                      <Alert severity='info'>Sin registros añadidos</Alert>
                     }

                    {(!errorSearch && results.length >= 1) &&
                        <Alert severity='info'>Resultados de busqueda {search} </Alert>
                    }

                    {(errorSearch && !loadingSearch && results.length === 0) &&
                        <Alert severity='warning'>No se encontraron coincidencias para tu busqueda, {search}</Alert>
                    } */}



                    {/* {
                        tanques.map((tanque) => (
                            <TanqueProgramado
                                key={tanque.id}
                                tanque={tanque}
                            />
                        ))
                    } */}

                </Stack>
            </ContainerScroll>
        </>
    )
}

function TanqueProgramado({ tanque }) {

    const [vencimiento, setVencimiento] = useState(false)

    const movile = useMediaQuery('(max-width:820px)')

    const { created_at, program_date, program_time, tentativeEnd, registros_detalles_entradas } = tanque || {};

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

            {/* <ModalPrograming
                item={registros_detalles_entradas}
                modal={modalEdit}
                toggleModal={toggleModalEdit}
                changueTypeRegister={changueTypeRegister}
                oldProgramDate={program_date}
                oldTentativeDate={tentativeEnd}
                action={'reprogramar'}

            /> */}
        </>
    )
}