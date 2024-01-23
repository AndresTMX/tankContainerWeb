import { useState, useContext, useEffect } from "react";
import { Container, Box, Paper, Stack, Typography, Button, Modal, IconButton, InputAdornment, Card, CardMedia, CardContent, CardActions, Alert, Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
import { ItemQuestion } from "../../sections/CheckListCalidadPrelavado";
import { ContainerScroll } from "../ContainerScroll";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { actionTypes } from "../../Reducers/GlobalReducer";
import { GlobalContext } from "../../Context/GlobalContext";
import { useCreateConditionsWashing } from "../../Hooks/Lavado/useCreateConditionsWashing";
//icons
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';

function EvaluationWashing({ modal, toggleModal, lavado, updateList }) {

    const { id: lavadoId, id_detalle_entrada } = lavado || {};

    // useEffect(() => {
    //     setRevision(questions)
    //     setStep(1)
    // }, [modal])

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const questions = [
        {
            question: 'Residuos en escotilla y válvulas',
            value: '',
        },
        {
            question: 'Legibilidad de datos seriales y revisiones',
            value: '',
        },
        {
            question: 'Residuos dentro del tanque',
            value: '',
        },
        {
            question: 'Corrosión dentro del tanque o en escotilla',
            value: '',
        },
        {
            question: 'Condiciones generales de válvulas',
            value: '',
        },
        {
            question: 'Ausencia de juntas y empaques',
            value: '',
        },
        {
            question: 'Portasellos',
            value: '',
        },
    ]

    const [step, setStep] = useState(1);
    const [revision, setRevision] = useState(questions);
    const [conditions, setConditions] = useState({ lavado_id: lavadoId, id_detalle_entrada });

    const changueValue = (index, value) => {
        const copy = [...revision];
        copy[index].value = value;
        setRevision(copy);
    };

    const submitChecklist = () => {
        let emptyValues = revision.filter((question) => question.value.trim() === '');
        let negativeValues = revision.filter((question) => question.value === 'no');

        if (emptyValues.length > 1) {
            dispatchGlobal({
                type: actionTypes.setNotification,
                payload: 'Termina la revisión para continuar'
            })
        }

        if (negativeValues.length > 0 && emptyValues.length === 0) {
            setStep(2)
        }

        if (negativeValues.length === 0 && emptyValues.length === 0) {
            setStep(3)
        }


    }

    return (
        <>

            <Modal open={modal}>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: '100vh',
                        paddingTop: '5%',
                        width: '100vw',
                    }}>

                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '20px',
                            width: '100%',
                            maxWidth: '700px',

                        }}
                    >

                        <Stack
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                        >
                            <Typography variant="button">
                                Proceso de lavado {step === 3 ? ' - Condiciones de lavado' : ''}
                            </Typography>

                            <IconButton
                                onClick={toggleModal}
                            >
                                <ClearIcon color='error' />
                            </IconButton>
                        </Stack>

                        {(step === 1) &&
                            <RevisionLavado
                                revision={revision}
                                changueValue={changueValue}
                                submitChecklist={submitChecklist}
                            />}

                        {(step === 2) &&
                            <EvaluacionResults step={step} setStep={setStep} />}

                        {(step >= 3) &&
                            <ConditionsWashing
                                step={step}
                                setStep={setStep}
                                updateList={updateList}
                                conditions={conditions}
                                toggleModal={toggleModal}
                                setConditions={setConditions}
                            />}

                    </Paper>

                </Container>
            </Modal >

        </>
    );
}

export { EvaluationWashing };

function RevisionLavado({ revision, changueValue, submitChecklist }) {

    return (
        <>
            <Typography>Revsión externa</Typography>
            <ContainerScroll height={'350px'}>
                <Stack gap='8px'>
                    {revision.map((question, index) => (
                        <ItemQuestion
                            key={question.question}
                            question={question}
                            index={index}
                            toggleCheck={changueValue}
                        />
                    ))}
                </Stack>
            </ContainerScroll>
            <Stack
                justifyContent='flex-end'
                flexDirection='row'
                alignItems='center'
                paddingTop='10px'
                gap='10px'
            >

                <Button
                    onClick={submitChecklist}
                    color="primary"
                    variant="contained"
                >
                    siguiente
                </Button>
            </Stack>

        </>
    );
}

function EvaluacionResults({ step, setStep }) {

    const [select, setSelect] = useState('')

    return (
        <>
            <form>
                <Paper sx={{ display: 'flex', flexDirection: 'column', background: 'whitesmoke', gap: '15px', padding: '15px' }} >

                    <Paper>
                        <Alert severity="error" variant='standard' >
                            Evaluación externa reprobada, selecciona a que parte del proceso regresar la carga.
                        </Alert>
                    </Paper>

                    <FormControl sx={{ bgcolor: 'white' }}>
                        <InputLabel>Siguiente etapa</InputLabel>
                        <Select
                            value={select}
                            label='Siguiente etapa'
                            onChange={(e) => setSelect(e.target.value)}
                        >
                            <MenuItem value='prelavado'>Prelavado</MenuItem>
                            <MenuItem value='interna'>Reparación interna</MenuItem>
                            <MenuItem value='externa'>Reparación externa</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="contained" color='primary' fullWidth >Enviar</Button>

                    <Stack
                        justifyContent='flex-start'
                        flexDirection='row'
                        alignItems='center'
                        paddingTop='10px'
                        gap='10px'
                    >

                        <Button
                            onClick={() => setStep(1)}
                            color="warning"
                            variant="contained"
                        >
                            anterior
                        </Button>

                    </Stack>

                </Paper>
            </form>
        </>
    )
}

function ConditionsWashing({ step, setStep, conditions, setConditions, updateList, toggleModal }) {
console.log("🚀 ~ ConditionsWashing ~ conditions:", conditions)

    const isMovile = useMediaQuery('(max-width:600px');
    const { sendConditionWashing } = useCreateConditionsWashing();

    const {  } = conditions;

    const OnWashingOne = (event, callback) => {
        event.preventDefault();

        const formulario = event.target;

        const formData = new FormData(formulario);

        const valores = {};

        for (const [campo, valor] of formData.entries()) {
            valores[campo] = valor;
        }

        setConditions({ ...conditions, ...valores })
        callback();

    }

    const toggleSubmit = () => {
        toggleModal()
        updateList()
    }

    return (
        <>

            {(step === 3) &&
                <form onSubmit={(e) => OnWashingOne(e, () => setStep(4))}>
                    <ContainerScroll height='400px'>
                        <Stack gap='10px'>

                            <Box sx={{ display: 'flex', flexDirection: 'column', background: 'white', padding: '10px', gap: '10px', width: '100%' }}>
                                <Typography>Enjuague 1</Typography>

                                <TextField
                                    required
                                    fullWidth
                                    id='numero_bahia'
                                    name='numero_bahia'
                                    label='Número de bahía' />

                                <Stack flexDirection={isMovile ? 'column' : 'row'} alignItems='center' width='100%' gap='10px'>

                                    <TextField
                                        required
                                        sx={{ width: isMovile ? '100%' : '33%' }}
                                        id='enjuague_temperatura_1'
                                        name='enjuague_temperatura_1'
                                        label='temperatura'
                                        InputProps={{
                                            endAdornment: <InputAdornment position='end'>F°</InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        required
                                        sx={{ width: isMovile ? '100%' : '33%' }}
                                        id='enjuague_presion_1'
                                        name='enjuague_presion_1'
                                        label='presion'
                                        InputProps={{
                                            endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        required
                                        sx={{ width: isMovile ? '100%' : '33%' }}
                                        id='enjuague_tiempo_1'
                                        name='enjuague_tiempo_1'
                                        label='tiempo'
                                        InputProps={{
                                            endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                        }}
                                    />

                                </Stack>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', background: 'white', padding: '10px', gap: '10px' }}>

                                <Typography>Desengrasante</Typography>

                                <Stack flexDirection={isMovile ? 'column' : 'row'} alignItems='center' gap='10px'>
                                    <TextField
                                        required
                                        sx={{ width: isMovile ? '100%' : '33%' }}
                                        id='desengrasante_temperatura'
                                        name='desengrasante_temperatura'
                                        label='temperatura'
                                        InputProps={{
                                            endAdornment: <InputAdornment position='end'>F°</InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        required
                                        sx={{ width: isMovile ? '100%' : '33%' }}
                                        id='desengrasante_presion'
                                        name='desengrasante_presion'
                                        label='presion'
                                        InputProps={{
                                            endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        required
                                        sx={{ width: isMovile ? '100%' : '33%' }}
                                        id='desengrasante_tiempo'
                                        name='desengrasante_tiempo'
                                        label='tiempo'
                                        InputProps={{
                                            endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                        }}
                                    />
                                </Stack>



                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', background: 'white', padding: '10px', gap: '10px' }}>

                                <Typography>Limpiador</Typography>

                                <Stack flexDirection={isMovile ? 'column' : 'row'} alignItems='center' gap='10px'>
                                    <TextField
                                        required
                                        sx={{ width: isMovile ? '100%' : '33%' }}
                                        id='limpiador_temperatura'
                                        name='limpiador_temperatura'
                                        label='temperatura'
                                        InputProps={{
                                            endAdornment: <InputAdornment position='end'>F°</InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        required
                                        sx={{ width: isMovile ? '100%' : '33%' }}
                                        id='limpiador_presion'
                                        name='limpiador_presion'
                                        label='presion'
                                        InputProps={{
                                            endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        required
                                        sx={{ width: isMovile ? '100%' : '33%' }}
                                        id='limpiador_tiempo'
                                        name='limpiador_tiempo'
                                        label='tiempo'
                                        InputProps={{
                                            endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                        }}
                                    />
                                </Stack>

                            </Box>

                        </Stack>
                    </ContainerScroll>
                    <Stack
                        justifyContent='space-between'
                        flexDirection='row'
                        alignItems='center'
                        paddingTop='10px'
                        gap='10px'
                    >
                        <Button
                            onClick={() => setStep(1)}
                            variant="contained"
                            color="warning"
                        >
                            anterior
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                        >
                            siguiente
                        </Button>
                    </Stack>
                </form>
            }

            {(step === 4) &&
                <form onSubmit={(e) => OnWashingOne(e, () => setStep(5))}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', background: 'white', padding: '10px', gap: '10px' }}>
                        <Typography>Enjuague 2</Typography>

                        <Stack flexDirection={isMovile ? 'column' : 'row'} alignItems='center' gap='10px'>
                            <TextField
                                sx={{ width: isMovile ? '100%' : '33%' }}
                                id='temperatura_enjuague_2'
                                name='temperatura_enjuague_2'
                                label='temperatura'
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>F°</InputAdornment>,
                                }}
                            />

                            <TextField
                                sx={{ width: isMovile ? '100%' : '33%' }}
                                id='presion_enjuague_2'
                                name='presion_enjuague_2'
                                label='presion'
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                }}
                            />

                            <TextField
                                sx={{ width: isMovile ? '100%' : '33%' }}
                                id='timepo_enjuague_2'
                                name='timepo_enjuague_2'
                                label='tiempo'
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                }}
                            />
                        </Stack>

                        <Stack
                            justifyContent='space-between'
                            flexDirection='row'
                            alignItems='center'
                            paddingTop='10px'
                            gap='10px'
                        >
                            <Button
                                onClick={() => setStep(3)}
                                variant="contained"
                                color="warning"
                            >
                                anterior
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                            >
                                siguiente
                            </Button>
                        </Stack>
                    </Box>
                </form>
            }

            {(step === 5) &&
                <form onSubmit={(e) => OnWashingOne(e, () => setStep(6))}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', background: 'white', padding: '10px', gap: '10px' }}>
                        <Typography>Enjuague 3</Typography>

                        <Stack flexDirection={isMovile ? 'column' : 'row'} alignItems='center' gap='10px'>
                            <TextField
                                sx={{ width: isMovile ? '100%' : '33%' }}
                                id='temperatura_enjuague_3'
                                name='temperatura_enjuague_3'
                                label='temperatura'
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>F°</InputAdornment>,
                                }}
                            />

                            <TextField
                                sx={{ width: isMovile ? '100%' : '33%' }}
                                id='presion_enjuague_3'
                                name='presion_enjuague_3'
                                label='presion'
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                }}
                            />

                            <TextField
                                sx={{ width: isMovile ? '100%' : '33%' }}
                                id='tiempo_enjuague_3'
                                name='tiempo_enjuague_3'
                                label='tiempo'
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                }}
                            />
                        </Stack>
                        <Stack
                            justifyContent='space-between'
                            flexDirection='row'
                            alignItems='center'
                            paddingTop='10px'
                            gap='10px'
                        >
                            <Button
                                onClick={() => setStep(4)}
                                variant="contained"
                                color="warning"
                            >
                                anterior
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                            >
                                siguiente
                            </Button>
                        </Stack>
                    </Box>
                </form>
            }

            {(step === 6) &&
                <form onSubmit={(e) => OnWashingOne(e, () => sendConditionWashing(conditions, () =>  toggleSubmit() ))}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', background: 'white', padding: '10px', gap: '10px' }}>

                        <Typography>Sanitizante</Typography>

                        <Stack flexDirection={isMovile ? 'column' : 'row'} alignItems='center' gap='10px'>
                            <TextField
                                sx={{ width: isMovile ? '100%' : '33%' }}
                                id='sanitizante_temperatura'
                                name='sanitizante_temperatura'
                                label='temperatura'
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>F°</InputAdornment>,
                                }}
                            />

                            <TextField
                                sx={{ width: isMovile ? '100%' : '33%' }}
                                id='sanitizante_presion'
                                name='sanitizante_presion'
                                label='presion'
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                }}
                            />

                            <TextField
                                sx={{ width: isMovile ? '100%' : '33%' }}
                                id='sanitizante_tiempo'
                                name='sanitizante_tiempo'
                                label='tiempo'
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                }}
                            />
                        </Stack>

                    </Box>

                    <Stack
                        justifyContent='space-between'
                        flexDirection='row'
                        alignItems='center'
                        paddingTop='10px'
                        gap='10px'
                    >
                        <Button
                            onClick={() => setStep(5)}
                            variant="contained"
                            color="warning"
                        >
                            anterior
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                        >
                            enviar
                        </Button>
                    </Stack>
                </form>
            }

        </>
    )
}
