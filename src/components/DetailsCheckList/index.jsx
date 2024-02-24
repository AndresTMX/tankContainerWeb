import { useState } from "react";
import { TextGeneral } from "../TextGeneral";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Stack, Button, Typography, Modal, Paper, Divider, Fade, IconButton } from "@mui/material";
//icons
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import GradingIcon from '@mui/icons-material/Grading';
//hooks
import { usePostCheckList } from "../../Hooks/foliosManagment/usePostCheckList";
import { useManiobrasContext } from "../../Context/ManiobrasContext";

function DetailsCheckList({ toggleModalCheck, setTypeRegister }) {

  const IsSmall = useMediaQuery('(max-width:580px)');

  const { step, setStep, checklist, setChecklist, item, setItem, CheckAll } = useManiobrasContext()

  const { sendCheckList } = usePostCheckList();

  const { carga, linea, numero_tanque, checkIn, clientes } = item;

  const { tracto } = item.registros || {};

  const complete = step === 8 ? true : false;

  const [modal, setModal] = useState(false);

  const clearSelect = () => {
    setStep(1)
    setItem({})
    toggleModalCheck()
  }

  const ShowModalWarning = () => {
    setModal(!modal)
  }

  const sendCheck = async () => {
    
    const flatCheckList = Object.values(checklist).flat();

    const data = {
      registro_detalle_entrada_id: item.id,
      cliente_id: item.cliente_id,
      ingreso: item.checkIn,
    }

    await sendCheckList(data, flatCheckList, item)
    setStep(1)
    setItem({})
    toggleModalCheck()
    setTypeRegister("realizados")
  }

  return (
    <>
      <Paper sx={{ border: 1, borderColor: 'whitesmoke', width: '100%' }} elevation={2}>

        <Stack
          flexDirection={IsSmall ? 'column' : 'row'}
          justifyContent={"space-between"}
          alignItems={IsSmall ? 'flex-start' : 'center'}
          bgcolor="whitesmoke"
          borderRadius="4px"
          padding="10px"
          gap="10px"
        >

          {IsSmall &&
            <>

              <Stack
                flexDirection={'row'}
                gap='10px'
                justifyContent={'space-between'}
                width={IsSmall ? '100%' : 'auto'}>

                <Stack gap='5px' flexDirection='row'>
                  <IconButton
                    size='small'
                    onClick={CheckAll}
                    variant="contained"
                    color="info"
                  >
                    <GradingIcon />
                  </IconButton>


                  <Button
                    disabled={!complete}
                    onClick={ShowModalWarning}
                    size="small"
                    variant="contained"
                    color="info"
                  >
                    completar
                  </Button>
                </Stack>

                <IconButton
                  onClick={clearSelect}
                  size="small"
                  color="error"
                >
                  <DoDisturbIcon />
                </IconButton>


              </Stack>
              <Divider flexItem orientation={IsSmall ? "horizontal" : "vertical"} />
            </>
          }

          <Box>
            <Typography variant='caption' >Cliente</Typography>
            <Typography>{clientes?.cliente}</Typography>
          </Box>

          <Divider flexItem orientation={IsSmall ? "horizontal" : "vertical"}
          />

          <Box>
            <Typography variant='caption' >Linea</Typography>
            <Typography>{linea}</Typography>
          </Box>

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


          {!IsSmall && <Stack
            flexDirection={'row'}
            gap='10px'
            width={IsSmall ? '100%' : 'auto'}>

            <Button
              size='small'
              onClick={CheckAll}
              variant="contained"
              color="info"
              endIcon={<GradingIcon />}
            >
              todo bien
            </Button>


            <Button
              disabled={!complete}
              onClick={ShowModalWarning}
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
          }

        </Stack>

      </Paper>

      <Modal
        open={modal}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',

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