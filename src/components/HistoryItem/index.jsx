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
  Container,
  Alert,
} from "@mui/material";
import { TextGeneral } from "../TextGeneral";
import { ViewTanks } from "../ViewTanks";
import { FormEditManiobras } from "../FormEditManiobras";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useUpdateRegister } from "../../Hooks/Vigilancia/useUpdateRegister";
import { useDeletRegister } from "../../Hooks/Maniobras/useDeletRegister";
import { usePostRegister } from "../../Hooks/Maniobras/usePostRegister";
import { useDownContainer } from "../../Hooks/Maniobras/useDownContainer";
//icons
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
//helpers
import { transformRegisters } from "../../Helpers/transformRegisters";
import { datetimeMXFormat, dateMXFormat } from "../../Helpers/date";
//context
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { useEditManiobra } from "../../Hooks/Maniobras/useEditManiobra";

function HistoryItem({ data, type, typeManiobra, updater, changueTypeManiobra }) {

  const IsSmall = useMediaQuery("(max-width:900px)");
  const dataOperador = extractDataOperator(type, data)

  function extractDataOperator(type, data) {

    let dataOperador

    if (type === 'vigilancia') {

      const typeItem = data.type;
      dataOperador = typeItem === 'entrada' ?
        data?.registros_detalles_entradas[0]?.operadores :
        data?.registros_detalles_salidas[0]?.operadores;
    }

    if(type === 'maniobras'){
      dataOperador = {}
    }

    if (type === 'eir') {
      dataOperador = data.operador
    }

    return dataOperador

  }

  const [modal, setModal] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
  });

  const ToggleModalInfoOperator = () => {
    setModal({ ...modal, modal1: !modal.modal1 });
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
            updater={updater}
            IsSmall={IsSmall}
            ToggleModalInfoOperator={ToggleModalInfoOperator}

          />
        )}

        {type === 'maniobras' && (
          <HistoryItemManiobras
            data={data}
            updater={updater}
            IsSmall={IsSmall}
            typeManiobra={typeManiobra}
            changueTypeManiobra={changueTypeManiobra}
            ToggleModalInfoOperator={ToggleModalInfoOperator} />
        )}

      </Paper>

      
    </>
  );
}

export { HistoryItem };

export function HistoryItemVigilancia({ data, ToggleModalInfoOperator, IsSmall, updater }) {

  const {
    typeRegister,
    linea,
    tanques,
    tanquesManiobras,
    operador,
    tracto,
    numeroTanques,
    typeChargue,
    dayInput,
    dateInput,
    OperatorSliceName,
    shortNameOperator,
    dayCreat,
    dateCreate,
  } = transformRegisters(data);

  const [modalConfirm, setModalConfirm] = useState(false);

  const { checkRegisterWhitId, checkOutRegisterWhitId } = useUpdateRegister(updater);

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
              label={dayCreat}
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
              label={dateCreate}
              icon={<AccessTimeIcon />}
              sx={{
                maxWidth: "90px",
                fontWeight: 500,
                padding: "5px",
              }}
            />


          </Stack>

          <Stack>

            {(typeRegister === 'entrada') &&
              <Button
                onClick={() => checkRegisterWhitId(data.id, data)}
                size="small"
                variant="contained"
                color="primary"
              >
                CheckIn
              </Button>}


            {(typeRegister === 'salida') &&
              <Button
                onClick={() => checkOutRegisterWhitId(data.id, data)}
                size="small"
                variant="contained"
                color="primary"
              >
                CheckOut
              </Button>}

          </Stack>

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

        {(typeChargue != 'vacio' && tanques.length >= 1) && (
          <Stack
            justifyContent="center"
            spacing="10px"
            sx={{
              borderRadius: "4px",
              backgroundColor: "whitesmoke",
              padding: "15px",
            }}
          >
            <strong>{`${typeChargue}s`}</strong>
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
                    text={typeChargue === 'tanque' ? tanque.tanque : tanque.pipa}
                  />

                </Box>
                {numeroTanques != index + 1 && (
                  <Divider orientation={"horizontal"} flexItem />
                )}
              </Box>
            ))}
          </Stack>
        )}
      </Stack>

      <Modal open={modalConfirm}>
        <Container>
          <Box>
            <Paper>
              <Typography>Desea confirmar la {typeRegister} de este registro</Typography>

              <Stack>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => { }}
                >Confirmar</Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => { }}
                >cancelar</Button>
              </Stack>
            </Paper>
          </Box>
        </Container>
      </Modal>
    </>
  );
}

export function HistoryItemManiobras({ data, IsSmall, ToggleModalInfoOperator, typeManiobra, updater, changueTypeManiobra }) {
console.log("🚀 ~ file: index.jsx:391 ~ HistoryItemManiobras ~ data:", data)

  //  const { carga, tracto, operadores, registros, transportistas } = data[0];
  //  const { nombre } = operadores || {};
  //  const { name: linea } = transportistas || {};
  //  const { checkIn, type , status} = registros || {};
  //  console.log("🚀 ~ file: index.jsx:397 ~ HistoryItemManiobras ~ status:", status)

  //  //Nmbre corto del operador
  //  const OperatorSliceName = nombre.split(" ").slice(0, 2);
  //  const shortNameOperator = `${OperatorSliceName[0]} ${OperatorSliceName[1]}`;

  // const {
  //   typeRegister,
  //   linea,
  //   tanques,
  //   tanquesManiobras,
  //   tracto,
  //   numeroTanques,
  //   typeChargue,
  //   shortNameOperator,
  //   dayCreat,
  //   dateCreate,
  // } = transformRegisters(data);

  const [state, dispatch] = useContext(ManiobrasContext);
  const [modalTanks, setModalTanks] = useState(false);
  const [editData, setEditData] = useState(false);

  const { routerDelet } = useDeletRegister(updater);
  const { returnEmpty } = usePostRegister(updater);
  const { changueStatusToWashing } = useEditManiobra();
  const { downContainerToManiobra } = useDownContainer();

  const dowTank = (tanque) => {
    downContainerToManiobra(tanque.id, tanque.tanque)
    setTimeout(() => {
      updater()
    }, 1200)
  }

  const changueToWashing = async () => {
    await changueStatusToWashing(data.id);
    setTimeout(() => {
      updater()
    }, 1200)
  }

  return (
    <>
      {/* <Stack spacing="8px" flexDirection="column">

        {(carga === "tanque" && data.length === 0) &&
          <Alert sx={{ width: '100%' }} severity="info">
            Puedes subir tanques a este tractocamion para generar una salida
          </Alert>
        }

        {(carga === "vacio") &&
          <Alert sx={{ width: '100%' }} severity="info">
            Puedes subir tanques a este tractocamion para generar una salida
          </Alert>
        }

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
              label={dateMXFormat(checkIn)}
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
              label={datetimeMXFormat(checkIn)}
              icon={<AccessTimeIcon />}
              sx={{
                maxWidth: "90px",
                fontWeight: 500,
                padding: "5px",
              }}
            />

            <Chip
              size="small"
              color={type === "entrada" ? "success" : "warning"}
              label={type}
              icon={
                type === "entrada" ? (
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

          </Stack>

          <Stack flexDirection='row' gap='10px'>

            {(carga === 'pipa' && status === 'confirm') &&
              <Button
                onClick={changueToWashing}
                size="small"
                variant="contained"
                color="info"
              >
                pasar a lavado
              </Button>}

            {(carga != 'pipa' && status === 'confirm' && data.length === 0) &&
              <Button
                onClick={() => setModalTanks(!modalTanks)}
                size="small"
                variant="contained"
                color="warning"
              >
                Subir tanques
              </Button>}

            {(carga != 'pipa' && status === 'confirm') &&
              <Button
                onClick={() => returnEmpty(data)}
                size="small"
                variant="contained"
                color="error"
              >
                retornar vacio
              </Button>}

            {(status === 'pendiente') &&
              <Button
                onClick={() => setEditData(true)}
                size="small"
                variant="contained"
                color="warning"
              >
                editar registro
              </Button>}

            {(status === 'pendiente' && type === 'entrada') &&
              <Button
                onClick={() => routerDelet(carga, data)}
                size="small"
                variant="contained"
                color="error"
              >
                eliminar registro
              </Button>}
          </Stack>


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

        {(carga === "tanque" && data.length >= 1) && (
          <Stack
            justifyContent="center"
            spacing="10px"
            sx={{
              borderRadius: "4px",
              backgroundColor: "whitesmoke",
              padding: "15px",
            }}
          >
            <strong>{`${carga}s`}</strong>
            {data.map((tanque, index) => (
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
                    text={carga === 'tanque' ? tanque.numero_tanque : tanque.numero_pipa}
                  />

                  {status === 'confirm' &&
                    <Button
                      onClick={() => dowTank(tanque)}
                      size="small"
                      variant="contained"
                      color="warning"
                    >
                      Bajar tanque
                    </Button>}

                </Box>
                {data.length != index + 1 && (
                  <Divider orientation={"horizontal"} flexItem />
                )}
              </Box>
            ))}
          </Stack>
        )}

        {(type === "pipa") && (
          <Stack
            justifyContent="center"
            spacing="10px"
            sx={{
              borderRadius: "4px",
              backgroundColor: "whitesmoke",
              padding: "15px",
            }}
          >
            <strong>{`${type}s`}</strong>
            {data.map((tanque, index) => (
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
                    label={`N°`}
                    text={type === 'tanque' ? tanque.tanque : tanque.pipa}
                  />

                </Box>
                {data.length != index + 1 && (
                  <Divider orientation={"horizontal"} flexItem />
                )}
              </Box>
            ))}
          </Stack>
        )}

      </Stack> */}

      {/* {modalTanks &&
        <Modal open={modalTanks}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh'
            }}>
            <ViewTanks toggle={setModalTanks} data={data} changueTypeManiobra={changueTypeManiobra} />
          </Box>
        </Modal>
      }

      {editData &&
        <Modal open={editData}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh'
            }}>
            <FormEditManiobras data={data} toggleModal={setEditData} updater={updater} />
          </Box>
        </Modal>
      } */}

    </>
  )
}

export function HistoryItemLoading() {
  const IsSmall = useMediaQuery("(max-width:900px)");
  return (
    <>
      <Paper sx={{ display: "flex", flexDirection: "column", padding: "10px", gap: "10px"}}>
        <Stack>
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

