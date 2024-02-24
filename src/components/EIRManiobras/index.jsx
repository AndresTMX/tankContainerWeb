import { useState } from "react";
//components
import { Box, Stack, Fade, Paper, Chip, Alert } from "@mui/material";
import { DetailsCheckList } from "../../components/DetailsCheckList";
import { CheckListEIR } from "../../sections/CheckListEIR";
import { NotConexionState } from "../NotConectionState";
import { ItemLoadingState } from "../ItemLoadingState";
import { ContainerScroll } from "../ContainerScroll";
import { Searcher } from "../../components/Searcher";
import { ItemEIR } from "../ItemEIR";
//hooks
import { useGetEIR } from "../../Hooks/Maniobras/useGetEIR";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Toaster } from "sonner";

function EIRManiobras() {

    const isMovile = useMediaQuery("(max-width:730px)");

    //hook para consultar eir
    const [typeRegister, setTypeRegister] = useState("pendientes")
    const changueTypeRegister = (type) => {
        setTypeRegister(type)
        setData([])
    }

    const { loading: loadingEIR, error: errorEIR, data: dataEIR, setData } = useGetEIR(typeRegister)

    const [modalCheck, setModalCheck] = useState(false);
    const toggleModalCheck = () => setModalCheck(!modalCheck);

    return (
        <>

            <Toaster richColors position='top-center' />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0px',
                }}>

                {!modalCheck &&
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
                                        onClick={() => changueTypeRegister("pendientes")}
                                        color={typeRegister === "pendientes" ? "warning" : "default"}
                                        label="pendientes"
                                    />
                                    <Chip
                                        onClick={() => changueTypeRegister("realizados")}
                                        color={typeRegister === "realizados" ? "success" : "default"}
                                        label="realizados"
                                    />

                                </Stack>

                                <Box sx={{ width: '350px', alignItems: isMovile ? 'center' : 'flex-end' }}>
                                    <Searcher

                                    />
                                </Box>

                            </Stack>

                        </Paper>

                        <ContainerScroll height={isMovile ? '62vh' : '68vh'}>

                            {(errorEIR) && <NotConexionState />}

                            {(loadingEIR) && (
                                <Stack gap="20px" >
                                    <ItemLoadingState />
                                    <ItemLoadingState />
                                    <ItemLoadingState />
                                </Stack>
                            )}

                            {(!loadingEIR && !errorEIR && dataEIR.length === 0) && (
                                <Fade in={!loadingEIR}>
                                    <Box sx={{ width: '90vw', maxWidth: '700px' }} >
                                        {typeRegister === 'pendientes' &&
                                            <Alert severity='info'>
                                                Sin checklist pendientes
                                            </Alert>}

                                        {typeRegister === 'realizados' &&
                                            <Alert severity='info'>
                                                Sin checklist realizados
                                            </Alert>}
                                    </Box>
                                </Fade>
                            )}

                            {(!loadingEIR && !errorEIR) &&
                                <Fade in={!loadingEIR} timeout={500}>
                                    <Stack spacing='10px'>
                                        {
                                            dataEIR.map((element) => (
                                                <ItemEIR
                                                    key={typeRegister === 'pendientes' ? element.id : element.folio}
                                                    data={element}
                                                    typeRegister={typeRegister}
                                                    toggleChecklist={toggleModalCheck}

                                                />))
                                        }
                                    </Stack>
                                </Fade>}

                        </ContainerScroll>

                    </Stack>
                }
            </Box>

            {modalCheck &&
                <Stack>
                    <DetailsCheckList
                        toggleModalCheck={toggleModalCheck}
                        setTypeRegister={setTypeRegister}
                    />

                    <CheckListEIR />
                </Stack>}
        </>
    );
}

export { EIRManiobras };
