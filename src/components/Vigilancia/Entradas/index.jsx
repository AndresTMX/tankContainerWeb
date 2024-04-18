import { useState, useMemo, } from "react";
import { Paper, Box, Stack, Pagination, Alert, Chip, Typography, Divider, IconButton, Button } from "@mui/material";
//custom components
import { ContainerScroll } from "../../ContainerScroll";
import { ModalInfoOperator } from "../../ModalInfoOperator";
import { ItemLoadingState } from "../../ItemLoadingState";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useVigilanciaContext } from "../../../Context/VigilanciaContext";
//icons
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import InfoIcon from "@mui/icons-material/Info";
//services
import { checkInRegister } from "../../../services/registros";
//librairies
import { toast, Toaster } from "sonner";

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
            <Toaster richColors position="top-center" />
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

    const { numero_economico, operadores, registros_detalles_entradas, type: typeRegister, id: idRegister } = register || {};
    const { carga, transportistas, status, clientes } = registros_detalles_entradas?.[0] || {};
    const { nombre, contacto } = operadores || {};
    const { name: linea } = transportistas || {};
    const { cliente, id: idCliente } = clientes || {};

    const [modalOperator, setModalOperator] = useState(false);

    const toggleModalOperator = () => {
        setModalOperator(!modalOperator)
    }

    async function Check() {
        try {

            const { error } = await checkInRegister(idRegister, registros_detalles_entradas);

            if (error) {
                throw new Error(error)
            } else {
                toast.success('entrada confirmada')
            }

        } catch (error) {
            toast.error(error?.message)
        }
    }

    return (
        <>
            <Paper elevation={4} sx={{ display: "flex", flexDirection: "column", padding: "10px", gap: '5px' }}>

                <Stack flexDirection="row" justifyContent="space-between" flexWrap="wrap" gap="10px">

                    <Chip
                        size="small"
                        color={typeRegister === "entrada" ? "success" : "warning"}
                        label={typeRegister}
                        icon={<KeyboardDoubleArrowLeftIcon />}
                    />

                    <Button
                        onClick={Check}
                        size="small"
                        variant="contained"
                        color="primary"
                    >
                        CheckIn
                    </Button>

                </Stack>

                <Stack
                    bgcolor='whitesmoke'
                    flexDirection={IsSmall ? 'column' : 'row'}
                    justifyContent='space-around'
                    gap='10px'
                    padding='10px'
                >

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

                    <Divider
                        orientation={IsSmall ? "horizontal" : "vertical"}
                        flexItem
                    />

                    <Box>
                        <Typography variant='caption'>
                            Cliente
                        </Typography>

                        <Typography >
                            {cliente}
                        </Typography>
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

                {(carga != 'vacio' && registros_detalles_entradas?.length >= 1) && (
                    <Stack justifyContent="center" spacing="10px"
                        sx={{
                            borderRadius: "4px",
                            backgroundColor: "whitesmoke",
                            padding: "15px",
                        }}
                    >
                        <Typography variant="button">
                            {`${carga}s`}
                        </Typography>
                        {registros_detalles_entradas?.map((detail, index) => (
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
                                {registros_detalles_entradas?.length != index + 1 && (
                                    <Divider orientation={"horizontal"} flexItem />
                                )}
                            </Box>
                        ))}
                    </Stack>
                )}

            </Paper>


            <ModalInfoOperator
                nombre={nombre}
                contacto={contacto}
                modal={modalOperator}
                toggleModal={toggleModalOperator}
            />
        </>
    )

}