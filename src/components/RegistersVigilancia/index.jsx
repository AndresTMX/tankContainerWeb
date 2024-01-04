//components
import { Box, Stack, Typography, Fade, Alert } from "@mui/material";
import { NotConexionState } from "../NotConectionState";
import { ContainerScroll } from "../ContainerScroll";
import { HistoryItemLoading } from "../HistoryItem";
import { HistoryItem } from "../HistoryItem"
import useMediaQuery from "@mui/material/useMediaQuery";


function RegistersVigilancia({ data, error, loading, search, resultsSearch, errorSearch, loadingSearch, updater }) {

    const isMovile = useMediaQuery('(max-width:635px)')

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", margin: 'auto' }}>
                <ContainerScroll height={isMovile ? "68vh" : "72vh"}>

                    <Stack gap='10px' width='100%'>

                        {(error) && (
                            <NotConexionState />
                        )}

                        {(!error && errorSearch) &&
                            <Fade in={errorSearch}>
                                <Box sx={{ width: '90vw', maxWidth: '700px' }}  >
                                    <Alert sx={{ width: '100%' }} severity="warning">{errorSearch.toString()}</Alert>
                                </Box>
                            </Fade>
                        }

                        {(!errorSearch && !loading && !loadingSearch && resultsSearch.length >= 1) &&
                            <Typography>Coincidencias encontradas para la busqeda {search}</Typography>
                        }

                        {(loading || loadingSearch) &&
                            <>
                                <HistoryItemLoading />
                                <HistoryItemLoading />
                                <HistoryItemLoading />
                            </>
                        }

                        {(!error && !errorSearch && !loading && !loadingSearch && data.length === 0) &&
                            <Box sx={{ width: '90vw', maxWidth: '700px' }} >
                                <Alert sx={{ width: '100%' }} severity="warning">{'Sin maniobras pendientes'}</Alert>
                            </Box>
                        }


                        {(!error && !errorSearch && !loading && !loadingSearch && resultsSearch.length === 0 && data.length >= 1) &&
                            data.map((item) => (
                                <HistoryItem
                                    updater={updater}
                                    type="vigilancia"
                                    key={item.id}
                                    data={item}
                                />
                            ))
                        }

                        {(!errorSearch && !loading && !loadingSearch && resultsSearch.length >= 1) &&
                            data.map((item) => (
                                <HistoryItem
                                    type="vigilancia"
                                    updater={updater}
                                    key={item.id}
                                    data={item}
                                />
                            ))
                        }

                    </Stack>

                </ContainerScroll>
            </Box>
        </>
    );
}

export { RegistersVigilancia };
