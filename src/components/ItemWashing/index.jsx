import { Box, Paper, Button, IconButton, Chip, Stack, Divider } from "@mui/material";
import { TextGeneral } from "../TextGeneral";
//icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
//helpers
import { dateMXFormat, datetimeMXFormat, tiempoTranscurrido } from "../../Helpers/date";
//context
import { useContext } from "react";
import { PrelavadoContext } from "../../Context/PrelavadoContext";
import { actionTypes } from "../../Reducers/PrelavadoReducer";

function ItemWashing({ data }) {

    const [state, dispatch] = useContext(PrelavadoContext);

    const onWashing = () => {
        console.log(data)
        dispatch({
            type: actionTypes.setModalForm,
            payload: !state.modalForm
        })
    }

    return (
        <>
            <Box>
                <Paper elevation={3}>
                    <Stack padding='15px' spacing='10px' minWidth='600px'>
                        {/* Cabecera */}
                        <Stack flexDirection='row' justifyContent='space-between' gap='10px' >

                            <Stack flexDirection='row' gap='10px'>
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

                            <Button
                                onClick={onWashing}
                                variant="contained"
                                color="primary"
                                size="small"
                            >
                                Lavar
                            </Button>

                        </Stack>

                        <Stack flexDirection='row' justifyContent='start' gap='15px'>
                            <TextGeneral
                                label='Tipo de lavado'
                                text={data.carga}
                            />

                            <Divider orientation="vertical" flexItem/>

                            {(data.carga != 'Pipa') &&
                                <TextGeneral
                                    label='Tipo de lavado'
                                    text={`Tanque ${data.numero_tanque}`}
                                />}
                            
                            {(data.carga != 'Pipa') &&  <Divider orientation="vertical" flexItem/>}

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