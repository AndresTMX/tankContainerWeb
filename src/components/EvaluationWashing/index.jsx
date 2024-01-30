import { useState, useRef, useContext, useEffect } from "react";
import {
    Container,
    Box,
    Paper,
    Stack,
    Typography,
    Button,
    Modal,
    IconButton,
    InputAdornment,
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    Chip,
} from "@mui/material";
import { ItemQuestion } from "../../sections/CheckListCalidadPrelavado";
import { ContainerScroll } from "../ContainerScroll";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { actionTypes } from "../../Reducers/GlobalReducer";
import { GlobalContext } from "../../Context/GlobalContext";
import { useCreateConditionsWashing } from "../../Hooks/Lavado/useCreateConditionsWashing";
//icons
import ClearIcon from '@mui/icons-material/Clear';
import { useSaniticeValue } from "../../Hooks/Lavado/useSaniticeValue";
import SaveIcon from '@mui/icons-material/Save';
import { useSanitization } from "../../Hooks/Lavado/useSanitization";
import supabase from "../../supabase";
//helpers
import { currenDateFormatTz } from "../../Helpers/date";

function EvaluationWashing({ modal, toggleModal, lavado, updateList }) {


    useEffect(() => {
        setRevision(questions)
        setStep(1)
    }, [modal])

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

    const changueValue = (index, value) => {
        const copy = [...revision];
        copy[index].value = value;
        setRevision(copy);
    };

    const submitChecklist = async () => {
        try {
            let emptyValues = revision.filter((question) => question.value.trim() === '');
            let negativeValues = revision.filter((question) => question.value === 'no');

            if (emptyValues.length > 1) {
                throw new Error('Termina la revisión para continuar')
            }

            if (negativeValues.length > 0 && emptyValues.length === 0) {
                setStep(2)
            }

            if (negativeValues.length === 0 && emptyValues.length === 0) {
                setStep(3)
                const { error } = await supabase.from('lavados').update({ dateInit: currenDateFormatTz }).eq('id', lavado.id)
                if (error) {
                    throw new Error(`Error al iniciar el lavado, error: ${error.message}`)
                }
            }
        } catch (error) {
            dispatchGlobal({
                type: actionTypes.setNotification,
                payload: error.message
            })
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
                                lavado={lavado}
                                updateList={updateList}
                                toggleModal={toggleModal}
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

export function EvaluacionResults({ previusStep, data, sendForm }) {

    const [select, setSelect] = useState('')

    const submitForm = (e) => {
        e.preventDefault();
        sendForm()

    }

    return (
        <>
            <form onSubmit={submitForm}>
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

                    <Button variant="contained" color='primary' type='submit' fullWidth >Enviar</Button>

                    <Stack
                        justifyContent='flex-start'
                        flexDirection='row'
                        alignItems='center'
                        paddingTop='10px'
                        gap='10px'
                    >

                        <Button
                            onClick={previusStep}
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

function ConditionsWashing({ step, setStep, lavado, updateList, toggleModal }) {

    const isMovile = useMediaQuery('(max-width:600px');
    const movile = useMediaQuery('(max-width:800px)');


    const { id: lavadoId, id_detalle_entrada } = lavado || {};
    const { sendConditionWashing } = useCreateConditionsWashing();
    const [conditions, setConditions] = useState({ numero_bahia: '' });

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

    const formSubmit = async () => {
        const { numero_bahia } = conditions || {};
        const dataInString = JSON.stringify(conditions);
        const newRegister = { bahia: numero_bahia, condiciones_lavado: dataInString };
        await sendConditionWashing(newRegister, lavadoId, id_detalle_entrada, () => updateList())
        toggleModal()
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
                                            endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
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
                                            endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
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
                                            endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
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
                                    endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
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
                                    endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
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
                <form onSubmit={(e) => OnWashingOne(e, () => formSubmit())}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', background: 'white', padding: '10px', gap: '10px' }}>

                        <Typography>Recapitulación</Typography>

                        <ContainerScroll height='400px'>
                            <Stack gap='10px'>
                                <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                    <Typography>Enjuague 1</Typography>
                                    <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                        <TextField
                                            disabled
                                            label='Temperatura'
                                            value={conditions.enjuague_temperatura_1}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            disabled
                                            label='Presión'
                                            value={conditions.enjuague_presion_1}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            disabled
                                            label='Tiempo'
                                            value={conditions.enjuague_tiempo_1}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                            }}
                                        />
                                    </Stack>
                                </Box>

                                <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                    <Typography>Solución desengrasante</Typography>
                                    <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                        <TextField
                                            disabled
                                            label='Temperatura'
                                            value={conditions.desengrasante_temperatura}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            disabled
                                            label='Presión'
                                            value={conditions.desengrasante_presion}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            disabled
                                            label='Tiempo'
                                            value={conditions.desengrasante_tiempo}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                            }}
                                        />
                                    </Stack>
                                </Box>

                                <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                    <Typography>Solución limpiadora</Typography>
                                    <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                        <TextField
                                            disabled
                                            label='Temperatura'
                                            value={conditions.limpiador_temperatura}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            disabled
                                            label='Presión'
                                            value={conditions.limpiador_presion}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            disabled
                                            label='Tiempo'
                                            value={conditions.limpiador_tiempo}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                            }}
                                        />
                                    </Stack>
                                </Box>

                                <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                    <Typography>Enjuague 2</Typography>
                                    <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                        <TextField
                                            disabled
                                            label='Temperatura'
                                            value={conditions.temperatura_enjuague_2}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            disabled
                                            label='Presión'
                                            value={conditions.presion_enjuague_2}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            disabled
                                            label='Tiempo'
                                            value={conditions.timepo_enjuague_2}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                            }}
                                        />
                                    </Stack>
                                </Box>

                                <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                    <Typography>Enjuague 3</Typography>
                                    <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                        <TextField
                                            disabled
                                            label='Temperatura'
                                            value={conditions.temperatura_enjuague_3}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            disabled
                                            label='Presión'
                                            value={conditions.presion_enjuague_3}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            disabled
                                            label='Tiempo'
                                            value={conditions.tiempo_enjuague_3}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                            }}
                                        />
                                    </Stack>
                                </Box>

                            </Stack>
                        </ContainerScroll>

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

export function SaniticeWashing({ modal, toggleModal, updateList, idRegister, idWashing, dataConditions }) {

    const movile = useMediaQuery('(max-width:800px)');
    const { error, value, newConcentration } = useSaniticeValue()
    const { completeSanitization } = useSanitization()

    const { concentracion } = value[0] || {};

    const [step, setStep] = useState(1);

    const [concentration, setConcentration] = useState(concentracion);
    const [conditions, setConditions] = useState({ sanitizacion_temperatura: '', sanitizacion_presion: '', sanitizacion_tiempo: '' })
    const [sellos, setSellos] = useState([])

    const onChangueConcentration = (e) => {
        setConcentration(e.target.value)
    }

    useEffect(() => { setConcentration(concentracion) }, [value])

    const submitStepOne = (e) => {
        e.preventDefault();
        setStep(2)
    }

    const submitStepTwo = (e) => {
        e.preventDefault();

        const formulario = e.target;
        const formData = new FormData(formulario);

        const valuesForm = [];

        for (const [campo, valor] of formData.entries()) {
            if (valor != '') {
                valuesForm.push({ [campo]: valor });
            }
        }

        setSellos(valuesForm)
        setStep(3)
    }

    const SubmitRegister = async (e) => {
        e.preventDefault();
        const newConditions = { ...conditions, ...dataConditions }
        const sellosInString = JSON.stringify(sellos);
        const newConditionsString = JSON.stringify(newConditions)
        const newRegister = { sellos: sellosInString, concentracion: concentracion, condiciones_lavado: newConditionsString }
        await completeSanitization(newRegister, idRegister, idWashing, newConditionsString)
        toggleModal()
        updateList()
    }



    return (
        <>
            <Modal open={modal}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingTop: '2%',
                        width: '100%',
                        minHeight: '100vh',
                        alignItems: 'center',
                    }}>
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '10px',
                            gap: '10px',
                            width: '95vw',
                            maxWidth: '700px'
                        }}>

                        <Stack flexDirection='row' alignItems='center' justifyContent='space-between' width='100%'>
                            <Typography>Sanitización y asignación de sellos</Typography>

                            <IconButton onClick={toggleModal} color="error">
                                <ClearIcon />
                            </IconButton>
                        </Stack>

                        {(step === 1) &&
                            <form onSubmit={submitStepOne} style={{ width: '100%' }}>
                                <Box display='flex' flexDirection='column' alignItems='start' width='100%' gap='10px' >

                                    <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                        <Typography>Condiciones de sanitización</Typography>
                                        <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                            <TextField
                                                id='sanitizado_temperatura'
                                                required
                                                label='Temperatura'
                                                onChange={(e) => setConditions({ ...conditions, sanitizacion_temperatura: e.target.value })}
                                                value={conditions.sanitizacion_temperatura}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                id='sanitizado_presion'
                                                required
                                                label='Presión'
                                                onChange={(e) => setConditions({ ...conditions, sanitizacion_presion: e.target.value })}
                                                value={conditions.sanitizacion_presion}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                id='sanitizado_timepo'
                                                required
                                                label='Tiempo'
                                                onChange={(e) => setConditions({ ...conditions, sanitizacion_tiempo: e.target.value })}
                                                value={conditions.sanitizacion_tiempo}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                                }}
                                            />
                                        </Stack>
                                    </Box>

                                    <Chip
                                        color="info"
                                        label={'Ultima concentracion guardada: ' + concentracion} />

                                    <FormControl sx={{ width: '100%' }}>
                                        <TextField
                                            fullWidth
                                            required
                                            label='Concentración de solución'
                                            value={concentration}
                                            onChange={(e) => onChangueConcentration(e)} />

                                    </FormControl>

                                    <Stack flexDirection='row' alignItems='center' justifyContent='space-between' width='100%'>
                                        <Button
                                            endIcon={<SaveIcon />}
                                            onClick={() => newConcentration(concentration)}
                                            size='small'
                                            variant="outlined">
                                            guardar concentración
                                        </Button>

                                        <Button
                                            type="submit"
                                            size='small'
                                            variant="contained">
                                            siguiente
                                        </Button>

                                    </Stack>
                                </Box>
                            </form>
                        }

                        {(step === 2) &&
                            <form onSubmit={submitStepTwo} style={{ width: '100%' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '100%' }}>
                                    <ContainerScroll height='300px'>
                                        <Stack gap='10px' width='100%'>
                                            <Typography>Sellos en domo</Typography>
                                            <TextField fullWidth required label='sello #1' id="sello-domo-1" name="sello-domo-1" />
                                            <TextField fullWidth label='sello #2' id="sello-domo-2" name="sello-domo-2" />
                                            <TextField fullWidth label='sello #3' id="sello-domo-3" name="sello-domo-3" />
                                            <TextField fullWidth label='sello #4' id="sello-domo-4" name="sello-domo-4" />
                                            <TextField fullWidth label='sello #5' id="sello-domo-5" name="sello-domo-5" />
                                            <Typography>Sellos en valvula superior</Typography>
                                            <TextField fullWidth label='sello #6' id="sello-inderior-1" name="sello-superior-1" />
                                            <TextField fullWidth label='sello #7' id="sello-inderior-2" name="sello-superior-2" />
                                            <TextField fullWidth label='sello #8' id="sello-inderior-3" name="sello-superior-3" />
                                            <TextField fullWidth label='sello #9' id="sello-inderior-4" name="sello-superior-4" />
                                            <TextField fullWidth label='sello #10' id="sello-inderior-5" name="sello-superior-5" />
                                        </Stack>
                                    </ContainerScroll>
                                    <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
                                        <Button
                                            onClick={() => setStep(1)}
                                            variant="contained"
                                            color='warning'>
                                            anterior
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color='primary'>
                                            asignar sellos
                                        </Button>
                                    </Stack>
                                </Box>
                            </form>
                        }

                        {(step === 3) &&
                            <form onSubmit={SubmitRegister} style={{ width: '100%' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '100%' }}>

                                    <Stack padding='10px'>
                                        <Typography variant="subtitle2">Concentración</Typography>
                                        <Typography padding='15px' >{concentracion}</Typography>
                                    </Stack>

                                    <Box padding='10px'>
                                        <Typography padding='5px' variant="subtitle2">Sellos asignados</Typography>
                                        <Stack flexDirection='row' alignItems='center' flexWrap='wrap' gap='10px' padding='15px' bgcolor='whitesmoke'>
                                            {sellos.map((obj, index) => (
                                                <Chip key={index} label={obj[Object.keys(obj)[0]]} color='info' />
                                            ))}
                                        </Stack>
                                    </Box>

                                    <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
                                        <Button
                                            variant="contained"
                                            color='warning'
                                            onClick={() => setStep(2)}
                                            type='submit'
                                            size="small"
                                        >
                                            anterior
                                        </Button>

                                        <Button
                                            variant="contained"
                                            type='submit'
                                            size="small"
                                        >
                                            Enviar
                                        </Button>
                                    </Stack>

                                </Box>
                            </form>
                        }

                    </Paper>
                </Box>
            </Modal>
        </>
    )
}

