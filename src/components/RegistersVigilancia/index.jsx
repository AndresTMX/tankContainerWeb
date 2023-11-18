import { Box, Stack, Chip } from "@mui/material";
import { HistoryItem } from "../HistoryItem";
import { ContainerScroll } from "../ContainerScroll";
import { useGetRegisters } from "../../Hooks/registersManagment/useGetRegisters";

function RegisterVigilancia({ typeRegisters }) {

    const { requestGetRegisters, errorGetRegisters, handleTypeRegister, typeRegister } = useGetRegisters();

    return (
        <>
            <ContainerScroll height="75vh">
                <Box sx={{display:'flex', flexDirection:'column', gap:'20px'}}>
                <Stack flexDirection='row' gap='10px'>
                   <Chip onClick={() => handleTypeRegister('entrada')} color={typeRegister === "entrada"? "info":"default"} label="entradas"/>
                   <Chip onClick={() => handleTypeRegister('salida')} color={typeRegister === "salida"? "warning":"default"} label="salidas"/>
                </Stack>
                <Stack gap="20px">
                    {requestGetRegisters.map((item) => (
                        <HistoryItem type="vigilancia" key={item.id} data={item} />
                    ))}
                </Stack>
                </Box>
            </ContainerScroll>
        </>
    );
}

export { RegisterVigilancia };
