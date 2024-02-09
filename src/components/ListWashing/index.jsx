//components
import { ItemWashing } from "../ItemWashing";
import { Box, Stack, Alert } from "@mui/material";
import { NotConexionState } from "../NotConectionState";
import { ContainerScroll } from "../../components/ContainerScroll";
import { ItemLoadingState } from "../../components/ItemLoadingState";

function ListWashing({ washingList, loadignWashing, errorWashing }) {

    return (
        <>
            <ContainerScroll height='72vh'>

                {(washingList.length === 0 && !errorWashing && !loadignWashing) &&
                    <Box sx={{ width: '100%' }}  >
                        <Alert sx={{ width: '100%' }} severity="info">{'Sin prelavados pendientes'}</Alert>
                    </Box>
                }

                {(errorWashing) &&
                    <NotConexionState />
                }

                {(!loadignWashing && errorWashing) &&
                    <Box sx={{ width: '100%' }}  >
                        <Alert sx={{ width: '100%' }} severity="error">{errorWashing.troString()}</Alert>
                    </Box>
                }

                <Stack gap='10px' >
                    {(!loadignWashing && !errorWashing && washingList.length >= 1) &&
                        washingList.map((item) => (
                            <ItemWashing
                                key={item.id}
                                data={item} />
                        ))}
                </Stack>

                {(loadignWashing && !errorWashing) &&
                    <Stack gap='10px' >
                        <ItemLoadingState />
                        <ItemLoadingState />
                        <ItemLoadingState />
                    </Stack>
                }

            </ContainerScroll>
        </>
    );
}

export { ListWashing };