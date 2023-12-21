//imports hooks
import { useState, useContext } from "react";
import { useSearcher } from "../../Hooks/useSearcher"
import { ReparacionesContext } from "../../Context/ReparacionesContext"
import { useGetRepairs } from "../../Hooks/reparacionesManagment/useGetRepairs";
//imports materialui
import { Container, Box, Tabs, Tab, Stack, Fade, Paper, Typography, Chip, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
//components
import { MaintenancesItem } from "../../components/MaintenancesITem";
import { ContainerScroll } from "../../components/ContainerScroll";
import { HistoryItemLoading } from "../../components/HistoryItem";
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { Searcher } from "../../components/Searcher";
import { currentDate } from "../../Helpers/date";
import { ModalRepair } from "../../components/ModalRepair";
import { Notification } from "../../components/Notification";
import { LoadingState } from "../../components/LoadingState"
//helpers
import { filterSearchRepair } from "../../Helpers/searcher";

function Reparaciones() {

    const IsSmall = useMediaQuery('(max-width:900px)')
    const IsExtraSmall = useMediaQuery('(max-width:700px)');
    const [typeRepair, setTypeRepair] = useState('pendiente')

    const { repairs, loadingRepairs, errorRepairs, updateRepairs } = useGetRepairs(typeRepair);
    const { states, functions } = useSearcher(filterSearchRepair, repairs, typeRepair);

    const { search, results, loading, error } = states;
    const { searching, onChangueSearch, clearResults, searchingKey } = functions;

    const [itemRepair, setItemRepair] = useState(false);
    const selectTedItemRepair = (item) => setItemRepair(item);

    const ToggleTab = (event, newValue) => {
        setTab(newValue)
    }

    const mockMaintances = [
        {
            id: 0,
            hora: currentDate,
            linea: 'Linea random',
            tracto: 'Un tracto chido',
            tanque: 'C-2356',
            operador: 'Juan Miguel Salazar Perez',
            celular: '5577828470',
            status: 'pending',
            tipo: 'interno',
            date_end: ''
        },
        {
            id: 2,
            hora: currentDate,
            linea: 'Linea random',
            tracto: 'Un tracto chido',
            tanque: 'C-2356',
            operador: 'Lucas Ascencio Lopez',
            celular: '5577828470',
            status: 'pending',
            tipo: 'interno',
            date_end: ''
        },
        {
            id: 3,
            hora: currentDate,
            linea: 'Linea random',
            tracto: 'Un tracto chido',
            tanque: 'C-2356',
            operador: 'Armando Mendoza Lopez',
            celular: '5577828470',
            status: 'complete',
            tipo: 'externo',
            date_end: ''
        },
        {
            id: 4,
            hora: currentDate,
            linea: 'Linea random',
            tracto: 'Un tracto chido',
            tanque: 'C-2356',
            operador: 'Antonio Lopez De La Cruz',
            celular: '5577828470',
            status: 'proces',
            tipo: 'interno',
            date_end: ''
        },
    ]

    const maintenancesComplete = mockMaintances.filter(item => item.status === 'complete')
    const maintenancesPending = mockMaintances.filter(item => item.status === 'pending')
    const maintenancesProces = mockMaintances.filter(item => item.status === 'proces')

    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    overflow: 'hidden',
                    minHeight: '90vh',
                    gap: '15px'
                }}
            >
                {!itemRepair &&
                    <Fade in={!itemRepair}>
                        <Paper
                            sx={{
                                width: '90vw',
                                maxWidth: '700px'
                            }}
                            elevation={2}>
                            <Stack
                                justifyContent='space-between'
                                bgcolor='whitesmoke'
                                alignItems='center'
                                flexDirection='row'
                                flexWrap='wrap'
                                padding='20px'
                                spacing='20px'
                            >
                                <Stack spacing='10px' paddingRight='20px'>
                                    <Typography variant="h6">Reparaciones {typeRepair}</Typography>
                                    <Typography variant="subtitle2">{`${repairs.length} reparaciones ${typeRepair}s`}</Typography>
                                    <Stack flexDirection={'row'} gap={'10px'}>
                                        <Chip
                                            label={'pendientes'}
                                            color={typeRepair === "pendiente" ? 'warning' : 'default'}
                                            onClick={() => setTypeRepair('pendiente')}
                                        />
                                        <Chip
                                            label={'proceso'}
                                            color={typeRepair === "proceso" ? 'info' : 'default'}
                                            onClick={() => setTypeRepair('proceso')}
                                        />
                                        <Chip
                                            label={'completados'}
                                            color={typeRepair === "completado" ? 'success' : 'default'}
                                            onClick={() => setTypeRepair('completado')}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack width={IsExtraSmall ? '100%' : '250px'}>
                                    <Searcher
                                        onChangueSearch={onChangueSearch}
                                        searchingKey={searchingKey}
                                        search={search}
                                        searching={searching}
                                        placeholder={'Busca reparaciones ....'}
                                    />
                                </Stack>

                            </Stack>
                        </Paper>
                    </Fade>
                }

                {itemRepair &&
                    <Fade in={itemRepair}>
                        <Box>
                            <ModalRepair
                                tanque={itemRepair}
                                typeRepair={typeRepair}
                                updateRepairs={updateRepairs}
                                selectItem={selectTedItemRepair}
                            />
                        </Box>
                    </Fade>}

                {!itemRepair &&
                    <Fade in={!itemRepair}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: IsSmall ? 'auto' : '700px' }}>
                            <Paper elevation={4}>
                                <ContainerScroll height='60vh'>

                                    {(!loadingRepairs && !errorRepairs) &&
                                        <Stack gap='10px'>
                                            {repairs.map((item) => (
                                                <MaintenancesItem
                                                    key={item.id}
                                                    maintance={item}
                                                    typeRepair={typeRepair}
                                                    selectItem={selectTedItemRepair}
                                                />
                                            ))}
                                        </Stack>}

                                    {(loadingRepairs && !errorRepairs) &&
                                        <Stack gap='10px'>
                                            <HistoryItemLoading />
                                            <HistoryItemLoading />
                                            <HistoryItemLoading />
                                        </Stack>}
                                </ContainerScroll>
                            </Paper>
                        </Box>
                    </Fade>
                }

                <Notification />

                <LoadingState duration={1000} />

            </Container>
        </>
    );
}

export { Reparaciones };