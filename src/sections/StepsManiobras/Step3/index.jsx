import { useContext, useState } from "react";
//context
import { PrelavadoContext } from "../../../Context/PrelavadoContext";
import { actionTypes } from "../../../Reducers/PrelavadoReducer";
//hooks
import { Typography, Stack, Paper, FormGroup, Divider, IconButton, Button, Container, Modal, Fade, Box } from "@mui/material";
import { useCheckList } from "../../../Hooks/useChecklistPrelavado";
import { InputImage } from "../../../components/InputImage";
import { InputText } from "../../../components/InputText";
import { InputCheck } from "../../../components/InputCheck";
import { ContainerScroll } from "../../../components/ContainerScroll";
import useMediaQuery from "@mui/material/useMediaQuery";
//icons
import ChatIcon from '@mui/icons-material/Chat';


function Step3({ step, setStep }) {

    const IsSmall = useMediaQuery('(max-width:700px)');
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

            <Box>

                {!message &&
                    <Fade in={!message} timeout={500}>
                        <Box
                            elevation={4}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                padding: '0px',
                                backgroundColor: 'whitesmoke'
                            }}
                        >

                            <Typography variant="h6" sx={{ padding: '20px 20px 0px' }}>Revisión de empaques para valvula sanitaria 3A</Typography>

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
                                        <Paper
                                            key={index}
                                            sx={{ width: '100%', }}
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

                                    <Stack width='100%' flexDirection='row' alignItems='center' justifyContent='space-between'>
                                        <Button variant="contained" color='warning' onClick={() => setStep(2)}>Anterior</Button>
                                        <Button variant="contained" color='primary' onClick={SaveChanguesOnGloablState} >Siguiente</Button>
                                    </Stack>
                                </FormGroup>

                            </ContainerScroll>

                        </Box>
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
                            <Typography variant='body1'>
                                Asegúrese que el anillo de arriba este apretado con la fuerza de máquina.
                            </Typography>

                            <Stack
                                flexDirection='row'
                                justifyContent='space-between'
                                width='100%'
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
                                    onClick={() => setStep(5)}>
                                    Ok
                                </Button>
                            </Stack>
                        </Paper>
                    </Fade>
                )}

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

export { Step3 };