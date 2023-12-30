import { useState } from "react";
import { Container, Box, Paper, Stack, Button, Modal, Typography, Checkbox, IconButton, FormControlLabel } from "@mui/material";
import { ContainerScroll } from "../../components/ContainerScroll";
//icons
import ClearIcon from '@mui/icons-material/Clear';
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";



function CheckListCalidadPrelavado({ modal, toggleModal, }) {

    /*/
    # STEPS 

    - Checklist
    - Si pasa el checklist => selecciona el tipo de lavado : retorna a prelvado para una iteracion
    - confirmacion
    /*/

    const questionsChecklist = [
        {
            question: 'Legibilidad de datos seriales',
            value: '',
        },
        {
            question: 'Libre de Residuos en escotilla y válvulas',
            value: '',
        },
        {
            question: 'Libre de Residuos de detergente en las paredes del tanque',
            value: '',
        },
        {
            question: 'Libre de residuos, suciedad o manchas en escotilla',
            value: '',
        },
        {
            question: 'Libre de Corrosión dentro del tanque',
            value: '',
        },
        {
            question: 'Buenas Condiciones generales de válvulas',
            value: '',
        },
        {
            question: 'Juntas y empaques en buenas condiciones y libres de fugas',
            value: '',
        },
        {
            question: 'Portasellos en buenas condiciones',
            value: '',
        },
        {
            question: 'Cambio de componente',
            value: '',
        },
        {
            question: 'Tipo de componente',
            value: '',
        },

    ]

    const [questions, setQuestions] = useState(questionsChecklist);
    const [step, setStep] = useState(1);

    const changueValue = (index, value) => {
        const copy = [...questions]
        copy[index].value = value;
        setQuestions(copy);
    }

    return (
        <>

            <Modal open={modal}>

                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10%' }}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '700px' }}>
                        <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '20px', }}>
                            <Stack
                                width={'100%'}
                                alignItems={'center'}
                                flexDirection={'row'}
                                justifyContent={'space-between'}
                            >
                                <Typography variant="button">
                                    Inspección de prelavado
                                </Typography>

                                <IconButton
                                    color='error'
                                    variant='outlined'
                                    onClick={toggleModal}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </Stack>

                            {(step === 1) &&
                                <ContainerScroll height={'400px'}>
                                    <Stack gap={'8px'}>
                                        {questions.map((question, index) => (
                                            <ItemQuestion
                                                key={question.question}
                                                index={index}
                                                question={question}
                                                toggleCheck={changueValue}
                                            />
                                        ))}
                                    </Stack>
                                </ContainerScroll>
                            }

                            <Stack
                                padding={'10px'}
                                flexWrap={'wrap'}
                                flexDirection={'row'}
                                justifyContent={'space-between'}
                            >

                                {step >= 1 &&
                                    <Button
                                        variant="contained"
                                        color='primary'
                                        onClick={() => setStep(step - 1)}
                                    >
                                        anterior
                                    </Button>}

                                <Button
                                    variant="contained"
                                    color='primary'
                                    onClick={() => setStep(step + 1)}
                                >
                                    siguiente
                                </Button>

                            </Stack>

                        </Paper>
                    </Box>

                </Container>

            </Modal>

        </>
    );
}

export { CheckListCalidadPrelavado };

function ItemQuestion({ question, index, toggleCheck }) {

    const IsSmall = useMediaQuery('(max-width:700px)');

    return (
        <Paper sx={{ padding: '10px' }}>
            <Box>
                <Stack
                    width={'100%'}
                    flexWrap={'wrap'}
                    alignItems={'center'}
                    flexDirection={IsSmall ? 'column' : 'row'}
                    justifyContent={'space-between'}
                >
                    <Typography
                        variant='subtitle2'
                        textAlign={IsSmall ? 'center' : 'start'}
                        width={IsSmall ? '80%' : '70%'}
                    >
                        {question.question}
                    </Typography>

                    <Stack
                        width={IsSmall ? '100%' : 'auto'}
                        justifyContent={IsSmall ? 'space-around' : 'center'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        gap={'10px'}
                    >

                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={() => toggleCheck(index, 'si')}
                                    checked={question.value === 'si' ? true : false}
                                />}
                            label="Si"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={() => toggleCheck(index, 'no')}
                                    checked={question.value === 'no' ? true : false}
                                />}
                            label="No"
                        />

                    </Stack>
                </Stack>
            </Box>
        </Paper>
    )
}