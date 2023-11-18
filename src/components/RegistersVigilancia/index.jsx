import { Box, Stack, Chip, Typography } from "@mui/material";
import { HistoryItem } from "../HistoryItem";
import { ContainerScroll } from "../ContainerScroll";
import { useGetRegisters } from "../../Hooks/registersManagment/useGetRegisters";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Searcher } from "../Searcher";

function RegisterVigilancia() {

    const { requestGetRegisters, errorGetRegisters, handleTypeRegister, typeRegister, loadingGetRegisters } = useGetRegisters();

    const isMovile = useMediaQuery('(max-width:640px)');

    const renderComponent = requestGetRegisters?.length >= 1 ? true : false;
    const renderLoadingState = !errorGetRegisters && loadingGetRegisters ? true : false;
    const renderErrorState = errorGetRegisters && !loadingGetRegisters ? true : false;
    const renderAdvertainsmentCache = errorGetRegisters && requestGetRegisters?.length >= 1;

    return (
        <>
            <ContainerScroll height="75vh">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <Stack
                        flexDirection='row'
                        justifyContent={isMovile ? 'center' : 'space-between'}
                        alignItems='center'
                        flexWrap='wrap'
                        gap='20px'>

                        <Stack flexDirection='row' alignItems='center' flexWrap='wrap' gap='10px' width={isMovile ? '100%' : 'auto'} >
                            <Chip onClick={() => handleTypeRegister('entrada')} color={typeRegister === "entrada" ? "success" : "default"} label="entradas" />
                            <Chip onClick={() => handleTypeRegister('salida')} color={typeRegister === "salida" ? "info" : "default"} label="salidas" />
                            <Chip onClick={() => handleTypeRegister('ambas')} color={typeRegister === "ambas" ? "warning" : "default"} label="ambas" />
                        </Stack>

                        <Stack width={isMovile ? '100%' : 'auto'}>
                            <Searcher />
                        </Stack>
                    </Stack>

                    {renderAdvertainsmentCache && (
                        <Stack 
                        sx={{
                            backgroundColor:'white',
                            padding:'10px',
                            borderRadius:'4px'
                        }}
                        flexDirection='column'
                        gap='5px'
                        justifyContent='flex-start'
                        >

                        <Chip sx={{width:'130px'}}  color="warning" label="¡Error al cargar!"/>

                        <Typography variant='caption'>
                            probablemente no tienes internet, esta es la Información de la ultima consulta exitosa a la base de datos, suerte.
                        </Typography>

                        </Stack>
                    )}

                    {renderComponent && (
                        <Stack gap="20px">
                            {requestGetRegisters.map((item) => (
                                <HistoryItem type="vigilancia" key={item.id} data={item} />
                            ))}
                        </Stack>
                    )}

                    {renderErrorState && (
                        <p>Error state</p>
                    )}

                    {renderLoadingState && (
                        <p>cargando...</p>
                    )}

                </Box>
            </ContainerScroll>
        </>
    );
}

export { RegisterVigilancia };
