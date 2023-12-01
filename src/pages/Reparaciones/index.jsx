//imports hooks
import { useState, useContext } from "react";
import { useSearcher } from "../../Hooks/useSearcher"
import { ReparacionesContext } from "../../Context/ReparacionesContext"
import { useGetRepairs } from "../../Hooks/reparacionesManagment/useGetRepairs";
//imports materialui
import { Container, Box, Tabs, Tab, Stack, Fade, Paper, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
//components
import { MaintenancesItem } from "../../components/MaintenancesITem";
import { ContainerScroll } from "../../components/ContainerScroll";
import { HistoryItemLoading } from "../../components/HistoryItem";
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { Searcher } from "../../components/Searcher";
import { currentDate } from "../../Helpers/date";
//helpers
import { filterSearchRepair} from "../../Helpers/searcher";

function Reparaciones() {

    const IsSmall = useMediaQuery('(max-width:900px)')
    const IsExtraSmall = useMediaQuery('(max-width:700px)');
    const [state, dispatch] = useContext(ReparacionesContext);

    const { repairs, loadingRepairs, errorRepairs } = useGetRepairs(state.typeRegister);
    const { states, functions } = useSearcher(filterSearchRepair, repairs, state.typeRegister);
    
    const { search, results, loading, error } = states;
    const { searching, onChangueSearch, clearResults, searchingKey } = functions;

    const [tab, setTab] = useState(0);

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

    const maintenancesPending = mockMaintances.filter(item => item.status === 'pending')
    const maintenancesComplete = mockMaintances.filter(item => item.status === 'complete')
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
                    minHeight: '90vh'
                }}
            >

                <Tabs
                    value={tab}
                    onChange={ToggleTab}
                    variant={IsSmall ? "scrollable" : ''}
                    scrollButtons="auto"
                >
                    <Tab label="Reparaciones Pendientes" />
                    <Tab label="Reparaciones En Proceso" />
                    <Tab label="Reparaciones Realizadas" />
                </Tabs>

                <CustomTabPanel value={tab} index={0}>
                    <Fade timeout={500} in={tab === 0 ? true : false}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >

                            <Paper elevation={2}>
                                <Stack
                                    justifyContent='space-between'
                                    bgcolor='whitesmoke'
                                    alignItems='center'
                                    flexDirection='row'
                                    flexWrap='wrap'
                                    padding='20px'
                                    spacing='20px'
                                >
                                    <Stack spacing='5px'>
                                        <Typography variant="h6">Reparaciones Pendientes</Typography>
                                        <Typography variant="subtitle2">{`${repairs.length} reparaciones pendientes`}</Typography>
                                    </Stack>

                                    <Stack width={IsExtraSmall ? '100%' : '300px'}>
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

                            <Paper
                                elevation={4}
                            >
                                <ContainerScroll height='60vh'>

                                    {(!loadingRepairs && !errorRepairs) &&
                                        <Stack gap='10px'>
                                            {repairs.map((item) => (
                                                <MaintenancesItem key={item.id} maintance={item} />
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
                </CustomTabPanel>

                <CustomTabPanel value={tab} index={1}>
                    <Fade timeout={500} in={tab === 1 ? true : false}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >

                            <Stack spacing='5px'>
                                <Typography variant="h6">Reparaciones en proceso</Typography>
                                <Typography variant="subtitle2">Todos las reparaciones en proceso</Typography>
                            </Stack>

                            <Stack alignItems='flex-end'>
                                <Searcher />
                            </Stack>

                            <Paper
                                elevation={4}
                                sx={{
                                    padding: '20px'
                                }}
                            >
                                <Stack gap='10px'>
                                    {maintenancesProces.map((item) => (
                                        <MaintenancesItem key={item.id} maintance={item} />
                                    ))}
                                </Stack>
                            </Paper>
                        </Box>
                    </Fade>
                </CustomTabPanel>

                <CustomTabPanel value={tab} index={2}>
                    <Fade timeout={500} in={tab === 2 ? true : false}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}>

                            <Stack spacing='5px'>
                                <Typography variant="h6">Reparaciones realizadas</Typography>
                                <Typography variant="subtitle2">Ultimas 20 reparaciones</Typography>
                            </Stack>

                            <Stack alignItems='flex-end'>
                                <Searcher />
                            </Stack>

                            <Paper
                                elevation={4}
                                sx={{
                                    padding: '20px'
                                }}
                            >
                                <Stack gap='10px'>
                                    {maintenancesComplete.map((item) => (
                                        <MaintenancesItem key={item.id} maintance={item} />
                                    ))}
                                </Stack>
                            </Paper>
                        </Box>
                    </Fade>
                </CustomTabPanel>

            </Container>
        </>
    );
}

export { Reparaciones };