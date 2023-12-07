import { useEffect } from "react";
import { Box, Paper, Button, Stack, Typography, IconButton } from "@mui/material";
import { useGetTanks } from "../../Hooks/tanksManagment/useGetTanks";
import { ContainerScroll } from "../ContainerScroll";
//icons
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

function ViewTanks({ typeView , toggle}) {

    const { tanks, tankLoading, tankError, getTanks } = useGetTanks()

    useEffect(() => {
        getTanks()
    }, [])

    return (
        <>
            <Paper sx={{ padding: '20px' }}>
                <Stack spacing={1}>

                    <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant='subtitle2'>Tanques disponibles</Typography>
                        <IconButton onClick={() => toggle(false)}>
                            <ClearIcon color="error" />
                        </IconButton>
                    </Stack>

                    <ContainerScroll height='300px'>
                        <Stack spacing={1}>
                            {tanks.map((item) => (
                                <ItemTank key={item.tanque} tanque={item.tanque} />
                            ))}
                        </Stack>
                    </ContainerScroll>
                </Stack>
            </Paper>
        </>
    );
}

export { ViewTanks };

export function ItemTank({ tanque }) {
    return (
        <Paper sx={{ width: '200px' }}>
            <Stack flexDirection='row' justifyContent='space-between' alignItems='center' padding='10px' gap='20px'>
                <Typography>
                    {tanque}
                </Typography>
                <IconButton>
                    <AddIcon color='info'/>
                </IconButton>
            </Stack>
        </Paper>
    );
}

