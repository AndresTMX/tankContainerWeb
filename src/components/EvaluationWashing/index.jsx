import { useState, useContext, useEffect } from "react";
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
    FormControlLabel,
    FormGroup,
    Checkbox,
    TextField,
    Chip,
} from "@mui/material";
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
import { useSealItem } from "../../Hooks/Lavado/useSealItem";


function EvaluationWashing({ modal, toggleModal, lavado, updateList }) {

    // useEffect(() => {
    //     setRevision(initialStatate)
    //     setStep(1)
    // }, [modal])

    const { updateDateTimeWashing } = useCreateConditionsWashing();

    const { cliente } = lavado.registros_detalles_entradas.clientes || {};
    const { num: numLavado } = lavado.tipos_lavado || {};

    const isAgmark = cliente === 'agmark' ? true : false;

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const questions = [
        {
            question: 'Residuos en escotilla y válvulas',
            value: '',
            options: ['si', 'no'],
            correct: 'no'
        },
        {
            question: 'Legibilidad de datos seriales y revisiones',
            value: '',
            options: ['si', 'no'],
            correct: 'si'
        },
        {
            question: 'Residuos dentro del tanque',
            value: '',
            options: ['si', 'no'],
            correct: 'no'
        },
        {
            question: 'Corrosión dentro del tanque o en escotilla',
            value: '',
            options: ['si', 'no'],
            correct: 'no'
        },
        {
            question: 'Condiciones generales de válvulas',
            value: '',
            options: ['buenas condiciones', 'malas condiciones'],
            correct: 'buenas condiciones'
        },
        {
            question: 'Ausencia de juntas y empaques',
            value: '',
            options: ['si', 'no'],
            correct: 'no'
        },
        {
            question: 'Portasellos',
            value: '',
            options: ['si', 'no'],
            correct: 'si'
        },
    ]

    const agmark = [

        {
            question: 'Residuos en escotilla y válvulas',
            value: '',
            options: ['si', 'no'],
            correct: 'no'
        },
        {
            question: 'Legibilidad de datos seriales y revisiones',
            value: '',
            options: ['si', 'no'],
            correct: 'si'
        },
        {
            question: 'Residuos dentro del tanque',
            value: '',
            options: ['si', 'no'],
            correct: 'no'
        },
        {
            question: 'Corrosión dentro del tanque o en escotilla',
            value: '',
            options: ['si', 'no'],
            correct: 'no'
        },
        {
            question: 'Condiciones generales de válvulas',
            value: '',
            options: ['buenas condiciones', 'malas condiciones'],
            correct: 'buenas condiciones'
        },
        {
            question: 'Ausencia de juntas y empaques',
            value: '',
            options: ['si', 'no'],
            correct: 'no'
        },
        {
            question: 'Portasellos',
            value: '',
            options: ['si', 'no'],
            correct: 'si'
        },
        {
            question: 'Tipo de insulado',
            value: '',
            section: 'tipoInsulado',
            for: 'agmark',
            etapa: 'lavado',
            options: ['Insulado', 'No insulado'],
            correct: ['Insulado', 'No insulado']
        },
        {
            question: 'Tipo de isotanque',
            value: '',
            section: 'tipoTanque',
            for: 'agmark',
            etapa: 'lavado',
            options: ['AGMU 63', 'AGMU 660', 'AGMU 661', 'AGMU 68', 'AGMU 580', 'DYOU 123'],
            correct: ['AGMU 63', 'AGMU 660', 'AGMU 661', 'AGMU 68', 'AGMU 580', 'DYOU 123']
        },
        {
            question: 'Tipo de valvula',
            value: '',
            section: 'tipoValvula',
            for: 'agmark',
            etapa: 'lavado',
            options: ['Tipo 3 sanitaria', 'Tipo 3A sanitaria (piston)'],
            correct: ['Tipo 3 sanitaria', 'Tipo 3A sanitaria (piston)']
        },
        {
            question: 'Empaque del asiento del piston',
            value: '',
            section: 'empaques',
            for: 'agmark',
            etapa: 'lavado',
            options: ['si', 'no', 'n/a'],
            correct: 'si'
        },
        {
            question: 'Empaque clamp buna 3" ',
            value: '',
            section: 'empaques',
            for: 'agmark',
            etapa: 'lavado',
            options: ['si', 'no', 'n/a'],
            correct: 'si'
        },
        {
            question: 'Empaque de válvula mariposa 4" ',
            value: '',
            section: 'empaques',
            for: 'agmark',
            etapa: 'lavado',
            options: ['si', 'no', 'n/a'],
            correct: 'si'
        },
        {
            question: 'Empaque válvula mariposa 4 birlos ',
            value: '',
            section: 'empaques',
            for: 'agmark',
            etapa: 'lavado',
            options: ['si', 'no', 'n/a'],
            correct: 'si'
        },
        {
            question: 'Empaque de válvula de pie 4 virlos ',
            value: '',
            section: 'empaques',
            for: 'agmark',
            etapa: 'lavado',
            options: ['si', 'no', 'n/a'],
            correct: 'si'
        },
        {
            question: 'Empaque de válvula de pie 8 birlos',
            value: '',
            section: 'empaques',
            for: 'agmark',
            etapa: 'lavado',
            options: ['si', 'no', 'n/a'],
            correct: 'si'
        },

    ]

    const initialStatate = isAgmark ? agmark : questions;

    const [step, setStep] = useState({ step: 3, type: numLavado });
    const [revision, setRevision] = useState(initialStatate);

    const changueValue = (index, value) => {
        const newState = [...revision]
        newState[index].value = value
        setRevision(newState)
    }

    const validateQuestions = (questions, callback) => {
        const valuesNull = questions.filter((obj) => obj.value === '');

        const responsesIncorrect = questions.filter((item) => {
            if (Array.isArray(item.correct)) {
                // Si item.correct es un array, comprobar si el valor no está presente en el array
                return !item.correct.includes(item.value) && item.value != 'n/a'
            } else {
                // Si item.correct no es un array, comprobar si el valor no coincide directamente
                return item.value !== item.correct && item.value != 'n/a'
            }
        });

        if (valuesNull.length >= 1) {
            dispatchGlobal({
                type: actionTypes.setNotification,
                payload: `Termina el checklist para continuar`
            })
        }

        if (responsesIncorrect.length >= 1 && valuesNull.length === 0) {
            setStep(2)
        }

        if (valuesNull.length === 0 && responsesIncorrect.length === 0) {
            callback();
            setStep(3);
        }
    }

    const submitChecklist = async () => {
        try {

            validateQuestions(revision, async () => await updateDateTimeWashing(lavado, revision))

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
                                Proceso de lavado {step === 3 ? ' - Condiciones de lavado ' + numLavado : ''}
                            </Typography>

                            <IconButton
                                onClick={toggleModal}
                            >
                                <ClearIcon color='error' />
                            </IconButton>
                        </Stack>

                        {(step.step === 1) &&
                            <RevisionLavado
                                revision={revision}
                                changueValue={changueValue}
                                submitChecklist={submitChecklist}
                            />}

                        {(step.step === 2) &&
                            <EvaluacionResults step={step} setStep={setStep} />}

                        {(step.step >= 3) &&
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
                            index={index}
                            item={question}
                            changueValue={changueValue}
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

export function EvaluacionResults({ step, setStep }) {

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
                            onClick={() => setStep(step - 1)}
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

    const { id: lavadoId, id_detalle_entrada, tipos_lavado } = lavado || {};
    const { lavado: lavado_asignado, num: numLavado } = tipos_lavado || {};

    const { sendConditionWashing } = useCreateConditionsWashing();
    const [conditions, setConditions] = useState(
        {
            numero_bahia: '',
            enjuague_tiempo_1: '2',
            enjuague_temperatura_1: 'ambiente',
            desengrasante_tiempo: '10',
            desengrasante_temperatura: '60',
            limpiador_tiempo: '10',
            limpiador_temperatura: '71',
            enjuague_tiempo_2: '5',
            temperatura_enjuague_2: '98',
            tiempo_enjuague_3: '15',
            temperatura_enjuague_3: 'ambiente',
            sanitizado_tiempo: '5',
            sanitizado_temperatura: 'ambiente'
        });

    const { error, value, newConcentration } = useSaniticeValue();
    const [valueConcentracion, setConcentration] = useState(value);

    useEffect(() => {
        setConcentration(value)
    }, [value])

    const conditionsWashing = {
        '1': ['5', '6'],
        '2': ['1', '3', '5', '6'],
        '3': ['1', '2', '3', '5', '6'],
        '5': ['1', '2', '3', '4', '5', '6']
    }

    const stepsInclude = (type, stepForm) => {
        const arraySteps = conditionsWashing[type]
        return arraySteps.includes(stepForm)
    }

    const OnWashingOne = (event, callback) => {
        event.preventDefault();

        const formulario = event.target;

        const formData = new FormData(formulario);

        const valores = {};

        for (const [campo, valor] of formData.entries()) {
            valores[campo] = valor;
        }

        setConditions({ ...conditions, ...valores, concentracion: valueConcentracion })
        callback();

    }

    const formSubmit = async (e) => {
        e.preventDefault()
        const { numero_bahia } = conditions || {};

        const dataInString = JSON.stringify(conditions);

        const newRegister = { bahia: numero_bahia, condiciones_lavado: dataInString };
        await sendConditionWashing(newRegister, lavadoId, id_detalle_entrada, () => updateList())
        toggleModal()
    }

    return (
        <>

            {(step.step === 3) &&
                <form onSubmit={(e) => OnWashingOne(e, () => setStep({ ...step, step: 4 }))}>
                    <ContainerScroll height='400px'>
                        <Stack gap='10px'>

                            {/* lavado 1 */}
                            {(step.step === 3 && stepsInclude(step.type, '1')) &&
                                <Box sx={{ display: 'flex', flexDirection: 'column', background: 'white', padding: '10px', gap: '10px', width: '100%' }}>
                                    <Typography>Enjuague de 2 minutos</Typography>

                                    <TextField
                                        required
                                        fullWidth
                                        id='numero_bahia'
                                        name='numero_bahia'
                                        label='Número de bahía' />

                                    <Stack flexDirection={isMovile ? 'column' : 'row'} alignItems='center' gap='10px'>
                                        <TextField
                                            required
                                            fullWidth
                                            label='temperatura'
                                            value={conditions.enjuague_temperatura_1}
                                            onChange={(e) => setConditions({ ...conditions, enjuague_temperatura_1: e.target.value })}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            required
                                            fullWidth
                                            id='enjuague_presion_1'
                                            name='enjuague_presion_1'
                                            label='presion'
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            required
                                            fullWidth
                                            value={conditions.enjuague_tiempo_1}
                                            onChange={(e) => setConditions({ ...conditions, enjuague_tiempo_1: e.target.value })}
                                            label='tiempo'
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                            }}
                                        />
                                    </Stack>

                                </Box>
                            }

                            {/* desangrasante */}
                            {(step.step === 3 && stepsInclude(step.type, '2')) &&
                                <Box sx={{ display: 'flex', flexDirection: 'column', background: 'white', padding: '10px', gap: '10px' }}>

                                    <Typography>Desengrasante</Typography>

                                    <Stack flexDirection={isMovile ? 'column' : 'row'} alignItems='center' gap='10px'>
                                        <TextField
                                            required
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            id='desengrasante_temperatura'
                                            value={conditions.desengrasante_temperatura}
                                            onChange={(e) => setConditions({ ...conditions, desengrasante_temperatura: e.target.value })}
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
                                            value={conditions.desengrasante_tiempo}
                                            onChange={(e) => setConditions({ ...conditions, desengrasante_tiempo: e.target.value })}
                                            label='tiempo'
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            required
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            id='concentracion_desengrasante'
                                            name='concentracion_desengrasante'
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PPM</InputAdornment>,
                                            }}
                                        />
                                    </Stack>



                                </Box>
                            }

                            {/* limpiador */}
                            {(step.step === 3 && stepsInclude(step.type, '3')) &&
                                <Box sx={{ display: 'flex', flexDirection: 'column', background: 'white', padding: '10px', gap: '10px' }}>

                                    <Typography>Limpiador</Typography>

                                    <Stack flexDirection={isMovile ? 'column' : 'row'} alignItems='center' gap='10px'>
                                        <TextField
                                            required
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            id='limpiador_temperatura'
                                            value={conditions.limpiador_temperatura}
                                            onChange={(e) => setConditions({ ...conditions, limpiador_temperatura: e.target.value })}
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
                                            value={conditions.limpiador_tiempo}
                                            onChange={(e) => setConditions({ ...conditions, limpiador_tiempo: e.target.value })}
                                            label='tiempo'
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            required
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            id='concentracion_limpiador'
                                            name='concentracion_limpiador'
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PPM</InputAdornment>,
                                            }}
                                        />
                                    </Stack>

                                </Box>
                            }

                            {/* enjuague 2 */}
                            {(step.step === 3 && stepsInclude(step.type, '4')) &&
                                <Box sx={{ display: 'flex', flexDirection: 'column', background: 'white', padding: '10px', gap: '10px' }}>
                                    <Typography>Enjuague de 5 min</Typography>

                                    <Stack flexDirection={isMovile ? 'column' : 'row'} alignItems='center' gap='10px'>
                                        <TextField
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            id='temperatura_enjuague_2'
                                            value={conditions.temperatura_enjuague_2}
                                            onChange={(e) => setConditions({ ...conditions, temperatura_enjuague_2: e.target.value })}
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
                                            value={conditions.enjuague_tiempo_2}
                                            onChange={(e) => setConditions({ ...conditions, enjuague_tiempo_2: e.target.value })}
                                            label='tiempo'
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                            }}
                                        />
                                    </Stack>


                                </Box>
                            }

                            {/* enjuague 3 */}
                            {(step.step === 3 && stepsInclude(step.type, '5')) &&
                                <Box sx={{ display: 'flex', flexDirection: 'column', background: 'white', padding: '10px', gap: '10px' }}>
                                    <Typography>Enjuague de 15 min</Typography>

                                    {(step.type === '1') && <TextField
                                        required
                                        fullWidth
                                        id='numero_bahia'
                                        name='numero_bahia'
                                        label='Número de bahía' />}

                                    <Stack flexDirection={isMovile ? 'column' : 'row'} alignItems='center' gap='10px'>
                                        <TextField
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            id='temperatura_enjuague_3'
                                            value={conditions.temperatura_enjuague_3}
                                            onChange={(e) => setConditions({ ...conditions, temperatura_enjuague_3: e.target.value })}
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
                                            value={conditions.tiempo_enjuague_3}
                                            onChange={(e) => setConditions({ ...conditions, tiempo_enjuague_3: e.target.value })}
                                            label='tiempo'
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                            }}
                                        />
                                    </Stack>

                                </Box>
                            }

                            {/* sanitizado */}
                            {(step.step === 3 && stepsInclude(step.type, '6')) &&
                                <Box sx={{ display: 'flex', flexDirection: 'column', background: 'white', padding: '10px', gap: '10px', alignItems: 'start' }}>
                                    <Typography>Condiciones de sanitización</Typography>

                                    <Stack flexDirection={isMovile ? 'column' : 'row'} width='100%' alignItems='center' gap='10px' >
                                        <TextField
                                            fullWidth
                                            required
                                            id='sanitizado_temperatura'
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            value={conditions.sanitizado_temperatura}
                                            onChange={(e) => setConditions({ ...conditions, sanitizado_temperatura: e.target.value })}
                                            label='Temperatura'
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            label='Presión'
                                            id='sanitizado_presion'
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            name='sanitizado_presion'
                                            required
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            required
                                            id='sanitizado_timepo'
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            value={conditions.sanitizado_tiempo}
                                            onChange={(e) => setConditions({ ...conditions, sanitizado_tiempo: e.target.value })}
                                            label='Tiempo'
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                            }}
                                        />
                                    </Stack>

                                    <Chip
                                        color="info"
                                        label={'Ultima concentracion guardada: ' + valueConcentracion} />

                                    <FormControl sx={{ width: '100%' }}>
                                        <TextField
                                            fullWidth
                                            required
                                            label='Concentración de solución'
                                            value={valueConcentracion}
                                            onChange={(e) => setConcentration(e.target.value)} />

                                    </FormControl>

                                    <Stack flexDirection='row' alignItems='center' justifyContent='flex-start' width='100%'>
                                        <Button
                                            endIcon={<SaveIcon />}
                                            onClick={() => newConcentration(valueConcentracion)}
                                            size='small'
                                            variant="outlined">
                                            guardar concentración
                                        </Button>
                                    </Stack>
                                </Box>

                            }

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
                            onClick={() => setStep({ ...step, step: 1 })}
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
                </form>}


            {/* recap */}
            {(step.step === 4) &&
                <form onSubmit={(e) => formSubmit(e)}>
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

                                        <TextField
                                            disabled
                                            label='Concentración'
                                            value={conditions.concentracion_desengrasante}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PPM</InputAdornment>,
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

                                        <TextField
                                            disabled
                                            label='Concentración'
                                            value={conditions.concentracion_limpiador}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PPM</InputAdornment>,
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
                                            value={conditions.enjuague_tiempo_2}
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

                                <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                    <Typography>Sanitizado</Typography>
                                    <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                        <TextField
                                            disabled
                                            label='Temperatura'
                                            value={conditions.sanitizado_temperatura}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            disabled
                                            label='Presión'
                                            value={conditions.sanitizado_presion}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            disabled
                                            label='Tiempo'
                                            value={conditions.sanitizado_tiempo}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            disabled
                                            label='Concentración'
                                            value={valueConcentracion}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PPM</InputAdornment>,
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
                            onClick={() => setStep({ ...step, step: 3 })}
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

export function SealItem({ modal, toggleModal, updateList, idWashing }) {

    const movile = useMediaQuery('(max-width:800px)');
    const { sealItem } = useSealItem()
    const [step, setStep] = useState(1);
    const [sellos, setSellos] = useState([])

    const submitStepOne = (e) => {
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
        setStep(2)
    }

    const SubmitRegister = async (e) => {
        e.preventDefault();
        const sellosInString = JSON.stringify(sellos);
        await sealItem(idWashing, sellosInString)
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
                            <Typography>Asignación de sellos</Typography>

                            <IconButton onClick={toggleModal} color="error">
                                <ClearIcon />
                            </IconButton>
                        </Stack>

                        {(step === 1) &&
                            <form onSubmit={submitStepOne} style={{ width: '100%' }}>
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
                                    <Stack flexDirection='row' alignItems='center' justifyContent='flex-end'>

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

                        {(step === 2) &&
                            <form onSubmit={SubmitRegister} style={{ width: '100%' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '100%' }}>

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

function ItemQuestion({ item, index, changueValue }) {
    return (
        <Paper
            elevation={3}
            sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', gap: '10px', padding: '10px' }} >
            <Typography variant='body1' >
                {item.question}
            </Typography>

            <FormGroup required>
                {item.options.map((request, indexRequest) => (
                    <FormControlLabel key={`${request}_${indexRequest}`}
                        sx={{ textTransform: 'uppercase' }}
                        onChange={() => changueValue(index, request)}
                        control={<Checkbox checked={item.value === request ? true : false} />}
                        label={request}
                    />
                ))}


            </FormGroup>
        </Paper>
    )
}
