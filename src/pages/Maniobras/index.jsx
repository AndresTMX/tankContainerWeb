import { useState } from "react";
import { Container, Box, Stack, Button, Fade } from "@mui/material";
import { CheckList } from "../../components/Checklist";
import { useCheckList } from "../../Hooks/useChecklist";
import { DetailsCheckList } from "../../components/DetailsCheckList";
import { currentDate } from "../../Helpers/date";
import { HistoryItem } from "../../components/HistoryItem";

function Maniobras() {
    //mockup history
    const mockHistory = [
        {
            hora:currentDate,
            linea:'Linea random',
            tracto:'Un tracto chido',
            tipo:'Salida',
            tanque:'C-2356',
            operador:'Juan Miguel Salazar Perez',
            celular:'5577828470'
        },
        {
            hora:currentDate,
            linea:'Linea random2',
            tracto:'Un tracto maso',
            tipo:'Entrada',
            tanque:'C-2352',
            operador:'Lucas Ascencio Lopez',
            celular:'5577828470'
        },
        {
            hora:currentDate,
            linea:'Linea random3',
            tracto:'Un tracto ñe',
            tipo:'Salida',
            tanque:'C-8299',
            operador:'Armando Mendoza Lopez',
            celular:'5577828470'
        },
        {
            hora:currentDate,
            linea:'Linea random4',
            tracto:'Un tracto bien',
            tipo:'Entrada',
            tanque:'C-2632',
            operador:'Antonio Lopez De La Cruz',
            celular:'5577828470'
        },
    ]

    const filterHistory = mockHistory.filter(item => item.tipo === 'Entrada')

    //inicio del hook de checklist
    const mockListCheck = [
        {
            name: 'input 1',
            value: false,
            preview: '',
            image: '',
            coment: '',
        },
        {
            name: 'input 2',
            value: false,
            preview: '',
            image: '',
            coment: '',

        },
        {
            name: 'input 3',
            value: false,
            preview: '',
            image: '',
            coment: '',

        },
        {
            name: 'input 4',
            value: false,
            preview: '',
            image: '',
            coment: '',

        },
        {
            name: 'input 5',
            value: false,
            preview: '',
            image: '',
            coment: '',
        },
        {
            name: 'input 6',
            value: false,
            preview: '',
            image: '',
            coment: '',
        },
    ]
    const { actions, states } = useCheckList(mockListCheck)
    const { ChangueInput, ChangueComent, ChangueImage, DiscardImage } = actions
    const { listCheck } = states
    ///fin del hook

    const [tank, setTank] = useState(null);

    const selectTank = (index) => {
        const select = filterHistory[index];
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
                justifyContent: 'center',
                minHeight: '80vh',
            }}>

                {!tank &&
                    <Fade
                        timeout={500}
                        in={!tank}>


                        <Box>
                            <h3>Contenedores en cola</h3>

                            <Stack spacing='5px'>
                                {
                                    filterHistory.map((item, index) => (
                                        <HistoryItem
                                            key={index}
                                            hora={item.hora}
                                            linea={item.linea}
                                            tracto={item.tracto}
                                            tipo={item.tipo}
                                            tanque={item.tanque}
                                            operador={item.operador}
                                            celular={item.celular}
                                        >
                                            <Button
                                                size="small"
                                                variant="contained"
                                                key={item.contenedor}
                                                onClick={() => selectTank(index)}
                                            >Checklist</Button>
                                        </HistoryItem>
                                    ))
                                }
                            </Stack>

                        </Box>
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
                     hora={tank.hora}
                     linea={tank.linea}
                     tracto={tank.tracto}
                     tanque={tank.tanque}
                     operador={tank.operador}
                     celular={tank.celular}
                     action={discardTank}
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