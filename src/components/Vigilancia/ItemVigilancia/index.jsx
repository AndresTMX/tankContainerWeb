//components
import { Box, Stack, Typography, Fade, Alert, Paper, Button, IconButton, Chip, Modal, Divider } from "@mui/material";
import { TextGeneral } from "../../TextGeneral";
import { ItemLoadingState } from "../../ItemLoadingState";
import { NotConexionState } from "../../NotConectionState";
import { ContainerScroll } from "../../ContainerScroll";
import { ModalInfoOperator } from "../../ModalInfoOperator";
//hooks
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDetailsForManiobra } from "../../../Hooks/Maniobras/useDetailsForManiobra";
import { useUpdateRegister } from "../../../Hooks/Vigilancia/useUpdateRegister";
//icons
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
//helpers
import { datetimeMXFormat, dateMXFormat } from "../../../Helpers/date";

function RegistersVigilancia({ data, error, loading, search, resultsSearch, errorSearch, loadingSearch, updater }) {

    const isMovile = useMediaQuery('(max-width:635px)');

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", margin: 'auto' }}>
                <ContainerScroll height={isMovile ? "68vh" : "72vh"}>

                    <Stack gap='10px' width='100%'>

                        {(error) && (
                            <NotConexionState />
                        )}

                        {(!error && errorSearch) &&
                            <Fade in={errorSearch}>
                                <Box sx={{ width: '90vw', maxWidth: '700px' }}  >
                                    <Alert sx={{ width: '100%' }} severity="warning">{errorSearch.toString()}</Alert>
                                </Box>
                            </Fade>
                        }

                        {(!errorSearch && !loading && !loadingSearch && resultsSearch.length >= 1) &&
                            <Typography>Coincidencias encontradas para la busqeda {search}</Typography>
                        }

                        {(loading || loadingSearch) &&
                            <>
                                <ItemLoadingState />
                                <ItemLoadingState />
                                <ItemLoadingState />
                            </>
                        }

                        {(!error && !errorSearch && !loading && !loadingSearch && data.length === 0) &&
                            <Box sx={{ width: '90vw', maxWidth: '700px' }} >
                                <Alert sx={{ width: '100%' }} severity="warning">{'Sin maniobras pendientes'}</Alert>
                            </Box>
                        }


                        {(!error && !errorSearch && !loading && !loadingSearch && resultsSearch.length === 0 && data.length >= 1) &&
                            data.map((item) => (
                                <ItemVigilancia
                                    updater={updater}
                                    key={item.id}
                                    register={item}
                                />
                            ))
                        }

                        {(!errorSearch && !loading && !loadingSearch && resultsSearch.length >= 1) &&
                            data.map((item) => (
                                <ItemVigilancia
                                    updater={updater}
                                    key={item.id}
                                    register={item}
                                />
                            ))
                        }

                    </Stack>

                </ContainerScroll>
            </Box>
        </>
    );
}

export { RegistersVigilancia };

function ItemVigilancia({ register, updater }) {

    const IsSmall = useMediaQuery("(max-width:900px)");

    const { checkOutRegisterWhitId, checkRegisterWhitId } = useUpdateRegister(updater);

    const { checkIn, created_at, numero_economico, tracto, operadores, type: typeRegister, status: statusRegister, id: idRegister } = register || {};
    const { details, detailManiobras, loading, error, updateDetails } = useDetailsForManiobra(idRegister, typeRegister)
    const { carga, transportistas, status, clientes } = details[0] || {};
    const { nombre, contacto } = operadores || {};
    const { name: linea } = transportistas || {};
    const { cliente, id: idCliente } = clientes || {};

    const [modalOperator, setModalOperator] = useState(false);

    const toggleModalOperator = () => {
        setModalOperator(!modalOperator)
    }

    return (
        <>
            <Paper
                elevation={4}
                sx={{ display: "flex", flexDirection: "column", padding: "10px", }}>

                <Stack flexDirection="row" alignItems="center" flexWrap="wrap" gap="10px" >

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
                            maxWidth: "120px",
                            fontWeight: 500,
                            padding: "5px",
                        }}
                    />


                </Stack>


                {(typeRegister === 'entrada') &&
                    <Button
                        onClick={() => checkRegisterWhitId(idRegister, details)}
                        size="small"
                        variant="contained"
                        color="primary"
                    >
                        CheckIn
                    </Button>}


                {(typeRegister === 'salida') &&
                    <Button
                        onClick={() => checkOutRegisterWhitId(idRegister, details)}
                        size="small"
                        variant="contained"
                        color="primary"
                    >
                        CheckOut
                    </Button>}

                {
                    (carga != 'vacio' && details.length >= 1) && (
                        <Stack
                            justifyContent="center"
                            spacing="10px"
                            sx={{
                                borderRadius: "4px",
                                backgroundColor: "whitesmoke",
                                padding: "15px",
                            }}
                        >
                            <Typography variant="button">
                                {`${carga}s`}
                            </Typography>
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
                                            <Typography>{`${index + 1} °  ${detail?.tipo || ''} `}</Typography>
                                            <Typography variant="button">{detail.numero_tanque || detail.numero_pipa}</Typography>
                                        </Stack>

                                    </Box>
                                    {details.length != index + 1 && (
                                        <Divider orientation={"horizontal"} flexItem />
                                    )}
                                </Box>
                            ))}
                        </Stack>
                    )
                }

                <Stack
                    bgcolor='whitesmoke'
                    flexDirection={IsSmall ? 'column' : 'row'}
                    justifyContent='space-around'
                    gap='10px'
                    padding='10px'
                >
                    <Box>
                        <Typography variant='caption' >Tractocamion</Typography>
                        <Typography>{tracto}</Typography>
                    </Box>

                    <Divider
                        orientation={IsSmall ? "horizontal" : "vertical"}
                        flexItem
                    />

                    <Box>
                        <Typography variant='caption' >Economico</Typography>
                        <Typography>{numero_economico}</Typography>
                    </Box>


                    <Divider
                        orientation={IsSmall ? "horizontal" : "vertical"}
                        flexItem
                    />

                    <Box>
                        <Typography variant='caption' >Tipo de carga</Typography>
                        <Typography>{carga}</Typography>
                    </Box>

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

                        <Box>
                            <Typography variant='caption'>
                                Cliente
                            </Typography>

                            <Typography >
                                {cliente}
                            </Typography>
                        </Box>

                        <Divider
                            orientation={IsSmall ? "horizontal" : "vertical"}
                            flexItem
                        />

                        <Box>
                            <Typography variant='caption'>
                                Linea
                            </Typography>

                            <Typography >
                                {linea}
                            </Typography>
                        </Box>

                        <Divider
                            orientation={IsSmall ? "horizontal" : "vertical"}
                            flexItem
                        />

                        <Stack flexDirection="row" gap="10px">
                            <Box>
                                <Typography variant='caption'>Operador</Typography>
                                <Typography>{nombre}</Typography>
                            </Box>
                            <IconButton color="info" onClick={toggleModalOperator}>
                                <InfoIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Box>

            </Paper >


            <ModalInfoOperator
                nombre={nombre}
                contacto={contacto}
                modal={modalOperator}
                toggleModal={toggleModalOperator}
            />


        </>
    );
}

