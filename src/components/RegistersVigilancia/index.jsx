import { useContext } from "react";
//components
import { Searcher } from "../Searcher";
import { HistoryItem } from "../HistoryItem";
import { actionTypes } from "../../Reducers/ManiobrasReducer";
import { ResultSearch } from "../ResultsSearch";
import { ContainerScroll } from "../ContainerScroll";
import { Box, Stack, Chip, Typography, Paper } from "@mui/material";
//helpers
import { filterSearchVigilancia } from "../../Helpers/searcher";
//hooks
import { useGetRegisters } from "../../Hooks/registersManagment/useGetRegisters";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSearcher } from "../../Hooks/useSearcher";

function RegisterVigilancia() {

    const isMovile = useMediaQuery("(max-width:640px)");
    const [state, dispatch] = useContext(ManiobrasContext)
    const { requestGetRegisters, errorGetRegisters, loadingGetRegisters } = useGetRegisters();

    const { states, functions } = useSearcher(filterSearchVigilancia, requestGetRegisters);
    const { search, results, loading, error } = states;

    const { searching, onChangueSearch, searchingKey } = functions;

    const renderComponent = requestGetRegisters?.length >= 1 && !error && !loading && results.length === 0 ? true : false;
    const renderErrorState = errorGetRegisters && !loadingGetRegisters ? true : false;
    const renderLoadingState = !errorGetRegisters && loadingGetRegisters ? true : false;
    const renderAdvertainsmentCache = errorGetRegisters && requestGetRegisters?.length >= 1;

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                <Paper elevation={4}>
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
                                color={state.typeRegister === "entrada" ? "success" : "default"}
                                label="entradas"
                            />
                            <Chip
                                onClick={() => dispatch({ type: actionTypes.setTypeRegister, payload: "salida" })}
                                color={state.typeRegister === "salida" ? "info" : "default"}
                                label="salidas"
                            />
                            <Chip
                                onClick={() => dispatch({ type: actionTypes.setTypeRegister, payload: "ambas" })}
                                color={state.typeRegister === "ambas" ? "warning" : "default"}
                                label="ambas"
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

                <ContainerScroll height="62vh">
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", width:'100%' }}>

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
                                        type="vigilancia"
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </Stack>
                        )}

                        {renderErrorState && <Typography variant="subtitle">Error, recarga la pagina</Typography>}

                        {(renderLoadingState) && <Typography variant="subtitle">cargando...</Typography>}

                        {(loading) && <Typography variant="subtitle">cargando busqueda...</Typography>}

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

export { RegisterVigilancia };
