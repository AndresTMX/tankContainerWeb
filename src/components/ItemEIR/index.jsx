import { useState } from "react";
import { Box, Paper, Stack, Button, IconButton, Divider, Chip, } from "@mui/material";
import { ModalInfoOperator } from "../ModalInfoOperator";
import { TextGeneral } from "../TextGeneral";
//icons
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
//helpers
import { tiempoTranscurrido } from "../../Helpers/date";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";


function ItemEIR({ typeRegister, data, toggleChecklist, selectItem, item }) {

    //state modal info operator
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const { contacto, nombre } = data.operador || {};

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

    const IsSmall = useMediaQuery('(max-width:700px)');

    const { carga, tracto, numero_tanque, checkIn, linea, dayInput, dateInput, shortNameOperator } = data;

    const selectTank = () => {
        selectItem({ ...item, ...data })
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

                <Box
                    sx={{
                        display: "flex",
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

export function ItemComplete({ }) {

    const generateDocument = (item) => {
        // const json = JSON.parse(item.data)
        // const listQuestions = Object.values(json)

        // const dataDocument = {
        //     folio: item.folio,
        //     fechaActual: dateMXFormat(item.created_at),
        //     horaActual: datetimeMXFormat(item.created_at),
        //     cliente: item.nombre_cliente,
        //     dayInput: dateMXFormat(item.ingreso),
        //     numero_tanque: item.registros_detalles_entradas.numero_tanque,
        //     tracto: item.registros_detalles_entradas.tracto,
        //     usuario_emisor: `${item.users_data.first_name} ${item.users_data.last_name}`
        // }

        // const pageOne = listQuestions.slice(0, 11);
        // const pageTwo = listQuestions.slice(11, 21);
        // const pageThree = listQuestions.slice(21, 33);

        // dispatch({ type: actionTypes.setCliente, payload: item.nombre_cliente })
        // dispatch({ type: actionTypes.setSelectItem, payload: dataDocument })
        // dispatch({
        //     type: actionTypes.setManiobrasCheck,
        //     payload: {
        //         pageOne: pageOne,
        //         pageTwo: pageTwo,
        //         pageThree: pageThree
        //     }
        // });

    }

    return (
        <Paper sx={{ padding: '20px' }}>

            {/* <Stack gap='20px' >

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
                            label={`Folio: ${item.folio}`}
                        />

                        <Chip
                            size="small"
                            color="secondary"
                            label={dateMXFormat(item.created_at)}
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
                            label={datetimeMXFormat(item.created_at)}
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
                            label={item.registros_detalles_entradas.status} />
                    </Stack>


                    <Stack>

                        {(!state.selectItem || state.selectItem.folio != item.folio) &&
                            <Button
                                onClick={() => generateDocument(item)}
                                size="small"
                                variant='contained'
                                color='primary'
                            >
                                Reimprimir
                            </Button>}

                        {(state.selectItem && state.selectItem.folio === item.folio) && <ButtonDowloand />}
                    </Stack>

                </Stack>

                <Stack
                    justifyContent='space-between'
                    flexDirection='row'
                    alignItems='center'
                    flexWrap='wrap'
                    gap='20px'

                >
                    <TextGeneral
                        label={'Realizado por '}
                        text={`${item.users_data?.first_name} ${item.users_data?.last_name}`}
                    />

                    <TextGeneral
                        label={'Cliente '}
                        text={item.nombre_cliente}
                    />

                    <TextGeneral
                        label={'N° de contenedor'}
                        text={item.registros_detalles_entradas.numero_tanque}
                    />

                </Stack>


            </Stack> */}


        </Paper>
    )
}