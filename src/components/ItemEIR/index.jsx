import { useState, useContext } from "react";
import { Box, Paper, Stack, Button, IconButton, Divider, Chip, Typography } from "@mui/material";
import { ButtonDowloand } from "../../PDFs/components/ButtonDowloand";
import { ModalInfoOperator } from "../ModalInfoOperator";
import { TextGeneral } from "../TextGeneral";
//context
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { actionTypes } from "../../Reducers/ManiobrasReducer";
//icons
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
//helpers
import { tiempoTranscurrido, dateMXFormat, datetimeMXFormat } from "../../Helpers/date";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRegisterForDetails } from "../../Hooks/Maniobras/useRegisterForDetails";

function ItemEIR({ typeRegister, data, toggleChecklist, selectItem, item }) {

    //state modal info operator
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const { contacto, nombre } = data.operadores || {};

    return (
        <>

            {(typeRegister === 'pendientes') &&
                <ItemPending
                    data={data}
                    toggleOperator={toggleModal}
                    toggleChecklist={toggleChecklist}
                    selectItem={selectItem}
                    item={item}

                />}

            {(typeRegister === 'realizados') &&
                <ItemComplete
                    data={data}
                    selectItem={selectItem}
                    item={item}

                />}

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

export function ItemPending({ data, toggleOperator, toggleChecklist, selectItem, item }) {

    const { entrada_id } = data;

    const { register, loading, error } = useRegisterForDetails(entrada_id)

    const { checkIn, created_at, operadores, tracto  } = register;

    const IsSmall = useMediaQuery('(max-width:850px)');

    const { carga, numero_tanque, transportistas, clientes } = data;

    const { contacto, correo, nombre } = operadores || {};

    const { cliente, id: idCliente } = clientes || {};

    const { name: linea } = transportistas || {};

    const selectTank = () => {
        selectItem({ ...item, ...data, checkIn, linea })
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
                            color="info"
                            label={tiempoTranscurrido(checkIn)}
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
                        bgcolor:"whitesmoke",
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
                        {(carga === 'tanque') && <>
                            <Divider
                                orientation={IsSmall ? "horizontal" : "vertical"}
                                flexItem
                            />
                            <Stack width={'100px'}>
                                <Typography variant="subtitle2">N° de tanque</Typography>
                                <Typography variant="button">{numero_tanque}</Typography>
                            </Stack>
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
                            <TextGeneral width={'100px'}
                                label="Operador"
                                text={`${nombre?.split(" ").slice(0, 2)[0]} ${nombre?.split(" ").slice(0, 2)[1]}`} />
                            <IconButton color="info" onClick={toggleOperator}>
                                <InfoIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Box>

            </Stack>
        </Paper>
    );
}

export function ItemComplete({ data, selectItem, item }) {

    const [state, dispatch] = useContext(ManiobrasContext);
    const isMovile = useMediaQuery('(max-width:620px)');

    const { folio, created_at, ingreso, registros_detalles_entradas, clientes, users_data, data: checklistString } = data || {};
    const { status, numero_tanque, tracto } = registros_detalles_entradas || {};
    const { first_name, last_name } = users_data || {}
    const { cliente } = clientes || {};

    const generateDocument = () => {
        const checklistJson = JSON.parse(checklistString)
        const listQuestions = Object.values(checklistJson)

        const dataDocument = {
            folio: folio,
            fechaActual: dateMXFormat(created_at),
            horaActual: datetimeMXFormat(created_at),
            cliente: cliente,
            dayInput: dateMXFormat(ingreso),
            numero_tanque: numero_tanque,
            tracto: tracto,
            usuario_emisor: `${first_name} ${last_name}`
        }

        const pageOne = listQuestions.slice(0, 11);
        const pageTwo = listQuestions.slice(11, 21);
        const pageThree = listQuestions.slice(21, 33);

        selectItem(dataDocument)
        dispatch({
            type: actionTypes.setManiobrasCheck,
            payload: {
                pageOne: pageOne,
                pageTwo: pageTwo,
                pageThree: pageThree
            }
        });

    }

    return (
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
                            label={dateMXFormat(created_at)}
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
                            label={datetimeMXFormat(created_at)}
                            icon={<AccessTimeIcon />}
                            sx={{
                                maxWidth: "90px",
                                fontWeight: 500,
                                padding: "5px",
                            }}
                        />

                        <Chip
                            size="small"
                            color='warning'
                            label={status} />
                    </Stack>


                    <Stack width={isMovile ? '100%' : 'auto'}>

                        {(folio != item.folio) &&
                            <Button
                                onClick={() => generateDocument()}
                                fullWidth={isMovile}
                                size="small"
                                variant='contained'
                                color='primary'
                            >
                                Reimprimir
                            </Button>}

                        {(folio === item.folio) &&
                            <ButtonDowloand
                                selectItem={selectItem}
                                state={state}
                                item={item}
                            />}
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
    )
}