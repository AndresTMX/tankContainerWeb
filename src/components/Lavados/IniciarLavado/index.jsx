import { useState, useEffect } from "react";
import { Container, Box, Paper, Stack, Typography, Button, Modal, IconButton, InputAdornment, Alert, Select, } from "@mui/material";
import { MenuItem, FormControl, InputLabel, FormControlLabel, FormGroup, Checkbox, TextField, Chip, } from "@mui/material"
//customComponents
import { ContainerScroll } from "../../ContainerScroll";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSendToSanitization } from "../../../Hooks/Calidad/useSendToSanitzation";
import { useSealItem } from "../../../Hooks/Lavado/useSealItem";
//icons
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
//librearies
import dayjs from "dayjs";
import { toast, Toaster } from "sonner";
//hooks
import { useNavigate, useParams } from "react-router-dom";
//services
import { updateWashing } from "../../../services/lavados";
import { updateItemManiobra } from "../../../services/registros"


export function IniciarLavado() {

    const navigate = useNavigate();

    const { lavado: lavadoParam } = useParams();

    const JsonLavado = JSON.parse(decodeURIComponent(lavadoParam));

    const { registros_detalles_entradas, tipos_lavado } = JsonLavado || {};

    const { clientes } = registros_detalles_entradas || {};

    const { cliente } = clientes || {};
    const { num: numLavado } = tipos_lavado || {};

    const isAgmark = cliente === 'agmark' ? true : false;

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

    const [step, setStep] = useState({ step: 1, type: numLavado });
    const [revision, setRevision] = useState(initialStatate);

    const changueValue = (index, value) => {
        const newState = [...revision]
        newState[index].value = value
        setRevision(newState)
    }

    const validateQuestions = (questions) => {

        let result

        const responsesIncorrect = questions.filter((item) => {

            if (Array.isArray(item.correct)) {
                // Si item.correct es un array, comprobar si el valor no está presente en el array
                return !item.correct.includes(item.value) && item.value != 'n/a'
            } else {
                // Si item.correct no es un array, comprobar si el valor no coincide directamente
                return item.value !== item.correct && item.value != 'n/a'
            }
        });

        if (responsesIncorrect.length >= 1) {
            result = false
        } else {
            result = true
        }

        return result
    }

    const submitRevision = async () => {
        try {

            let evaluacion

            const valuesNull = revision.filter((obj) => obj.value === '');

            if (valuesNull.length) {
                throw new Error('Responde todas las preguntas para continuar')
            }

            evaluacion = validateQuestions(revision)

            if (evaluacion) {
                setStep({ ...step, step: 3 })
            } else {
                setStep({ ...step, step: 2 })
            }


        } catch (error) {
            toast.error(error?.message)
        }
    }

    return (
        <>

            <Toaster richColors position="top-center" />

            <Modal open={true} onClose={() => navigate('/lavado/pendientes')}>

                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '3%', }}>

                    <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '20px', width: '100%', maxWidth: '700px', }}>

                        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>

                            <Typography variant="button">
                                Proceso de lavado {step === 3 ? ' - Condiciones de lavado ' + numLavado : ''}
                            </Typography>

                            <IconButton
                                onClick={() => navigate('/lavado/pendientes')}
                            >
                                <ClearIcon color='error' />
                            </IconButton>
                        </Stack>

                        {(step.step === 1) &&
                            <RevisionLavado
                                revision={revision}
                                changueValue={changueValue}
                                submitRevision={submitRevision}
                            />}

                        {(step.step === 2) &&
                            <RevisionReprobada step={step} setStep={setStep} />}

                        {(step.step >= 3) &&
                            <ConditionsWashing
                                step={step}
                                setStep={setStep}
                                lavado={JsonLavado}
                            />}

                    </Paper>

                </Container>
            </Modal >

        </>
    );
}


function RevisionLavado({ revision, changueValue, submitRevision }) {

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
                    onClick={submitRevision}
                    color="primary"
                    variant="contained"
                >
                    siguiente
                </Button>
            </Stack>

        </>
    );
}

function RevisionReprobada({ step, setStep, }) {

    const { returnToStatus } = useSendToSanitization()

    const [select, setSelect] = useState('')

    const submitForm = async (e) => {
        e.preventDefault();

        await returnToStatus(idLavado, idRegistro, select)
        toggleModal()
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
                            <MenuItem value='lavado'>Lavado</MenuItem>
                            <MenuItem value='interna'>Reparación interna</MenuItem>
                            <MenuItem value='externa'>Reparación externa</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="contained" color='primary' type='submit' fullWidth >Enviar</Button>

                    <Stack justifyContent='flex-start' flexDirection='row' alignItems='center' paddingTop='10px' gap='10px'>

                        <Button
                            onClick={() => setStep({ ...step, step: step.step - 1 })}
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

function ConditionsWashing({ step, setStep, lavado, }) {

    useEffect(() => {

        const currentDate = new dayjs(new Date()).utc();

        async function InitDate() {
            try {
                const { error } = await updateWashing({ dateInit: currentDate });
                if(error){
                    throw new Error(error)
                }
            } catch (error) {
                console.error(error)
            }
        }

        InitDate();

    }, [lavado])

    const isMovile = useMediaQuery('(max-width:600px');
    const movile = useMediaQuery('(max-width:800px)');

    const navigate = useNavigate();

    const { id: lavadoId, id_detalle_entrada, tipos_lavado } = lavado || {};

    const [conditions, setConditions] = useState(
        {
            tiempo_enjuague_1: '2',
            temperatura_enjuague_1: 'ambiente',
            tiempo_desengrasante: '10',
            temperatura_desengrasante: '60',
            tiempo_limpiador: '10',
            temperatura_limpiador: '71',
            concentracion_limpiador: '',
            tiempo_enjuage_2: '5',
            temperatura_enjuague_2: '98',
            tiempo_enjuague_3: '15',
            temperatura_enjuague_3: 'ambiente',
            tiempo_sanitizado: '5',
            temperatura_sanitizado: 'ambiente',
        });

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


        setConditions({ ...conditions })
        callback();

    }

    async function formSubmit(e) {
        try {

            e.preventDefault()

            const currentDate = new dayjs(new Date()).utc();

            //subir condiciones de lavado
            const dataInString = JSON.stringify(conditions);
            const { numero_bahia } = conditions || {};
            const { error: errorLavado } = await updateWashing({ bahia: numero_bahia, condiciones_lavado: conditions, status: 'revision', dateEnd: currentDate }, lavadoId);

            if (errorLavado) {
                throw new Error(errorLavado)
            }

            //actualizar estado del tanque 
            const { error: errorUpdateItem } = await updateItemManiobra(id_detalle_entrada, { status: 'lavado' })

            if (errorUpdateItem) {
                throw new Error(errorUpdateItem)
            }

            navigate('/lavado/realizados')

        } catch (error) {
            toast.error(error?.message)
        }
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
                                        label='Número de bahía'
                                        value={conditions.numero_bahia}
                                        onChange={(e) => setConditions({ ...conditions, numero_bahia: e.target.value })}
                                    />

                                    <Stack flexDirection={isMovile ? 'column' : 'row'} alignItems='center' gap='10px'>
                                        <TextField
                                            required
                                            fullWidth
                                            label='temperatura'
                                            value={conditions.temperatura_enjuague_1}
                                            onChange={(e) => setConditions({ ...conditions, temperatura_enjuague_1: e.target.value })}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            required
                                            fullWidth
                                            id='presion_enjuague_1'
                                            name='presion_enjuague_1'
                                            value={conditions.presion_enjuague_1}
                                            onChange={(e) => setConditions({ ...conditions, presion_enjuague_1: e.target.value })}
                                            label='presion'
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            required
                                            fullWidth
                                            value={conditions.tiempo_enjuague_1}
                                            onChange={(e) => setConditions({ ...conditions, tiempo_enjuague_1: e.target.value })}
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
                                            id='temperatura_desengrasante'
                                            value={conditions.temperatura_desengrasante}
                                            onChange={(e) => setConditions({ ...conditions, temperatura_desengrasante: e.target.value })}
                                            label='temperatura'
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            required
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            id='presion_desengrasante'
                                            name='presion_desengrasante'
                                            label='presion'
                                            value={conditions.presion_desengrasante}
                                            onChange={(e) => setConditions({ ...conditions, presion_desengrasante: e.target.value })}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            required
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            id='tiempo_desengrasante'
                                            value={conditions.tiempo_desengrasante}
                                            onChange={(e) => setConditions({ ...conditions, tiempo_desengrasante: e.target.value })}
                                            label='tiempo'
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            required
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            id='concentracion_desengrasante'
                                            value={conditions.concentracion_desengrasante}
                                            onChange={(e) => setConditions({ ...conditions, concentracion_desengrasante: e.target.value })}
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
                                            id='temperatura_limpiador'
                                            value={conditions.temperatura_limpiador}
                                            onChange={(e) => setConditions({ ...conditions, temperatura_limpiador: e.target.value })}
                                            label='temperatura'
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            required
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            id='presion_limpiador'
                                            name='presion_limpiador'
                                            label='presion'
                                            value={conditions.presion_limpiador}
                                            onChange={(e) => setConditions({ ...conditions, presion_limpiador: e.target.value })}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            required
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            id='tiempo_limpiador'
                                            value={conditions.tiempo_limpiador}
                                            onChange={(e) => setConditions({ ...conditions, tiempo_limpiador: e.target.value })}
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
                                            value={conditions.concentracion_limpiador}
                                            onChange={(e) => setConditions({ ...conditions, concentracion_limpiador: e.target.value })}
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
                                            value={conditions.presion_enjuague_2}
                                            onChange={(e) => setConditions({ ...conditions, presion_enjuague_2: e.target.value })}
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
                                            value={conditions.presion_enjuague_3}
                                            onChange={(e) => setConditions({ ...conditions, presion_enjuague_3: e.target.value })}
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
                                            id='temperatura_sanitizado'
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            value={conditions.temperatura_sanitizado}
                                            onChange={(e) => setConditions({ ...conditions, temperatura_sanitizado: e.target.value })}
                                            label='Temperatura'
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            required
                                            label='Presión'
                                            id='presion_sanitizado'
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            name='presion_sanitizado'
                                            value={conditions.presion_sanitizado}
                                            onChange={(e) => setConditions({ ...conditions, presion_sanitizado: e.target.value })}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            required
                                            id='tiempo_sanitizado'
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            value={conditions.tiempo_sanitizado}
                                            onChange={(e) => setConditions({ ...conditions, tiempo_sanitizado: e.target.value })}
                                            label='Tiempo'
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            required
                                            sx={{ width: isMovile ? '100%' : '33%' }}
                                            id='concentracion_sanitizado'
                                            name='concentracion_sanitizado'
                                            value={conditions.concentracion_sanitizado}
                                            onChange={(e) => setConditions({ ...conditions, concentracion_sanitizado: e.target.value })}
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>PPM</InputAdornment>,
                                            }}
                                        />

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

                                {(step.step === 4 && stepsInclude(step.type, '1')) &&
                                    <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                        <Typography>Enjuague 1</Typography>
                                        <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                            <TextField
                                                disabled
                                                label='Temperatura'
                                                value={conditions.temperatura_enjuague_1}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label='Presión'
                                                value={conditions.presion_enjuague_1}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label='Tiempo'
                                                value={conditions.tiempo_enjuague_1}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                                }}
                                            />

                                        </Stack>
                                    </Box>
                                }

                                {(step.step === 4 && stepsInclude(step.type, '2')) &&
                                    <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                        <Typography>Solución desengrasante</Typography>
                                        <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                            <TextField
                                                disabled
                                                label='Temperatura'
                                                value={conditions.temperatura_desengrasante}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label='Presión'
                                                value={conditions.presion_desengrasante}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label='Tiempo'
                                                value={conditions.tiempo_desengrasante}
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
                                    </Box>}

                                {(step.step === 4 && stepsInclude(step.type, '3')) &&
                                    <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                        <Typography>Solución limpiadora</Typography>
                                        <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                            <TextField
                                                disabled
                                                label='Temperatura'
                                                value={conditions.temperatura_limpiador}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label='Presión'
                                                value={conditions.presion_limpiador}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label='Tiempo'
                                                value={conditions.tiempo_limpiador}
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
                                    </Box>}

                                {(step.step === 4 && stepsInclude(step.type, '4')) &&
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
                                                value={conditions.tiempo_enjuage_2}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                                }}
                                            />
                                        </Stack>
                                    </Box>}

                                {(step.step === 4 && stepsInclude(step.type, '5')) &&
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
                                    </Box>}

                                {(step.step === 4 && stepsInclude(step.type, '6')) &&
                                    <Box display='flex' flexDirection='column' gap='10px' bgcolor='white' padding='10px' >
                                        <Typography>Sanitizado</Typography>
                                        <Stack gap='10px' flexDirection={movile ? 'column' : 'row'} width='100%'>
                                            <TextField
                                                disabled
                                                label='Temperatura'
                                                value={conditions.temperatura_sanitizado}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>C°</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label='Presión'
                                                value={conditions.presion_sanitizado}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>PSI</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                disabled
                                                label='Tiempo'
                                                value={conditions.tiempo_sanitizado}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>min</InputAdornment>,
                                                }}
                                            />

                                            <TextField
                                                disabled
                                                label='Concentración'
                                                value={conditions.concentracion_sanitizado}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>PPM</InputAdornment>,
                                                }}
                                            />
                                        </Stack>
                                    </Box>}

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

