import { Box, Paper, Button, IconButton, Chip, Stack, Divider } from "@mui/material";
import { TextGeneral } from "../TextGeneral";
//icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
//helpers
import { dateMXFormat, datetimeMXFormat, tiempoTranscurrido } from "../../Helpers/date";
//context
import { useContext } from "react";
import { PrelavadoContext } from "../../Context/PrelavadoContext";
import { actionTypes } from "../../Reducers/PrelavadoReducer";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useChecklistPrelavado } from "../../Hooks/Prelavado/useChecklistPrelavado";

function ItemWashing({ data, updater, step, setStep }) {

    const [state, dispatch] = useContext(PrelavadoContext);

    const IsSmall = useMediaQuery('(max-width:900px)');
    const IsMovile = useMediaQuery('(max-width:500px)');

    const { completeChecklist } = useChecklistPrelavado(updater);

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

    const completeWashing = async () => {

        const arrrayObjects = Object.values(state.checklist)

        const arrayColection = arrrayObjects.map((item, index) => {
            let array = [];

            const data = Object.values(item).flat()

            for (let element of data) {

                if (typeof element === 'string') {
                    element = { cubierta: item.type }
                }

                array.push(element)
            }

            return array

        });

        const questionsFlat = arrayColection.flat();

        // const questionsInString = JSON.stringify(questionsFlat);

        const dataChecklist = {
            registro_detalle_entrada_id: data.id,
            numero_tanque: data.numero_tanque,
            numero_pipa: data.numero_pipa,
            data: questionsFlat,
        }

        await completeChecklist(data.id, dataChecklist)
        CancelChecklist();

    }

    return (
        <>
            <Paper elevation={3} sx={{ width: '88vw', maxWidth: '650px' }}>
                <Stack
                    padding='15px'
                    spacing='10px'
                >
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

                        <Stack flexDirection='row' paddingRight='10px' gap='10px' width={IsMovile ? '100%' : 'auto'}>
                            {(!state.selectCheck) &&
                                <Button
                                    fullWidth={IsMovile}
                                    onClick={onWashing}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                >
                                    Check
                                </Button>}

                            {(state.selectCheck) &&
                                <Button
                                    disabled={step != 8 ? true : false}
                                    fullWidth={IsSmall}
                                    onClick={completeWashing}
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

                    <Stack flexDirection={IsMovile ? 'column' : 'row'} justifyContent='start' gap='15px'>
                        <TextGeneral
                            label='Tipo de lavado'
                            text={data.carga}
                        />

                        <Divider orientation={IsMovile ? "horizontal" : "vertical"} flexItem />

                        {(data.carga != 'pipa') &&
                            <TextGeneral
                                label='Numero de tanque'
                                text={`${data.numero_tanque}`}
                            />}

                        {(data.carga != 'pipa') && <Divider orientation={IsMovile ? "horizontal" : "vertical"} flexItem />}

                        <TextGeneral
                            label='N° de tracto'
                            text={data.tracto}
                        />
                    </Stack>

                </Stack>
            </Paper>
        </>
    );
}

export { ItemWashing };