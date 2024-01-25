//imports materialui
import { useState } from "react";
import { Box, Stack, Paper, Chip } from "@mui/material";
//custom components
import { Lavados } from "../../components/Lavados";
import { Notification } from "../../components/Notification"
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";

function Lavado() {

   const IsSmall = useMediaQuery('(max-width:700px)');
   //lavado pendeinte y realizado
   const [typeWashing, setTypeWashing] = useState('pendiente');


   return (
      <>
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               paddingTop: '20px'
            }}
         >

            <Stack
               flexDirection='column'
               maxWidth='700px'
               width={IsSmall ? '98vw' : '90vw'}
               gap='10px'
            >

               <Paper
                  sx={{
                     padding: '20px',
                     bgcolor: 'whitesmoke'
                  }}
               >
                  <Box>
                     <Stack
                        flexDirection='row'
                        gap='10px'
                     >
                        <Chip
                           label={'pendientes'}
                           color={typeWashing === 'pendiente' ? 'warning' : 'default'}
                           onClick={() => setTypeWashing('pendiente')}
                        />

                        <Chip
                           label={'realizados'}
                           color={typeWashing === 'realizado' ? 'success' : 'default'}
                           onClick={() => setTypeWashing('realizado')}
                        />
                     </Stack>
                  </Box>
               </Paper>

               <Lavados typeWashing={typeWashing} />

            </Stack>

         </Box>

         <Notification />
      </>
   );
}

export { Lavado };