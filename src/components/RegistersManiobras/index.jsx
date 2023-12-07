import { useContext, useEffect } from "react";
//components
import { Searcher } from "../Searcher";
import { HistoryItem } from "../HistoryItem";
import { HistoryItemLoading } from "../HistoryItem";
import { actionTypes } from "../../Reducers/ManiobrasReducer";
import { ResultSearch } from "../ResultsSearch";
import { ContainerScroll } from "../ContainerScroll";
import { Box, Stack, Chip, Typography, Paper, Button } from "@mui/material";
//helpers
import { filterSearchVigilancia } from "../../Helpers/searcher";
//hooks
import { useGetRegisters } from "../../Hooks/registersManagment/useGetRegisters";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { useSearcher } from "../../Hooks/useSearcher";
import useMediaQuery from "@mui/material/useMediaQuery";

function RegistersManiobras() {

    useEffect(() => {
        dispatch({
            type: actionTypes.setTypeRegister,
            payload: 'confirmado'
        });
    }, [])

    const isMovile = useMediaQuery("(max-width:640px)");
    const [state, dispatch] = useContext(ManiobrasContext)
    const { requestGetRegisters, errorGetRegisters, loadingGetRegisters } = useGetRegisters();

    const { states, functions } = useSearcher(filterSearchVigilancia, requestGetRegisters);
    const { search, results, loading, error } = states;

    const { searching, onChangueSearch, searchingKey } = functions;

    const renderComponent = requestGetRegisters?.length >= 1 && !loadingGetRegisters && !error && !loading && results.length === 0 ? true : false;
    const renderErrorState = errorGetRegisters && !loadingGetRegisters ? true : false;
    const renderLoadingState = !errorGetRegisters && loadingGetRegisters ? true : false;
    const renderAdvertainsmentCache = errorGetRegisters && requestGetRegisters?.length >= 1;

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: '700px', margin: 'auto' }}>

                <Paper sx={{ backgroundColor: 'whitesmoke' }} elevation={4}>
                    <Stack
                        sx={{
                            padding: '20px',
                            borderRadius: '4px',
                            width: '90vw',
                            maxWidth: '100%'
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
                        >
                            <Chip
                                onClick={() => dispatch({ type: actionTypes.setTypeRegister, payload: "confirmado" })}
                                color={state.typeRegister === "confirmado" ? "success" : "default"}
                                label="confirmadas"
                            />
                            <Chip
                                onClick={() => dispatch({ type: actionTypes.setTypeRegister, payload: "pendiente" })}
                                color={state.typeRegister === "pendiente" ? "info" : "default"}
                                label="pendientes"
                            />

                        </Stack>

                        <Stack width={isMovile ? "100%" : "auto"}>
                            <Searcher
                                onChangueSearch={onChangueSearch}
                                searchingKey={searchingKey}
                                searching={searching}
                                search={search}
                            />
                        </Stack>

                    </Stack>
                </Paper>

                <ContainerScroll height="72vh">
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", width: '100%' }}>

                        {renderAdvertainsmentCache && (
                            <Stack
                                sx={{
                                    backgroundColor: "white",
                                    padding: "10px",
                                    borderRadius: "4px",
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
                        )}

                        {renderComponent && (
                            <Stack gap="20px">
                                {requestGetRegisters.map((item) => (
                                    <HistoryItem
                                        type="maniobras"
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </Stack>
                        )}

                        {renderErrorState && <Typography variant="subtitle">Error, recarga la pagina</Typography>}

                        {(renderLoadingState) &&
                            <Stack spacing={1}>
                                <HistoryItemLoading />
                                <HistoryItemLoading />
                                <HistoryItemLoading />
                            </Stack>
                        }

                        {(loading) &&
                            <Stack spacing={1}>
                                <HistoryItemLoading />
                                <HistoryItemLoading />
                                <HistoryItemLoading />
                            </Stack>
                        }

                        {(error && !loading) && (
                            <Typography variant="subtitle">
                                Sin resultados
                            </Typography>
                        )}

                        {(!loading && !error) && (
                            results.map((result) => (

                                <ResultSearch key={result.id} typeItem="vigilancia" dataItem={result} />

                            ))
                        )}

                    </Box>
                </ContainerScroll>
            </Box>
        </>
    );
}

export { RegistersManiobras };