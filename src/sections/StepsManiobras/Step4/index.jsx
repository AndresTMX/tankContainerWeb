import { useContext, useState } from "react";
//context
import { PrelavadoContext } from "../../../Context/PrelavadoContext";
import { actionTypes } from "../../../Reducers/PrelavadoReducer";
//components
import { Typography, Stack, Paper, FormGroup, Divider, IconButton, Button, Container, Modal, Fade } from "@mui/material";
import { InputImage } from "../../../components/InputImage";
import { InputText } from "../../../components/InputText";
import { InputCheck } from "../../../components/InputCheck";
import { ButtonsNavigationCheck } from "../../ButtonsNavigationCheck";
//hooks
import { useCheckList } from "../../../Hooks/useChecklistPrelavado";
import useMediaQuery from "@mui/material/useMediaQuery";
//icons
import ChatIcon from '@mui/icons-material/Chat';

function Step4({ step, nextStep, previusStep }) {

    const IsSmall = useMediaQuery('(max-width:850px)');
    const [state, dispatch] = useContext(PrelavadoContext);
    const [message, setMessage] = useState(0)

    const { checklist } = state;

    const mockListCheck = [
        {
            question: '¿La llave inglesa u otra llave pueden agarrar la parte superior del anillo con facilidad?',
            value: null,
            preview: '',
            image: '',
            coment: '',
        },

    ]

    const stateCheckList = checklist.valvulaCierre3 ? checklist.valvulaCierre3.checkList : mockListCheck;

    const { actions, states } = useCheckList(stateCheckList)
    const { ChangueInput, ChangueComent, ChangueImage, DiscardImage, SelectQuestionComent, ToggleModalComent } = actions
    const { listCheck, indexQuestion, modalComent } = states

    const SaveChanguesOnGloablState = () => {
        const newState = { ...state.checklist, valvulaCierre3: { checkList: listCheck } }
        dispatch({ type: actionTypes.setCheckList, payload: newState })

        const inputQuestion = listCheck[0].value;

        if(inputQuestion === 'si'){
            nextStep(5)
        }else{
            setMessage(2)
        }
        
    }

    return (
        <>

            {message === 0 && (
                <Fade in={message === 0 ? true : false} timeout={500}>
                    <Paper
                        elevation={4}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '400px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '50px',
                            padding: '20px'
                        }}>
                        <Typography variant="h5">
                            Abra el pie de la válvula y asegúrese de que el cable remoto de emergencia ubicado en un lado del tanque funcione correctamente cerrando la válvula cuando se jala.
                        </Typography>

                        <Stack
                            flexDirection='row'
                            justifyContent='space-around'
                            gap='20px'
                        >

                            <ButtonsNavigationCheck
                                step={step}
                                nextStep={() => setMessage(1)}
                                previusStep={() => previusStep(2)} />

                        </Stack>
                    </Paper>
                </Fade>
            )}

            {message === 1 &&
                <Fade in={message === 1 ? true : false} timeout={500}>
                    <Paper
                        elevation={4}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'whitesmoke',
                            gap: '20px',
                            padding: '20px',
                            width: '100%'
                        }}>
                        <Typography variant="h6">Revisión de empaques para valvula con cierre 3</Typography>

                        <FormGroup
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                borderRadius: '4px',
                                gap: '10px',
                            }}
                        >
                            {listCheck.map((item, index) => (
                                <Stack
                                    key={index}
                                    flexDirection={IsSmall ? 'column' : 'row'}
                                    gap='20px'
                                    spacing='10px'
                                    alignItems={IsSmall ? 'start' : 'center'}
                                    justifyContent='space-between'
                                    sx={{
                                        width: '100%',
                                        backgroundColor: 'white',
                                        padding: '20px'
                                    }}
                                >
                                    <Stack width={IsSmall ? '100%' : '50%'}>
                                        <p>{item.question}</p>
                                    </Stack>

                                    <Stack flexDirection='row' gap='20px' alignItems='center' justifyContent='center'>
                                        <Stack flexDirection='column' alignItems='center' >
                                            <strong>Si</strong>
                                            <InputCheck 
                                            value={item.value === 'si' ? true : false} 
                                            onchangue={(e) => ChangueInput(index, 'si')} />

                                        </Stack>
                                        <Stack flexDirection='column' alignItems='center'>
                                            <strong>No</strong>
                                            <InputCheck 
                                            value={item.value === 'no' ? true : false} 
                                            onchangue={(e) => ChangueInput(index, 'no')} />
                                        </Stack>
                                    </Stack>

                                    <Stack flexDirection='row' alignItems='center' gap={IsSmall ? '40px' : '10px'}>
                                        <IconButton
                                            onClick={() => SelectQuestionComent(index)}
                                            variant="contained"
                                            color="primary">
                                            <ChatIcon />
                                        </IconButton>

                                        <InputImage index={index} discardImage={DiscardImage} preview={item.preview} onChangue={(e) => ChangueImage(index, e)} />

                                        {IsSmall && <Divider orientation={'horizontal'} flexItem />}
                                    </Stack>

                                </Stack>
                            ))}
                        </FormGroup>

                        <ButtonsNavigationCheck
                            step={step}
                            nextStep={SaveChanguesOnGloablState}
                            previusStep={() => setMessage(0)} />

                    </Paper>
                </Fade>
            }

            {message === 2 && (
                <Fade in={message === 2 ? true : false} timeout={500}>
                    <Paper
                        elevation={4}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '400px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '50px',
                            padding: '20px'
                        }}>
                        <Typography variant="h5">
                            {'Remplácelo con una tuerca cuadrada (square notch top ring) proporcionado por agmark.'}
                        </Typography>

                        <Stack
                            flexDirection='row'
                            justifyContent='space-around'
                            gap='20px'
                        >

                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => setMessage(1)}>
                                volver a checklist
                            </Button>

                            <Button
                                variant="contained"
                                onClick={() => nextStep(5)}>
                                Ok
                            </Button>
                        </Stack>
                    </Paper>
                </Fade>
            )}

            <Modal open={modalComent}>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <Fade in={modalComent} timeout={500}>
                        <Paper
                            elevation={4}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                padding: '20px'
                            }}>
                            <Typography>Agregar comentarios</Typography>

                            <InputText
                                type='textarea'
                                width={IsSmall ? '100%' : '300px'}
                                value={listCheck[indexQuestion].coment}
                                label={'Comentarios'}
                                onChangue={ChangueComent}
                            />

                            <Button
                                onClick={ToggleModalComent}
                                variant='contained'
                                color='error'
                            >Cerrar
                            </Button>

                        </Paper>
                    </Fade>
                </Container>
            </Modal>
        </>
    );
}

export { Step4 };