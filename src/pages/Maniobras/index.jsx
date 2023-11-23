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

function Maniobras() {
    const IsSmall = useMediaQuery('(max-width:900px)');
    const isMovile = useMediaQuery("(max-width:640px)");

    const [state, dispatch] = useContext(DevelopmentContext);

    const { requestGetRegisters, errorGetRegisters, loadingGetRegisters } = useGetRegisters();
    const { states: statesSearcher, functions } = useSearcher(filterSearchVigilancia, requestGetRegisters);
    const { search, results, loading, error } = statesSearcher;
    console.log("🚀 ~ file: index.jsx:29 ~ Maniobras ~ results:", results)
    const { searching, onChangueSearch, searchingKey } = functions;

    const filterRegisters = (arrayRegisters) => {

        arrayRegisters.map((register) => {
            const detalles = register.registros_detalles_entradas;

            detalles.filter((detail) => detail.status === 'maniobras')
        })

    }

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

    const [tank, setTank] = useState(null);

    const selectTank = (idRegiser, numTank) => {
        const selectRegister = filterHistory.find((item) => item.id === idRegiser);
        const selectTank = selectRegister.tanques.find((tank) => tank.tanque === numTank);
        setTank({ data: selectRegister, tank: selectTank })
    }

    const discardTank = () => {
        setTank(null)
    }

    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '20px',
                    padding: '0px',
                }}>


                {!tank &&
                    <Container
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            justifyContent: 'center',
                            alignItems: !IsSmall ? 'center' : '',
                        }}>

                        <Paper 
                        elevation={4}
                        sx={{
                            width:'100%', 
                            maxWidth:'660px',
                            padding:'10px',
                            backgroundColor:'whitesmoke'
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
                            <ContainerScroll height='65vh'>
                                <Stack spacing='20px'>
                                    {
                                        requestGetRegisters.map((item) => (
                                            <HistoryItem
                                                key={item.id}
                                                data={item}
                                                type='maniobras'
                                            />))
                                    }
                                </Stack>
                            </ContainerScroll>
                        </Box>


                    </Container>}


                {tank &&
                    <Fade
                        timeout={500}
                        in={tank}
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
                                        state={state}
                                        data={tank}
                                        action={discardTank}
                                        ChangueNextStep={ChangueNextStep}
                                        nextStep={nextStep}
                                        submit={() => { }}
                                    />

                                    <CheckListMaiobras />

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