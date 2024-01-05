import { useContext, useState } from "react";
//components
import { Container, Box, Stack, Fade, Paper, Chip, } from "@mui/material";
import { ListManiobrasPending } from "../../components/ListManiobrasPending";
import { DetailsCheckList } from "../../components/DetailsCheckList";
import { ListCheckList } from "../../components/ListCheckList";
import { Searcher } from "../../components/Searcher";
//context
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { AuthContext } from "../../Context/AuthContext";
//newCheckList
import { CheckListEIR } from "../../sections/CheckListEIR";
//hooks
import { useGetEIR } from "../../Hooks/Maniobras/useGetEIR";
import { useGetLastFolio } from "../../Hooks/foliosManagment/useGetLastFolio";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSearcher } from "../../Hooks/useSearcher";
//helpers
import { routerFilterSearch } from "../../Helpers/searcher";
import { dateMXFormat, datetimeMXFormat } from "../../Helpers/date";
//ViewerPDF
import { ViewerDocument } from "../../PDFs/components/Viewer";
import { EIR } from "../../PDFs/plantillas/EIR";

function EIRManiobras() {

    const isMovile = useMediaQuery("(max-width:730px)");

    const { folio } = useGetLastFolio();
    const { key } = useContext(AuthContext);

    const [typeRegister, setTypeRegister] = useState("pendientes")
    const changueTypeRegister = (newType) => setTypeRegister(newType)
    const { loading: loadingEIR, error: errorEIR, data: dataEIR } = useGetEIR(typeRegister)

    const session = JSON.parse(sessionStorage.getItem(key));
    const [state, dispatch] = useContext(ManiobrasContext);

    const { selectItem, previewPDF, maniobrasCheckList, cliente, status, select } = state;
    const checkList = [...maniobrasCheckList?.pageOne, ...maniobrasCheckList?.pageTwo, ...maniobrasCheckList?.pageThree];
    const { dayInput, numero_tanque, tracto } = selectItem;

    //inicio del hook del buscador
    const { states: statesSearcher, functions } = useSearcher(routerFilterSearch, dataEIR, typeRegister);
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
        folio: folio,
        newStatus: status,
    }

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

                {(!select) &&
                    <Fade timeout={500} in={!select}>
                        <Box
                            sx={{
                                gap: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                            }}>

                            <Paper
                                elevation={2}
                                sx={{
                                    padding: '10px',
                                    alignItems:'center',    
                                    bgcolor:'whitesmoke'
                                }}>

                                <Stack
                                    sx={{
                                        padding: '10px',
                                        borderRadius: '4px',
                                        width: isMovile? '100%':'auto',
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
                                        gap="20px"
                                        width={"auto"}
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

                                    <Stack width={isMovile ? '100%' : '400px'} alignItems={isMovile? 'center':'flex-end'}>
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

                            {(typeRegister === 'pendientes') &&
                                <ListManiobrasPending
                                    requestGetRegisters={dataEIR}
                                    loadingGetRegisters={loadingEIR}
                                    errorGetRegisters={errorEIR}
                                    resultsSearch={results}
                                    loadingSearch={loading}
                                    errorSearch={error}
                                    search={search}
                                />}

                            {(typeRegister === 'realizados') &&
                                <ListCheckList
                                    requestGetRegisters={dataEIR}
                                    loadingGetRegisters={loadingEIR}
                                    errorGetRegisters={errorEIR}
                                    resultsSearch={results}
                                    loadingSearch={loading}
                                    errorSearch={error}
                                    search={search}
                                />
                            }

                        </Box>
                    </Fade>
                }


                {(select) &&
                    <Fade
                        timeout={500}
                        in={select}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                paddingBottom: '10px',
                                paddingTop:'1px',
                                overflow: 'hidden',
                                height: '100%',
                            }}>

                            <Paper
                                elevation={4}
                                sx={{
                                    width:'99%',
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
                                    changueTypeRegister={changueTypeRegister}/>

                                    <CheckListEIR
                                    step={step}
                                    setStep={setStep}
                                    />

                                </Box>
                            </Paper>
                        </Box>
                    </Fade>
                }

            </Box>

            <ViewerDocument stateModal={previewPDF} dispatch={dispatch}>
                <EIR maniobrasCheckList={checkList} data={data} />
            </ViewerDocument>
        </>
    );
}

export { EIRManiobras };