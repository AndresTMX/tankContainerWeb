import { useContext } from "react";
import { Container, Box, Stack, Fade, Paper, Typography, Chip, } from "@mui/material";
import { DetailsCheckList } from "../../components/DetailsCheckList";
import { ContainerScroll } from "../../components/ContainerScroll";
import { HistoryItemLoading } from "../../components/HistoryItem";
import { HistoryItem } from "../../components/HistoryItem";
import { Searcher } from "../../components/Searcher";
//Notification
import { Notification } from "../../components/Notification";
//context
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { AuthContext } from "../../Context/AuthContext";
//newCheckList
import { CheckListEIR } from "../../sections/CheckListEIR";
//hooks
import { useGetRegisters } from "../../Hooks/registersManagment/useGetRegisters";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSearcher } from "../../Hooks/useSearcher";
//helpers
import { filterInputRegistersForManiobras } from "../../Helpers/transformRegisters";
import { filterSearchManiobras } from "../../Helpers/searcher";
import { currenDateFormatTz, dateMXFormat, datetimeMXFormat } from "../../Helpers/date";
//ViewerPDF
import { ViewerDocument } from "../../PDFs/components/Viewer";
import { EIR } from "../../PDFs/plantillas/EIR";

function Maniobras() {

    const IsSmall = useMediaQuery('(max-width:900px)');
    const { key } = useContext(AuthContext);

    const session = JSON.parse(sessionStorage.getItem(key));
    const [state, dispatch] = useContext(ManiobrasContext);
    const { selectItem, previewPDF, maniobrasCheckList, cliente, status } = state;
    const { carga, dayInput, dateInput, linea, numero_tanque, tracto, checkIn } = selectItem;

    //estado del checklist 
    const selectItemState = !selectItem ? false : true;
    //inicio del hook de registros
    const { requestGetRegisters, errorGetRegisters, loadingGetRegisters } = useGetRegisters();
    //filtro del request del hook de registros 
    const filterRequest = requestGetRegisters.length >= 1 ? filterInputRegistersForManiobras(requestGetRegisters) : [];
    //inicio del hook del buscador
    const { states: statesSearcher, functions } = useSearcher(filterSearchManiobras, filterRequest);
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
        folio: 'new folio',
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

                                <Stack gap={'10px'}>
                                    <Typography variant='caption'>Busca un registro</Typography>
                                    <Searcher
                                        placeholder={'linea oeste , 125 , tanque , angel martinez '}
                                        onChangueSearch={onChangueSearch}
                                        searchingKey={searchingKey}
                                        searching={searching}
                                        search={search}
                                    />
                                </Stack>

                            </Paper>

                            <Box>
                                <ContainerScroll height='70vh'>

                                    {(errorGetRegisters) && (
                                        <Paper sx={{ width: '100vw', maxWidth: '100%', marginBottom: '20px', padding: '20px' }}>
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

                                    {(error) && (
                                        <Paper sx={{ width: '100vw', maxWidth: '100%', marginBottom: '20px', padding: '20px' }}>
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

                                    {(loading && !error) && (
                                        <Stack spacing="20px" sx={{ maxWidth: '700px' }}>
                                            <HistoryItemLoading />
                                            <HistoryItemLoading />
                                            <HistoryItemLoading />
                                        </Stack>
                                    )}


                                    {(!loadingGetRegisters && filterRequest.length >= 1 && !loading && !error && results.length === 0) &&
                                        <Stack spacing='20px'>
                                            {
                                                filterRequest.map((item) => (
                                                    <HistoryItem
                                                        type='maniobras'
                                                        key={item.id}
                                                        data={item}
                                                    />))
                                            }
                                        </Stack>}

                                    {(!loading && !error && results.length >= 1) &&
                                        <Stack spacing='20px'>
                                            {
                                                results.map((item) => (
                                                    <HistoryItem
                                                        type='maniobras'
                                                        key={item.id}
                                                        data={item}
                                                    />))
                                            }
                                        </Stack>}

                                </ContainerScroll>
                            </Box>


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
                <EIR maniobrasCheckList={maniobrasCheckList} data={data}/>
            </ViewerDocument>

            <Notification />
        </>
    );
}

export { Maniobras };