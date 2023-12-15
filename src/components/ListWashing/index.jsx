//components
import { Box, Stack, Paper, Typography, Chip, } from "@mui/material";
import { ContainerScroll } from "../../components/ContainerScroll";
import { HistoryItemLoading } from "../../components/HistoryItem";
import { ItemWashing } from "../ItemWashing";

function ListWashing({ washingList, loadignWashing, errorWashing }) {
    return (
        <>
            <Box>
                <ContainerScroll height='64vh'>

                    {(!loadignWashing && !errorWashing && washingList.length >= 1) &&
                        <Stack spacing='20px'>
                            {washingList.map((item) => (
                                <ItemWashing
                                    key={item.id}
                                    data={item} />
                            ))}
                        </Stack>
                    }

                    {(loadignWashing && !errorWashing) &&
                        <Stack spacing='20px' maxWidth={'700px'}>
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