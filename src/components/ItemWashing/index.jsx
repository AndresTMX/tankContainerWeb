import { Box, Paper, Button, IconButton, Chip, Stack, Divider } from "@mui/material";
import { TextGeneral } from "../TextGeneral";
//icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
//helpers
import { dateMXFormat, datetimeMXFormat, tiempoTranscurrido } from "../../Helpers/date";
//context
import { useContext } from "react";
import { PrelavadoContext } from "../../Context/PrelavadoContext";
import { actionTypes } from "../../Reducers/PrelavadoReducer";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";

function ItemWashing({ data }) {

    const [state, dispatch] = useContext(PrelavadoContext);

    const IsSmall = useMediaQuery('(max-width:900px)')

    const onWashing = () => {
        dispatch({
            type: actionTypes.setSelectCheck,
            payload: data
        })
    }

    const CancelChecklist = () => {
        dispatch({
            type: actionTypes.setSelectCheck,
            payload: false
        })
    }

    return (
        <>
            <Box>
                <Paper elevation={3}>
                    <Stack padding='15px' spacing='10px' width={IsSmall ? 'auto' : '700px'}>
                        {/* Cabecera */}
                        <Stack
                            flexDirection='row'
                            justifyContent='space-between'
                            flexWrap='wrap'
                            gap='10px'

                        >

                            <Stack flexDirection='row' gap='10px' flexWrap='wrap'>
                                <Chip
                                    icon={<CalendarTodayIcon />}
                                    label={dateMXFormat(data.registros.checkIn)}
                                    color='info'
                                    size="small"
                                />

                                <Chip
                                    icon={<AccessTimeIcon />}
                                    label={datetimeMXFormat(data.registros.checkIn)}
                                    color='info'
                                    size="small"
                                />

                                <Chip
                                    icon={<AccessTimeIcon />}
                                    label={tiempoTranscurrido(data.registros.checkIn)}
                                    color='info'
                                    size="small"
                                />
                            </Stack>

                            <Stack flexDirection='row' paddingRight='10px' gap='10px' width={IsSmall ? '80%' : 'auto'}>
                                {(!state.selectCheck) &&
                                    <Button
                                        fullWidth={IsSmall}
                                        onClick={onWashing}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                    >
                                        Check
                                    </Button>}

                                {(state.selectCheck) &&
                                    <Button
                                        fullWidth={IsSmall}
                                        onClick={() => console.log('wedwqe')}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                    >
                                        completar
                                    </Button>}

                                {(state.selectCheck) &&
                                    <IconButton
                                        fullWidth={IsSmall}
                                        onClick={CancelChecklist}
                                        variant="contained"
                                        color="error"
                                        size="small"
                                    >
                                        <DoDisturbIcon />
                                    </IconButton>}
                            </Stack>

                        </Stack>

                        <Stack flexDirection='row' justifyContent='start' gap='15px'>
                            <TextGeneral
                                label='Tipo de lavado'
                                text={data.carga}
                            />

                            <Divider orientation="vertical" flexItem />

                            {(data.carga != 'Pipa') &&
                                <TextGeneral
                                    label='Tipo de lavado'
                                    text={`Tanque ${data.numero_tanque}`}
                                />}

                            {(data.carga != 'Pipa') && <Divider orientation="vertical" flexItem />}

                            <TextGeneral
                                label='N° de tracto'
                                text={data.tracto}
                            />
                        </Stack>

                    </Stack>
                </Paper>
            </Box>
        </>
    );
}

export { ItemWashing };