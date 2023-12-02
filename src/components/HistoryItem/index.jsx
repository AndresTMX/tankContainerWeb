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
  Skeleton,
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
import { actionTypes } from "../../Reducers/ManiobrasReducer";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { tiempoTranscurrido } from "../../Helpers/date";
import { ToggleItem } from "../../Helpers/crud";
//context
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { GlobalContext } from "../../Context/GlobalContext";

function HistoryItem({ data, type }) {

  const IsSmall = useMediaQuery("(max-width:900px)");
  const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
  const [state, dispatch] = useContext(ManiobrasContext);
  const { selectOutputRegisters } = state;

  const dataOperador = type === 'vigilancia' ?
    data.type === 'entrada' ?
      data.registros_detalles_entradas[0].operadores :
      data.registros_detalles_salidas[0].operadores :
    data.operador;

  const [modal, setModal] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
  });

  const ToggleModalInfoOperator = () => {
    setModal({ ...modal, modal1: !modal.modal1 });
  };

  const AddSelectOutputRegisters = (newItem, typeItem, tracto) => {

    let item

    const lastIndex = selectOutputRegisters.length - 1;

    if (selectOutputRegisters?.length >= 1 && selectOutputRegisters[lastIndex].carga != typeItem) {
      dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: 'Agrega solo un tipo de registro a la vez' })
    } else {

      if (typeItem === 'Tanque') {
        item = {
          registro_id: newItem.id,
          numero_tanque: newItem.tanque,
          carga: typeItem,
        }
      }

      if (typeItem === 'Pipa') {
        item = {
          registro_id: newItem.id,
          carga: typeItem,
          tracto: tracto
        }
      }

      if (typeItem === 'Vacio') {
        item = {
          registro_id: tracto,
          carga: typeItem,
          tracto: tracto
        }
      }

      const newState = ToggleItem(item, selectOutputRegisters)
      dispatch({ type: actionTypes.setSelectOutputRegister, payload: newState })

    }

  }

  const typeButton = (id) => selectOutputRegisters.filter((item) => item.registro_id === id).length >= 1 ? 'contained' : 'outlined';

  const colorButton = (id) => selectOutputRegisters.filter((item) => item.registro_id === id).length >= 1 ? 'error' : 'primary';

  const textButton = (id) => selectOutputRegisters.filter((item) => item.registro_id === id).length >= 1 ? 'eliminar' : 'agregar';

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
            textButton={textButton}
            typeButton={typeButton}
            colorButton={colorButton}
            AddItem={AddSelectOutputRegisters}
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

            <TextGeneral text={dataOperador.nombre} label="Nombre del operador" />
            <TextGeneral
              text={dataOperador.contacto}
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
    </>
  );
}

export { HistoryItem };

export function HistoryItemVigilancia({ data, ToggleModalInfoOperator, AddItem, IsSmall, typeButton, colorButton, textButton }) {

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
    tracto_status
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
            tanques[0].status === "full" && (
              <Button
                onClick={() => AddItem(tanques[0], 'Pipa', tracto)}
                variant={typeButton(tanques[0].id)}
                color={colorButton(tanques[0].id)}
                size="small"
              >
                {` ${textButton(tanques[0].id)} pipa`}
              </Button>
            )}

          {
            typeChargue == "Tanque" &&
            typeRegister === "entrada" &&
            tracto_status === "ready" && (
              <Button
                onClick={() => AddItem(tanques[0], 'Vacio', tracto)}
                variant={typeButton(tracto)}
                color={colorButton(tracto)}
                size="small"
              >
                {` ${textButton(tracto)} tracto`}
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

                  {
                    typeRegister === "entrada" &&
                    tanque.status === "full" && (
                      <Button
                        onClick={() => AddItem(tanque, 'Tanque')}
                        size="small"
                        variant={typeButton(tanque.id)}
                        color={colorButton(tanque.id)}
                      >
                        {` ${textButton(tanque.id)} tanque`}
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

export function HistoryItemManiobras({ data, IsSmall, ToggleModalInfoOperator }) {

  const [state, dispatch] = useContext(ManiobrasContext)

  const { carga, tracto, numero_tanque, checkIn, linea, dayInput, dateInput, OperatorSliceName, shortNameOperator } = data;

  const time = tiempoTranscurrido(checkIn);

  const selectTank = () => {
    dispatch({ type: actionTypes.setSelectItem, payload: data })
    dispatch({ type: actionTypes.setSelect, payload: true })
  }

  const discardTank = () => {
    dispatch({ type: actionTypes.setSelectItem, payload: false })
    dispatch({ type: actionTypes.setSelect, payload: false })

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
              label={time}
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

export function HistoryItemLoading() {
  const IsSmall = useMediaQuery("(max-width:900px)");
  return (
    <>
      <Paper sx={{ display: "flex", flexDirection: "column", padding: "10px", gap: "10px", width: '80vw', maxWidth: '100%' }}>
        <Stack sx={{ maxWidth: '700px' }}>
          <Stack
            justifyContent="space-between"
            flexDirection="row"
            flexWrap="wrap"
            gap="10px"
          >

            <Stack
              justifyContent="start"
              flexDirection="row"
              flexWrap="wrap"
              gap="10px"
            >
              <Skeleton variant="rounded" width={120} height={20} />
              <Skeleton variant="rounded" width={80} height={20} />
              <Skeleton variant="rounded" width={80} height={20} />
            </Stack>

            <Stack>
              <Skeleton variant="rounded" width={80} height={20} />
            </Stack>

          </Stack>
        </Stack>
        <Stack flexDirection="row" gap="10px" flexWrap="wrap" >
          <Skeleton variant="rectangular" width={IsSmall ? '100%' : '20%'} height={40} />
          <Skeleton variant="rectangular" width={IsSmall ? '100%' : '10%'} height={40} />
          <Skeleton variant="rectangular" width={IsSmall ? '100%' : '10%'} height={40} />
          <Skeleton variant="rectangular" width={IsSmall ? '100%' : '15%'} height={40} />
        </Stack>
      </Paper>
    </>
  );
}

