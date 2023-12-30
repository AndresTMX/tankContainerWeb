import { useContext, useState } from "react";
//context
import { PrelavadoContext } from "../../../Context/PrelavadoContext";
import { actionTypes } from "../../../Reducers/PrelavadoReducer";
//components
import { Typography, Stack, Paper, FormGroup, Divider, IconButton, Button, Container, Modal, Fade, Box } from "@mui/material";
import { ContainerScroll } from "../../../components/ContainerScroll";
import { InputImage } from "../../../components/InputImage";
import { InputText } from "../../../components/InputText";
import { InputCheck } from "../../../components/InputCheck";
import { ButtonsNavigationCheck } from "../../ButtonsNavigationCheck";
//hooks
import { useCheckList } from "../../../Hooks/useChecklistPrelavado";
import useMediaQuery from "@mui/material/useMediaQuery";
//icons
import ChatIcon from '@mui/icons-material/Chat';

function Step5({ step, nextStep, previusStep }) {

    const IsSmall = useMediaQuery('(max-width:700px)');
    const [state, dispatch] = useContext(PrelavadoContext);
    const { checklist } = state;

    const stateBaseQuestion = checklist.cuviertaValvula?.type ? checklist.cuviertaValvula.type : '';
    const [baseQuestion, setBaseQuestion] = useState(stateBaseQuestion)

    const { cuviertaValvula } = checklist;

    const SaveChanguesOnGloablState = (newValue) => {
        setBaseQuestion(newValue)
        const newState = { ...state.checklist, cuviertaValvula: { type: newValue } }
        dispatch({ type: actionTypes.setCheckList, payload: newState })
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
                    width: IsSmall ? '90vw' : '100%'
                }}>
                <Typography variant="h6">
                    Revisión de cubierta de valvula de descarga
                </Typography>

                <ContainerScroll>
                    <FormGroup
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: '4px',
                            gap: '10px',
                            marginBottom: '10px'
                        }}
                    >
                        <Stack
                            flexDirection={IsSmall ? 'column' : 'row'}
                            gap='20px'
                            alignItems={IsSmall ? 'start' : 'center'}
                            justifyContent='space-between'
                            sx={{
                                width: '100%',
                                backgroundColor: 'white',
                                padding: '10px'
                            }}
                        >
                            <Stack width={IsSmall ? '100%' : '60%'}>
                                <Typography textAlign={IsSmall ? 'center' : 'start'}>¿Que estilo de cubierta tiene la valvula de descarga?</Typography>
                            </Stack>

                            <Stack
                                gap='20px'
                                alignItems='center'
                                flexDirection='row'
                                width={IsSmall ? '100%' : 'auto'}
                                justifyContent={IsSmall ? 'space-around' : 'center'}
                            >
                                <Stack flexDirection='column' alignItems='center' >
                                    <strong>Cabinet</strong>
                                    <InputCheck value={baseQuestion === 'cabinet' ? true : false} onchangue={() => SaveChanguesOnGloablState('cabinet')} />

                                </Stack>
                                <Stack flexDirection='column' alignItems='center'>
                                    <strong>Bucket</strong>
                                    <InputCheck value={baseQuestion === 'bucket' ? true : false} onchangue={() => SaveChanguesOnGloablState('bucket')} />
                                </Stack>
                            </Stack>

                        </Stack>
                    </FormGroup>

                    {cuviertaValvula?.type === 'cabinet' && (
                        <ChceckListCabinet step={step} nextStep={nextStep} previusStep={previusStep} />
                    )}

                    {cuviertaValvula?.type === 'bucket' && (
                        <ChceckListBucket step={step} nextStep={nextStep} previusStep={previusStep} />
                    )}
                </ContainerScroll>




            </Paper>

        </>
    );
}

export { Step5 };

export function ChceckListCabinet({ step, nextStep, previusStep }) {

    const IsSmall = useMediaQuery('(max-width:700px)');

    const [state, dispatch] = useContext(PrelavadoContext);

    const { checklist } = state;

    const openFade = checklist.cuviertaValvula.type === 'cabinet' ? true : false;

    const mockListCheck = [
        {
            question: 'Argollas de sellos',
            value: null,
            preview: '',
            image: '',
            coment: '',
        },
        {
            question: 'Bisagras de puertas',
            value: null,
            preview: '',
            image: '',
            coment: '',
        },

    ]

    const stateCheckList = checklist.cuviertaValvula.checkList ? checklist.cuviertaValvula.checkList : mockListCheck;

    const { actions, states } = useCheckList(stateCheckList)
    const { ChangueInput, ChangueComent, ChangueImage, DiscardImage, SelectQuestionComent, ToggleModalComent, ValidateInputs } = actions
    const { listCheck, indexQuestion, modalComent } = states

    const SaveChanguesOnGloablState = () => {
        const newState = {
            ...state.checklist,
            cuviertaValvula: {
                type: checklist.cuviertaValvula.type,
                checkList: listCheck
            }
        }
        dispatch({ type: actionTypes.setManiobrasCheck, payload: newState })
        const inputsEmpty = ValidateInputs()
        if (inputsEmpty) {
            nextStep(6)
        }
    }

    return (
        <>
            <Box>
                <Fade in={openFade} timeout={500}>
                    <Stack gap={'20px'}>
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
                                    alignItems={IsSmall ? 'start' : 'center'}
                                    justifyContent='space-between'
                                    sx={{
                                        width: '100%',
                                        backgroundColor: 'white',
                                        padding: '20px'
                                    }}
                                >
                                    <Stack width={IsSmall ? '100%' : '30%'}>
                                        <Typography textAlign={IsSmall ? 'center' : 'start'}>{item.question}</Typography>
                                    </Stack>

                                    <Stack
                                        gap='20px'
                                        width={IsSmall ? '100%' : 'auto'}
                                        alignItems={'center'}
                                    >
                                        <Stack
                                            gap='20px'
                                            alignItems='center'
                                            flexDirection='row'
                                            width={IsSmall ? '100%' : 'auto'}
                                            justifyContent={IsSmall ? 'space-around' : 'center'}
                                        >
                                            <Stack flexDirection='column' alignItems='center' >
                                                <strong>Buen estado</strong>
                                                <InputCheck value={item.value === 'buen estado' ? true : false} onchangue={() => ChangueInput(index, 'buen estado')} />

                                            </Stack>
                                            <Stack flexDirection='column' alignItems='center'>
                                                <strong>Mal estado</strong>
                                                <InputCheck value={item.value === 'mal estado' ? true : false} onchangue={() => ChangueInput(index, 'mal estado')} />
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

                                </Stack>
                            ))}
                        </FormGroup>

                        <ButtonsNavigationCheck
                            step={step}
                            nextStep={SaveChanguesOnGloablState}
                            previusStep={() => previusStep(2)} />

                    </Stack>
                </Fade>
            </Box>

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

export function ChceckListBucket({ step, nextStep, previusStep }) {

    const IsSmall = useMediaQuery('(max-width:700px)');

    const [state, dispatch] = useContext(PrelavadoContext);

    const { checklist } = state;

    const openFade = checklist.cuviertaValvula.type === 'bucket' ? true : false;

    const mockListCheck = [
        {
            question: 'Charola cubeta',
            value: null,
            preview: '',
            image: '',
            coment: '',
        },
        {
            question: 'Tuerca mariposa',
            value: null,
            preview: '',
            image: '',
            coment: '',
        },

    ]

    const stateCheckList = checklist.cuviertaValvula.checkList ? checklist.cuviertaValvula.checkList : mockListCheck;

    const { actions, states } = useCheckList(stateCheckList)
    const { ChangueInput, ChangueComent, ChangueImage, DiscardImage, SelectQuestionComent, ToggleModalComent, ValidateInputs } = actions
    const { listCheck, indexQuestion, modalComent } = states

    const SaveChanguesOnGloablState = () => {
        const newState = {
            ...state.checklist,
            cuviertaValvula: {
                type: checklist.cuviertaValvula.type,
                checkList: listCheck
            }
        }
        dispatch({ type: actionTypes.setManiobrasCheck, payload: newState })
        const inputsEmpty = ValidateInputs()
        if (inputsEmpty) {
            nextStep(6)
        }
    }

    return (
        <>
            <Box>
                <Fade in={openFade} timeout={500}>
                    <Stack gap={'20px'}>
                        <FormGroup
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                borderRadius: '4px',
                                gap: '5px'
                            }}
                        >
                            {listCheck.map((item, index) => (
                                <Stack
                                    key={index}
                                    flexDirection={IsSmall ? 'column' : 'row'}
                                    gap='20px'
                                    alignItems={IsSmall ? 'start' : 'center'}
                                    justifyContent='space-between'
                                    sx={{
                                        width: '100%',
                                        backgroundColor: 'white',
                                        padding: '20px'
                                    }}
                                >
                                    <Stack width={IsSmall ? '100%' : '30%'}>
                                        <Typography textAlign={IsSmall ? 'center' : 'start'} >{item.question}</Typography>
                                    </Stack>

                                    <Stack
                                        gap='20px'
                                        width={IsSmall ? '100%' : 'auto'}
                                        alignItems={'center'}
                                    >
                                        <Stack
                                            gap='20px'
                                            alignItems='center'
                                            flexDirection='row'
                                            width={IsSmall ? '100%' : 'auto'}
                                            justifyContent={IsSmall ? 'space-around' : 'center'}
                                        >
                                            <Stack flexDirection='column' alignItems='center' >
                                                <strong>Buen estado</strong>
                                                <InputCheck value={item.value === 'buen estado' ? true : false} onchangue={() => ChangueInput(index, 'buen estado')} />

                                            </Stack>
                                            <Stack flexDirection='column' alignItems='center'>
                                                <strong>Mal estado</strong>
                                                <InputCheck value={item.value === 'mal estado' ? true : false} onchangue={() => ChangueInput(index, 'mal estado')} />
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
                                </Stack>
                            ))}
                        </FormGroup>

                        <ButtonsNavigationCheck
                            step={step}
                            nextStep={SaveChanguesOnGloablState}
                            previusStep={() => previusStep(2)} />

                    </Stack>
                </Fade>
            </Box>

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
