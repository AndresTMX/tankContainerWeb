import { useState, } from "react";
import { toast } from "sonner";
import { Box, Paper, Stack, Button, IconButton, Typography, Modal, TextField, FormControlLabel, Checkbox, FormGroup, FormControl } from "@mui/material";
import { ContainerScroll } from "../../components/ContainerScroll";
import { SelectSimple } from "../../components/SelectSimple";
import { AccordionSimple } from "../../components/Accordion";
import { TextGeneral } from "../../components/TextGeneral";
import { StepBarProgress } from "../StepBarProgress";
//icons
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
//button download pdf
import { ButtonDowloand } from "../../PDFs/components/ButtonDowloand";
import { useManiobrasContext } from "../../Context/ManiobrasContext";
import { useGetLastFolio } from "../../Hooks/foliosManagment/useGetLastFolio";
import { ViewerDocument } from "../../PDFs/components/Viewer"
import { EIR } from "../../PDFs/plantillas/EIR";

function CheckListEIR() {

  const { step, setStep, checklist, setChecklist, item, setItem } = useManiobrasContext();

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
    let valuesNull = questions.filter((obj) => obj.value === null);
    let responsesIncorrect = questions.filter((item) => item.value != item.correct && item.preview === '');

    if (valuesNull.length >= 1 || responsesIncorrect.length >= 1) {
      toast.warning(`Termina el checklist y anexa las evidencias`)
    } else {
      callback()
    }
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '30px'
        }}>

        <StepBarProgress step={step} numSteps={9} />

        {step === 1 && (
          <StepOne
            validateQuestions={validateQuestions}
            updateQuestions={updateQuestions}
            changueComent={changueComent}
            changueValue={changueValue}
            changueImage={changueImage}
          />
        )}

        {step === 2 && (
          <StepTwo
            setStep={setStep}
            step={step}
            validateQuestions={validateQuestions}
            updateQuestions={updateQuestions}
            changueComent={changueComent}
            changueValue={changueValue}
            changueImage={changueImage}
          />
        )}


        {step === 3 && (
          <StepThree
            step={step}
            setStep={setStep}
            validateQuestions={validateQuestions}
            updateQuestions={updateQuestions}
            changueComent={changueComent}
            changueValue={changueValue}
            changueImage={changueImage}
          />
        )}

        {step === 4 && (
          <StepFor
            step={step}
            setStep={setStep}
            validateQuestions={validateQuestions}
            updateQuestions={updateQuestions}
            changueComent={changueComent}
            changueValue={changueValue}
            changueImage={changueImage}
          />
        )}

        {step === 5 && (
          <StepFive
            step={step}
            setStep={setStep}
            validateQuestions={validateQuestions}
            updateQuestions={updateQuestions}
            changueComent={changueComent}
            changueValue={changueValue}
            changueImage={changueImage}
          />
        )}

        {step === 6 && (
          <StepSix
            step={step}
            setStep={setStep}
            validateQuestions={validateQuestions}
            updateQuestions={updateQuestions}
            changueComent={changueComent}
            changueValue={changueValue}
            changueImage={changueImage}
          />
        )}

        {step === 7 && (
          <StepOptions
            item={item}
            step={step}
            setStep={setStep}
            setItem={setItem}
            validateQuestions={validateQuestions}
            updateQuestions={updateQuestions}
            changueComent={changueComent}
            changueValue={changueValue}
            changueImage={changueImage}
          />
        )}

        {step === 8 && (
          <StepFinal
            item={item}
            step={step}
            setStep={setStep}
            checklist={checklist}
          />
        )}


      </Box>
    </>
  );
}

export { CheckListEIR };


export function QuestionItem({ item, index, state, set, changueValue, changueImage, changueComent }) {

  const [image, setImage] = useState(false);

  return (
    <>

      <Paper
        elevation={3}
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', gap: '10px', padding: '10px' }} >
        <Typography variant='body1' >
          {item.question}
        </Typography>

        <FormGroup>
          {
            item.options.map((option, indexOption) => (
              <FormControlLabel key={`${option}_${indexOption}`}
                sx={{ textTransform: 'uppercase' }}
                onChange={() => changueValue(index, option, state, set)}
                control={<Checkbox checked={item.value === option ? true : false} />}
                label={option}
              />
            ))
          }
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


    </>
  );
}

export function StepOne({ updateQuestions, changueValue, changueImage, changueComent, validateQuestions, }) {

  const questionsBase = [
    {
      question: 'PANEL FROTAL',
      value: null,
      preview: '',
      image: '',
      coment: '',
      section: 'panel',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'PANEL IZQUIERDO',
      value: null,
      preview: '',
      image: '',
      coment: '',
      section: 'panel',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'PANEL DERECHO',
      value: null,
      preview: '',
      image: '',
      coment: '',
      section: 'panel',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'PANEL INFERIOR',
      value: null,
      preview: '',
      image: '',
      coment: '',
      section: 'panel',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'PANEL SUPERIOR',
      value: null,
      preview: '',
      image: '',
      coment: '',
      section: 'panel',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'PANEL TRASERO',
      value: null,
      preview: '',
      image: '',
      coment: '',
      section: 'panel',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']

    },
  ]

  const [questions, setQuestions] = useState(questionsBase);

  const Submit = (e) => {
    e.preventDefault();
    validateQuestions(questions, () => updateQuestions(questions, 'paneles'))
  }

  return (
    <>
      <form onSubmit={(e) => Submit(e)}>
        <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '100%', }}>

          <Typography variant='subtitle' fontWeight='500'>Verifica la presencia y condiciones de lo siguiente</Typography>

          <ContainerScroll height={'auto'} maxHeight={'55vh'}>
            <Stack gap='10px'>
              {questions.map((item, index) => (
                <QuestionItem
                  key={index}
                  state={questions}
                  item={item}
                  index={index}
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
    </>
  )
}

export function StepTwo({ updateQuestions, changueValue, changueImage, changueComent, validateQuestions, setStep, step }) {

  const questionsBase = [
    {
      question: 'MARCO FRONTAL',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },

    {
      question: 'MARCO TRASERO',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']

    },
    {
      question: 'MARCO DERECHO',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'MARCO IZQUIERDO',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'MARCO SUPERIOR',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'MARCO INFERIOR',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
  ]

  const [questions, setQuestions] = useState(questionsBase);

  const Submit = (e) => {
    e.preventDefault();
    validateQuestions(questions, () => updateQuestions(questions, 'marcos'))
  }

  return (
    <>
      <form onSubmit={(e) => Submit(e)}>
        <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '100%', }}>

          <Typography variant='subtitle' fontWeight='500'>Verifica la presencia y condiciones de lo siguiente</Typography>

          <ContainerScroll height={'auto'} maxHeight={'55vh'}>
            <Stack gap='10px'>
              {questions.map((item, index) => (
                <QuestionItem
                  key={index}
                  state={questions}
                  item={item}
                  index={index}
                  set={setQuestions}
                  changueValue={changueValue}
                  changueImage={changueImage}
                  changueComent={changueComent}
                />
              ))}
            </Stack>
          </ContainerScroll>

          <Stack flexDirection='row' justifyContent={'space-around'} flexWrap='wrap' gap='10px' >
            <Button
              color="warning"
              onClick={() => setStep(step - 1)}
              variant="contained"
              size="small" >
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
    </>
  )
}

export function StepThree({ updateQuestions, changueValue, changueImage, changueComent, validateQuestions, setStep, step }) {

  const questionsBase = [
    {
      question: 'NOMENCLATURA',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'PLACA DE DATOS',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'PORTA DOCUMENTOS',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },

  ]

  const [questions, setQuestions] = useState(questionsBase);

  const Submit = (e) => {
    e.preventDefault();
    validateQuestions(questions, () => updateQuestions(questions, 'informacion'))
  }

  return (
    <>
      <form onSubmit={(e) => Submit(e)}>
        <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '100%', }}>

          <Typography variant='subtitle' fontWeight='500'>Verifica la presencia y condiciones de lo siguiente</Typography>

          <ContainerScroll height={'auto'} maxHeight={'55vh'}>
            <Stack gap='10px'>
              {questions.map((item, index) => (
                <QuestionItem
                  key={index}
                  state={questions}
                  item={item}
                  index={index}
                  set={setQuestions}
                  changueValue={changueValue}
                  changueImage={changueImage}
                  changueComent={changueComent}
                />
              ))}
            </Stack>
          </ContainerScroll>

          <Stack flexDirection='row' justifyContent={'space-around'} flexWrap='wrap' gap='10px' >
            <Button
              color="warning"
              onClick={() => setStep(step - 1)}
              variant="contained"
              size="small" >
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
    </>
  )
}

export function StepFor({ updateQuestions, changueValue, changueImage, changueComent, validateQuestions, setStep, step }) {

  const questionsBase = [

    {
      question: 'ESCALERAS',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'PASARELAS',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'ENTRADA DE HOMBRE',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']

    },
    {
      question: 'MARIPOSAS DE E. HOMBRE',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'MANERAL DE VÁLVULA DE SEGURIDAD',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
  ]

  const [questions, setQuestions] = useState(questionsBase);

  const Submit = (e) => {
    e.preventDefault();
    validateQuestions(questions, () => updateQuestions(questions, 'entradas'))
  }

  return (
    <>
      <form onSubmit={(e) => Submit(e)}>
        <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '100%', }}>

          <Typography variant='subtitle' fontWeight='500'>Verifica la presencia y condiciones de lo siguiente</Typography>

          <ContainerScroll height={'auto'} maxHeight={'55vh'}>
            <Stack gap='10px'>
              {questions.map((item, index) => (
                <QuestionItem
                  key={index}
                  state={questions}
                  item={item}
                  index={index}
                  set={setQuestions}
                  changueValue={changueValue}
                  changueImage={changueImage}
                  changueComent={changueComent}
                />
              ))}
            </Stack>
          </ContainerScroll>

          <Stack flexDirection='row' justifyContent={'space-around'} flexWrap='wrap' gap='10px' >
            <Button
              color="warning"
              onClick={() => setStep(step - 1)}
              variant="contained"
              size="small" >
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
    </>
  )
}

export function StepFive({ updateQuestions, changueValue, changueImage, changueComent, validateQuestions, setStep, step }) {

  const questionsBase = [
    {
      question: 'VÁLVULA DE PRESIÓN Y ALIVIO',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'VÁLVULA DE ALIVIO',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'VÁLVULA DE PIE DE TANQUE',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'VÁLVULA DE DESCARGA',
      value: null,
      preview: '',
      image: '',
      coment: '',
      step: '5',
      section: 'valvula',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'TAPÓN DE VÁLVULA DE DESCARGA',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'TAPONES DE TUBO DE VAPOR',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'BRIDA CIEGA',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'TUBO DE DESAGÜE',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'TUBO DE VAPOR',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
  ]

  const [questions, setQuestions] = useState(questionsBase);

  const Submit = (e) => {
    e.preventDefault();
    validateQuestions(questions, () => updateQuestions(questions, 'valvulas'))
  }

  return (
    <>
      <form onSubmit={(e) => Submit(e)}>
        <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '100%', }}>

          <Typography variant='subtitle' fontWeight='500'>Verifica la presencia y condiciones de lo siguiente</Typography>

          <ContainerScroll height={'auto'} maxHeight={'55vh'}>
            <Stack gap='10px'>
              {questions.map((item, index) => (
                <QuestionItem
                  key={index}
                  state={questions}
                  item={item}
                  index={index}
                  set={setQuestions}
                  changueValue={changueValue}
                  changueImage={changueImage}
                  changueComent={changueComent}
                />
              ))}
            </Stack>
          </ContainerScroll>

          <Stack flexDirection='row' justifyContent={'space-around'} flexWrap='wrap' gap='10px' >
            <Button
              color="warning"
              onClick={() => setStep(step - 1)}
              variant="contained"
              size="small" >
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
    </>
  )
}

export function StepSix({ updateQuestions, changueValue, changueImage, changueComent, validateQuestions, setStep, step }) {

  const questionsBase = [
    {
      question: 'CIERRE DE EMERGENCIA REMOTO',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'SISTEMA DE CALENTAMIENTO ELÉCTRICO',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'MANÓMETRO',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
    {
      question: 'TERMÓMETRO',
      value: null,
      preview: '',
      image: '',
      coment: '',
      correct: 'buen estado',
      options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
    },
  ]

  const [questions, setQuestions] = useState(questionsBase);

  const Submit = (e) => {
    e.preventDefault();
    validateQuestions(questions, () => updateQuestions(questions, 'sistemas'))
  }

  return (
    <>
      <form onSubmit={(e) => Submit(e)}>
        <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '100%', }}>

          <Typography variant='subtitle' fontWeight='500'>Verifica la presencia y condiciones de lo siguiente</Typography>

          <ContainerScroll height={'auto'} maxHeight={'55vh'}>
            <Stack gap='10px'>
              {questions.map((item, index) => (
                <QuestionItem
                  key={index}
                  state={questions}
                  item={item}
                  index={index}
                  set={setQuestions}
                  changueValue={changueValue}
                  changueImage={changueImage}
                  changueComent={changueComent}
                />
              ))}
            </Stack>
          </ContainerScroll>

          <Stack flexDirection='row' justifyContent={'space-around'} flexWrap='wrap' gap='10px' >
            <Button
              color="warning"
              onClick={() => setStep(step - 1)}
              variant="contained"
              size="small" >
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
    </>
  )
}

export function StepOptions({ item, setItem, step, setStep }) {

  const onSumbit = (e) => {
    e.preventDefault();
    setStep(step + 1)
  }

  const optionsStatus = [
    { id: 'almacenado', nombre: 'almacenaje' },
    { id: 'interna', nombre: 'reparacion interna' },
    { id: 'externa', nombre: 'reparacion externa' },
  ]


  return (
    <>
      <Paper sx={{ width: '100%', padding: '20px' }}>

        <form onSubmit={onSumbit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >

            <TextField
              disabled
              fullWidth
              helperText='Cliente'
              value={item.clientes.cliente}
            />

            <SelectSimple
              type={'obj'}
              title='Siguiente etapa'
              width={'100%'}
              value={item.status}
              options={optionsStatus}
              onChange={(e) => setItem({ ...item, status: e.target.value })}
              helperText={'Selecciona a que etapa pasa este contedor'}
            />

            <Stack
              width={'100%'}
              gap='10px'
              flexDirection={'row'}
              justifyContent={'space-between'}
            >

              <Button
                fullWidth
                variant="contained"
                color='error'
                size="small"
                onClick={() => setStep(step - 1)}>
                atras
              </Button>

              <Button
                fullWidth
                variant="contained"
                color='primary'
                size="small"
                type="submit"
              >
                siguiente
              </Button>

            </Stack>
          </Box>

        </form>

      </Paper>
    </>
  )
}

export function StepFinal({ setStep, step, checklist, item }) {

  const flatCheckList = Object.values(checklist).flat();

  function filterChecklist(checklist, valueFilter) {
    return checklist.filter((item) => item.value === valueFilter)
  }

  const cortados = filterChecklist(flatCheckList, 'cortado');
  const doblados = filterChecklist(flatCheckList, 'doblado');
  const faltantes = filterChecklist(flatCheckList, 'faltante');
  const respaldo = filterChecklist(flatCheckList, 'respaldo');
  const abollados = filterChecklist(flatCheckList, 'abollado');

  const [viewPDF, setViewPDF] = useState(false);
  const toggleModalPDF = () => setViewPDF(!viewPDF);

  const { folio } = useGetLastFolio()

  return (
    <>
      <Paper sx={{ display: 'flex', width: '100%', padding: '20px', flexDirection: 'column', gap: '15px', backgroundColor: 'whitesmoke' }}>

        <Stack alignItems='center' gap='10px'>
          <Typography variant="h6">Recuento EIR</Typography>

          <Stack flexDirection='row' gap='20px' borderRadius='4px' padding='15px'  >

            <TextGeneral
              variant='chip'
              label={'Cortados'}
              text={cortados.length}
            />

            <TextGeneral
              variant='chip'
              label={'Doblados'}
              text={doblados.length}
            />

            <TextGeneral
              variant='chip'
              label={'Faltantes'}
              text={faltantes.length}
            />

            <TextGeneral
              variant='chip'
              label={'Respaldo'}
              text={respaldo.length}
            />

            <TextGeneral
              variant='chip'
              label={'Abollados'}
              text={abollados.length}
            />

          </Stack>
        </Stack>

        <Stack>

          {cortados.length >= 1 && (
            <AccordionSimple arrayList={cortados} name={'cortados'} />
          )}

          {doblados.length >= 1 && (
            <AccordionSimple arrayList={doblados} name={'doblados'} />
          )}

          {faltantes.length >= 1 && (
            <AccordionSimple arrayList={faltantes} name={'faltantes'} />
          )}

          {respaldo.length >= 1 && (
            <AccordionSimple arrayList={respaldo} name={'respaldo'} />
          )}

          {abollados.length >= 1 && (
            <AccordionSimple arrayList={abollados} name={'abollados'} />
          )}
        </Stack>

        <Stack>
          <Stack gap={'15px'}>
            <TextGeneral
              width={'100%'}
              label={"Nombre del cliente"}
              text={item.clientes.cliente}
            />

            <TextGeneral
              width={'100%'}
              label={"Status proximo"}
              text={item.status}
            />
          </Stack>
        </Stack>

        <Stack flexDirection='row' justifyContent='space-between'>
          <Stack flexDirection='row' gap={'15px'} >
            <Button
              size="small"
              onClick={() => setStep(step - 1)}
              variant="contained"
              color="warning">
              Atras
            </Button>
            <Button
              size="small"
              onClick={toggleModalPDF}
              variant="contained"
              color="info">
              Previsualizar
            </Button>
          </Stack>
          <ButtonDowloand
            dataDocument={{ ...item, folio }}
            checklist={checklist} />
        </Stack>

      </Paper>

      <ViewerDocument stateModal={viewPDF} ToggleModal={toggleModalPDF}>
        <EIR maniobrasCheckList={checklist} dataDocument={{ ...item, folio }} />
      </ViewerDocument>
    </>
  )
}