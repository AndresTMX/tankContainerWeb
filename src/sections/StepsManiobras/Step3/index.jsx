import { useContext, useState } from "react";
//context
import { PrelavadoContext } from "../../../Context/PrelavadoContext";
import { actionTypes } from "../../../Reducers/PrelavadoReducer";
//hooks
import { Typography, Stack, Paper, FormGroup, Divider, IconButton, Button, Container, Modal, Fade } from "@mui/material";
import { useCheckList } from "../../../Hooks/useChecklistPrelavado";
import { InputImage } from "../../../components/InputImage";
import { InputText } from "../../../components/InputText";
import { InputCheck } from "../../../components/InputCheck";
import { ContainerScroll } from "../../../components/ContainerScroll";
import { ButtonsNavigationCheck } from "../../ButtonsNavigationCheck";
import useMediaQuery from "@mui/material/useMediaQuery";
//icons
import ChatIcon from '@mui/icons-material/Chat';


function Step3({ step, nextStep, previusStep }) {

    const IsSmall = useMediaQuery('(max-width:850px)');
    const [state, dispatch] = useContext(PrelavadoContext);
    const [message, setMessage] = useState(false)

    const { checklist } = state;

    const mockListCheck = [
        {
            question: '¿Cambios en el enpaque del O-ring de piston?',
            value: null,
            preview: '',
            image: '',
            coment: '',
            part: ' O-ring de piston'
        },
        {
            question: '¿Cambios en el empaque del asiento del piston?',
            value: null,
            preview: '',
            image: '',
            coment: '',
            part: 'asiento del piston'

        },
        {
            question: '¿Cambios en el empaque de la valvula de alivio?',
            value: null,
            preview: '',
            image: '',
            coment: '',
            part: 'valvula de alivio'

        },
        {
            question: 'Cambios en el empaque de brida ciega?',
            value: null,
            preview: '',
            image: '',
            coment: '',
            part: 'brida ciega'

        },

    ]

    const stateCheckList = checklist.valvula3A ? checklist.valvula3A.checkList : mockListCheck;

    const { actions, states } = useCheckList(stateCheckList)
    const { ChangueInput, ChangueComent, ChangueImage, DiscardImage, SelectQuestionComent, ToggleModalComent, ValidateInputs } = actions
    const { listCheck, indexQuestion, modalComent } = states

    const SaveChanguesOnGloablState = () => {
        const newState = { ...state.checklist, valvula3A: { checklist: listCheck } }
        dispatch({ type: actionTypes.setCheckList, payload: newState })

        const inputsEmpty = ValidateInputs()

        if (inputsEmpty) {
            setMessage(true)
        }

    }

    return (
        <>

            {!message &&
                <Fade in={!message} timeout={500}>
                    <Paper
                        elevation={4}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            padding: '20px',
                            width: '100%'
                        }}>
                        <Typography variant="h6">Revisión de empaques para valvula sanitaria 3A</Typography>

                        <ContainerScroll height={'45vh'}>
                            <FormGroup
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    borderRadius: '4px',
                                    gap: '10px'
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
                                                <InputCheck value={item.value === 'si' ? true : false} onchangue={(e) => ChangueInput(index, 'si')} />

                                            </Stack>
                                            <Stack flexDirection='column' alignItems='center'>
                                                <strong>No</strong>
                                                <InputCheck value={item.value === 'no' ? true : false} onchangue={(e) => ChangueInput(index, 'no')} />
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
                            <ButtonsNavigationCheck
                                step={step}
                                nextStep={SaveChanguesOnGloablState}
                                previusStep={() => previusStep(2)} />
                            </FormGroup>

                        </ContainerScroll>

                    </Paper>
                </Fade>
            }

            {message && (
                <Fade in={message} timeout={500}>
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
                            Asegúrese que el anillo de arriba este apretado con la fuerza de máquina.
                        </Typography>

                        <Stack
                            flexDirection='row'
                            justifyContent='space-around'
                            gap='20px'
                        >

                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => setMessage(false)}>
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

export { Step3 };