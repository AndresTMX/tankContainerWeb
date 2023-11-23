import { useState, useContext } from "react";
import { Container, Box, Stack, Fade, Paper, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ContainerScroll } from "../../components/ContainerScroll";
import { useCheckList } from "../../Hooks/useChecklist";
import { DetailsCheckList } from "../../components/DetailsCheckList";
import { HistoryItem } from "../../components/HistoryItem";
import { Searcher } from "../../components/Searcher";
//Notification
import { Notification } from "../../components/Notification";
//context
import { DevelopmentContext } from "../../Context";
//newCheckList
import { CheckListMaiobras } from "../../sections/CheckListManiobras";
//hooks
import { useGetRegisters } from "../../Hooks/registersManagment/useGetRegisters";
import { useSearcher } from "../../Hooks/useSearcher";
import { filterSearchVigilancia } from "../../Helpers/searcher";
import { filterInputRegistersForManiobras } from "../../Helpers/transformRegisters";
import { actionTypes } from "../../Reducers";

function Maniobras() {
    const IsSmall = useMediaQuery('(max-width:900px)');

    const [state, dispatch] = useContext(DevelopmentContext);
    const { selectItem } = state;

    const selectItemState = !selectItem ? false : true;

    //inicio del hook
    const { requestGetRegisters, errorGetRegisters, loadingGetRegisters } = useGetRegisters();
    //filtro del request del hook de registros 
    const filterRequest = requestGetRegisters.length >= 1 ? filterInputRegistersForManiobras(requestGetRegisters) : [];
    //inicio del hook del buscador
    const { states: statesSearcher, functions } = useSearcher(filterSearchVigilancia, requestGetRegisters);
    const { search, results, loading, error } = statesSearcher;
    const { searching, onChangueSearch, searchingKey } = functions;

    //inicio del hook de checklist
    const mockListCheck = [
        {
            name: 'input 1',
            value: null,
            value2: null,
            preview: '',
            image: '',
            coment: '',
        },
        {
            name: 'input 2',
            value: null,
            value2: null,
            preview: '',
            image: '',
            coment: '',

        },
        {
            name: 'input 3',
            value: null,
            value2: null,
            preview: '',
            image: '',
            coment: '',

        },
        {
            name: 'input 4',
            value: null,
            value2: null,
            preview: '',
            image: '',
            coment: '',

        },
        {
            name: 'input 5',
            value: null,
            value2: null,
            preview: '',
            image: '',
            coment: '',
        },
        {
            name: 'input 6',
            value: null,
            value2: null,
            preview: '',
            image: '',
            coment: '',
        },
    ]
    const { actions, states } = useCheckList(mockListCheck)
    const { ChangueInput, ChangueComent, ChangueImage, DiscardImage, ChangueNextStep } = actions
    const { listCheck, nextStep } = states
    ///fin del hook

    const discardTank = () => {
        dispatch({ type: actionTypes.setSelectItem, payload: false })
    }

    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0px',
                }}>


                {!selectItemState &&
                    <Container
                        sx={{
                            display: 'flex',
                            marginTop: '20px',
                            flexDirection: 'column',
                            gap: '10px',
                            justifyContent: 'center',
                            alignItems: !IsSmall ? 'center' : '',
                        }}>

                        <Paper
                            elevation={2}
                            sx={{
                                width: '100%',
                                maxWidth: '760px',
                                padding: '10px',
                                backgroundColor: 'whitesmoke'
                            }}>

                            <Stack width={"100%"} gap={'10px'}>
                                <Typography variant='caption'>Busca un registro</Typography>
                                <Searcher
                                    placeholder={'linea oeste , 125 , tanque , angel martinez '}
                                    onChangueSearch={onChangueSearch}
                                    searchingKey={searchingKey}
                                    searching={searching}
                                    search={search}
                                />
                            </Stack>

                        </Paper>

                        <Box sx={{ maxWidth: '900px' }}>
                            <ContainerScroll height='70vh'>
                                <Stack spacing='20px'>
                                    {
                                        filterRequest.map((item) => (
                                            <HistoryItem
                                                type='maniobras'
                                                key={item.id}
                                                data={item}
                                            />))
                                    }
                                </Stack>
                            </ContainerScroll>
                        </Box>


                    </Container>}


                {selectItemState &&
                    <Fade
                        timeout={500}
                        in={selectItemState}
                    >
                        <Container
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                            <Paper
                                elevation={4}
                                sx={{
                                    width: '100%',
                                    maxWidth: '900px',
                                    padding: '20px',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                    }}
                                >
                                    <DetailsCheckList
                                        ChangueNextStep={ChangueNextStep}
                                        discardTank={discardTank}
                                        nextStep={nextStep}
                                        submit={() => { }}
                                    />

                                    <p>Aqui va un checklist</p>

                                    {/*
                                    <CheckListMaiobras /> */}

                                </Box>
                            </Paper>
                        </Container>
                    </Fade>
                }

            </Container>

            <Notification />
        </>
    );
}

export { Maniobras };