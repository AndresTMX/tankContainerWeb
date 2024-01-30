import { useState, useContext } from "react";
import {
    Container,
    Box,
    Paper,
    Stack,
    Button,
    Modal,
    Typography,
    Checkbox,
    IconButton,
    FormControlLabel,
    TextField,
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { ContainerScroll } from "../../components/ContainerScroll";
//icons
import ClearIcon from "@mui/icons-material/Clear";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { GlobalContext } from "../../Context/GlobalContext";
import { useGetTypeWashing } from "../../Hooks/Calidad/useGetTypesWashing";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { useManagmentInspection } from "../../Hooks/Calidad/useManagmentInspection";
//DatePicker components
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

function CheckListCalidadPrelavado({ modal, toggleModal, prelavado, updater }) {
console.log("🚀 ~ prelavado:", prelavado)

    const isSmall = useMediaQuery('(max-width:720px)');
    const { data, error, loading } = useGetTypeWashing();
    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const { sendInspectPrewashing, returnToPrewashing } = useManagmentInspection(updater);
    const defaultDate = dayjs();

    const questionsChecklist = [
        {
            question: "Legibilidad de datos seriales",
            value: "",
        },
        {
            question: "Libre de Residuos en escotilla y válvulas",
            value: "",
        },
        {
            question: "Libre de Residuos de detergente en las paredes del tanque",
            value: "",
        },
        {
            question: "Libre de residuos, suciedad o manchas en escotilla",
            value: "",
        },
        {
            question: "Libre de Corrosión dentro del tanque",
            value: "",
        },
        {
            question: "Buenas Condiciones generales de válvulas",
            value: "",
        },
        {
            question: "Juntas y empaques en buenas condiciones y libres de fugas",
            value: "",
        },
        {
            question: "Portasellos en buenas condiciones",
            value: "",
        },
    ];

    const questionsComponent = [
        {
            question: "Cambio de componente",
            value: "",
        },
        {
            question: "Tipo de componente",
            value: "",
        },
        {
            question: "Observaciones",
            value: "",
        },
    ];

    const [step, setStep] = useState(1);
    const [cargasPrevias, setCargasPrevias] = useState({
        carga1: "",
        date1: defaultDate,
        carga2: "",
        date2: defaultDate,
        carga3: "",
        date3: defaultDate,
    });
    const [typeWashing, setTypeWashing] = useState("");
    const [newStatus, setNewStatus] = useState("")
    const [questions, setQuestions] = useState(questionsChecklist);
    const [component, setComponent] = useState(questionsComponent);

    const closeModal = () => {
        setQuestions(questionsChecklist);
        setComponent(questionsComponent);
        setCargasPrevias({ carga1: "", carga2: "", carga3: "" });
        setTypeWashing("");
        setStep(1);
        toggleModal();
    };

    const nextStep = () => {
        const routerStep = {
            1: () => validateChecklist(),
            2: () => validateComponents(),
        };

        if (routerStep[step]) {
            routerStep[step]();
        }
    };

    const validateChecklist = () => {
        let questionsEmpty = questions.filter((question) => question.value === "");
        let validate = questionsEmpty.length > 0 ? false : true;

        if (!validate) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: "Completa el checklist para continuar",
            });
        } else {
            setStep(step + 1);
        }
    };

    const validateComponents = () => {
        let validate = component[0].value.trim() === "" ? false : true;
        let changueComponent = component[0].value.trim();

        const routesValidate = {
            si: () => {
                if (component[1].value.trim() === "") {
                    dispatchGlobal({
                        type: actionTypesGlobal.setNotification,
                        payload: "Completa el formulario para continuar",
                    });
                } else {
                    setStep(step + 1);
                }
            },
            no: () => {
                if (!validate) {
                    dispatchGlobal({
                        type: actionTypesGlobal.setNotification,
                        payload: "Completa el formulario para continuar",
                    });
                } else {
                    setStep(step + 1);
                }
            },
        };

        try {
            if (routesValidate[changueComponent]) {
                routesValidate[changueComponent]();
            } else {
                throw new Error("No completado");
            }
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: "Completa el formulario para continuar",
            });
        }
    };

    const changueValue = (index, value) => {
        const copy = [...questions];
        copy[index].value = value;
        setQuestions(copy);
    };

    const changueValueComponent = (index, value) => {
        const copy = [...component];
        copy[index].value = value;
        setComponent(copy);
    };

    const questionsFilter = questions.filter(
        (question) => question.value != "si"
    );

    const evaluacion = questionsFilter.length >= 1 ? false : true;

    //funciones de manejo de formateo de datos para envio

    const routerPostFuction = (e) => {

        const { id_detalle_entrada, registros_detalles_entradas, id: idWashing } = prelavado;

        const { numero_tanque, numero_pipa, carga } = registros_detalles_entradas || {};

        const evaluacionString = evaluacion ? 'aprobado' : 'reprobado';

        const cargasPreviasInString = JSON.stringify(cargasPrevias);

        const routes = {
            aprobado: () => {
                e.preventDefault();
                const data = JSON.stringify([...questions, ...component]);
                const newRegister = { registro_detalle_entrada_id: id_detalle_entrada, data: data, status:'aprobado' }
                sendInspectPrewashing(newRegister, idWashing, typeWashing, cargasPreviasInString, numero_tanque, numero_pipa, carga)
                closeModal()
            },
            reprobado: () => {
                returnToPrewashing(id_detalle_entrada, idWashing, newStatus )
                closeModal();
            }
        }

        if (routes[evaluacionString]) {
            routes[evaluacionString]()
        }

    }

    //validaciones

    return (
        <>
            <Modal open={modal}>
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minHeight: "100vh",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            maxWidth: "700px",
                            paddingTop: "2%",
                        }}
                    >
                        <Paper sx={{ display: "flex", flexDirection: "column", padding: "20px" }}>
                            <Stack
                                width={"100%"}
                                alignItems={"center"}
                                flexDirection={"row"}
                                justifyContent={"space-between"}
                            >
                                <Typography variant="button">
                                    Inspección de prelavado
                                </Typography>

                                <IconButton
                                    color="error"
                                    variant="outlined"
                                    onClick={closeModal}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </Stack>

                            {step === 1 && (
                                <ContainerScroll height={"400px"}>
                                    <Stack gap={"8px"}>
                                        {questions.map((question, index) => (
                                            <ItemQuestion
                                                key={question.question}
                                                index={index}
                                                question={question}
                                                toggleCheck={changueValue}
                                            />
                                        ))}
                                    </Stack>
                                </ContainerScroll>
                            )}

                            {step === 2 && (
                                <Stack gap={"8px"}>
                                    <ItemQuestion
                                        index={0}
                                        question={component[0]}
                                        toggleCheck={changueValueComponent}
                                    />

                                    {component[0].value === "si" && (
                                        <TextField
                                            required
                                            label={"Tipo de componente"}
                                            type="text"
                                            value={component[1].value}
                                            onChange={(e) => changueValueComponent(1, e.target.value)}
                                        />
                                    )}

                                    <TextField
                                        label={"Observaciones"}
                                        type="text"
                                        value={component[2].value}
                                        onChange={(e) => changueValueComponent(2, e.target.value)}
                                    />
                                </Stack>
                            )}

                            {step === 3 && (
                                <Stack gap="8px" padding="10px" sx={{ overflow: 'auto', maxHeight: '70vh' }}>
                                    <Alert severity={evaluacion ? "success" : "error"}>
                                        Inspección {!evaluacion ? "reprobada" : "aprobada"}
                                    </Alert>

                                    {!evaluacion && (
                                        <Typography padding="15px" variant="body2">
                                            El tanque ó pipa en cuestion regresará a la etapa
                                            seleccionada para repetir el proceso de lavado desde
                                            el punto determinado.
                                        </Typography>
                                    )}

                                    {evaluacion && (
                                        <form onSubmit={(e) => routerPostFuction(e)}>
                                            <Stack gap="15px">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer
                                                        components={[
                                                            'DateTimePicker',
                                                        ]}
                                                    >
                                                        <FormControl
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                flexWrap: 'wrap',
                                                                width: '100%',
                                                                gap: '5px',
                                                            }}
                                                        >
                                                            <TextField
                                                                sx={{ width: isSmall ? '100%' : '49%' }}
                                                                required
                                                                id="carga_previa_1"
                                                                label="Carga previa #1"
                                                                value={cargasPrevias.carga1}
                                                                onChange={(e) =>
                                                                    setCargasPrevias({
                                                                        ...cargasPrevias,
                                                                        carga1: e.target.value,
                                                                    })
                                                                }
                                                            />


                                                            <DateTimePicker
                                                                sx={{ width: isSmall ? '100%' : '49%', }}
                                                                required
                                                                value={cargasPrevias.date1}
                                                                onChange={(newValue) =>
                                                                    setCargasPrevias({
                                                                        ...cargasPrevias,
                                                                        date1: newValue
                                                                    })}
                                                            />


                                                        </FormControl>

                                                        <FormControl
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                flexWrap: 'wrap',
                                                                width: '100%',
                                                                gap: '5px',
                                                            }}
                                                        >
                                                            <TextField
                                                                sx={{ width: isSmall ? '100%' : '49%' }}
                                                                required
                                                                id="carga_previa_2"
                                                                label="Carga previa #2"
                                                                value={cargasPrevias.carga2}
                                                                onChange={(e) =>
                                                                    setCargasPrevias({
                                                                        ...cargasPrevias,
                                                                        carga2: e.target.value,
                                                                    })
                                                                }
                                                            />


                                                            <DateTimePicker
                                                                sx={{ width: isSmall ? '100%' : '49%', }}
                                                                required
                                                                value={cargasPrevias.date2}
                                                                onChange={(newValue) =>
                                                                    setCargasPrevias({
                                                                        ...cargasPrevias,
                                                                        date2: newValue
                                                                    })}
                                                            />


                                                        </FormControl>

                                                        <FormControl
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                flexWrap: 'wrap',
                                                                width: '100%',
                                                                gap: '5px',
                                                            }}
                                                        >
                                                            <TextField
                                                                sx={{ width: isSmall ? '100%' : '49%' }}
                                                                required
                                                                id="carga_previa_3"
                                                                label="Carga previa #3"
                                                                value={cargasPrevias.carga3}
                                                                onChange={(e) =>
                                                                    setCargasPrevias({
                                                                        ...cargasPrevias,
                                                                        carga3: e.target.value,
                                                                    })
                                                                }
                                                            />


                                                            <DateTimePicker
                                                                sx={{ width: isSmall ? '100%' : '49%', }}
                                                                required
                                                                value={cargasPrevias.date3}
                                                                onChange={(newValue) =>
                                                                    setCargasPrevias({
                                                                        ...cargasPrevias,
                                                                        date3: newValue
                                                                    })}
                                                            />


                                                        </FormControl>

                                                    </DemoContainer>
                                                </LocalizationProvider>


                                                <FormControl>
                                                    <InputLabel>Tipo de lavado</InputLabel>
                                                    <Select
                                                        required
                                                        label={"Tipo de lavado"}
                                                        value={typeWashing}
                                                        onChange={(e) => setTypeWashing(e.target.value)}
                                                    >
                                                        {data.map((lavado) => (
                                                            <MenuItem
                                                                key={lavado.id}
                                                                value={lavado.id}>
                                                                {lavado.lavado}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>


                                                <Button type="submit" variant="contained" color="primary">
                                                    lavar
                                                </Button>

                                            </Stack>
                                        </form>
                                    )}

                                    {!evaluacion && (
                                        <form>
                                            <Stack flexDirection='column' gap='10px' alignItems='flex-end'>

                                                <FormControl fullWidth>
                                                    <InputLabel>Nuevo estatus</InputLabel>
                                                    <Select
                                                        label='Nuevo estatus'
                                                        value={newStatus}
                                                        onChange={(e) => setNewStatus(e.target.value)}
                                                    >
                                                        <MenuItem value="prelavado">Prelavado</MenuItem>
                                                        <MenuItem value="interna">Reparación interna</MenuItem>
                                                        <MenuItem value="externa">Reparación externa</MenuItem>
                                                    </Select>
                                                </FormControl>

                                                <Button
                                                    onClick={routerPostFuction}
                                                    variant="contained"
                                                    color="error">
                                                    Enviar
                                                </Button>
                                            </Stack>
                                        </form>
                                    )}

                                </Stack>
                            )}

                            <Stack
                                padding={"10px"}
                                flexWrap={"wrap"}
                                flexDirection={"row"}
                                justifyContent={"space-between"}
                            >
                                {step >= 1 && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setStep(step - 1)}
                                    >
                                        anterior
                                    </Button>
                                )}

                                {step < 3 && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={nextStep}
                                    >
                                        siguiente
                                    </Button>
                                )}
                            </Stack>
                        </Paper>
                    </Box>
                </Container>
            </Modal>
        </>
    );
}

function ItemQuestion({ question, index, toggleCheck }) {
    const IsSmall = useMediaQuery("(max-width:700px)");

    return (
        <Paper sx={{ padding: "10px" }}>
            <Box>
                <Stack
                    width={"100%"}
                    flexWrap={"wrap"}
                    alignItems={"center"}
                    flexDirection={IsSmall ? "column" : "row"}
                    justifyContent={"space-between"}
                >
                    <Typography
                        variant="subtitle2"
                        textAlign={IsSmall ? "center" : "start"}
                        width={IsSmall ? "80%" : "70%"}
                    >
                        {question.question}
                    </Typography>

                    <Stack
                        width={IsSmall ? "100%" : "auto"}
                        justifyContent={IsSmall ? "space-around" : "center"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        gap={"10px"}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={() => toggleCheck(index, "si")}
                                    checked={question.value === "si" ? true : false}
                                />
                            }
                            label="Si"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={() => toggleCheck(index, "no")}
                                    checked={question.value === "no" ? true : false}
                                />
                            }
                            label="No"
                        />
                    </Stack>
                </Stack>
            </Box>
        </Paper>
    );
}

export { CheckListCalidadPrelavado, ItemQuestion }
