import { useState, useContext } from "react";
import { Box, Stack, Button, Paper, Checkbox, FormControl, FormGroup, FormControlLabel, Typography, TextField, IconButton, Modal } from "@mui/material";
import { ContainerScroll } from "../../components/ContainerScroll";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes } from "../../Reducers/GlobalReducer";

function CheckListAgmark() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const [step, setStep] = useState(1);

    const [checklist, setChecklist] = useState({ cambios: [], tapas: [], empaques: [], componente: [] });

    const updateQuestions = (questions, key) => {
        const newState = { ...checklist, [key]: questions }
        setChecklist(newState)
        setStep(step + 1)
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
        const valuesNull = questions.filter((obj) => obj.value === '')
        if (valuesNull.length >= 1) {
            dispatchGlobal({
                type: actionTypes.setNotification,
                payload: 'Termina el checklist para continuar'
            })
        } else {
            callback()
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                {(step === 1) &&
                    <StepOne
                        validateQuestions={validateQuestions}
                        updateQuestions={updateQuestions}
                        changueComent={changueComent}
                        changueValue={changueValue}
                        changueImage={changueImage}
                    />}

                {(step === 2) &&
                    <StepTwo
                        validateQuestions={validateQuestions}
                        updateQuestions={updateQuestions}
                        changueComent={changueComent}
                        changueValue={changueValue}
                        changueImage={changueImage}
                    />}


            </Box>
        </>
    );
}

export { CheckListAgmark };

function StepOne({ updateQuestions, changueValue, changueImage, changueComent, validateQuestions }) {

    const [questions, setQuestions] = useState([
        {
            question: 'O-ring de empaque galleta',
            value: '',
            coment: '',
            preview: '',
            image: '',
        },
        {
            question: '¿El cable remoto de emergencia ubicado en un lado del tanque funciona correctamente cerrando la válvula cuando se jala?',
            value: '',
            coment: '',
            preview: '',
            image: '',
        },

    ]);

    const Submit = (e) => {
        e.preventDefault();
        validateQuestions(questions, () => updateQuestions(questions, 'cambios'))
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
                                otro={'na'}
                                correct={'si'}
                                incorrect={'no'}
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

function StepTwo({ updateQuestions, changueValue, changueImage, changueComent, validateQuestions }) {

    const [questions, setQuestions] = useState([
        {
            question: 'Argollas de sellos',
            value: '',
            coment: '',
            preview: '',
            image: '',
        },
        {
            question: 'Bisagras de tapas',
            value: '',
            coment: '',
            preview: '',
            image: '',
        },
        {
            question: 'Charola (Cubeta)',
            value: '',
            coment: '',
            preview: '',
            image: '',
        },
        {
            question: 'Tuerca ala (Mariposa)',
            value: '',
            coment: '',
            preview: '',
            image: '',
        },

    ]);

    const Submit = (e) => {
        e.preventDefault();
        validateQuestions(questions, () => updateQuestions(questions, 'tapas'))
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
                                correct={'buen estado'}
                                incorrect={'mal estado'}
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

function ItemCheckList({ item, index, state, set, changueValue, changueImage, changueComent, correct, incorrect, otro }) {

    const [image, setImage] = useState(false);

    return (
        <Paper
            elevation={3}
            sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', gap: '10px', padding: '10px' }} >
            <Typography variant='body1' >
                {item.question}
            </Typography>

            <FormGroup required>
                <FormControlLabel
                    onChange={() => changueValue(index, correct, state, set)}
                    control={<Checkbox checked={item.value === correct ? true : false} />}
                    label={correct}
                />
                <FormControlLabel
                    onChange={() => changueValue(index, incorrect, state, set)}
                    control={<Checkbox checked={item.value === incorrect ? true : false} />}
                    label={incorrect}
                />
                <FormControlLabel
                    onChange={() => changueValue(index, otro, state, set)}
                    control={<Checkbox checked={item.value === otro ? true : false} />}
                    label={otro}
                />
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
                    <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px' }}>
                        <img src={item.preview} />
                    </Paper>
                </Box>
            </Modal>

        </Paper>
    );
}
