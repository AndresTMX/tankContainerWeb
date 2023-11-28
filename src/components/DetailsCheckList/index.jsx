import { useState, useContext } from "react";
import { TextGeneral } from "../TextGeneral";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Chip, Stack, Button, Typography, Modal, Paper, Divider, Fade, IconButton } from "@mui/material";
//icons
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
//hooks
import { usePostCheckList } from "../../Hooks/foliosManagment/usePostCheckList";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { GlobalContext } from "../../Context/GlobalContext";
import { AuthContext } from "../../Context/AuthContext";
//helpers
import { tiempoTranscurrido, dateMXFormat, currentDate, datetimeMXFormat } from "../../Helpers/date";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { actionTypes } from "../../Reducers/ManiobrasReducer";

function DetailsCheckList() {

    const IsSmall = useMediaQuery('(max-width:900px)');
    const IsExtraSmall = useMediaQuery('(max-width:450px)');

    const { sendCheckList, errorPost, request } = usePostCheckList();

    const { key } = useContext(AuthContext);
    const [state, dispatch] = useContext(ManiobrasContext);
    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext)

    const { selectItem, maniobrasCheckList, } = state;
    const { carga, dayInput, dateInput, linea, numero_tanque, tracto, checkIn } = selectItem;

    const complete = maniobrasCheckList.pageThree.length >= 1 ? true : false;

    const time = tiempoTranscurrido(checkIn);
    const [modal, setModal] = useState(false);

    const clearSelect = () => {
        dispatch({ type: actionTypes.setSelectItem, payload: false })
    }

    const ShowModalWarning = () => {
        setModal(!modal)
    }

    const completeCheck = async () => {

        if (!complete) {
            dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: '¡Complete el checklist primero!' })
        } else {

            const flatCheckList = [...maniobrasCheckList.pageOne, ...maniobrasCheckList.pageTwo, ...maniobrasCheckList.pageThree];

            const data = {
                user_id: key,
                nombre_cliente: state.cliente,
                registro_detalle_entrada_id: selectItem.id,
                panel_frontal: flatCheckList[0].value,
                marco_frontal: flatCheckList[1].value,
                panel_trasero: flatCheckList[2].value,
                marco_trasero: flatCheckList[3].value,
                panel_derecho: flatCheckList[4].value,
                marco_derecho: flatCheckList[5].value,
                panel_izquierdo: flatCheckList[6].value,
                marco_izquierdo: flatCheckList[7].value,
                panel_superior: flatCheckList[8].value,
                marco_superior: flatCheckList[9].value,
                panel_inferior: flatCheckList[10].value,
                marco_inferior: flatCheckList[11].value,
                nomenclatura: flatCheckList[12].value,
                escaleras: flatCheckList[13].value,
                pasarelas: flatCheckList[14].value,
                entrada_hombre: flatCheckList[15].value,
                mariposa_entrada_hombre: flatCheckList[16].value,
                valvula_presion_alivio: flatCheckList[17].value,
                tubo_desague: flatCheckList[18].value,
                valvula_alivio: flatCheckList[19].value,
                brida_ciega: flatCheckList[20].value,
                nanometro: flatCheckList[21].value,
                termometro: flatCheckList[22].value,
                placa_datos: flatCheckList[23].value,
                porta_documentos: flatCheckList[24].value,
                tubo_vapor: flatCheckList[25].value,
                tapones_tubo_vapor: flatCheckList[26].value,
                sistema_calentamiento_electrico: flatCheckList[27].value,
                valvula_pie_tanque: flatCheckList[27].value,
                valvula_descarga: flatCheckList[28].value,
                tapon_valvula_descarga: flatCheckList[29].value,
                maneral_valvula_seguridad: flatCheckList[30].value,
                cierre_emergencia_remoto: flatCheckList[31].value,
                data: JSON.stringify({ ...flatCheckList })
            }

            // ShowModalWarning()

            console.log(data)
            const result = await sendCheckList(data)
        }


    }

    return (
        <>
            <Paper elevation={4}>

                <Stack
                    bgcolor="whitesmoke"
                    borderRadius="4px"
                    padding="10px"
                    gap="10px"
                >
                    <Stack
                        justifyContent="space-between"
                        flexDirection="row"
                        flexWrap="wrap"
                        gap="10px"
                    >
                        <Stack
                            flexDirection="row"
                            alignItems="center"
                            flexWrap="wrap"
                            gap="10px"
                        >

                            <Chip
                                size="small"
                                color="secondary"
                                label={dayInput}
                                icon={<CalendarTodayIcon />}
                                sx={{
                                    width: "120px",
                                    fontWeight: 500,
                                    padding: "5px",
                                }}
                            />

                            <Chip
                                size="small"
                                color="info"
                                label={dateInput}
                                icon={<AccessTimeIcon />}
                                sx={{
                                    maxWidth: "90px",
                                    fontWeight: 500,
                                    padding: "5px",
                                }}
                            />

                            <Chip
                                size="small"
                                color="info"
                                label={time === 'a' ? '1 día' : `${time} días`}
                                icon={<AccessTimeIcon />}
                                sx={{
                                    maxWidth: "200px",
                                    fontWeight: 500,
                                    padding: "5px",
                                }}
                            />

                        </Stack>

                        <Stack flexDirection='row' gap='10px'>
                            <Button
                                onClick={completeCheck}
                                size="small"
                                variant="contained"
                                color="info"
                            >
                                completar
                            </Button>

                            <IconButton
                                onClick={clearSelect}
                                size="small"
                                color="error"
                            >
                                <DoDisturbIcon />
                            </IconButton>
                        </Stack>

                    </Stack>

                    <Stack
                        flexDirection={IsExtraSmall ? "column" : "row"}
                        width="100%"
                        gap="20px"
                    >

                        <TextGeneral
                            label="linea"
                            text={linea}
                        />

                        <Stack flexDirection="row" gap="10px">
                            <Divider
                                orientation={IsSmall ? "horizontal" : "vertical"}
                                flexItem
                            />

                            <TextGeneral
                                label="tracto"
                                text={tracto}
                            />

                            {carga === 'Tanque' &&
                                <>
                                    <Divider
                                        orientation={IsSmall ? "horizontal" : "vertical"}
                                        flexItem
                                    />
                                    <TextGeneral
                                        label="N° tanque"
                                        text={numero_tanque}
                                    />
                                </>

                            }
                        </Stack>

                    </Stack>

                </Stack>

            </Paper>

            <Modal
                open={modal}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center'

                }}
            >
                <Fade
                    in={modal}
                    timeout={500}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            width: 'auto',
                            padding: '20px',
                            borderRadius: '4px'
                        }}
                    >
                        <Typography variant="h6">¿Desea completar el check list?</Typography>

                        <Stack
                            width={'100%'}
                            gap='10px'
                            flexDirection={'row'}
                            justifyContent={'space-between'}
                        >

                            <Button
                                fullWidth
                                variant="contained"
                                color='primary'
                                size="small"
                                onClick={ShowModalWarning}>
                                Completar
                            </Button>

                        </Stack>

                    </Box>
                </Fade>
            </Modal>

        </>
    );
}

export { DetailsCheckList };