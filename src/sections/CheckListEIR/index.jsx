import { useState, useContext } from "react";
import { Box, Paper, Stack, Button, IconButton, Typography, Modal, Fade, Container } from "@mui/material";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { ContainerScroll } from "../../components/ContainerScroll";
import { StepBarProgress } from "../StepsManiobras/StepBarProgress";
import { InputImage } from "../../components/InputImage";
import { useCheckList } from "../../Hooks/useChecklistManiobras";
import { SelectSimple } from "../../components/SelectSimple";
import { InputText } from "../../components/InputText";
import { AccordionSimple } from "../../components/Accordion";
import { ModalAddCustomer } from "../../components/DataGridCustomers";
//icons
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import { TextGeneral } from "../../components/TextGeneral";
//button download pdf
import { ButtonDowloand } from "../../PDFs/components/ButtonDowloand";
import { actionTypes } from "../../Reducers/ManiobrasReducer";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCustomers } from "../../Hooks/Customers/useCustomers";

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

        <StepBarProgress step={step} numSteps={6} />

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
          <StepFor nextStepBar={nextStepBar} />
        )}

        {step === 5 && (
          <StepFinal nextStepBar={nextStepBar} />
        )}


      </Box>
    </>
  );
}

export { CheckListEIR };

export function QuestionItem({ question, value, index, SelectQuestionComent, ChangueInput, ChangueImage, DiscardImage }) {
  const IsSmall = useMediaQuery('(max-width:700px)');
  return (
    <>
      <Paper elevation={3} sx={{ width: '100%', padding: '15px', backgroundColor: 'white' }}>

        <Stack flexDirection={IsSmall ? 'column' : 'row'} alignItems={IsSmall ? 'start' : 'center'} justifyContent='space-between'>
          <Typography variant="subtitle2" sx={{ maxWidth: IsSmall ? null : '270px' }}>
            {question.question}
          </Typography>

          <Stack flexDirection='row' alignItems='center' width={IsSmall ? '100%' : 'auto'} >

            <SelectSimple
              required={true}
              width={IsSmall ? '100%' : null}
              onChange={(e) => ChangueInput(index, e.target.value)}
              title={'respuesta'}
              value={value === null ? '' : value}
              defaultValue={''}
              options={['Si', 'No', 'Cortado', 'Doblado', 'Faltante', 'Respaldo', 'Abollado']}
            />

            <InputImage
              index={index}
              preview={question.preview}
              onChangue={(e) => ChangueImage(index, e)}
              discardImage={DiscardImage}
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
  const [state, dispatch] = useContext(ManiobrasContext);
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
  const stateCheckList = state.maniobrasCheckList.pageOne.length >= 1 ? state.maniobrasCheckList.pageOne : mockListCheck;
  const { actions, states } = useCheckList(stateCheckList)
  const { ChangueInput, ChangueImage, DiscardImage, ChangueComent, SelectQuestionComent, ToggleModalComent, nextStep } = actions
  const { listCheck, indexQuestion, modalComent, } = states



  const next = (e) => {
    e.preventDefault();
    const newState = { ...state.maniobrasCheckList, pageOne: [...listCheck] }
    nextStep(newState)
    nextStepBar(2)
  }

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <ContainerScroll height={'56vh'}>
          <form onSubmit={next}>
            <Stack width='100%' gap='10px'>
              {listCheck.map((question, index) => (
                <QuestionItem
                  key={index}
                  index={index}
                  question={question}
                  value={question.value}
                  coment={question.coment}
                  ChangueInput={ChangueInput}
                  ChangueImage={ChangueImage}
                  DiscardImage={DiscardImage}
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
                type="submit"
              >
                Siguiente
              </Button>
            </Stack>
          </form>

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

  const [state, dispatch] = useContext(ManiobrasContext);
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
  const stateCheckList = state.maniobrasCheckList.pageTwo.length >= 1 ? state.maniobrasCheckList.pageTwo : mockListCheck;
  const { actions, states } = useCheckList(stateCheckList)
  const { ChangueInput, ChangueComent, ChangueImage, DiscardImage, SelectQuestionComent, ToggleModalComent, nextStep } = actions
  const { listCheck, indexQuestion, modalComent, maniobrasCheckList } = states

  const next = (e) => {
    e.preventDefault();
    const newState = { ...state.maniobrasCheckList, pageTwo: [...listCheck] };
    nextStep(newState)
    nextStepBar(3)
  }

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <ContainerScroll>
          <form onSubmit={next}>
            <Stack width='100%' gap='10px'>
              {listCheck.map((question, index) => (
                <QuestionItem
                  key={index}
                  index={index}
                  question={question}
                  value={question.value}
                  coment={question.coment}
                  ChangueImage={ChangueImage}
                  DiscardImage={DiscardImage}
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
                type="submit"
              >
                Siguiente
              </Button>
            </Stack>
          </form>
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

  const [state, dispatch] = useContext(ManiobrasContext);
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
  const stateCheckList = state.maniobrasCheckList.pageThree.length >= 1 ? state.maniobrasCheckList.pageThree : mockListCheck;
  const { actions, states } = useCheckList(stateCheckList)
  const { ChangueInput, ChangueComent, SelectQuestionComent, ChangueImage, DiscardImage, ToggleModalComent, nextStep } = actions
  const { listCheck, indexQuestion, modalComent, maniobrasCheckList } = states

  const next = (e) => {
    e.preventDefault();
    const newState = { ...state.maniobrasCheckList, pageThree: [...listCheck] };
    nextStep(newState)
    nextStepBar(4)
  }

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <ContainerScroll>
          <form onSubmit={next}>
            <Stack width='100%' gap='10px'>
              {listCheck.map((question, index) => (
                <QuestionItem
                  key={index}
                  index={index}
                  question={question}
                  value={question.value}
                  coment={question.coment}
                  ChangueImage={ChangueImage}
                  DiscardImage={DiscardImage}
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
                type="submit"
              >
                Siguiente
              </Button>
            </Stack>
          </form>
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

export function StepFor({ nextStepBar }) {

  const [state, dispatch] = useContext(ManiobrasContext);
  const [modalCustomer, setModalCustomer] = useState(false)
  const { selectCustomers, updateCustomers, createCustomer } = useCustomers();

  const [cliente, setCliente] = useState('');
  const [status, setStatus] = useState('');

  const onSumbit = (e) => {
    e.preventDefault();
    dispatch({ type: actionTypes.setCliente, payload: cliente })
    dispatch({ type: actionTypes.setStatus, payload: status })
    nextStepBar(5)
  }

  const optionsStatus = [
    { id: 'prelavado', nombre: 'prelavado' },
    { id: 'parked', nombre: 'almacenaje' },
    { id: 'interna', nombre: 'reparacion interna' },
    { id: 'externa', nombre: 'reparacion externa' },
  ]

  const toggleModalCustomer = () => setModalCustomer(!modalCustomer)


  return (
    <>
      <Paper sx={{ width: '100%', padding: '20px' }}>

        <form onSubmit={onSumbit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >

            <Stack width={'100%'} alignItems={'flex-end'}>
              <Button
                size="small"
                color="primary"
                variant="contained"
                endIcon={<AddIcon />}
                onClick={toggleModalCustomer}
              >
                nuevo cliente
              </Button>
            </Stack>

            <SelectSimple
              type={'obj'}
              title='Cliente'
              width={'100%'}
              value={cliente}
              options={selectCustomers}
              onChange={(e) => setCliente(e.target.value)}
              helperText={'Selecciona un cliente'}
            />

            <SelectSimple
              type={'obj'}
              title='Siguiente etapa'
              width={'100%'}
              value={status}
              options={optionsStatus}
              onChange={(e) => setStatus(e.target.value)}
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
                onClick={() => nextStepBar(3)}>
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

      <ModalAddCustomer
        modal={modalCustomer}
        createCustomer={createCustomer}
        updateCustomers={updateCustomers}
        toggleModal={toggleModalCustomer}
      />
    </>
  )
}

export function StepFinal({ nextStepBar }) {

  const [state, dispatch] = useContext(ManiobrasContext);
  const { maniobrasCheckList, previewPDF, selectItem, cliente, status } = state;
  const { customerId, getCustomerWhitId } = useCustomers(cliente);

  const flatCheckList = [...maniobrasCheckList.pageOne, ...maniobrasCheckList.pageTwo, ...maniobrasCheckList.pageThree];

  const ToggleViewer = () => {
    dispatch({ type: actionTypes.setPreviewPDF, payload: !previewPDF })
  }

  // ['Si', 'No', 'Cortado', 'Doblado', 'Faltante', 'Respaldo', 'Abollado']

  function filterChecklist(checklist, valueFilter) {
    return checklist.filter((item) => item.value === valueFilter)
  }

  const cortados = filterChecklist(flatCheckList, 'Cortado');
  const doblados = filterChecklist(flatCheckList, 'Doblado');
  const faltantes = filterChecklist(flatCheckList, 'Faltante');
  const respaldo = filterChecklist(flatCheckList, 'Respaldo');
  const abollados = filterChecklist(flatCheckList, 'Abollado');

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
          <Stack gap={'15px'}>
            <TextGeneral
              width={'100%'}
              label={"Nombre del cliente"}
              text={customerId? customerId?.cliente:'...'}
            />

            <TextGeneral
              width={'100%'}
              label={"Status proximo"}
              text={status}
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
          <Stack flexDirection='row' gap={'15px'} >
            <Button
              size="small"
              onClick={() => nextStepBar(4)}
              variant="contained"
              color="warning">
              Atras
            </Button>
            <Button
              size="small"
              onClick={ToggleViewer}
              variant="contained"
              color="info">
              Previsualizar
            </Button>
          </Stack>
          <ButtonDowloand />
        </Stack>

      </Paper>
    </>
  )
}