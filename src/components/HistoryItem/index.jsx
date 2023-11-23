import { useState, useContext } from "react";
import {
  Box,
  Button,
  IconButton,
  Chip,
  Stack,
  Modal,
  Typography,
  Divider,
  Fade,
  Paper,
} from "@mui/material";
import { TextGeneral } from "../TextGeneral";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
//icons
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
//helpers
import { transformRegisters } from "../../Helpers/transformRegisters";
import { tiempoTranscurrido } from "../../Helpers/date";
import { FormCheckTank } from "../FormCheckTank";
import { actionTypes } from "../../Reducers";
//context
import { DevelopmentContext } from "../../Context";

function HistoryItem({ data, type }) {
  const IsSmall = useMediaQuery("(max-width:900px)");

  const [modal, setModal] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
  });

  const ToggleModalInfoOperator = () => {
    setModal({ ...modal, modal1: !modal.modal1 });
  };

  const ToggleModalExitRegister = () => {
    setModal({ ...modal, modal2: !modal.modal2 });

  };

  return (
    <>
      <Paper
        elevation={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >

        {type === 'vigilancia' && (
          <HistoryItemVigilancia
            data={data}
            IsSmall={IsSmall}
            ToggleModalExitRegister={ToggleModalExitRegister}
            ToggleModalInfoOperator={ToggleModalInfoOperator}

          />
        )}

        {type === 'maniobras' && (
          <HistoryItemManiobras
            data={data}
            IsSmall={IsSmall}
            ToggleModalInfoOperator={ToggleModalInfoOperator} />
        )}

      </Paper>

      <Modal
        open={modal.modal1}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Fade timeout={500} in={modal.modal1}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              alignItems: "start",
              justifyContent: "center",
              backgroundColor: "white",
              width: "auto",
              padding: "20px",
              borderRadius: "4px",
            }}
          >
            <Typography variant="h6">Información del operador</Typography>

            <TextGeneral text={data.operador.nombre} label="Nombre del operador" />
            <TextGeneral
              text={data.operador.contacto}
              label="Contacto del operador"
            />

            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={ToggleModalInfoOperator}
            >
              cerrar
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Modal
        open={modal.modal2}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Fade timeout={500} in={modal.modal2}>
          <Box>
            <FormCheckTank data={data} toggleModal={ToggleModalExitRegister} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export { HistoryItem };

function HistoryItemVigilancia({ data, ToggleModalInfoOperator, ToggleModalExitRegister, IsSmall, }) {

  const {
    typeRegister,
    linea,
    tanques,
    operador,
    tracto,
    numeroTanques,
    typeChargue,
    dayInput,
    dateInput,
    OperatorSliceName,
    shortNameOperator,
  } = transformRegisters(data);

  return (
    <>
      <Stack spacing="8px" flexDirection="column">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
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
              color={typeRegister === "entrada" ? "success" : "warning"}
              label={typeRegister}
              icon={
                typeRegister === "entrada" ? (
                  <KeyboardDoubleArrowRightIcon />
                ) : (
                  <KeyboardDoubleArrowLeftIcon />
                )
              }
              sx={{
                maxWidth: "100px",
                fontWeight: 500,
                padding: "5px",
              }}
            />

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

          </Stack>

          {
            typeChargue == "Pipa" &&
            typeRegister === "entrada" &&
            tanques[0].status === "parked" && (
              <Button
                onClick={ToggleModalExitRegister}
                size="small"
                variant="contained"
                color="info"
              >
                marcar salida
              </Button>
            )}

        </Stack>

        <Box
          sx={{
            display: "flex",
            width: '100%',
            flexDirection: IsSmall ? "column" : "row",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: !IsSmall ? "center" : "start",
            backgroundColor: "whitesmoke",
            borderRadius: "4px",
            padding: "15px",
          }}
        >
          <Stack
            width={'100%'}
            flexDirection={IsSmall ? "column" : "row"}
            justifyContent={IsSmall ? "flex-start" : "space-around"}
            alignItems={IsSmall ? "start" : "center"}
            gap="10px"
          >
            <TextGeneral width={'200px'} text={linea} label="Linea" />
            <Divider
              orientation={IsSmall ? "horizontal" : "vertical"}
              flexItem
            />
            <TextGeneral width={'50px'} label="Tracto" text={tracto} />
            <Divider
              orientation={IsSmall ? "horizontal" : "vertical"}
              flexItem
            />
            <TextGeneral width={'100px'} label="Tipo de carga" text={typeChargue} />
          </Stack>


          <Divider
            orientation={IsSmall ? "horizontal" : "vertical"}
            flexItem
          />


          <Stack
            width={'100%'}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent="space-between"
            gap="10px"
          >

            <Stack flexDirection="row" gap="10px">
              <TextGeneral width={'100px'} label="Operador" text={shortNameOperator} />
              <IconButton color="info" onClick={ToggleModalInfoOperator}>
                <InfoIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        {typeChargue === "Tanque" && (
          <Stack
            justifyContent="center"
            spacing="10px"
            sx={{
              borderRadius: "4px",
              backgroundColor: "whitesmoke",
              padding: "15px",
            }}
          >
            <strong>Tanques</strong>
            {tanques.map((tanque, index) => (
              <Box key={tanque.id}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                    height: '50px'
                  }}
                >
                  <TextGeneral
                    variant="row"
                    label={`# ${index + 1}`}
                    text={tanque.tanque}
                  />

                  {type === "vigilancia" &&
                    typeRegister === "entrada" &&
                    tanque.status === "parked" && (
                      <Button
                        onClick={ToggleModalExitRegister}
                        size="small"
                        variant="contained"
                        color="info"
                      >
                        marcar salida
                      </Button>
                    )}

                </Box>
                {numeroTanques != index + 1 && (
                  <Divider orientation={"horizontal"} flexItem />
                )}
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </>
  );
}

export { HistoryItemVigilancia };

function HistoryItemManiobras({ data, IsSmall, ToggleModalInfoOperator }) {

  const [state, dispatch] = useContext(DevelopmentContext)

  const { carga, tracto, numero_tanque, checkIn, linea, dayInput, dateInput, OperatorSliceName, shortNameOperator } = data;

  const time = tiempoTranscurrido(checkIn);

  const selectTank = () => {
    dispatch({ type: actionTypes.setSelectItem, payload: data })
  }

  const discardTank = () => {
    dispatch({ type: actionTypes.setSelectItem, payload: false })
  }

  return (
    <>
      <Stack spacing="8px" flexDirection="column">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
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
              label={time === 'a' ? '1 día' : `${time} días`}
              icon={<AccessTimeIcon />}
              sx={{
                maxWidth: "200px",
                fontWeight: 500,
                padding: "5px",
              }}
            />

          </Stack>


          <Button
            onClick={selectTank}
            size="small"
            variant="contained"
            color="info"
          >
            check
          </Button>

        </Stack>

        <Box
          sx={{
            display: "flex",
            width: '100%',
            flexDirection: IsSmall ? "column" : "row",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: !IsSmall ? "center" : "start",
            backgroundColor: "whitesmoke",
            borderRadius: "4px",
            padding: "15px",
          }}
        >
          <Stack
            width={'100%'}
            flexDirection={IsSmall ? "column" : "row"}
            justifyContent={IsSmall ? "flex-start" : "space-around"}
            alignItems={IsSmall ? "start" : "center"}
            gap="10px"
          >
            <TextGeneral width={'200px'} text={linea} label="Linea" />
            <Divider
              orientation={IsSmall ? "horizontal" : "vertical"}
              flexItem
            />
            <TextGeneral width={'50px'} label="Tracto" text={tracto} />
            <Divider
              orientation={IsSmall ? "horizontal" : "vertical"}
              flexItem
            />
            <TextGeneral width={'100px'} label="Tipo de carga" text={carga} />
            {(carga === 'Tanque') && <>
              <Divider
                orientation={IsSmall ? "horizontal" : "vertical"}
                flexItem
              />
              <TextGeneral width={'70px'} label="N° tanque" text={numero_tanque} />
            </>}
          </Stack>


          <Divider
            orientation={IsSmall ? "horizontal" : "vertical"}
            flexItem
          />

          <Stack
            width={'100%'}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent="space-between"
            gap="10px"
          >

            <Stack flexDirection="row" gap="10px">
              <TextGeneral width={'100px'} label="Operador" text={shortNameOperator} />
              <IconButton color="info" onClick={ToggleModalInfoOperator}>
                <InfoIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

      </Stack>
    </>
  );
}

export { HistoryItemManiobras };
