//imports hooks
import { useState} from "react";
import { useSearcher } from "../../Hooks/useSearcher"
import { useGetRepairs } from "../../Hooks/Reparaciones/useGetRepairs";
//imports materialui
import { Box, Stack, Fade, Paper, Typography, Chip, } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
//components
import { MaintenancesItem } from "../../components/MaintenancesITem";
import { ContainerScroll } from "../../components/ContainerScroll";
import { ItemLoadingState } from "../../components/ItemLoadingState";
import { Searcher } from "../../components/Searcher";
import { ModalRepair } from "../../components/ModalRepair";
import { Notification } from "../../components/Notification";
import { LoadingState } from "../../components/LoadingState"
//helpers
import { filterSearchRepair } from "../../Helpers/searcher";

function Reparaciones() {

    const IsSmall = useMediaQuery('(max-width:900px)')
    const IsExtraSmall = useMediaQuery('(max-width:700px)');
    
    const [typeRepair, setTypeRepair] = useState('pendiente');
    const changueTypeRepair = (newRepair) => setTypeRepair(newRepair);

    const { repairs, loadingRepairs, errorRepairs, updateRepairs } = useGetRepairs(typeRepair);
    const { states, functions } = useSearcher(filterSearchRepair, repairs, typeRepair);

    const { search, results, loading, error } = states;
    const { searching, onChangueSearch, clearResults, searchingKey } = functions;

    const [itemRepair, setItemRepair] = useState(false);
    const selectTedItemRepair = (item) => setItemRepair(item);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '10px',
                paddingLeft: '0px',
                paddingRight: '0px',
                width: '100%',
                overflow: 'hidden',
                minHeight: '90vh',
                gap: '15px',
            }}
        >
            {!itemRepair &&
                <Fade in={!itemRepair}>
                    <Paper
                        sx={{
                            width: '95vw',
                            maxWidth: '700px',
                            padding: '0px'
                        }}
                        elevation={2}>
                        <Stack
                            justifyContent='space-between'
                            bgcolor='whitesmoke'
                            alignItems='center'
                            flexDirection='row'
                            flexWrap='wrap'
                            padding='10px'
                            spacing='10px'
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
                            changueTypeRepair={changueTypeRepair}
                        />
                    </Box>
                </Fade>}

            {!itemRepair &&
                <Fade in={!itemRepair}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: IsSmall ? '95vw' : '700px', maxWidth: '700px', }}>
                        <Paper elevation={4}>
                            <ContainerScroll height='67vh'>

                                {(!loadingRepairs && !errorRepairs) &&
                                    <Stack gap='10px' padding='0px'>
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
                                        <ItemLoadingState />
                                        <ItemLoadingState />
                                        <ItemLoadingState />
                                    </Stack>}
                            </ContainerScroll>
                        </Paper>
                    </Box>
                </Fade>
            }

            <Notification />

            <LoadingState duration={1000} />

        </Box>
    );
}

export { Reparaciones };