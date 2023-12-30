import { useContext } from "react";
//context
import { PrelavadoContext } from "../../../Context/PrelavadoContext";
import { actionTypes } from "../../../Reducers/PrelavadoReducer";
//components
import { Typography, Stack, Paper, FormGroup, Divider, IconButton, Button, Container, Modal, Fade } from "@mui/material";
import { InputImage } from "../../../components/InputImage";
import { InputText } from "../../../components/InputText";
import { InputCheck } from "../../../components/InputCheck";
import { ButtonsNavigationCheck } from "../../ButtonsNavigationCheck";
import { ContainerScroll } from "../../../components/ContainerScroll";
//hooks
import { useCheckList } from "../../../Hooks/useChecklistPrelavado";
import useMediaQuery from "@mui/material/useMediaQuery";
//icons
import ChatIcon from '@mui/icons-material/Chat';

function Step7({ step, nextStep, previusStep }) {

    const IsSmall = useMediaQuery('(max-width:700px)');
    const [state, dispatch] = useContext(PrelavadoContext);

    const { checklist } = state;

    const mockListCheck = [
        {
            question: '¿Los tornillos y tuercas de la brida ciega  estan en buenas condiciones y apretados con fuerza de maquina?',
            value: null,
            preview: '',
            image: '',
            coment: '',
        },
        {
            question: '¿Las argollas de sellos estan en buenas condiciones?',
            value: null,
            preview: '',
            image: '',
            coment: '',

        },
        {
            question: '¿El tanque puede resellarse apropiadamente?',
            value: null,
            preview: '',
            image: '',
            coment: '',

        },

        {
            question: '¿Las bisagras de las puertas está en optimo funcionamiento?',
            value: null,
            preview: '',
            image: '',
            coment: '',
        }

    ]

    const stateCheckList = checklist.tapaderaDomo ? checklist.tapaderaDomo.checkList : mockListCheck;

    const { actions, states } = useCheckList(stateCheckList)
    const { ChangueInput, ChangueComent, ChangueImage, DiscardImage, SelectQuestionComent, ToggleModalComent, ValidateInputs } = actions
    const { listCheck, indexQuestion, modalComent } = states

    const SaveChanguesOnGloablState = () => {
        const newState = { ...state.checklist, complete: true, tapaderaDomo: { checkList: listCheck } }
        dispatch({ type: actionTypes.setCheckList, payload: newState })

        const inputsEmpty = ValidateInputs();

        if (inputsEmpty) {
            nextStep(8)
        }

    }

    return (
        <>

            <Paper
                elevation={4}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '20px',
                    width: '100%'
                }}>
                <Typography variant="h6">Revisión de tapadera superior del domo</Typography>

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
                                gap='15px'
                                justifyContent='space-between'
                                alignItems={IsSmall ? 'start' : 'center'}
                                flexDirection={'column'}
                                sx={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                    padding: '20px'
                                }}
                            >
                                <Stack width={'100%'} alignItems={'center'}>
                                   <Typography textAlign={IsSmall?'center':'start'} >{item.question}</Typography>
                                </Stack>

                                <Stack 
                                flexDirection='row' 
                                gap='20px' 
                                alignItems={'center'} 
                                justifyContent={'space-around'} 
                                width={'100%'}
                                >
                                    <Stack flexDirection='column' alignItems='center' >
                                        <strong>Si</strong>
                                        <InputCheck value={item.value === 'si' ? true : false} onchangue={() => ChangueInput(index, 'si')} />

                                    </Stack>
                                    <Stack flexDirection='column' alignItems='center'>
                                        <strong>No</strong>
                                        <InputCheck value={item.value === 'no' ? true : false} onchangue={() => ChangueInput(index, 'no')} />
                                    </Stack>
                                </Stack>

                                <Stack flexDirection='row' alignItems='center' justifyContent={'center'} width={'100%'} gap={IsSmall ? '40px' : '10px'}>
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
                        previusStep={() => previusStep(6)} />
                    </FormGroup>

                </ContainerScroll>

            </Paper>



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

export { Step7 };