import { Box, Stack, Chip, Typography, Paper } from "@mui/material";
import { HistoryItem } from "../HistoryItem";
import { ContainerScroll } from "../ContainerScroll";
import { useGetRegisters } from "../../Hooks/registersManagment/useGetRegisters";
import { Searcher } from "../Searcher";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { DevelopmentContext } from "../../Context";
import { actionTypes } from "../../Reducers";

function RegisterVigilancia() {

    const [state, dispatch] = useContext(DevelopmentContext)
    const { requestGetRegisters, errorGetRegisters, loadingGetRegisters } = useGetRegisters();

    const isMovile = useMediaQuery("(max-width:640px)");

    const renderComponent = requestGetRegisters?.length >= 1 ? true : false;
    const renderLoadingState =
        !errorGetRegisters && loadingGetRegisters ? true : false;
    const renderErrorState =
        errorGetRegisters && !loadingGetRegisters ? true : false;
    const renderAdvertainsmentCache =
        errorGetRegisters && requestGetRegisters?.length >= 1;

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                <Paper elevation={4}>
                    <Stack
                        sx={{
                            backgroundColor: 'whitesmoke',
                            padding: '20px',
                            borderRadius: '4px'
                        }}
                        flexDirection="row"
                        justifyContent={isMovile ? "center" : "space-between"}
                        alignItems="center"
                        flexWrap="wrap"
                        gap="20px"
                    >
                        <Stack
                            flexDirection="row"
                            alignItems="center"
                            flexWrap="wrap"
                            gap="10px"
                            width={isMovile ? "100%" : "auto"}
                        >
                            <Chip
                                onClick={() => dispatch({type: actionTypes.setTypeRegister, payload: "entrada"})}
                                color={state.typeRegister === "entrada" ? "success" : "default"}
                                label="entradas"
                            />
                            <Chip
                                onClick={() => dispatch({type: actionTypes.setTypeRegister, payload:"salida" })}
                                color={state.typeRegister === "salida" ? "info" : "default"}
                                label="salidas"
                            />
                            <Chip
                                onClick={() => dispatch({type: actionTypes.setTypeRegister, payload: "ambas"})}
                                color={state.typeRegister === "ambas" ? "warning" : "default"}
                                label="ambas"
                            />
                        </Stack>

                        <Stack width={isMovile ? "100%" : "auto"}>
                            <Searcher />
                        </Stack>
                    </Stack>
                </Paper>

                <ContainerScroll height="62vh">
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        {renderAdvertainsmentCache && (
                            <Stack
                                sx={{
                                    backgroundColor: "white",
                                    padding: "10px",
                                    borderRadius: "4px",
                                }}
                                flexDirection="column"
                                gap="5px"
                                justifyContent="flex-start"
                            >
                                <Chip
                                    sx={{ width: "130px" }}
                                    color="warning"
                                    label="¡Error al cargar!"
                                />

                                <Typography variant="caption">
                                    probablemente no tienes internet, esta es la Información de la
                                    ultima consulta exitosa a la base de datos, suerte.
                                </Typography>
                            </Stack>
                        )}

                        {renderComponent && (
                            <Stack gap="20px">
                                {requestGetRegisters.map((item) => (
                                    <HistoryItem
                                        type="vigilancia"
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </Stack>
                        )}

                        {renderErrorState && <p>Error state</p>}

                        {renderLoadingState && <p>cargando...</p>}
                    </Box>
                </ContainerScroll>
            </Box>
        </>
    );
}

export { RegisterVigilancia };
