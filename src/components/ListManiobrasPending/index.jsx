//components
import { Box, Stack, Paper, Typography, Chip, Fade, Alert } from "@mui/material";
import { NotConexionState } from "../NotConectionState";
import { ContainerScroll } from "../../components/ContainerScroll";
import { HistoryItemLoading } from "../../components/HistoryItem";
import { HistoryItem } from "../../components/HistoryItem";
//icons
import WarningIcon from '@mui/icons-material/Warning';

function ListManiobrasPending({ requestGetRegisters, loadingGetRegisters, errorGetRegisters, resultsSearch, errorSearch, loadingSearch, search }) {

    return (
        <>
            <Box>
                <ContainerScroll height='67vh'>

                    {(errorGetRegisters) && (
                        <NotConexionState />
                    )}

                    {(!errorGetRegisters && errorSearch) &&
                        <Fade in={errorSearch}>
                            <Box sx={{ width: '90vw', maxWidth: '700px' }}  >
                                <Alert sx={{ width: '100%' }} severity="warning">{errorSearch.toString()}</Alert>
                            </Box>
                        </Fade>
                    }

                    {(loadingGetRegisters || loadingSearch) && (
                        <Stack spacing="20px" sx={{ maxWidth: '700px' }}>
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                        </Stack>
                    )}

                    {(!loadingGetRegisters && !loadingSearch && !errorGetRegisters && !errorSearch && requestGetRegisters.length === 0) && (
                        <Paper
                            elevation={2}
                        >
                            <Stack
                                flexDirection='row'
                                gap='20px'
                                sx={{
                                    width: '100vw',
                                    maxWidth: '700px',
                                    padding: '20px',
                                }}
                            >
                                <Typography >Sin checklist pendientes</Typography>
                                <WarningIcon sx={{ color: 'orange', fontSize: '25px' }} />
                            </Stack>
                        </Paper>
                    )}

                    {(!errorSearch && !loadingGetRegisters && !loadingSearch && search.length >= 1 && resultsSearch.length >= 1) &&
                        <Fade in={!loadingSearch} timeout={500}>
                            <Stack gap="20px">
                                <Typography>Coincidencias basadas en tu busqueda: {search}</Typography>
                                {resultsSearch.map((item) => (
                                    <HistoryItem
                                        type="eir"
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </Stack>
                        </Fade>
                    }

                    {(!loadingGetRegisters && !loadingSearch && !errorGetRegisters && !errorSearch && resultsSearch.length === 0) &&
                        <Fade in={!loadingGetRegisters} timeout={500}>
                            <Stack spacing='20px'>
                                {
                                    requestGetRegisters.map((item) => (
                                        <HistoryItem
                                            type='eir'
                                            key={item.id}
                                            data={item}
                                        />))
                                }
                            </Stack>
                        </Fade>}

                </ContainerScroll>
            </Box>
        </>
    );
}

export { ListManiobrasPending };