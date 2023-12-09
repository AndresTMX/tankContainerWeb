//components
import { Box, Stack, Typography, Fade, Alert } from "@mui/material";
import { NotConexionState } from "../NotConectionState";
import { ContainerScroll } from "../ContainerScroll";
import { HistoryItemLoading } from "../HistoryItem";
import { HistoryItem } from "../HistoryItem"


function RegistersVigilancia({ data, error, loading, search, resultsSearch, errorSearch, loadingSearch }) {

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", margin: 'auto', maxWidth: '700px' }}>
                <ContainerScroll height="72vh">

                    {(error) && (
                        <NotConexionState />
                    )}

                    {(!error && !errorSearch && !loading && !loadingSearch && resultsSearch.length === 0 && resultsSearch.length === 0 && data.length >= 1) &&
                        <Fade in={!loading} timeout={500}>
                            <Stack gap="20px">
                                {data.map((item) => (
                                    <HistoryItem
                                        type="vigilancia"
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </Stack>
                        </Fade>
                    }

                    {(!errorSearch && !loading && !loadingSearch && resultsSearch.length >= 1) &&
                        <Fade in={!loading} timeout={500}>
                            <Stack gap="20px">
                                <Typography>Coincidencias basadas en tu busqueda: {search}</Typography>
                                {data.map((item) => (
                                    <HistoryItem
                                        type="vigilancia"
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </Stack>
                        </Fade>
                    }


                    {(loading || loadingSearch) &&
                        <Stack spacing={1}>
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                        </Stack>
                    }

                    {(!error && errorSearch) &&
                        <Fade in={errorSearch}>
                            <Box sx={{ width: '90vw', maxWidth: '700px' }}  >
                                <Alert sx={{ width: '100%' }} severity="warning">{errorSearch.toString()}</Alert>
                            </Box>
                        </Fade>
                    }



                </ContainerScroll>
            </Box>
        </>
    );
}

export { RegistersVigilancia };
