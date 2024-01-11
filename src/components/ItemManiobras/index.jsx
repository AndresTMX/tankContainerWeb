import { useState } from "react";
//components
import { Box, Paper, Stack, Button, IconButton, Skeleton, Chip, Modal, Fade, Alert, Divider, Typography } from "@mui/material";
//customComponents
import { ModalInfoOperator } from "../ModalInfoOperator";
import { FormEditManiobras } from "../FormEditManiobras";
import { HistoryItemLoading } from "../HistoryItem";
import { TextGeneral } from "../TextGeneral";
import { ViewTanks } from "../ViewTanks";
//hooks
import { useDetailsForManiobra } from "../../Hooks/Maniobras/useDetailsForManiobra";
import { useDeletRegister } from "../../Hooks/Maniobras/useDeletRegister";
import { useDownContainer } from "../../Hooks/Maniobras/useDownContainer";
import { usePostRegister } from "../../Hooks/Maniobras/usePostRegister";
import { useEditManiobra } from "../../Hooks/Maniobras/useEditManiobra";
import useMediaQuery from "@mui/material/useMediaQuery";
//helpers
import { dateMXFormat, datetimeMXFormat } from "../../Helpers/date";
//icons
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";


export function ItemManiobras({ register, updaterRegisters, changueTypeManiobra }) {

    const IsSmall = useMediaQuery("(max-width:900px)");

    const { checkIn, created_at, type: typeRegister, status: statusRegister, id: idRegister } = register || {};
    const { details, detailManiobras, loading, error, updateDetails } = useDetailsForManiobra(idRegister, typeRegister)
    const { carga, tracto, operadores, transportistas, status } = details[0] || {};
    const { nombre, contacto } = operadores || {};
    const { name: linea } = transportistas || {};

    // const [state, dispatch] = useContext(ManiobrasContext);
    const [modalTanks, setModalTanks] = useState(false);
    const [editData, setEditData] = useState(false);

    //bajar tanque a maniobras
    const { downContainerToManiobra } = useDownContainer(updateDetails);
    //mandar pipa a prelavado
    const { changueStatusToWashing } = useEditManiobra(updaterRegisters);
    //eliminar registro
    const { routerDelet } = useDeletRegister(updaterRegisters);
    //retornar vacio
    const { returnEmpty } = usePostRegister(updaterRegisters);

    const [modalOperator, setModalOperator] = useState(false);
    const toggleModalOperator = () => setModalOperator(!modalOperator);

    return (
        <Paper elevation={3}>

            {(loading && !error) &&
                <Stack gap='8px' padding='15px'>
                    <Stack flexDirection='row' alignItems='center' gap='15px'>
                        <Skeleton variant='text' width='150px' height='50px' />
                        <Skeleton variant='text' width='150px' height='50px' />
                        <Skeleton variant='text' width='150px' height='50px' />
                    </Stack>
                    <Stack>
                        <Skeleton variant='rounded' width='100%' height='300px' />
                    </Stack>
                </Stack>
            }

            {(!loading && !error) &&

                <Stack gap="8px" flexDirection="column" padding="15px">

                    {(carga === "tanque" && detailManiobras.length === 0) &&
                        <Alert sx={{ width: '100%' }} severity="info">
                            Puedes subir tanques a este tractocamion para generar una salida
                        </Alert>
                    }

                    {(carga === "vacio" && statusRegister === 'confirm') &&
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
                                label={dateMXFormat(checkIn || created_at)}
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
                                label={datetimeMXFormat(checkIn || created_at)}
                                icon={<AccessTimeIcon />}
                                sx={{
                                    maxWidth: "90px",
                                    fontWeight: 500,
                                    padding: "5px",
                                }}
                            />

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

                        </Stack>

                        <Stack flexDirection='row' gap='10px'>

                            {(carga === 'pipa' && statusRegister === 'confirm') &&
                                <Button
                                    onClick={() => changueStatusToWashing(idRegister)}
                                    size="small"
                                    variant="contained"
                                    color="info"
                                >
                                    pasar a prelavado
                                </Button>}

                            {(carga != 'pipa' && statusRegister === 'confirm') &&
                                <Button
                                    onClick={() => setModalTanks(!modalTanks)}
                                    size="small"
                                    variant="contained"
                                    color="warning"
                                >
                                    Subir tanques
                                </Button>}

                            {(carga != 'pipa' && statusRegister === 'confirm') &&
                                <Button
                                    onClick={() => returnEmpty(idRegister, details)}
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

                            {(statusRegister === 'forconfirm' && typeRegister === 'entrada') &&
                                <Button
                                    onClick={() => routerDelet(carga, idRegister, details)}
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
                            <TextGeneral width={IsSmall ? 'auto' : '100px'} label="Tracto" text={tracto} />
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
                                <TextGeneral width={'100px'} label="Operador"
                                    text={`${nombre?.split(" ").slice(0, 2)[0]} ${nombre?.split(" ").slice(0, 2)[1]} `} />
                                <IconButton color="info" onClick={toggleModalOperator}>
                                    <InfoIcon />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Box>

                    {(carga === "tanque" && details.length >= 1) && (
                        <Stack
                            justifyContent="center"
                            spacing="10px"
                            sx={{
                                borderRadius: "4px",
                                backgroundColor: "whitesmoke",
                                padding: "15px",
                            }}
                        >
                            <Typography variant='button'>{`${carga}s`}</Typography>
                            {details.map((detail, index) => (
                                <Box key={detail.id}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: 'center',
                                            height: '50px'
                                        }}
                                    >

                                        <Stack flexDirection={'row'} gap='5px'>
                                            <Typography>{`${index + 1} ° `}</Typography>
                                            <Typography variant="button">{detail.numero_tanque}</Typography>
                                        </Stack>

                                        {statusRegister === 'confirm' &&
                                            <Button
                                                onClick={() => downContainerToManiobra(detail.id,)}
                                                size="small"
                                                variant="contained"
                                                color="warning"
                                            >
                                                Bajar tanque
                                            </Button>}

                                    </Box>
                                    {details.length != index + 1 && (
                                        <Divider orientation={"horizontal"} flexItem />
                                    )}
                                </Box>
                            ))}
                        </Stack>
                    )}

                    {(carga === "pipa") && (
                        <Stack
                            justifyContent="center"
                            spacing="10px"
                            sx={{
                                borderRadius: "4px",
                                backgroundColor: "whitesmoke",
                                padding: "15px",
                            }}
                        >
                            <Typography variant='button' >{`${carga}s`}</Typography>
                            {details.map((detail, index) => (
                                <Box key={detail.id}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: 'center',
                                            height: '50px'
                                        }}
                                    >
                                        <Stack flexDirection={'row'} gap='5px'>
                                            <Typography>{`${index + 1} ° `}</Typography>
                                            <Typography variant="button">{detail.numero_pipa}</Typography>
                                        </Stack>

                                    </Box>
                                    {details.length != index + 1 && (
                                        <Divider orientation={"horizontal"} flexItem />
                                    )}
                                </Box>
                            ))}
                        </Stack>
                    )}

                </Stack>}

            {modalTanks &&
                <Modal open={modalTanks}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '100vh'
                        }}>
                        <ViewTanks
                            details={details}
                            toggle={setModalTanks}
                            detailManiobras={detailManiobras}
                            changueTypeManiobra={changueTypeManiobra}
                        />
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
                        <FormEditManiobras data={details} toggleModal={setEditData} updater={updater} />
                    </Box>
                </Modal>
            }


            <ModalInfoOperator modal={modalOperator} toggleModal={toggleModalOperator} nombre={nombre} contacto={contacto} />
        </Paper>
    )
}