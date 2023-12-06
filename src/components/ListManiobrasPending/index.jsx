//components
import { Box, Stack, Paper, Typography, Chip, } from "@mui/material";
import { ContainerScroll } from "../../components/ContainerScroll";
import { HistoryItemLoading } from "../../components/HistoryItem";
import { HistoryItem } from "../../components/HistoryItem";
import { filterInputRegistersForManiobras } from "../../Helpers/transformRegisters";
//icons
import WarningIcon from '@mui/icons-material/Warning';

function ListManiobrasPending({ requestGetRegisters, loadingGetRegisters, errorGetRegisters, resultsSearch, errorSearch, loadingSearch, search }) {

    const filterRequest = (requestGetRegisters.length >= 1 && requestGetRegisters[0].type === 'entrada') ? filterInputRegistersForManiobras(requestGetRegisters) : [];

    return (
        <>
            <Box>
                <ContainerScroll height='67vh'>

                    {(errorGetRegisters) && (
                        <Paper sx={{ width: '100vw', maxWidth: '700px', marginBottom: '20px', padding: '20px' }}>
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

                    {(errorSearch && resultsSearch.length === 0 && !loadingSearch) && (
                        <Paper sx={{ width: '100vw', maxWidth: '700px', marginBottom: '20px', padding: '20px' }}>
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

                    {(loadingSearch && !errorSearch) && (
                        <Stack spacing="20px" sx={{ maxWidth: '700px' }}>
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                        </Stack>
                    )}

                    {(!loadingGetRegisters && !loadingSearch && !errorGetRegisters && !errorSearch && filterRequest.length === 0) && (
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

                    {(!loadingGetRegisters && filterRequest.length >= 1 && !loadingSearch && !errorSearch && resultsSearch.length === 0) &&
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

                    {(!loadingSearch && !errorSearch && resultsSearch.length >= 1) &&
                        <Stack spacing='20px'>
                            {
                                resultsSearch.map((item) => (
                                    <HistoryItem
                                        type='maniobras'
                                        key={item.id}
                                        data={item}
                                    />))
                            }
                        </Stack>}

                </ContainerScroll>
            </Box>
        </>
    );
}

export { ListManiobrasPending };