import { useState, useMemo, } from "react";
import { Paper, Box, Stack, Pagination, Alert, Chip, Typography, Divider, IconButton, } from "@mui/material";
//custom components
import { ContainerScroll } from "../../ContainerScroll";
import { ModalInfoOperator } from "../../ModalInfoOperator";
import { ItemLoadingState } from "../../ItemLoadingState";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDetailsForManiobra } from "../../../Hooks/Maniobras/useDetailsForManiobra";
import { useVigilanciaContext } from "../../../Context/VigilanciaContext";
//icons
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import InfoIcon from "@mui/icons-material/Info";


export function EntradasVigilancia() {

    const movile = useMediaQuery('(max-width:820px)');
    const { searchValue, dataDinamic, loading, error, mode } = useVigilanciaContext();

    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const rowsPerPage = 10;

    const pages = Math.ceil(dataDinamic?.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return dataDinamic?.slice(start, end);
    }, [page, dataDinamic]);

    return (
        <>

            <ContainerScroll height={movile ? '70vh' : '76vh'} background='whitesmoke'>

                <Stack gap='10px' padding='0px' >

                    {(loading && !error && !dataDinamic?.length) &&
                        <>
                            <ItemLoadingState />
                            <ItemLoadingState />
                            <ItemLoadingState />
                            <ItemLoadingState />
                        </>
                    }

                    {(!loading && !error && !dataDinamic.length && mode === 'data') &&
                        <Alert severity='info'>Sin registros añadidos</Alert>
                    }

                    {(!error && !loading && dataDinamic.length && mode === 'search') &&
                        <Alert severity='info'>Resultados de busqueda {searchValue.current?.value} </Alert>
                    }

                    {(!error && !loading && !dataDinamic.length && mode === 'search') &&
                        <Alert severity='warning'>No se encontraron coincidencias para tu busqueda, {searchValue.current?.value}</Alert>
                    }


                    {
                        items.map((register) => (
                            <ItemEntrada
                                key={register.id}
                                register={register}
                            />
                        ))
                    }


                </Stack>
            </ContainerScroll>
            <Pagination variant="outlined" shape="rounded" color="primary" count={pages} page={page} onChange={handleChange} />

        </>
    )
}

function ItemEntrada({ register }) {

    const IsSmall = useMediaQuery("(max-width:900px)");

    const { checkOutRegisterWhitId, checkRegisterWhitId } = useUpdateRegister();

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
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                }}>

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
                                    maxWidth: "120px",
                                    fontWeight: 500,
                                    padding: "5px",
                                }}
                            />


                        </Stack>


                        <Stack>

                            {(typeRegister === 'entrada') &&
                                <Button
                                    onClick={() => checkRegisterWhitId(idRegister, details)}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                >
                                    CheckIn
                                </Button>}


                            {/* {(typeRegister === 'salida') &&
                                <Button
                                    onClick={() => checkOutRegisterWhitId(idRegister, details)}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                >
                                    CheckOut
                                </Button>} */}

                        </Stack>

                    </Stack>

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

                    {(carga != 'vacio' && details.length >= 1) && (
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
                    )}

                </Stack>

                <ModalInfoOperator
                    nombre={nombre}
                    contacto={contacto}
                    modal={modalOperator}
                    toggleModal={toggleModalOperator}
                />


            </Paper>
        </>
    )

}