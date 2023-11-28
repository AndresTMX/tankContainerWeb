import { useContext } from "react";
import { Container, Box, Stack, Fade, Paper, Typography, Chip, } from "@mui/material";
import { ListManiobrasPending } from "../../components/ListManiobrasPending";
import { DetailsCheckList } from "../../components/DetailsCheckList";
import { Searcher } from "../../components/Searcher";
//Notification
import { Notification } from "../../components/Notification";
import { LoadingState } from "../../components/LoadingState";
//context
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { AuthContext } from "../../Context/AuthContext";
//newCheckList
import { CheckListEIR } from "../../sections/CheckListEIR";
//hooks
import { useGetRegisters } from "../../Hooks/registersManagment/useGetRegisters";
import { useGetLastFolio } from "../../Hooks/foliosManagment/useGetLastFolio";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSearcher } from "../../Hooks/useSearcher";
import { actionTypes } from "../../Reducers/ManiobrasReducer";
//helpers
import { filterInputRegistersForManiobras } from "../../Helpers/transformRegisters";
import { routerFilterSearch } from "../../Helpers/searcher";
import { currenDateFormatTz, dateMXFormat, datetimeMXFormat } from "../../Helpers/date";
//ViewerPDF
import { ViewerDocument } from "../../PDFs/components/Viewer";
import { EIR } from "../../PDFs/plantillas/EIR";

function Maniobras() {

    const { folio } = useGetLastFolio();
    const IsSmall = useMediaQuery('(max-width:900px)');
    const isMovile = useMediaQuery("(max-width:640px)");
    const { key } = useContext(AuthContext);

    const session = JSON.parse(sessionStorage.getItem(key));
    const [state, dispatch] = useContext(ManiobrasContext);
    const { selectItem, previewPDF, maniobrasCheckList, cliente, status } = state;
    const { carga, dayInput, dateInput, linea, numero_tanque, tracto, checkIn } = selectItem;

    //estado del checklist 
    const selectItemState = !selectItem ? false : true;
    //inicio del hook de registros
    const { requestGetRegisters, errorGetRegisters, loadingGetRegisters } = useGetRegisters();

    //inicio del hook del buscador
    const { states: statesSearcher, functions } = useSearcher(routerFilterSearch, requestGetRegisters, state.typeRegister);
    const { search, results, loading, error } = statesSearcher;
    const { searching, onChangueSearch, searchingKey } = functions;

    const data = {
        numero_tanque: numero_tanque,
        fechaActual: dateMXFormat(new Date()),
        horaActual: datetimeMXFormat(new Date()),
        cliente: cliente,
        entrada: dayInput,
        numero_unidad: tracto,
        usuario_emisor: `${session.user_metadata.first_name} ${session.user_metadata.last_name} `,
        folio: folio[0].folio,
        newStatus: status,
    }

    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0px',
                }}>

                {!selectItemState &&
                    <Fade timeout={500} in={!selectItemState}>
                        <Container
                            sx={{
                                gap: '10px',
                                display: 'flex',
                                marginTop: '20px',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: !IsSmall ? 'center' : '',
                            }}>

                            <Paper
                                elevation={2}
                                sx={{
                                    width: '100%',
                                    padding: '10px',
                                    maxWidth: '670px',
                                    backgroundColor: 'whitesmoke',
                                }}>

                                <Stack
                                    sx={{
                                        backgroundColor: 'whitesmoke',
                                        padding: '20px',
                                        borderRadius: '4px'
                                    }}
                                    flexDirection="row"
                                    justifyContent={isMovile ? "center" : "space-between"}
                                    alignItems="center"
                                    flexWrap="wrap"
                                    gap="20px"
                                >
                                    <Stack
                                        flexDirection="row"
                                        alignItems="center"
                                        flexWrap="wrap"
                                        gap="10px"
                                        width={isMovile ? "100%" : "auto"}
                                    >
                                        <Chip
                                            onClick={() => dispatch({ type: actionTypes.setTypeRegister, payload: "entrada" })}
                                            color={state.typeRegister === "entrada" ? "warning" : "default"}
                                            label="checklist pendientes"
                                        />
                                        <Chip
                                            onClick={() => dispatch({ type: actionTypes.setTypeRegister, payload: "checklist_realizados" })}
                                            color={state.typeRegister === "checklist_realizados" ? "success" : "default"}
                                            label="checklist realizados"
                                        />

                                    </Stack>

                                    <Stack>
                                        <Searcher
                                            search={search}
                                            searching={searching}
                                            placeholder={'Busca registros usando ....'}
                                            searchingKey={searchingKey}
                                            onChangueSearch={onChangueSearch}
                                        />
                                    </Stack>

                                </Stack>

                            </Paper>

                            {(state.typeRegister === 'entrada') &&
                                <ListManiobrasPending
                                    requestGetRegisters={requestGetRegisters}
                                    loadingGetRegisters={loadingGetRegisters}
                                    errorGetRegisters={errorGetRegisters}
                                    resultsSearch={results}
                                    loadingSearch={loading}
                                    errorSearch={error}
                                    search={search}
                                />}

                            {(state.typeRegister === 'checklist_realizados' && !loadingGetRegisters) &&
                                <p>Checklist realizados</p>
                            }


                        </Container>
                    </Fade>
                }


                {selectItemState &&
                    <Fade
                        timeout={500}
                        in={selectItemState}
                    >
                        <Container
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginTop: '20px',
                                paddingBottom: '20px',
                                overflow: 'hidden',
                                height: '100%',
                            }}>

                            <Paper
                                elevation={4}
                                sx={{
                                    width: '85vw',
                                    maxWidth: '800px',
                                    padding: '20px',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                    }}
                                >
                                    <DetailsCheckList />

                                    <CheckListEIR />

                                </Box>
                            </Paper>
                        </Container>
                    </Fade>
                }

            </Container>

            <ViewerDocument stateModal={previewPDF} dispatch={dispatch}>
                <EIR maniobrasCheckList={maniobrasCheckList} data={data} />
            </ViewerDocument>

            <LoadingState duration={1000} />

            <Notification />
        </>
    );
}

export { Maniobras };