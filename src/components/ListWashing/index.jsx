//components
import { Box, Stack, Alert } from "@mui/material";
import { ContainerScroll } from "../../components/ContainerScroll";
import { HistoryItemLoading } from "../../components/HistoryItem";
import { ItemWashing } from "../ItemWashing";
import { NotConexionState } from "../NotConectionState";

function ListWashing({ washingList, loadignWashing, errorWashing }) {
    return (
        <>
            <Box sx={{ maxWidth: '95vw', minWidth: '700px' }}>
                <ContainerScroll height='64vh'>

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
                            <Alert sx={{ width: '100%' }} severity="error">{errorWashing.message.troString()}</Alert>
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
                        <Stack gap='20px' maxWidth={'700px'}>
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                            <HistoryItemLoading />
                        </Stack>
                    }

                </ContainerScroll>
            </Box>
        </>
    );
}

export { ListWashing };