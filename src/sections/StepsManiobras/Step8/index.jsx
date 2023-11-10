import { useState, useContext } from "react";
import { DevelopmentContext } from "../../../Context";
import { Box, Stack, Button, Paper, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Step8() {

    const [state, dispatch] = useContext(DevelopmentContext)

    const { maniobrasCheckList } = state;
    console.log("🚀 ~ file: index.jsx:11 ~ Step8 ~ maniobrasCheckList:", maniobrasCheckList)

    return ( 
        <>
        <Paper 
        elevation={4}
        sx={{
            display:'flex',
            flexDirection:'column',
            gap:'20px',
            padding:'20px'
        }}>

            <Stack flexDirection='row' alignItems='center' gap='10px'>
            <Typography variant="h6">
                Check list de inspección completado
            </Typography>
            <CheckCircleIcon sx={{color:'green'}}/>
            </Stack>

            <Typography variant="subtitle1">
                Recapitulación
            </Typography>

            <Stack>

                <Paper>
                    step 1 
                </Paper>

            </Stack>

        </Paper>
        </>
     );
}

export {Step8};