//components
import { Box, Stack, Paper, Typography, Chip, Button, } from "@mui/material";
import { ContainerScroll } from "../../components/ContainerScroll";
import { HistoryItemLoading } from "../HistoryItem";
import { TextGeneral } from "../TextGeneral";
//icons
import WarningIcon from '@mui/icons-material/Warning';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
//helpers
import { dateMXFormat, datetimeMXFormat } from "../../Helpers/date";
//hooks
import { useContext } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { actionTypes } from "../../Reducers/ManiobrasReducer";
//buttonPDF
import { ButtonDowloand } from "../../PDFs/components/ButtonDowloand";

function ListCheckList({ requestGetRegisters, loadingGetRegisters, errorGetRegisters, resultsSearch, errorSearch, loadingSearch, search }) {

    const IsSmall = useMediaQuery("(max-width:900px)");

    const [state, dispatch] = useContext(ManiobrasContext);

    const generateDocument = (item) => {
        const json = JSON.parse(item.data)
        const listQuestions = Object.values(json)

        const dataDocument = {
            folio: item.folio,
            fechaActual: dateMXFormat(item.created_at),
            horaActual: datetimeMXFormat(item.created_at),
            cliente: item.nombre_cliente,
            dayInput: dateMXFormat(item.ingreso),
            numero_tanque: item.registros_detalles_entradas.numero_tanque,
            tracto: item.registros_detalles_entradas.tracto,
            usuario_emisor: `${item.users_data.first_name} ${item.users_data.last_name}`
        }

        const pageOne = listQuestions.slice(0, 11);
        const pageTwo = listQuestions.slice(11, 21);
        const pageThree = listQuestions.slice(21, 33);

        dispatch({ type: actionTypes.setCliente, payload: item.nombre_cliente })
        dispatch({ type: actionTypes.setSelectItem, payload: dataDocument })
        dispatch({
            type: actionTypes.setManiobrasCheck,
            payload: {
                pageOne: pageOne,
                pageTwo: pageTwo,
                pageThree: pageThree
            }
        });

    }

    return (
        <>
            <Box>
                <ContainerScroll height='67vh'>

                    {(errorGetRegisters) && (
                        <Paper sx={{ width: '90vw', maxWidth: '700px', marginBottom: '20px', padding: '20px' }}>
                            <Stack
                                sx={{
                                    backgroundColor: "white",
                                    padding: "10px",
                                    borderRadius: "4px",
                                    maxWidth: '100%'
                                }}
                                flexDirection="column"
                                gap="5px"
                                justifyContent="flex-start"
                            >
                                <Chip
                                    sx={{ width: "130px" }}
                                    color="warning"
                                    label="¡Error al cargar!"
                                />

                                <Typography variant="caption">
                                    probablemente no tienes internet, esta es la Información de la
                                    ultima consulta exitosa a la base de datos, suerte.
                                </Typography>
                            </Stack>
                        </Paper>
                    )}

                    {(errorSearch) && (
                        <Paper sx={{ width: '90vw', maxWidth: '700px', marginBottom: '20px', padding: '20px' }}>
                            <Stack
                                sx={{
                                    backgroundColor: "white",
                                    padding: "10px",
                                    borderRadius: "4px",
                                    maxWidth: '100%'
                                }}
                                flexDirection="column"
                                gap="5px"
                                justifyContent="flex-start"
                            >
                                <Chip
                                    sx={{ width: "200px" }}
                                    color="warning"
                                    label={`¡Sin resultados para ${search}!`}
                                />

                                <Typography variant="caption">
                                    probablemente no escribiste correctamente tu busqueda, intentalo de nuevo.
                                </Typography>
                            </Stack>
                        </Paper>
                    )}

                    {(loadingGetRegisters && !errorGetRegisters) && (
                        <Stack spacing="20px" sx={{ maxWidth: '700px' }}>
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                        </Stack>
                    )}

                    {(loadingSearch && !errorSearch) && (
                        <Stack spacing="20px" sx={{ maxWidth: '700px' }}>
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                        </Stack>
                    )}

                    {(!loadingGetRegisters && !loadingSearch && !errorGetRegisters && !errorSearch && requestGetRegisters.length === 0) && (
                        <Paper
                            elevation={2}
                        >
                            <Stack
                                flexDirection='row'
                                gap='20px'
                                sx={{
                                    width: '100vw',
                                    maxWidth: '700px',
                                    padding: '20px',
                                }}
                            >
                                <Typography>Sin checklist registrados</Typography>
                                <WarningIcon sx={{ color: 'orange', fontSize: '25px' }} />
                            </Stack>
                        </Paper>
                    )}

                    {(!loadingGetRegisters && requestGetRegisters.length >= 1 && !loadingSearch && !errorSearch && resultsSearch.length === 0) &&
                        <Stack spacing='20px'>
                            {
                                requestGetRegisters.map((item) => (
                                    <Paper
                                        key={item.folio}
                                        sx={{
                                            padding: '20px',
                                            width: IsSmall ? '100%' : '700px'
                                        }}
                                    >

                                        <Stack gap='20px' width='100%' >

                                            <Stack
                                                flexDirection='row'
                                                justifyContent='space-between'
                                                alignItems='center'
                                                flexWrap='wrap'
                                                gap='20px'
                                            >

                                                <Stack
                                                    flexDirection='row'
                                                    alignItems='center'
                                                    flexWrap='wrap'
                                                    gap='10px'
                                                >
                                                    <Chip size="small" color="success" label={`Folio: ${item.folio}`} />

                                                    <Chip
                                                        size="small"
                                                        color="secondary"
                                                        label={dateMXFormat(item.created_at)}
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
                                                        label={datetimeMXFormat(item.created_at)}
                                                        icon={<AccessTimeIcon />}
                                                        sx={{
                                                            maxWidth: "90px",
                                                            fontWeight: 500,
                                                            padding: "5px",
                                                        }}
                                                    />

                                                    <Chip
                                                        size="small"
                                                        color='warning'
                                                        label={item.registros_detalles_entradas.status} />
                                                </Stack>


                                                <Stack>

                                                    {(!state.selectItem || state.selectItem.folio != item.folio) &&
                                                        <Button
                                                            onClick={() => generateDocument(item)}
                                                            size="small"
                                                            variant='contained'
                                                            color='primary'
                                                        >
                                                            Reimprimir
                                                        </Button>}

                                                    {(state.selectItem && state.selectItem.folio === item.folio) && <ButtonDowloand />}
                                                </Stack>

                                            </Stack>

                                            <Stack
                                                justifyContent='space-between'
                                                flexDirection='row'
                                                alignItems='center'
                                                flexWrap='wrap'
                                                gap='20px'

                                            >
                                                <TextGeneral
                                                    label={'Realizado por '}
                                                    text={`${item.users_data?.first_name} ${item.users_data?.last_name}`}
                                                />

                                                <TextGeneral
                                                    label={'Cliente '}
                                                    text={item.nombre_cliente}
                                                />

                                                <TextGeneral
                                                    label={'N° de contenedor'}
                                                    text={item.registros_detalles_entradas.numero_tanque}
                                                />

                                            </Stack>


                                        </Stack>


                                    </Paper>
                                ))
                            }
                        </Stack>
                    }

                    {(!loadingSearch && resultsSearch.length >= 1 && !loadingGetRegisters && !errorSearch) &&
                        <Stack spacing='20px'>
                            {
                                resultsSearch.map((item) => (
                                    <Paper
                                        key={item.folio}
                                        sx={{
                                            padding: '20px',
                                            width: IsSmall ? '100%' : '700px'
                                        }}
                                    >

                                        <Stack gap='20px' width='100%' >

                                            <Stack
                                                flexDirection='row'
                                                justifyContent='space-between'
                                                alignItems='center'
                                                flexWrap='wrap'
                                                gap='20px'
                                            >

                                                <Stack
                                                    flexDirection='row'
                                                    alignItems='center'
                                                    flexWrap='wrap'
                                                    gap='10px'
                                                >
                                                    <Chip size="small" color="success" label={`Folio: ${item.folio}`} />

                                                    <Chip
                                                        size="small"
                                                        color="secondary"
                                                        label={dateMXFormat(item.created_at)}
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
                                                        label={datetimeMXFormat(item.created_at)}
                                                        icon={<AccessTimeIcon />}
                                                        sx={{
                                                            maxWidth: "90px",
                                                            fontWeight: 500,
                                                            padding: "5px",
                                                        }}
                                                    />

                                                    <Chip
                                                        size="small"
                                                        color='warning'
                                                        label={item.registros_detalles_entradas.status} />
                                                </Stack>


                                                <Stack>

                                                    {(!state.selectItem || state.selectItem.folio != item.folio) &&
                                                        <Button
                                                            onClick={() => generateDocument(item)}
                                                            size="small"
                                                            variant='contained'
                                                            color='primary'
                                                        >
                                                            Reimprimir
                                                        </Button>}

                                                    {(state.selectItem && state.selectItem.folio === item.folio) && <ButtonDowloand />}
                                                </Stack>

                                            </Stack>

                                            <Stack
                                                justifyContent='space-between'
                                                flexDirection='row'
                                                alignItems='center'
                                                flexWrap='wrap'
                                                gap='20px'

                                            >
                                                <TextGeneral
                                                    label={'Realizado por '}
                                                    text={`${item.users_data?.first_name} ${item.users_data?.last_name}`}
                                                />

                                                <TextGeneral
                                                    label={'Cliente '}
                                                    text={item.nombre_cliente}
                                                />

                                                <TextGeneral
                                                    label={'N° de contenedor'}
                                                    text={item.registros_detalles_entradas.numero_tanque}
                                                />

                                            </Stack>


                                        </Stack>


                                    </Paper>
                                ))
                            }
                        </Stack>
                    }

                </ContainerScroll>
            </Box>
        </>
    );
}

export { ListCheckList };