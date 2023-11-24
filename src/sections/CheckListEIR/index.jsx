import { useState, useContext } from "react";
import { Box, Paper, Stack, Button, IconButton, Typography, Modal, Fade, Container } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DevelopmentContext } from "../../Context";
import { ContainerScroll } from "../../components/ContainerScroll";
import { StepBarProgress } from "../StepsManiobras/StepBarProgress";
import { useCheckList } from "../../Hooks/useChecklist";
import { SelectSimple } from "../../components/SelectSimple";
import { InputText } from "../../components/InputText";
import { AccordionSimple } from "../../components/Accordion";
//icons
import ChatIcon from '@mui/icons-material/Chat';
import { TextGeneral } from "../../components/TextGeneral";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function CheckListEIR() {

  const [step, setStep] = useState(1);

  const nextStepBar = (step) => {
    setStep(step)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>

        <StepBarProgress step={step} numSteps={5} />

        {step === 1 && (
          <StepOne nextStepBar={nextStepBar} />
        )}

        {step === 2 && (
          <StepTwo nextStepBar={nextStepBar} />
        )}


        {step === 3 && (
          <StepThree nextStepBar={nextStepBar} />
        )}

        {step === 4 && (
          <StepFinal nextStepBar={nextStepBar} />
        )}


      </Box>
    </>
  );
}

export { CheckListEIR };

export function QuestionItem({ question, value, index, SelectQuestionComent, ChangueInput }) {
  const IsSmall = useMediaQuery('(max-width:700px)');
  return (
    <>
      <Paper elevation={3} sx={{ width: '100%', padding: '15px', backgroundColor: 'white' }}>

        <Stack flexDirection={IsSmall ? 'column' : 'row'} alignItems={IsSmall ? 'start' : 'center'} justifyContent='space-between'>
          <Typography variant="subtitle2" sx={{ maxWidth: IsSmall ? null : '270px' }}>
            {question}
          </Typography>

          <Stack flexDirection='row' alignItems='center' width={IsSmall ? '100%' : 'auto'} >
            <SelectSimple
              width={IsSmall ? '100%' : null}
              onChange={(e) => ChangueInput(index, e.target.value)}
              title={'respuesta'}
              value={value === null ? '' : value}
              defaultValue={''}
              options={['Si', 'No', 'Cortado', 'Doblado', 'Faltante', 'Respaldo', 'Abollado']}
            />

            <IconButton
              onClick={() => SelectQuestionComent(index)}
              variant="contained"
              color="primary">
              <ChatIcon />
            </IconButton>
          </Stack>

        </Stack>


      </Paper>


    </>
  );
}

export function StepOne({ nextStepBar }) {

  const IsSmall = useMediaQuery('(max-width:850px)');
  //inicio del hook de checklist
  const mockListCheck = [
    {
      question: 'PANEL FROTAL',
      value: null,
      preview: '',
      image: '',
      coment: '',
    },
    {
      question: 'MARCO FRONTAL',
      value: null,
      preview: '',
      image: '',
      coment: '',

    },
    {
      question: 'PANEL TRASERO',
      value: null,
      preview: '',
      image: '',
      coment: '',

    },
    {
      question: 'MARCO TRASERO',
      value: null,
      preview: '',
      image: '',
      coment: '',

    },
    {
      question: 'PANEL DERECHO',
      value: null,
      preview: '',
      image: '',
      coment: '',
    },
    {
      question: 'MARCO DERECHO',
      value: null,
      preview: '',
      image: '',
      coment: '',
    },
    {
      question: 'PANEL IZQUIERDO',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'MARCO IZQUIERDO',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'PANEL SUPERIOR',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'MARCO SUPERIOR',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'PANEL INFERIOR',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
  ]

  const { actions, states } = useCheckList(mockListCheck)
  const { ChangueInput, ChangueComent, SelectQuestionComent, ToggleModalComent, nextStep } = actions
  const { listCheck, indexQuestion, modalComent, } = states

  const next = () => {
    nextStep(listCheck)
    nextStepBar(2)
  }

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <ContainerScroll>
          <Stack width='100%' gap='10px'>
            {listCheck.map((question, index) => (
              <QuestionItem
                key={index}
                index={index}
                question={question.question}
                value={question.value}
                coment={question.coment}
                ChangueInput={ChangueInput}
                SelectQuestionComent={SelectQuestionComent}
              />
            ))}
          </Stack>

          <Stack 
          marginTop='20px'
          flexDirection='row' 
          alignItems='center' 
          justifyContent='flex-end'
          >
            <Button
              color="primary"
              variant="contained"
              onClick={next}
            >
              Siguiente
            </Button>
          </Stack>
        </ContainerScroll>
      </Paper>

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
  )
}

export function StepTwo({ nextStepBar }) {

  const IsSmall = useMediaQuery('(max-width:850px)');
  //inicio del hook de checklist
  const mockListCheck = [
    {
      question: 'MARCO INFERIOR',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'NOMENCLATURA',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'ESCALERAS',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'PASARELAS',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'ENTRADA DE HOMBRE',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'MARIPOSAS DE E. HOMBRE',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'VÁLVULA DE PRESIÓN Y ALIVIO',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'TUBO DE DESAGÜE',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'VÁLVULA DE ALIVIO',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'BRIDA CIEGA',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
  ]

  const { actions, states } = useCheckList(mockListCheck)
  const { ChangueInput, ChangueComent, SelectQuestionComent, ToggleModalComent, nextStep } = actions
  const { listCheck, indexQuestion, modalComent, maniobrasCheckList } = states

  const next = () => {
    const newState = [...maniobrasCheckList, ...listCheck]
    nextStep(newState)
    nextStepBar(3)
  }

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <ContainerScroll>
          <Stack width='100%' gap='10px'>
            {listCheck.map((question, index) => (
              <QuestionItem
                key={index}
                index={index}
                question={question.question}
                value={question.value}
                coment={question.coment}
                ChangueInput={ChangueInput}
                SelectQuestionComent={SelectQuestionComent}
              />
            ))}
          </Stack>

          <Stack
            justifyContent='space-between'
            marginTop='20px'
            flexDirection='row'
            alignItems='center'
            width='100%'
          >

            <Button
              variant="contained"
              color="error"
              onClick={() => nextStepBar(1)}
            >
              anterior
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={next}
            >
              Siguiente
            </Button>
          </Stack>
        </ContainerScroll>
      </Paper>

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
  )
}

export function StepThree({ nextStepBar }) {

  const IsSmall = useMediaQuery('(max-width:850px)');
  //inicio del hook de checklist
  const mockListCheck = [
    {
      question: 'MANÓMETRO',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'TERMÓMETRO',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'PLACA DE DATOS',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'PORTA DOCUMENTOS',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'TUBO DE VAPOR',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'TAPONES DE TUBO DE VAPOR',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'SISTEMA DE CALENTAMIENTO ELÉCTRICO',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'VÁLVULA DE PIE DE TANQUE',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'VÁLVULA DE DESCARGA',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'TAPÓN DE VÁLVULA DE DESCARGA',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'MANERAL DE VÁLVULA DE SEGURIDAD',
      value: null,
      preview: '',
      image: '',
      coment: ''
    },
    {
      question: 'CIERRE DE EMERGENCIA REMOTO',
      value: null,
      preview: '',
      image: '',
      coment: ''
    }
  ]

  const { actions, states } = useCheckList(mockListCheck)
  const { ChangueInput, ChangueComent, SelectQuestionComent, ToggleModalComent, nextStep } = actions
  const { listCheck, indexQuestion, modalComent, maniobrasCheckList } = states

  const next = () => {
    const newState = [...maniobrasCheckList, ...listCheck]
    nextStep(newState)
    nextStepBar(4)
  }

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <ContainerScroll>
          <Stack width='100%' gap='10px'>
            {listCheck.map((question, index) => (
              <QuestionItem
                key={index}
                index={index}
                question={question.question}
                value={question.value}
                coment={question.coment}
                ChangueInput={ChangueInput}
                SelectQuestionComent={SelectQuestionComent}
              />
            ))}
          </Stack>

          <Stack
            justifyContent='space-between'
            marginTop='20px'
            flexDirection='row'
            alignItems='center'
            width='100%'
          >

            <Button
              variant="contained"
              color="error"
              onClick={() => nextStepBar(2)}
            >
              anterior
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={next}
            >
              Siguiente
            </Button>
          </Stack>
        </ContainerScroll>
      </Paper>

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
  )
}

export function StepFinal() {

  const [state, dispatch] = useContext(DevelopmentContext);
  const { maniobrasCheckList } = state;

  // ['Si', 'No', 'Cortado', 'Doblado', 'Faltante', 'Respaldo', 'Abollado']

  function filterChecklist(checklist, valueFilter) {
    return checklist.filter((item) => item.value === valueFilter)
  }

  const cortados = filterChecklist(maniobrasCheckList, 'Cortado');
  const doblados = filterChecklist(maniobrasCheckList, 'Doblado');
  const faltantes = filterChecklist(maniobrasCheckList, 'Faltante');
  const respaldo = filterChecklist(maniobrasCheckList, 'Respaldo');
  const abollados = filterChecklist(maniobrasCheckList, 'Abollado');

  return (
    <>
      <Paper sx={{ display: 'flex', width: '100%', padding: '20px', flexDirection: 'column', gap: '15px', backgroundColor: 'whitesmoke' }}>

        <Stack alignItems='center' gap='10px'>
          <Typography variant="h6">Recuento</Typography>

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
            <AccordionSimple arrayList={cortados} name={'Cortados'} />
          )}

          {doblados.length >= 1 && (
            <AccordionSimple arrayList={doblados} name={'Doblados'} />
          )}

          {faltantes.length >= 1 && (
            <AccordionSimple arrayList={faltantes} name={'Faltantes'} />
          )}

          {respaldo.length >= 1 && (
            <AccordionSimple arrayList={respaldo} name={'Respaldo'} />
          )}

          {abollados.length >= 1 && (
            <AccordionSimple arrayList={doblados} name={'Abollados'} />
          )}
        </Stack>

        <Stack flexDirection='row' justifyContent='space-between'>
          <Button endIcon={<PictureAsPdfIcon/>} variant="contained">Exportar PDF</Button>
        </Stack>

      </Paper>
    </>
  )
}