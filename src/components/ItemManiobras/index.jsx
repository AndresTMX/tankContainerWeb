import { useState } from "react";
//components
import { Box, Paper, Stack, Button, IconButton, Skeleton, Chip, Modal, Fade, Alert, Divider, Typography, TextField, InputLabel, FormControl, MenuItem, Select } from "@mui/material";
//customComponents
import { ModalInfoOperator } from "../ModalInfoOperator";
import { ItemLoadingState } from "../ItemLoadingState";
import { TextGeneral } from "../TextGeneral";
//hooks
import { useNavigate } from "react-router-dom";
import { useDetailsForManiobra } from "../../Hooks/Maniobras/useDetailsForManiobra";
import { usePostRegister } from "../../Hooks/Maniobras/usePostRegister";
import useMediaQuery from "@mui/material/useMediaQuery";
//helpers
import { dateMXFormat, dateInTextEn, datetimeMXFormat } from "../../Helpers/date";
//icons
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
//services
import { updateItemManiobra, storagePipa, deleteManiobra, returnTractoEmpty } from "../../services/registros";
//libraries
import { toast } from "sonner";

export function ItemManiobras({ register, changueTypeManiobra }) {

    const navigate = useNavigate();

    const IsSmall = useMediaQuery("(max-width:900px)");

    const { checkIn, created_at, tracto, numero_economico: economico, type: typeRegister, operadores, status: statusRegister, id: idRegister } = register || {};
    const { data: details, loading, error } = useDetailsForManiobra(idRegister, typeRegister)
    const { carga, transportistas, status, clientes } = details[0] || {};


    const { nombre, contacto, id: operadorId } = operadores || {};
    const { name: linea, id: idTransportista } = transportistas || {};
    const { cliente, id: idCliente } = clientes || {};

    const registerData = { carga: carga, cliente_id: idCliente, entrada_id: idRegister, transportista_id: idTransportista }

    const detailManiobras = details?.filter((i) => i.status === 'maniobras')

    const [modalTanks, setModalTanks] = useState(false);
    // const [modalChargue, setModalChargue] = useState(false)

    //bajar tanque a maniobras
    async function downTank(id) {
        try {

            const { error } = await updateItemManiobra(id, { status: 'eir' });

            if (error) {
                throw new Error(error)
            } else {
                toast.success('tanque bajado a maniobras')
            }

        } catch (error) {
            toast.error(error)
        }
    }

    //eliminar maniobra y detalles
    async function deleteManiobraAndDetails() {
        try {

            const { error } = await deleteManiobra(idRegister);

            if (error) {
                throw new Error(error)
            } else {
                toast.success('Registro y maniobra eliminados')
            }

        } catch (error) {
            toast.error(error?.message)
        }
    }

    //retornar vacio
    async function returnEmpty() {
        try {

            let dataOutputRegister = {
                type: 'salida',
                numero_economico: economico,
                operador_id: operadorId,
                tracto: tracto
            }

            let dataOuputDetail = {
                carga: 'vacio',
                numero_tanque: null,
                cliente_id: idCliente,
                transportista_id: idTransportista,
            }


            const { error } = await returnTractoEmpty(idRegister, dataOutputRegister, dataOuputDetail);

            if (error) {
                throw new Error(error)
            } else {
                toast.success('Cargas enviadas a EIR, salida creada')
            }

        } catch (error) {
            toast.error(error?.message)
        }
    }


    const detalles = statusRegister === "forconfirm" ? details : detailManiobras;

    const [modalOperator, setModalOperator] = useState(false);
    const toggleModalOperator = () => setModalOperator(!modalOperator);

    return (
        <Paper elevation={3} >

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

                    {(carga === "tanque" && statusRegister === 'confirm' && detailManiobras.length === 0 && typeRegister === 'entrada') &&
                        <Alert sx={{ width: '100%' }} severity="info">
                            Puedes subir tanques a este tractocamion para generar una salida
                        </Alert>
                    }

                    {(carga === "vacio" && statusRegister === 'confirm' && typeRegister === 'entrada') &&
                        <Alert sx={{ width: '100%' }} severity="info">
                            Puedes subir tanques a este tractocamion para generar una salida
                        </Alert>
                    }

                    <Stack
                        flexDirection="row"
                        justifyContent='space-between'
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
                                    fontWeight: 500,
                                    padding: "5px",
                                }}
                            />

                            <Chip
                                size="small"
                                color="secondary"
                                label={checkIn != null ? `${typeRegister} el ${dateInTextEn(checkIn)}` : `Creada el ${dateMXFormat(created_at)}`}
                                icon={<CalendarTodayIcon />}
                                sx={{
                                    fontWeight: 500,
                                    padding: "5px",
                                }}
                            />

                            <Chip
                                size="small"
                                color="info"
                                label={checkIn != null ? `${datetimeMXFormat(checkIn)}` : `${datetimeMXFormat(created_at)}`}
                                icon={<AccessTimeIcon />}
                                sx={{
                                    fontWeight: 500,
                                    padding: "5px",
                                }}
                            />

                        </Stack>

                        <Stack flexDirection='row' gap='10px' justifyContent='flex-start'>

                            {(carga === 'pipa' && statusRegister === 'confirm') &&
                                <Button
                                    onClick={() => storagePipa(idRegister)}
                                    size="small"
                                    variant="contained"
                                    color="info"
                                >
                                    almacenar
                                </Button>}

                            {(carga != 'pipa' && statusRegister === 'confirm' && detailManiobras.length === 0) &&
                                <Button
                                    onClick={() => navigate(`nueva-salida/${encodeURIComponent(JSON.stringify({ register, details }))}`)}
                                    size="small"
                                    variant="contained"
                                    color="warning"
                                >
                                    Subir tanques
                                </Button>}

                            {(carga != 'pipa' && statusRegister === 'confirm') &&
                                <Button
                                    onClick={() => returnEmpty(idRegister, details, economico, tracto, operadorId)}
                                    size="small"
                                    variant="contained"
                                    color="error"
                                >
                                    retornar vacio
                                </Button>}

                            {(statusRegister === 'forconfirm' && typeRegister === 'entrada') &&
                                <Button
                                    onClick={() => navigate(`edicion/${encodeURIComponent(JSON.stringify({ items: details }))}`)}
                                    size="small"
                                    variant="contained"
                                    color="warning"
                                >
                                    editar
                                </Button>}

                            {(statusRegister === 'forconfirm' && typeRegister === 'entrada') &&
                                <Button
                                    onClick={deleteManiobraAndDetails}
                                    size="small"
                                    variant="contained"
                                    color="error"
                                >
                                    eliminar
                                </Button>}
                        </Stack>


                    </Stack>

                    <Stack
                        bgcolor='whitesmoke'
                        flexDirection='row'
                        alignItems='center'
                        gap='10px'
                        padding='10px'
                    >
                        <Typography variant="subtitle2">
                            Cliente
                        </Typography>

                        <Typography variant="subtitle">
                            {cliente}
                        </Typography>
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
                            <TextGeneral width={IsSmall ? 'auto' : '100px'} label="Tracto" text={economico} />
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
                                    text={nombre} />
                                <IconButton color="info" onClick={toggleModalOperator}>
                                    <InfoIcon />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Box>

                    {(carga === "tanque" && detalles.length >= 1) && (
                        <Stack
                            justifyContent="center"
                            spacing="10px"
                            sx={{
                                borderRadius: "4px",
                                backgroundColor: "whitesmoke",
                                padding: "15px",
                            }}
                        >
                            <Stack flexDirection='row' alignItems='center' gap='10px' justifyContent='space-between'>
                                <Typography variant='button'>{`${carga}s`}</Typography>

                                {(statusRegister === 'forconfirm' && typeRegister === 'entrada') &&
                                    <Button
                                        endIcon={<AddIcon />}
                                        onClick={() => navigate(`adicion/${encodeURIComponent(JSON.stringify({ register, details }))}`)}
                                        size="small"
                                        variant="outlined"
                                        color="info"
                                    >
                                        agregar carga
                                    </Button>}

                            </Stack>
                            {detalles.map((detail, index) => (
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

                                        <Stack flexDirection={'row'} alignItems='center' gap='5px'>
                                            <Typography>{`${index + 1} ° `}</Typography>
                                            <Chip size="small" sx={{ textTransform: 'uppercase' }} color="info" label={detail.especificacion} />
                                            <Typography variant="button">{`${detail.tipo}   ${detail.numero_tanque}`}</Typography>
                                        </Stack>

                                        {statusRegister === 'confirm' &&
                                            <Button
                                                onClick={() => downTank(detail.id)}
                                                size="small"
                                                variant="contained"
                                                color="warning"
                                            >
                                                Bajar tanque
                                            </Button>}

                                    </Box>
                                    {detalles.length != index + 1 && (
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
                            <Stack flexDirection='row' alignItems='center' gap='10px' justifyContent='space-between'>
                                <Typography variant='button'>{`${carga}s`}</Typography>

                                {(statusRegister === 'forconfirm' && typeRegister === 'entrada') &&
                                    <Button
                                        endIcon={<AddIcon />}
                                        onClick={() => navigate(`adicion/${encodeURIComponent(JSON.stringify({ register, details }))}`)}
                                        size="small"
                                        variant="outlined"
                                        color="info"
                                    >
                                        agregar carga
                                    </Button>}

                            </Stack>
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

            <ModalInfoOperator modal={modalOperator} toggleModal={toggleModalOperator} nombre={nombre} contacto={contacto} />
        </Paper>
    )
}
