import { useContext } from "react";
//components
import { ContainerScroll } from "../ContainerScroll";
import { NotConexionState } from "../NotConectionState";
import { HistoryItemLoading } from "../HistoryItem";
import { HistoryItem } from "../HistoryItem"
import { Box, Stack, Chip, Typography, Paper, Button } from "@mui/material";
//helpers

//hooks
import useMediaQuery from "@mui/material/useMediaQuery";

function InputRegistersVigilancia({ data, error, loading, search, resultsSearch, errorSearch, loadingSearch }) {

    const isMovile = useMediaQuery("(max-width:640px)");

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", margin: 'auto' }}>
                <ContainerScroll height="72vh">

                    {(error) && (
                        <NotConexionState />
                    )}

                    {(!error && !loading && resultsSearch.length === 0 && data.length >= 1) &&
                        <Stack gap="20px">
                            {data.map((item) => (
                                <HistoryItem
                                    type="vigilancia"
                                    key={item.id}
                                    data={item}
                                />
                            ))}
                        </Stack>
                    }

                    {(loading || loadingSearch) &&
                        <Stack spacing={1}>
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                        </Stack>
                    }

                    {/* {renderAdvertainsmentCache && (
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

                        {(renderComponent && state.typeRegister === 'entrada') && (
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

                        {(renderComponent && state.typeRegister === 'salida') && (
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
                        )} */}

                </ContainerScroll>
            </Box>
        </>
    );
}

export { InputRegistersVigilancia };
