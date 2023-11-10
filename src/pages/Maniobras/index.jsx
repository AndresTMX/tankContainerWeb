import { useState, useContext } from "react";
import { Container, Box, Stack, Fade, Paper, Typography, Modal } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ContainerScroll } from "../../components/ContainerScroll";
import { useCheckList } from "../../Hooks/useChecklist";
import { DetailsCheckList } from "../../components/DetailsCheckList";
import { HistoryItem } from "../../components/HistoryItem";
//Notification
import { Notification } from "../../components/Notification";
//context
import { DevelopmentContext } from "../../Context";
//newCheckList
import { CheckListMaiobras } from "../../sections/CheckListManiobras";

function Maniobras() {
    const IsSmall = useMediaQuery('(max-width:900px)');
    const [state, dispatch] = useContext(DevelopmentContext);

    const { registers } = state;

    const filterHistory = registers.filter(item => item.checkOut === undefined)

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
                    minHeight: '80vh',
                    marginTop: '20px',
                    padding:'0px',
                }}>


                {!tank &&
                    <Container
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            justifyContent: 'center',
                            alignItems: !IsSmall ? 'center' : ''
                        }}>
                        <Typography variant="h6">Contenedores en cola de revisión</Typography>
                        <Box sx={{ maxWidth: '900px' }}>
                            <ContainerScroll height='75vh'>
                                <Stack spacing='20px'>
                                    {
                                        filterHistory.map((item, index) => (
                                            <HistoryItem
                                                key={index}
                                                id={item.id}
                                                data={item}
                                                type='maniobras'
                                                select={selectTank}
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