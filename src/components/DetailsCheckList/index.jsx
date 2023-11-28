import { useState, useContext } from "react";
import { TextGeneral } from "../TextGeneral";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Chip, Stack, Button, Typography, Modal, Paper, Divider, Fade, IconButton } from "@mui/material";
//icons
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
//hooks
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { AuthContext } from "../../Context/AuthContext";
import { GlobalContext } from "../../Context/GlobalContext";
//helpers
import { tiempoTranscurrido, dateMXFormat, currentDate, datetimeMXFormat } from "../../Helpers/date";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { actionTypes } from "../../Reducers/ManiobrasReducer";

function DetailsCheckList() {

    const IsSmall = useMediaQuery('(max-width:900px)');
    const IsExtraSmall = useMediaQuery('(max-width:450px)');

    const { key } = useContext(AuthContext);
    const session = JSON.parse(sessionStorage.getItem(key));

    const [state, dispatch] = useContext(ManiobrasContext);
    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext)

    const { selectItem, maniobrasCheckList } = state;

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

    const completeCheck = () => {

        if (!complete) {
            dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: '¡Complete el checklist primero!' })
        } else {
            const data = {
                numero_tanque: numero_tanque,
                fechaActual: dateMXFormat(currentDate),
                horaActual: datetimeMXFormat(currentDate),
                cliente: state.cliente,
                entrada: dayInput,
                numero_unidad: tracto,
                usuario_emisor: `${session.user_metadata.first_name} ${session.user_metadata.last_name} `,
                folio: 'new folio',
                newStatus: state.status,
            }

            ShowModalWarning()

            console.log(data)
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