import { Box, Paper, Button, IconButton, Chip, Stack, Divider, Typography } from "@mui/material";
import { TextGeneral } from "../TextGeneral";
//icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
//helpers
import { dateMXFormat, datetimeMXFormat, tiempoTranscurrido, dateInText, timepoParaX, dateTextShort } from "../../Helpers/date";
//context
import { useContext } from "react";
import { PrelavadoContext } from "../../Context/PrelavadoContext";
import { actionTypes } from "../../Reducers/PrelavadoReducer";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";

function ItemWashing({ data, updater, step, setStep }) {

    const [state, dispatch] = useContext(PrelavadoContext);

    const IsSmall = useMediaQuery('(max-width:815px)');
    const IsMovile = useMediaQuery('(max-width:500px)');

    const { status, program_date, tentativeEnd, registros_detalles_entradas } = data || {};

    const { carga, clientes, numero_pipa, numero_tanque, tipo, registros } = registros_detalles_entradas || {};

    const { checkIn, checkOut } = registros || {};

    const onWashing = () => {
        dispatch({
            type: actionTypes.setSelectCheck,
            payload: data
        })
    }

    const CancelChecklist = () => {
        setStep(1);
        dispatch({
            type: actionTypes.setSelectCheck,
            payload: false
        })
        dispatch({
            type: actionTypes.setCheckList,
            payload: {
                cuviertaValvula: {
                    type: ''
                }
            }
        })
    }

    const AMPM = datetimeMXFormat(program_date).split(':')[0] < 12 ? 'AM' : 'PM';

    return (
        <>
            <Paper
                sx={{ display: 'flex', flexDirection: 'column', padding: '15px', gap: '10px' }} elevation={3}>

                {/* Cabecera de item*/}
                {(!state.selectCheck) && <Stack
                    justifyContent='space-between'
                    flexDirection='row'
                    flexWrap='wrap'
                    gap='10px'
                >

                    <Stack
                        gap='10px'
                        flexWrap='wrap'
                        flexDirection='row'
                        justifyContent='space-between'
                        width={IsSmall ? 'auto' : '100%'}
                    >

                        <Stack flexDirection='row' gap='10px' flexWrap='wrap' >

                            <Chip
                                icon={<CalendarTodayIcon />}
                                label={` Entregar el ${dateTextShort(tentativeEnd)}`}
                                color='info'
                                size="small"
                            />

                            <Chip
                                icon={<AccessTimeIcon />}
                                label={`${datetimeMXFormat(tentativeEnd)} ${AMPM}`}
                                color='info'
                                size="small"
                            />

                            <Chip
                                icon={<AccessTimeIcon />}
                                label={`${timepoParaX(tentativeEnd)} para entrega`}
                                color='info'
                                size="small"
                            />

                        </Stack>

                        <Button
                            fullWidth={IsSmall}
                            onClick={onWashing}
                            variant="contained"
                            color="primary"
                            size="small"
                        >
                            Checklist
                        </Button>

                    </Stack>

                </Stack>}


                {/* Informacion */}
                <Stack flexDirection={IsSmall ? 'column' : 'row'} justifyContent='space-around' gap='15px'>

                    <TextGeneral
                        label='Cliente'
                        text={clientes?.cliente}
                    />

                    <Divider orientation={IsSmall ? "horizontal" : "vertical"} flexItem />

                    {carga === 'tanque' &&
                        <TextGeneral
                            label='Tipo de tanque'
                            text={tipo}
                        />}

                    {carga === 'tanque' &&
                        <Divider orientation={IsSmall ? "horizontal" : "vertical"} flexItem />}


                    <Stack>
                        <Typography variant='subtitle2'>{`Número de ${carga}`}</Typography>
                        <Typography variant='button'>{numero_tanque || numero_pipa}</Typography>
                    </Stack>


                    {(!state.selectCheck) && <Divider orientation={IsSmall ? "horizontal" : "vertical"} flexItem />}

                    {(!state.selectCheck) &&
                        <Stack>
                            <Typography variant='subtitle2'>Cita de lavado</Typography>
                            <Typography variant='button'>{` ${dateTextShort(program_date)}  ${datetimeMXFormat(program_date)} ${AMPM}`}</Typography>
                        </Stack>}

                    {(state.selectCheck) &&
                        <Button
                            endIcon={<DoDisturbIcon />}
                            onClick={CancelChecklist}
                            variant="contained"
                            color="error"
                            size="small"
                        >
                            Cancelar
                        </Button>
                    }

                </Stack>

            </Paper>
        </>
    );
}

export { ItemWashing };