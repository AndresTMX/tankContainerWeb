import { useState, useContext } from "react";
import { Box, Paper, Stack, Button, IconButton, Divider, Chip, Typography } from "@mui/material";
import { ButtonDowloand } from "../../PDFs/components/ButtonDowloand";
import { ModalInfoOperator } from "../ModalInfoOperator";
import { TextGeneral } from "../TextGeneral";
//icons
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
//helpers
import { tiempoTranscurrido, dateMXFormat, datetimeMXFormat, dateInText } from "../../Helpers/date";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRegisterForDetails } from "../../Hooks/Maniobras/useRegisterForDetails";
import { useManiobrasContext } from "../../Context/ManiobrasContext";

function ItemEIR({ typeRegister, data, toggleChecklist }) {

    //state modal info operator
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const { contacto, nombre } = data.operadores || {};

    return (
        <>

            {(typeRegister === 'pendientes') &&
                <ItemPending data={data} toggleOperator={toggleModal} toggleChecklist={toggleChecklist}
                />}

            {(typeRegister === 'realizados') &&
                <ItemComplete data={data} />}

            <ModalInfoOperator
                modal={modal}
                toggleModal={toggleModal}
                contacto={contacto}
                nombre={nombre}
            />

        </>
    );
}

export { ItemEIR };

export function ItemPending({ data, toggleOperator, toggleChecklist }) {

    const IsSmall = useMediaQuery('(max-width:850px)');
    const { item, setItem } = useManiobrasContext();

    const { entrada_id } = data;

    const { register, loading, error } = useRegisterForDetails(entrada_id)

    const { checkIn, created_at, operadores, tracto } = register;


    const { carga, numero_tanque, transportistas, clientes } = data;

    const { contacto, correo, nombre } = operadores || {};

    const { cliente, id: idCliente } = clientes || {};

    const { name: linea } = transportistas || {};

    const selectTank = () => {
        setItem({ ...item, ...data, checkIn, linea })
        toggleChecklist()
    }

    return (
        <Paper>
            <Stack gap="8px" padding='10px' >
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
                            label={`Ingreso el ${dateInText(checkIn)}`}
                            icon={<CalendarTodayIcon />}
                            sx={{
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
                                fontWeight: 500,
                                padding: "5px",
                            }}
                        />

                        <Chip
                            size="small"
                            color="info"
                            label={`${tiempoTranscurrido(checkIn)} desde su llegada`}
                            icon={<AccessTimeIcon />}
                            sx={{
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
                        bgcolor: "whitesmoke",
                        alignItems: !IsSmall ? "center" : "start",
                        flexDirection: IsSmall ? "column" : "row",
                        justifyContent: "space-between",
                        borderRadius: "4px",
                        padding: "15px",
                        width: '100%',
                        gap: "10px",
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
                            <Typography variant='caption'>Linea</Typography>
                            <Typography>{linea}</Typography>
                        </Box>
                        <Divider
                            orientation={IsSmall ? "horizontal" : "vertical"}
                            flexItem
                        />
                        <Box>
                            <Typography variant='caption'>Tracto</Typography>
                            <Typography>{tracto}</Typography>
                        </Box>
                        <Divider
                            orientation={IsSmall ? "horizontal" : "vertical"}
                            flexItem
                        />

                        <Box>
                            <Typography variant='caption'>{carga}</Typography>
                            <Typography>{numero_tanque || numero_pipa}</Typography>
                        </Box>

                        <Divider
                            orientation={IsSmall ? "horizontal" : "vertical"}
                            flexItem
                        />

                        <Box>
                            <Typography variant='caption'>Operador</Typography>
                            <Typography>{nombre}</Typography>
                        </Box>

                    </Stack>


                </Box>

            </Stack>
        </Paper >
    );
}

export function ItemComplete({ data, selectItem }) {

    const isMovile = useMediaQuery('(max-width:620px)');

    const { folio, created_at, ingreso, registros_detalles_entradas, clientes, users_data, data: checklist } = data || {};
    const { status, numero_tanque, registros } = registros_detalles_entradas || {};
   const { first_name, last_name } = users_data || {}
    const { cliente } = clientes || {};

    const dataDocument = {
        folio: folio,
        fechaActual: dateMXFormat(created_at),
        horaActual: datetimeMXFormat(created_at),
        dayInput: dateMXFormat(ingreso),
        dateInput: datetimeMXFormat(ingreso),
        numero_tanque: numero_tanque,
        clientes,
        registros: registros,
        usuario_emisor: `${first_name} ${last_name}`
    }

    const [button, setButton] = useState(false)

    return (
        <>

            <Paper sx={{ padding: '20px' }}>

                <Stack gap='20px' >

                    <Stack
                        justifyContent='space-between'
                        alignItems='center'
                        flexDirection='row'
                        flexWrap='wrap'
                        gap='20px'
                    >

                        <Stack
                            flexDirection='row'
                            alignItems='center'
                            flexWrap='wrap'
                            gap='10px'
                        >
                            <Chip
                                size="small"
                                color="success"
                                label={`Folio: ${folio}`}
                            />

                            <Chip
                                size="small"
                                color="secondary"
                                label={` Realizado ${dateInText(created_at)}`}
                                icon={<CalendarTodayIcon />}
                                sx={{
                                    fontWeight: 500,
                                    padding: "5px",
                                }}
                            />

                            <Chip
                                size="small"
                                color="info"
                                label={datetimeMXFormat(created_at)}
                                icon={<AccessTimeIcon />}
                                sx={{
                                    fontWeight: 500,
                                    padding: "5px",
                                }}
                            />

                        </Stack>


                        <Stack width={isMovile ? '100%' : 'auto'}>

                            {button && <ButtonDowloand
                                dataDocument={dataDocument}
                                checklist={checklist}
                            />}

                            {!button && <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={() => setButton(!button)}
                                endIcon={<PictureAsPdfIcon />}
                            >
                                Exportar PDF
                            </Button>}
                        </Stack>

                    </Stack>

                    <Stack
                        justifyContent='space-between'
                        flexDirection={isMovile ? 'column' : 'row'}
                        alignItems={isMovile ? 'start' : 'center'}
                        flexWrap='wrap'
                        gap='20px'

                    >
                        <TextGeneral
                            label={'Realizado por '}
                            text={`${first_name} ${last_name}`}
                        />

                        <Divider flexItem />

                        <TextGeneral
                            label={'Cliente '}
                            text={cliente}
                        />

                        <Divider flexItem />

                        <TextGeneral
                            label={'N° de contenedor'}
                            text={numero_tanque}
                        />

                    </Stack>


                </Stack>

            </Paper>
        </>

    )
}