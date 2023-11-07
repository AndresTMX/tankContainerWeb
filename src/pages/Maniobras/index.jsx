import { useState } from "react";
import { Container, Box, Stack, Button, Fade, Paper, Typography } from "@mui/material";
import { CheckList } from "../../components/Checklist";
import { useCheckList } from "../../Hooks/useChecklist";
import { DetailsCheckList } from "../../components/DetailsCheckList";
import { currentDate } from "../../Helpers/date";
import { HistoryItem } from "../../components/HistoryItem";
//dataFake
import { mockRegisters } from "../../dataFake";

function Maniobras() {
    
    const filterHistory = mockRegisters.filter(item => item.checkOut === undefined)

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

    const selectTank = (idRegiser) => {
        const select = filterHistory.find((item) => item.id === idRegiser)
        setTank(select)
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
                marginTop:'20px'
            }}>

                {!tank &&
                    <Fade
                        timeout={500}
                        in={!tank}>

                        <Container 
                        sx={{
                            display:'flex',
                             flexDirection:'column', 
                             gap:'20px', 
                             alignItems:'center', 
                             justifyContent:'center'
                             }}>
                            <Typography variant="h6">Contenedores en cola de revisión</Typography>
                            <Box>
                                <Paper elevation={4} sx={{ padding: '20px', }}>
                                    <Stack spacing='5px'>
                                        {
                                            filterHistory.map((item, index) => (
                                                <HistoryItem
                                                    key={index}
                                                    data={item}
                                                >
                                                    <Button 
                                                    variant="contained" 
                                                    color="primary"
                                                    onClick={() => selectTank(item.id)}
                                                    >Check</Button>
                                                </HistoryItem>
                                            ))
                                        }
                                    </Stack>
                                </Paper>
                            </Box>


                        </Container>
                    </Fade>
                }

                {tank && 
                <Fade
                timeout={500}
                in={tank}
                >                
                <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    gap:'10px',
                }}
                >
                    <h3>Check list de inspección</h3>
                    <DetailsCheckList
                     data={tank}
                     action={discardTank}
                     ChangueNextStep={ChangueNextStep}
                     nextStep={nextStep}
                     submit={() => {}}
                    />
                    <CheckList
                        listInputs={listCheck}
                        ChangueInput={ChangueInput}
                        ChangueComent={ChangueComent}
                        ChangueImage={ChangueImage}
                        DiscardImage={DiscardImage}
                    />

                </Box>
                </Fade>
                }

            </Container>
        </>
    );
}

export { Maniobras };