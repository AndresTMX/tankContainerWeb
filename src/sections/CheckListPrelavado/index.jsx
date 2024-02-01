import { useState, useContext } from "react";
import {
    Box,
    Stack,
    Button,
    Paper,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Typography,
    TextField,
    IconButton,
    Modal,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { ContainerScroll } from "../../components/ContainerScroll";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StepBarProgress } from "../StepBarProgress";
//context
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { actionTypes } from "../../Reducers/PrelavadoReducer";
import { PrelavadoContext } from "../../Context/PrelavadoContext";
//hooks
import { useChecklistPrelavado } from "../../Hooks/Prelavado/useChecklistPrelavado";

function CheckListPrelavado({ updater }) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const [state, dispatch] = useContext(PrelavadoContext);

    const { id_detalle_entrada, registros_detalles_entradas, id: idLavado } = state.selectCheck || {};

    const { numero_pipa, numero_tanque, clientes } = registros_detalles_entradas || {};

    const { cliente } = clientes || {};

    const { completeChecklist } = useChecklistPrelavado();

    const [step, setStep] = useState(1);

    const [checklist, setChecklist] = useState({});

    // initialState de agmark cambios: [], tapas: [], empaques: [], componentes: [], cubierta: []

    const SendForm = async (questionsString, newStatus) => {

        const dataChecklist = {
            registro_detalle_entrada_id: id_detalle_entrada,
            numero_tanque: numero_tanque,
            numero_pipa: numero_pipa,
            data: questionsString,
        }

        await completeChecklist(id_detalle_entrada, idLavado, dataChecklist, newStatus);
        setStep(1);
        dispatch({ type: actionTypes.setSelectCheck, payload: false });
        updater();
    }

    const updateQuestions = (questions, key) => {
        const newState = { ...checklist, [key]: questions }
        setChecklist(newState)
        setStep(step + 1)
    }

    const previusStep = () => {
        setStep(step - 1)
    }

    const changueValue = (index, value, state, set) => {
        const newState = state.length >= 1 ? [...state] : [];
        newState[index].value = value
        set(newState)
    }

    const changueComent = (index, event, state, set) => {
        const newState = state.length >= 1 ? [...state] : [];
        newState[index].coment = event.target.value
        set(newState)
    }

    const changueImage = (index, event, state, set) => {
        const newState = state.length >= 1 ? [...state] : [];
        const file = event.target.files[0];
        const urlImage = URL.createObjectURL(file);
        if (file) {
            newState[index].image = file;
            newState[index].preview = urlImage;
        }
        set(newState)
    }

    const validateQuestions = (questions, callback) => {
        let valuesNull = questions.filter((obj) => obj.value === '');
        // let responsesIncorrect = questions.filter((item) => item.value != item.correct && item.value != 'n/a' && item.preview === '')

        let responsesIncorrect = questions.filter((item) => {
            if (Array.isArray(item.correct)) {
                // Si item.correct es un array, comprobar si el valor no está presente en el array
                return !item.correct.includes(item.value) && item.value != 'n/a' && item.preview === ''
            } else {
                // Si item.correct no es un array, comprobar si el valor no coincide directamente
                return item.value !== item.correct && item.value != 'n/a' && item.preview === ''
            }
        });


        if (valuesNull.length >= 1 || responsesIncorrect.length >= 1) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: `Termina el checklist y anexe las evidencias necesarias para continuar`
            })
        } else {
            callback()
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
            <StepBarProgress step={step} numSteps={7} />

                {(step === 1) &&
                    <StepOne
                        cliente={cliente}
                        validateQuestions={validateQuestions}
                        updateQuestions={updateQuestions}
                        changueComent={changueComent}
                        changueValue={changueValue}
                        changueImage={changueImage}
                    />}

                {(step === 2) &&
                    <StepTwo
                        cliente={cliente}
                        validateQuestions={validateQuestions}
                        updateQuestions={updateQuestions}
                        changueComent={changueComent}
                        changueValue={changueValue}
                        changueImage={changueImage}
                        previusStep={previusStep}
                    />}

                {(step === 3) &&
                    <StepThree
                        cliente={cliente}
                        validateQuestions={validateQuestions}
                        updateQuestions={updateQuestions}
                        changueComent={changueComent}
                        changueValue={changueValue}
                        changueImage={changueImage}
                        previusStep={previusStep}
                    />}

                {(step === 4) &&
                    <StepFour
                        cliente={cliente}
                        validateQuestions={validateQuestions}
                        updateQuestions={updateQuestions}
                        changueComent={changueComent}
                        changueValue={changueValue}
                        changueImage={changueImage}
                        previusStep={previusStep}
                    />}

                {(step === 5) &&
                    <StepFive
                        cliente={cliente}
                        validateQuestions={validateQuestions}
                        updateQuestions={updateQuestions}
                        changueComent={changueComent}
                        changueValue={changueValue}
                        changueImage={changueImage}
                        previusStep={previusStep}
                    />}

                {(step === 6) &&
                    <Recap checklist={checklist} previusStep={previusStep} SendForm={SendForm} />
                }


            </Box>
        </>
    );
}

export { CheckListPrelavado };

function StepOne({ updateQuestions, changueValue, changueImage, changueComent, validateQuestions, cliente }) {

    const agmark = [
        {
            question: "O-ring de empaque galleta",
            value: "",
            coment: "",
            preview: "",
            image: "",
            correct: "si",
            incorrect: "no",
            for: 'agmark',
            section: 'empaques',
            etapa: 'prelavado'
        },
        {
            question: "¿El cable remoto de emergencia ubicado en un lado del tanque funciona correctamente cerrando la válvula cuando se jala?",
            value: "",
            coment: "",
            preview: "",
            image: "",
            correct: "si",
            incorrect: "no",
            for: 'agmark',
            section: 'empaques',
            etapa: 'prelavado'
        },
        {
            question: '¿Todas las partes estén trabajando correctamente?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'si',
            incorrect: 'no',
            etapa: 'prelavado',
            for: 'calidad'
        },
        {
            question: '¿Esta libre de daños mayores (Abolladuras, rayas profundas, etc.)?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'si',
            incorrect: 'no',
            etapa: 'prelavado',
            for: 'calidad'

        },
        {
            question: '¿Todos los empaques estan en buen estado?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'si',
            incorrect: 'no',
            etapa: 'prelavado',
            for: 'calidad'

        },
        {
            question: '¿Es una válvula sanitaria 3A?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'si',
            incorrect: '',
            etapa: 'prelavado',
            for: 'calidad'

        },
        {
            question: '¿La válvula de descarga tiene cierre 3?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'si',
            incorrect: '',
            etapa: 'prelavado',
            for: 'calidad'
        },
    ];

    const normal = [
        {
            question: '¿Todas las partes estén trabajando correctamente?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'si',
            incorrect: 'no',
            etapa: 'prelavado',
            for: 'calidad'
        },
        {
            question: '¿Esta libre de daños mayores (Abolladuras, rayas profundas, etc.)?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'si',
            incorrect: 'no',
            etapa: 'prelavado',
            for: 'calidad'

        },
        {
            question: '¿Todos los empaques estan en buen estado?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'si',
            incorrect: 'no',
            etapa: 'prelavado',
            for: 'calidad'

        },
        {
            question: '¿Tipo de valvula de descarga?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: ['tipo 3 sanitaria', 'tipo 3a sanitaria'],
            incorrect: '',
            etapa: 'prelavado',
            for: 'calidad'

        },
    ]

    const initialStatate = cliente === 'agmark' ? agmark : normal;

    const [questions, setQuestions] = useState(initialStatate);

    const Submit = (e) => {
        e.preventDefault();
        validateQuestions(questions, () => updateQuestions(questions, 'step_one'))
    }

    return (
        <form onSubmit={(e) => Submit(e)}>
            <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '100%', }}>

                <Typography variant='subtitle' fontWeight='500'>Verifica la presencia y condiciones de lo siguiente</Typography>

                <ContainerScroll height={'auto'} maxHeight={'55vh'}>
                    <Stack gap='10px'>
                        {questions.map((item, index) => (
                            <ItemCheckList
                                key={index}
                                state={questions}
                                item={item}
                                index={index}
                                otro={'n/a'}
                                correct={item.correct}
                                incorrect={item.incorrect}
                                set={setQuestions}
                                changueValue={changueValue}
                                changueImage={changueImage}
                                changueComent={changueComent}
                            />
                        ))}
                    </Stack>
                </ContainerScroll>

                <Button
                    type="submit"
                    variant="contained"
                    size="small" >
                    Siguiente
                </Button>
            </Paper>
        </form>
    )
}

function StepTwo({ updateQuestions, changueValue, changueImage, changueComent, validateQuestions, previusStep, cliente }) {

    const normal = [
        {
            question: '¿Cambios en el enpaque del O-ring de piston?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            part: ' O-ring de piston',
            correct: 'no',
            incorrect: 'si',
            for: 'calidad',
            etapa: 'prelavado'
        },
        {
            question: '¿Cambios en el empaque del asiento del piston?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            part: 'asiento del piston',
            correct: 'no',
            incorrect: 'si',
            for: 'calidad',
            etapa: 'prelavado'

        },
        {
            question: '¿Cambios en el empaque de la valvula de alivio?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            part: 'valvula de alivio',
            correct: 'no',
            incorrect: 'si',
            for: 'calidad',
            etapa: 'prelavado'

        },
        {
            question: '¿Cambios en el empaque de brida ciega?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            part: 'brida ciega',
            correct: 'no',
            incorrect: 'si',
            for: 'calidad',
            etapa: 'prelavado'
        },

    ]

    const agmark = [
        {
            question: 'Argollas de sellos',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'buen estado',
            incorrect: 'mal estado',
            for: 'agmark',
            section: 'valvulaDescarga',
            etapa: 'prelavado'
        },
        {
            question: 'Bisagras de tapas',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'buen estado',
            incorrect: 'mal estado',
            for: 'agmark',
            section: 'valvulaDescarga',
            etapa: 'prelavado'
        },
        {
            question: 'Charola (Cubeta)',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'buen estado',
            incorrect: 'mal estado',
            for: 'agmark',
            section: 'valvulaDescarga',
            etapa: 'prelavado'
        },
        {
            question: 'Tuerca ala (Mariposa)',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'buen estado',
            incorrect: 'mal estado',
            for: 'agmark',
            section: 'valvulaDescarga',
            etapa: 'prelavado'
        },
        {
            question: '¿Cambios en el enpaque del O-ring de piston?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'no',
            incorrect: 'si',
            part: ' O-ring de piston',
            etapa: 'prelavado'
        },
        {
            question: '¿Cambios en el empaque del asiento del piston?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'no',
            incorrect: 'si',
            part: 'asiento del piston',
            etapa: 'prelavado'

        },
        {
            question: '¿Cambios en el empaque de la valvula de alivio?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'no',
            incorrect: 'si',
            part: 'valvula de alivio',
            etapa: 'prelavado'

        },
        {
            question: '¿Cambios en el empaque de brida ciega?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'no',
            incorrect: 'si',
            part: 'brida ciega',
            etapa: 'prelavado'

        },

    ]

    const initialStatate = cliente === 'agmark' ? agmark : normal;

    const [questions, setQuestions] = useState(initialStatate);

    const Submit = (e) => {
        e.preventDefault();
        validateQuestions(questions, () => updateQuestions(questions, 'step_two'))
    }

    return (
        <form onSubmit={(e) => Submit(e)}>
            <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '100%', }}>

                <Typography variant='subtitle' fontWeight='500'>Verifica la presencia y condiciones de lo siguiente</Typography>

                <ContainerScroll height={'auto'} maxHeight={'55vh'}>
                    <Stack gap='10px'>
                        {questions.map((item, index) => (
                            <ItemCheckList
                                key={index}
                                state={questions}
                                item={item}
                                index={index}
                                otro={'faltante'}
                                correct={item.correct}
                                incorrect={item.incorrect}
                                set={setQuestions}
                                changueValue={changueValue}
                                changueImage={changueImage}
                                changueComent={changueComent}
                            />
                        ))}
                    </Stack>
                </ContainerScroll>

                <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
                    <Button
                        color='warning'
                        onClick={() => previusStep()}
                    >
                        anterior
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        size="small" >
                        Siguiente
                    </Button>
                </Stack>
            </Paper>
        </form>
    )
}

function StepThree({ updateQuestions, changueValue, changueImage, changueComent, validateQuestions, previusStep, cliente }) {

    const agmark = [
        {
            question: 'Empaque de válvula de alivio',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'si',
            incorrect: 'no',
            for: 'agmark',
            section: 'valvuaSuperior',
            etapa: 'prelavado'
        },
        {
            question: 'Empaque de brida ciega',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'si',
            incorrect: 'no',
            for: 'agmark',
            section: 'valvuaSuperior',
            etapa: 'prelavado'
        },
        {
            question: 'Clamp buna 2"',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'si',
            incorrect: 'no',
            for: 'agmark',
            section: 'valvuaSuperior',
            etapa: 'prelavado'
        },
        {
            question: 'Kit empaques de válvula de globo 2"',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'si',
            incorrect: 'no',
            for: 'agmark',
            section: 'valvuaSuperior',
            etapa: 'prelavado'
        },
        {
            question: 'Kit empaques de válvula de globo 2 1/2"',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'si',
            incorrect: 'no',
            for: 'agmark',
            section: 'valvuaSuperior',
            etapa: 'prelavado'
        },
        {
            question: 'Empaque de tapón de válvula de globo 2"',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'si',
            incorrect: 'no',
            for: 'agmark',
            section: 'valvuaSuperior',
            etapa: 'prelavado'
        },
        {
            question: 'Empaque de tapón de válvula de globo 2 1/2"',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'si',
            incorrect: 'no',
            for: 'agmark',
            section: 'valvuaSuperior',
            etapa: 'prelavado'
        },
        {
            question: "¿Que estilo de cubierta tiene la valvula de descarga?",
            value: "",
            preview: "",
            image: "",
            coment: "",
            correct: ['cabinet', 'bucket'],
            incorrect: "",
            etapa: 'prelavado'
        },
        {
            question: "Argollas de sellos",
            value: "",
            preview: "",
            image: "",
            coment: "",
            correct: "si",
            incorrect: "no",
            etapa: 'prelavado'
        },
        {
            question: "Bisagras de puertas",
            value: "",
            preview: "",
            image: "",
            coment: "",
            correct: "si",
            incorrect: "no",
            etapa: 'prelavado'
        },
        {
            question: "Charola cubeta",
            value: "",
            preview: "",
            image: "",
            coment: "",
            correct: "si",
            incorrect: "no",
            etapa: 'prelavado'
        },
        {
            question: "Tuerca mariposa",
            value: "",
            preview: "",
            image: "",
            coment: "",
            correct: "si",
            incorrect: "no",
            etapa: 'prelavado'
        },

    ]

    const normal = [
        {
            question: "¿Que estilo de cubierta tiene la valvula de descarga?",
            value: "",
            preview: "",
            image: "",
            coment: "",
            correct: ['cabinet', 'bucket'],
            incorrect: "",
            for: "calidad",
            etapa: "prelavado"
        },
        {
            question: "Argollas de sellos",
            value: "",
            preview: "",
            image: "",
            coment: "",
            correct: "si",
            incorrect: "no",
            for: "calidad",
            etapa: "prelavado"
        },
        {
            question: "Bisagras de puertas",
            value: "",
            preview: "",
            image: "",
            coment: "",
            correct: "si",
            incorrect: "no",
            for: "calidad",
            etapa: "prelavado"
        },
        {
            question: "Charola cubeta",
            value: "",
            preview: "",
            image: "",
            coment: "",
            correct: "si",
            incorrect: "no",
            for: "calidad",
            etapa: "prelavado"
        },
        {
            question: "Tuerca mariposa",
            value: "",
            preview: "",
            image: "",
            coment: "",
            correct: "si",
            incorrect: "no",
            for: "calidad",
            etapa: "prelavado"
        },
    ];

    const initialStatate = cliente === 'agmark' ? agmark : normal;

    const [questions, setQuestions] = useState(initialStatate);

    const Submit = (e) => {
        e.preventDefault();
        validateQuestions(questions, () => updateQuestions(questions, 'step_three'))
    }

    return (
        <form onSubmit={(e) => Submit(e)}>
            <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '100%', }}>

                <Typography variant='subtitle' fontWeight='500'>Verifica la presencia y condiciones de lo siguiente</Typography>

                <ContainerScroll height={'auto'} maxHeight={'55vh'}>
                    <Stack gap='10px'>
                        {questions.map((item, index) => (
                            <ItemCheckList
                                key={index}
                                state={questions}
                                item={item}
                                index={index}
                                otro={'n/a'}
                                correct={item.correct}
                                incorrect={item.incorrect}
                                set={setQuestions}
                                changueValue={changueValue}
                                changueImage={changueImage}
                                changueComent={changueComent}
                            />
                        ))}
                    </Stack>
                </ContainerScroll>

                <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
                    <Button
                        color='warning'
                        onClick={() => previusStep()}
                    >
                        anterior
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        size="small" >
                        Siguiente
                    </Button>
                </Stack>
            </Paper>
        </form>
    )
}

function StepFour({ updateQuestions, changueValue, changueImage, changueComent, validateQuestions, previusStep, cliente }) {

    const agmark = [
        {
            question: 'Empaque de tapa superior (Domo)',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'si',
            incorrect: 'no',
            for: 'agmark',
            section: 'tapaderaDomo',
            etapa: 'prelavado'
        },
        {
            question: 'Tuerca mariposa de tapa',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'si',
            incorrect: 'no',
            for: 'agmark',
            section: 'tapaderaDomo',
            etapa: 'prelavado'
        },
        {
            question: 'Argollas de sellos',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'si',
            incorrect: 'no',
            for: 'agmark',
            section: 'tapaderaDomo',
            etapa: 'prelavado'
        },
        {
            question: '¿Se cambio la tapa superior?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'no',
            incorrect: 'si',
            etapa: 'prelavado',
            for: 'agmark'
        },
        {
            question: '¿Se cambiaron las mariposas de la tapa?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'no',
            incorrect: 'si',
            etapa: 'prelavado',
            for: 'agmark'

        },
        {
            question: '¿Se cambiaron las argollas de sellos?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'no',
            incorrect: 'si',
            etapa: 'prelavado',
            for: 'agmark'

        }

    ]

    const normal = [
        {
            question: '¿Se cambio la tapa superior?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'no',
            incorrect: 'si',
            for: 'calidad',
            etapa: 'prelavado'
        },
        {
            question: '¿Se cambiaron las mariposas de la tapa?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'no',
            incorrect: 'si',
            for: 'calidad',
            etapa: 'prelavado'

        },
        {
            question: '¿Se cambiaron las argollas de sellos?',
            value: '',
            preview: '',
            image: '',
            coment: '',
            correct: 'no',
            incorrect: 'si',
            for: 'calidad',
            etapa: 'prelavado'

        },
    ]

    const initialState = cliente === 'agmark' ? agmark : normal;

    const [questions, setQuestions] = useState(initialState);

    const Submit = (e) => {
        e.preventDefault();
        validateQuestions(questions, () => updateQuestions(questions, 'step_four'))
    }

    return (
        <form onSubmit={(e) => Submit(e)}>
            <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '100%', }}>

                <Typography variant='subtitle' fontWeight='500'>Verifica la presencia y condiciones de lo siguiente</Typography>

                <ContainerScroll height={'auto'} maxHeight={'55vh'}>
                    <Stack gap='10px'>
                        {questions.map((item, index) => (
                            <ItemCheckList
                                key={index}
                                state={questions}
                                item={item}
                                index={index}
                                otro={'faltante'}
                                correct={item.correct}
                                incorrect={item.incorrect}
                                set={setQuestions}
                                changueValue={changueValue}
                                changueImage={changueImage}
                                changueComent={changueComent}
                            />
                        ))}
                    </Stack>
                </ContainerScroll>

                <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
                    <Button
                        color='warning'
                        onClick={() => previusStep()}
                    >
                        anterior
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        size="small" >
                        Siguiente
                    </Button>
                </Stack>
            </Paper>
        </form>
    )
}

function StepFive({ updateQuestions, changueValue, changueImage, changueComent, validateQuestions, previusStep, cliente }) {

    const agmark = [
        {
            question: 'Revise los tornillos y tuercas de la brida ciega (blind flange) y la válvula de alivio de presión para asegurar que esta en buenas condiciones y asegúrese de que este apretado con fuerza de maquina.',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'si',
            incorrect: '',
            for: 'agmark',
            section: 'cubiertaTapadera',
            etapa: 'prelavado'
        },
        {
            question: 'Revise las argollas de sellos y asegúrese que estén presente en buenas condiciones para que el tanque pueda sellarse apropiadamente.',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'si',
            incorrect: '',
            for: 'agmark',
            section: 'cubiertaTapadera',
            etapa: 'prelavado'
        },
        {
            question: 'Revise las bisagras de las puertas y asegúrese que están en buen funcionamiento.',
            value: '',
            coment: '',
            preview: '',
            image: '',
            correct: 'si',
            incorrect: '',
            for: 'agmark',
            section: 'cubiertaTapadera',
            etapa: 'prelavado'
        },


    ]

    const normal = [
        {
            question: '¿Los tornillos y tuercas de la brida ciega  estan en buenas condiciones y apretados con fuerza de maquina?',
            value: null,
            preview: '',
            image: '',
            coment: '',
            correct: 'si',
            incorrect: 'no',
            for: 'calidad',
            etapa: 'prelavado'
        },
        {
            question: '¿Las argollas de sellos estan en buenas condiciones?',
            value: null,
            preview: '',
            image: '',
            coment: '',
            correct: 'si',
            incorrect: 'no',
            for: 'calidad',
            etapa: 'prelavado'

        },
        {
            question: '¿El tanque puede resellarse apropiadamente?',
            value: null,
            preview: '',
            image: '',
            coment: '',
            correct: 'si',
            incorrect: 'no',
            for: 'calidad',
            etapa: 'prelavado'

        },

        {
            question: '¿Las bisagras de las puertas está en optimo funcionamiento?',
            value: null,
            preview: '',
            image: '',
            coment: '',
            correct: 'si',
            incorrect: 'no',
            for: 'calidad',
            etapa: 'prelavado'
        },

        {
            question: '¿Los tornillos y tuercas de la brida ciega  estan en buenas condiciones y apretados con fuerza de maquina?',
            value: null,
            preview: '',
            image: '',
            coment: '',
            correct: 'si',
            incorrect: 'no',
            for: 'calidad',
            etapa: 'prelavado'
        },
        {
            question: '¿Las argollas de sellos estan en buenas condiciones?',
            value: null,
            preview: '',
            image: '',
            coment: '',
            correct: 'si',
            incorrect: 'no',
            for: 'calidad',
            etapa: 'prelavado'

        },
        {
            question: '¿El tanque puede resellarse apropiadamente?',
            value: null,
            preview: '',
            image: '',
            coment: '',
            correct: 'si',
            incorrect: 'no',
            for: 'calidad',
            etapa: 'prelavado'

        },

        {
            question: '¿Las bisagras de las puertas está en optimo funcionamiento?',
            value: null,
            preview: '',
            image: '',
            coment: '',
            correct: 'si',
            incorrect: 'no',
            for: 'calidad',
            etapa: 'prelavado'
        }
    ]

    const initialState = cliente === 'agmark' ? agmark : normal;

    const [questions, setQuestions] = useState(initialState);

    const Submit = (e) => {
        e.preventDefault();
        validateQuestions(questions, () => updateQuestions(questions, 'step_five'))
    }

    return (
        <form onSubmit={(e) => Submit(e)}>
            <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '100%', }}>

                <Typography variant='subtitle' fontWeight='500'>Verifica la presencia y condiciones de lo siguiente</Typography>

                <ContainerScroll height={'auto'} maxHeight={'55vh'}>
                    <Stack gap='10px'>
                        {questions.map((item, index) => (
                            <ItemCheckList
                                key={index}
                                state={questions}
                                item={item}
                                index={index}
                                correct={item.correct}
                                incorrect={item.incorrect}
                                set={setQuestions}
                                changueValue={changueValue}
                                changueImage={changueImage}
                                changueComent={changueComent}
                            />
                        ))}
                    </Stack>
                </ContainerScroll>

                <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
                    <Button
                        color='warning'
                        onClick={() => previusStep()}
                    >
                        anterior
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        size="small" >
                        Siguiente
                    </Button>
                </Stack>
            </Paper>
        </form>
    )
}

function Recap({ checklist, previusStep, SendForm }) {

    const [select, setSelect] = useState('');

    const arrayForms = Object.values(checklist);
    const flatCheck = arrayForms.flat() || [];

    const sendValues = (e) => {
        e.preventDefault();
        SendForm(flatCheck, select)
    }

    const evalColor = (question) => {

        let correctIsArray = Array.isArray(question.correct);

        if (correctIsArray) {
            return question.correct.includes(question.value)
        } else {
            return question.value === question.correct
        }

    }

    return (
        <>
            <form onSubmit={sendValues}>
                <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '100%', }}>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='button' >Recapitulación</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ContainerScroll background='white' maxHeight='400px'>
                                <Stack gap='10px'>
                                    {flatCheck.map((question, index) => (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'whitesmoke', padding: '10px', borderRadius: '4px' }} key={index}>
                                            <Stack flexDirection='column' alignItems='start' gap='5px'>
                                                <Typography variant='body1'>{question.question}</Typography>
                                                <Chip
                                                    sx={{ textTransform: 'uppercase' }}
                                                    size='small'
                                                    color={evalColor(question) ? 'info' : 'warning'}
                                                    label={question.value}
                                                />
                                            </Stack>

                                        </Box>
                                    ))}
                                </Stack>
                            </ContainerScroll>
                        </AccordionDetails>
                    </Accordion>

                    <FormControl>
                        <InputLabel>siguiente etapa</InputLabel>
                        <Select
                            required
                            label='siguiente etapa'
                            defaultValue={''}
                            onChange={(e) => setSelect(e.target.value)}
                        >
                            <MenuItem value='lavado'>Lavado</MenuItem>
                            <MenuItem value='almacenado'>Almacenaje</MenuItem>
                            <MenuItem value='interna'>Reparación interna</MenuItem>
                            <MenuItem value='externa'>Reparación externa</MenuItem>


                        </Select>
                    </FormControl>

                    <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
                        <Button
                            color='warning'
                            onClick={() => previusStep()}
                        >
                            anterior
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            size="small" >
                            enviar
                        </Button>
                    </Stack>
                </Paper>
            </form>
        </>
    )
}

function ItemCheckList({ item, index, state, set, changueValue, changueImage, changueComent, correct, incorrect, otro }) {

    const [image, setImage] = useState(false);

    const correctIsArray = Array.isArray(correct);

    return (
        <Paper
            elevation={3}
            sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', gap: '10px', padding: '10px' }} >
            <Typography variant='body1' >
                {item.question}
            </Typography>

            <FormGroup required>
                {!correctIsArray && <FormControlLabel
                    sx={{ textTransform: 'uppercase' }}
                    onChange={() => changueValue(index, correct, state, set)}
                    control={<Checkbox checked={item.value === correct ? true : false} />}
                    label={correct}
                />}

                {correctIsArray &&
                    correct.map((request, indexRequest) => (
                        <FormControlLabel key={`${request}_${indexRequest}`}
                            sx={{ textTransform: 'uppercase' }}
                            onChange={() => changueValue(index, request, state, set)}
                            control={<Checkbox checked={item.value === request ? true : false} />}
                            label={request}
                        />
                    ))
                }

                {incorrect && <FormControlLabel
                    sx={{ textTransform: 'uppercase' }}
                    onChange={() => changueValue(index, incorrect, state, set)}
                    control={<Checkbox checked={item.value === incorrect ? true : false} />}
                    label={incorrect}
                />}
                {otro && <FormControlLabel
                    sx={{ textTransform: 'uppercase' }}
                    onChange={() => changueValue(index, otro, state, set)}
                    control={<Checkbox checked={item.value === otro ? true : false} />}
                    label={otro}
                />}
            </FormGroup>

            <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <input
                    id={`image-${item.question}`}
                    onChange={(e) => changueImage(index, e, state, set)}
                    style={{ display: 'none' }}
                    accept="image/*"
                    type="file"
                />

                <label htmlFor={`image-${item.question}`}>
                    <Button
                        onChange={(e) => changueImage(index, e, state, set)}
                        endIcon={<AddAPhotoIcon />}
                        size="small"
                        variant="outlined"
                        component='span'>
                        Cargar evidencia
                    </Button>
                </label>

                <IconButton
                    color={item.preview != '' ? 'info' : 'default'}
                    disabled={item.preview != '' ? false : true}
                    onClick={() => setImage(!image)}
                >
                    <OpenInNewIcon />
                </IconButton>
            </FormControl>

            <TextField id={`coment-${item.question}`} value={item.coment} onChange={(e) => changueComent(index, e, state, set)} label='Observaciones' />

            <Modal open={image}>
                <Box
                    onClick={() => setImage(!image)}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5%', width: '100%', minHeight: '100vh' }}>
                    <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px', maxWidth: '90vw' }}>
                        <img width='100%' src={item.preview} />
                    </Paper>
                </Box>
            </Modal>

        </Paper>
    );
}
