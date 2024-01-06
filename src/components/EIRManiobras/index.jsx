import { useContext, useState } from "react";
//components
import { Box, Stack, Fade, Paper, Chip, Modal, Typography, Alert } from "@mui/material";
import { DetailsCheckList } from "../../components/DetailsCheckList";
import { CheckListEIR } from "../../sections/CheckListEIR";
import { NotConexionState } from "../NotConectionState";
import { Searcher } from "../../components/Searcher";
import { HistoryItemLoading } from "../HistoryItem";
import { ItemEIR } from "../ItemEIR";
//context
import { AuthContext } from "../../Context/AuthContext";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
//hooks
import { useGetLastFolio } from "../../Hooks/foliosManagment/useGetLastFolio";
import { useGetEIR } from "../../Hooks/Maniobras/useGetEIR";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSearcher } from "../../Hooks/useSearcher";
//helpers
import { routerFilterSearch } from "../../Helpers/searcher";
//ViewerPDF
import { ViewerDocument } from "../../PDFs/components/Viewer";
import { EIR } from "../../PDFs/plantillas/EIR";
import { ContainerScroll } from "../ContainerScroll";

function EIRManiobras() {

    const { folio } = useGetLastFolio();
    const { key } = useContext(AuthContext);
    const session = JSON.parse(sessionStorage.getItem(key));
    const { user_metadata } = session || {};
    const { first_name, last_name } = user_metadata || {};

    const isMovile = useMediaQuery("(max-width:730px)");

    //hook para consultar eir
    const [typeRegister, setTypeRegister] = useState("pendientes")
    const changueTypeRegister = (newType) => setTypeRegister(newType)
    const { loading: loadingEIR, error: errorEIR, data: dataEIR } = useGetEIR(typeRegister)

    //contexto maniobras
    const [state, dispatch] = useContext(ManiobrasContext);

    //maniobrasContextRevisar
    const { maniobrasCheckList } = state;
    const checkList = [...maniobrasCheckList?.pageOne, ...maniobrasCheckList?.pageTwo, ...maniobrasCheckList?.pageThree];

    const [viewPDF, setViewPDF] = useState(false);
    const ToggleModalPDF = () => setViewPDF(!viewPDF);

    const [modalCheck, setModalCheck] = useState(false);
    const toggleModalCheck = () => setModalCheck(!modalCheck);
    const [item, selectItem] = useState({});

    const [newDocument, setNewDocument] = useState({ usuario_emisor: `${first_name} ${last_name}` });

    //inicio del hook del buscador
    const { states: statesSearcher, functions } = useSearcher(routerFilterSearch, dataEIR, typeRegister);
    const { search, results, loading, error } = statesSearcher;
    const { searching, onChangueSearch, searchingKey } = functions;

    //counterStep
    const [step, setStep] = useState(1);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0px',
                }}>

                <Stack gap='10px'>

                    <Paper elevation={2} sx={{ padding: '10px', bgcolor: 'whitesmoke' }}>

                        <Stack
                            justifyContent={isMovile ? "center" : "space-between"}
                            width={isMovile ? '100%' : 'auto'}
                            flexDirection="row"
                            alignItems="center"
                            borderRadius="4px"
                            flexWrap="wrap"
                            padding="10px"
                            gap="20px"
                        >

                            <Stack
                                flexDirection="row"
                                alignItems="center"
                                flexWrap="wrap"
                                width="auto"
                                gap="20px"
                            >
                                <Chip
                                    onClick={() => setTypeRegister("pendientes")}
                                    color={typeRegister === "pendientes" ? "warning" : "default"}
                                    label="pendientes"
                                />
                                <Chip
                                    onClick={() => setTypeRegister("realizados")}
                                    color={typeRegister === "realizados" ? "success" : "default"}
                                    label="realizados"
                                />

                            </Stack>

                            <Box sx={{ width: isMovile ? '100%' : '400px', alignItems: isMovile ? 'center' : 'flex-end' }}>
                                <Searcher
                                    search={search}
                                    searching={searching}
                                    placeholder={'Busca registros usando ....'}
                                    searchingKey={searchingKey}
                                    onChangueSearch={onChangueSearch}
                                />
                            </Box>

                        </Stack>

                    </Paper>

                    <ContainerScroll height={'55vh'}>

                        {(errorEIR) && <NotConexionState />}

                        {(!errorEIR && error) &&
                            <Fade in={error}>
                                <Box sx={{ width: '90vw', maxWidth: '700px' }}  >
                                    <Alert sx={{ width: '100%' }} severity="warning">{error.toString()}</Alert>
                                </Box>
                            </Fade>
                        }

                        {(loadingEIR || loading) && (
                            <Stack spacing="20px" sx={{ maxWidth: '700px' }}>
                                <HistoryItemLoading />
                                <HistoryItemLoading />
                                <HistoryItemLoading />
                            </Stack>
                        )}

                        {(!loadingEIR && !loading && !errorEIR && !error && dataEIR.length === 0) && (
                            <Fade in={error}>
                                <Box sx={{ width: '90vw', maxWidth: '700px' }}  >
                                    <Alert severity='info'>
                                        Sin checklist pendientes
                                    </Alert>
                                </Box>
                            </Fade>
                        )}

                        {(!error && !loadingEIR && !loading && search.length >= 1 && results.length >= 1) &&
                            <Fade in={!loading} timeout={500}>
                                <Stack gap="20px">
                                    <Typography>Coincidencias basadas en tu busqueda: {search}</Typography>
                                    {results.map((item) => (
                                        <ItemEIR
                                            key={item.id}
                                            data={item}
                                            typeRegister={typeRegister}


                                        />
                                    ))}
                                </Stack>
                            </Fade>
                        }

                        {(!loadingEIR && !loading && !errorEIR && !error && results.length === 0) &&
                            <Fade in={!loadingEIR} timeout={500}>
                                <Stack spacing='20px'>
                                    {
                                        dataEIR.map((item) => (
                                            <ItemEIR
                                                key={item.id}
                                                data={item}
                                                typeRegister={typeRegister}

                                            />))
                                    }
                                </Stack>
                            </Fade>}

                    </ContainerScroll>

                </Stack>

            </Box>

            <ModalCheckListEIR
                changueTypeRegister={changueTypeRegister}
                stateModal={modalCheck}
                setStep={setStep}
                step={step}
            />

            <ViewerDocument stateModal={viewPDF} ToggleModal={ToggleModalPDF}>
                <EIR maniobrasCheckList={checkList} dataDocument={newDocument} />
            </ViewerDocument>
        </>
    );
}

export { EIRManiobras };

export function ModalCheckListEIR({ stateModal, setStep, step, changueTypeRegister }) {
    return (
        <>
            <Modal open={stateModal}>
                <Fade
                    timeout={500}
                    in={stateModal}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100vw',
                            height: '100vh',
                            paddingTop: '5%',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>

                        <Paper
                            elevation={4}
                            sx={{
                                width: '99%',
                                padding: '10px',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                }}
                            >
                                <DetailsCheckList
                                    step={step}
                                    changueTypeRegister={changueTypeRegister} />

                                <CheckListEIR
                                    step={step}
                                    setStep={setStep}
                                />

                            </Box>
                        </Paper>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}