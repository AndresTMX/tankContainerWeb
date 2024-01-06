import { useState, useContext } from "react";
import { TextGeneral } from "../TextGeneral";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Chip, Stack, Button, Typography, Modal, Paper, Divider, Fade, IconButton } from "@mui/material";
//icons
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
//hooks
import { usePostCheckList } from "../../Hooks/foliosManagment/usePostCheckList";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { GlobalContext } from "../../Context/GlobalContext";
import { AuthContext } from "../../Context/AuthContext";
//helpers
import { tiempoTranscurrido } from "../../Helpers/date";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { actionTypes } from "../../Reducers/ManiobrasReducer";

function DetailsCheckList({ changueTypeRegister, step }) {

  const IsSmall = useMediaQuery('(max-width:900px)');
  const IsExtraSmall = useMediaQuery('(max-width:450px)');

  const { sendCheckList, errorPost, request } = usePostCheckList();


  const pageOne = [
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

  const pageTwo = [
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

  const pageThree = [
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

  const { key } = useContext(AuthContext);
  const [state, dispatch] = useContext(ManiobrasContext);
  const [stateGlobal, dispatchGlobal] = useContext(GlobalContext)

  const { selectItem, maniobrasCheckList, status } = state;
  const { carga, dayInput, dateInput, linea, numero_tanque, tracto, checkIn } = selectItem;

  const complete = step === 5 ? true : false;

  const time = tiempoTranscurrido(checkIn);
  const [modal, setModal] = useState(false);

  const clearSelect = () => {
    dispatch({ type: actionTypes.setSelectItem, payload: false })
    dispatch({ type: actionTypes.setSelect, payload: false })
    dispatch({ type: actionTypes.setManiobrasCheck, payload: { pageOne: pageOne, pageTwo: pageTwo, pageThree: pageThree } })

  }

  const ShowModalWarning = () => {
    setModal(!modal)
  }

  const completeCheck = () => {

    if (!complete) {
      dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: '¡Complete el checklist primero!' })
    } else {

      ShowModalWarning()
    }

  }

  const sendCheck = async () => {
    const flatCheckList = [...maniobrasCheckList.pageOne, ...maniobrasCheckList.pageTwo, ...maniobrasCheckList.pageThree];

    const data = {
      user_id: key,
      registro_detalle_entrada_id: selectItem.id,
      cliente_id: state.cliente,
      ingreso: selectItem.checkIn,
    }

    await sendCheckList(data, flatCheckList)
    //maniobrasContextRevisar
    dispatch({ type: actionTypes.setSelectItem, payload: false })
    dispatch({ type: actionTypes.setSelect, payload: false })
    changueTypeRegister("realizados")
    dispatch({ type: actionTypes.setManiobrasCheck, payload: { pageOne: pageOne, pageTwo: pageTwo, pageThree: pageThree } })
  }

  return (
    <>
      <Paper elevation={4}>

        <Stack
          bgcolor="whitesmoke"
          borderRadius="4px"
          padding="10px"
          gap="10px"
        >
          <Stack
            justifyContent="space-between"
            flexDirection="row"
            flexWrap="wrap"
            gap="10px"
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              flexWrap="wrap"
              gap="10px"
            >

              <Chip
                size="small"
                color="secondary"
                label={dayInput}
                icon={<CalendarTodayIcon />}
                sx={{
                  width: "120px",
                  fontWeight: 500,
                  padding: "5px",
                }}
              />

              <Chip
                size="small"
                color="info"
                label={dateInput}
                icon={<AccessTimeIcon />}
                sx={{
                  maxWidth: "90px",
                  fontWeight: 500,
                  padding: "5px",
                }}
              />

              <Chip
                size="small"
                color="info"
                label={time}
                icon={<AccessTimeIcon />}
                sx={{
                  maxWidth: "200px",
                  fontWeight: 500,
                  padding: "5px",
                }}
              />

            </Stack>

            <Stack flexDirection='row' gap='10px'>
              <Button
                disabled={!complete}
                onClick={completeCheck}
                size="small"
                variant="contained"
                color="info"
              >
                completar
              </Button>

              <IconButton
                onClick={clearSelect}
                size="small"
                color="error"
              >
                <DoDisturbIcon />
              </IconButton>
            </Stack>

          </Stack>

          <Stack
            flexDirection={IsExtraSmall ? "column" : "row"}
            width="100%"
            gap="20px"
          >

            <TextGeneral
              label="linea"
              text={linea}
            />

            <Stack flexDirection="row" gap="10px">
              <Divider
                orientation={IsSmall ? "horizontal" : "vertical"}
                flexItem
              />

              <TextGeneral
                label="tracto"
                text={tracto}
              />

              {carga === 'Tanque' &&
                <>
                  <Divider
                    orientation={IsSmall ? "horizontal" : "vertical"}
                    flexItem
                  />
                  <TextGeneral
                    label="N° tanque"
                    text={numero_tanque}
                  />
                </>

              }
            </Stack>

          </Stack>

        </Stack>

      </Paper>

      <Modal
        open={modal}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center'

        }}
      >
        <Fade
          in={modal}
          timeout={500}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              width: 'auto',
              padding: '20px',
              borderRadius: '4px'
            }}
          >
            <Typography variant="h6">¿Desea completar el check list?</Typography>

            <Stack
              width={'100%'}
              gap='10px'
              flexDirection={'row'}
              justifyContent={'space-between'}
            >

              <Button
                fullWidth
                variant="contained"
                color='primary'
                size="small"
                onClick={sendCheck}>
                Completar
              </Button>

              <Button
                fullWidth
                variant="contained"
                color='error'
                size="small"
                onClick={ShowModalWarning}>
                Cancelar
              </Button>

            </Stack>

          </Box>
        </Fade>
      </Modal>

    </>
  );
}

export { DetailsCheckList };