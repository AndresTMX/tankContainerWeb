import { useContext } from "react";
//context
import { PrelavadoContext } from "../../../Context/PrelavadoContext";
import { actionTypes } from "../../../Reducers/PrelavadoReducer";
import { GlobalContext } from "../../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../../Reducers/GlobalReducer";
//components
import { Typography, Stack, Paper, FormGroup, Divider, IconButton, Button, Container, Modal, Fade, Box } from "@mui/material";
import { ContainerScroll } from "../../../components/ContainerScroll";
import { useCheckList } from "../../../Hooks/useChecklistPrelavado";
import { InputImage } from "../../../components/InputImage";
import { InputText } from "../../../components/InputText";
import { InputCheck } from "../../../components/InputCheck";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";

//icons
import ChatIcon from '@mui/icons-material/Chat';

function Step2({ step, setStep }) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const [state, dispatch] = useContext(PrelavadoContext);
    const IsSmall = useMediaQuery('(max-width:700px)');

    const { checklist } = state;

    const mockListCheck = [
        {
            question: '¿Todas las partes estén trabajando correctamente?',
            value: null,
            preview: '',
            image: '',
            coment: '',
        },
        {
            question: '¿Tiene daño mayores (Abolladuras, rayas profundas, etc.)?',
            value: null,
            preview: '',
            image: '',
            coment: '',

        },
        {
            question: '¿Algunos de los empaques necesita remplazarse?',
            value: null,
            preview: '',
            image: '',
            coment: '',

        },
        {
            question: '¿Es una válvula sanitaria 3A?',
            value: null,
            preview: '',
            image: '',
            coment: '',

        },
        {
            question: '¿La válvula de descarga tiene cierre 3?',
            value: null,
            value2: null,
            preview: '',
            image: '',
            coment: '',
        },

    ]

    const stateCheckList = checklist.empaques ? checklist.empaques.checkList : mockListCheck;

    const { actions, states } = useCheckList(stateCheckList)
    const { ChangueInput, ChangueComent, ChangueImage, DiscardImage, SelectQuestionComent, ToggleModalComent, ValidateInputs } = actions
    const { listCheck, indexQuestion, modalComent } = states

    const SaveChanguesOnGloablState = () => {
        const newState = { ...state.checklist, empaques: { checkList: listCheck } }
        dispatch({ type: actionTypes.setCheckList, payload: newState })

        const sanitaria3AInput = listCheck[3].value;
        const cierre3Input = listCheck[4].value;

        const inputsEmpty = ValidateInputs()

        if (sanitaria3AInput === cierre3Input & inputsEmpty) {
            dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: 'Una valvula no puede ser 3A y con cierre 3' })
        }

        if (sanitaria3AInput === 'si' && inputsEmpty & sanitaria3AInput != cierre3Input) {
            setStep(3)
        }

        if (cierre3Input === 'si' && inputsEmpty & sanitaria3AInput != cierre3Input) {
            setStep(4)
        }

    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '0px',
                    width: '100%',
                    maxWidth: '95vw',
                    backgroundColor: 'whitesmoke'
                }}>

                <ContainerScroll height='55vh'>

                    <Typography variant="h6" sx={{ marginBottom: '20px' }}>Revisión de empaques de valvula de descarga</Typography>

                    <FormGroup
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '4px',
                            gap: '5px',
                        }}
                    >
                        <Stack spacing='10px' marginBottom='10px'>
                            {listCheck.map((item, index) => (
                                <Paper
                                    key={index}
                                    elevation={4}>
                                    <Stack
                                        flexDirection={IsSmall ? 'column' : 'row'}
                                        gap='10px'
                                        spacing='10px'
                                        alignItems={'center'}
                                        justifyContent={'space-between'}
                                        sx={{
                                            width: '100%',
                                            backgroundColor: 'white',
                                            padding: '20px',
                                            maxWidth: '85vw'
                                        }}
                                    >
                                        <Stack width={IsSmall ? '100%' : '50%'} alignItems={IsSmall ? 'center' : 'start'}>
                                            <Typography textAlign={IsSmall ? 'center' : 'start'} >{item.question}</Typography>
                                        </Stack>

                                        <Stack
                                            flexDirection='row'
                                            gap='20px'
                                            flexWrap={'wrap'}
                                            alignItems='center'
                                            justifyContent={'center'}
                                            width={IsSmall ? '100%' : '200px'}
                                        >

                                            <Stack
                                                flexDirection='row'
                                                gap='20px'
                                                alignItems={IsSmall ? 'center' : 'start'}
                                                justifyContent={'space-around'}
                                                width={IsSmall ? '400px' : '100%'}
                                            >

                                                <Stack flexDirection='column' alignItems='center' >
                                                    <strong>Si</strong>
                                                    <InputCheck value={item.value === 'si' ? true : false} onchangue={(e) => ChangueInput(index, 'si')} />

                                                </Stack>
                                                <Stack flexDirection='column' alignItems='center'>
                                                    <strong>No</strong>
                                                    <InputCheck value={item.value === 'no' ? true : false} onchangue={(e) => ChangueInput(index, 'no')} />
                                                </Stack>
                                            </Stack>

                                            <Stack flexDirection='row' alignItems='center' justifyContent={'center'} gap={IsSmall ? '40px' : '10px'} width={'100%'} maxWidth={'70vw'} >
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
                                </Paper>
                            ))}
                        </Stack>


                    </FormGroup>

                    <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
                        <Button variant="contained" color='warning' onClick={() => setStep(1)}>Anterior</Button>
                        <Button variant="contained" color='primary' onClick={SaveChanguesOnGloablState} >Siguiente</Button>
                    </Stack>
                </ContainerScroll>
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

export { Step2 };