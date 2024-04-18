//imports materialui
import { Box, Stack, Paper, Chip, TextField, } from "@mui/material";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useLavadoContext } from "../../Context/LavadosContext";
//icons
import SearchIcon from '@mui/icons-material/Search';
//libreries
import { toast, Toaster } from "sonner";

export function Lavado() {

   const IsSmall = useMediaQuery('(max-width:540px)');
   const navigate = useNavigate();
   const { pathname } = useLocation();

   const { searchValue, handleKeyPress, onChangeClear } = useLavadoContext();


   return (
      <>
         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }} >

            <Stack alignItems='center' width='100%' gap='10px' maxWidth='900px' >

               <Paper
                  sx={{
                     display: 'flex',
                     flexDirection: IsSmall ? 'column' : 'row',
                     flexFlow: IsSmall ? 'column-reverse' : '',
                     justifyContent: 'space-between',
                     alignItems: IsSmall ? 'start' : 'center',
                     bgcolor: 'whitesmoke',
                     border: '1px',
                     borderColor: '#E4E4E7',
                     borderStyle: 'solid',
                     maxWidth: '900px',
                     padding: '15px',
                     width: '96vw',
                     gap: '10px',
                  }}
               >
                  <Stack flexDirection='row' gap='10px' width={IsSmall ? '100%' : 'auto'}>
                     <Chip
                        label={'pendientes'}
                        color={pathname.includes('pendientes') ? 'warning' : 'default'}
                        onClick={() => navigate('/lavado/pendientes')}
                     />

                     <Chip
                        label={'realizados'}
                        color={pathname.includes('realizados') ? 'success' : 'default'}
                        onClick={() => navigate('/lavado/realizados')}
                     />
                  </Stack>

                  <TextField
                     sx={{ width: IsSmall ? '80vw' : 'auto' }}
                     size='small'
                     variant='outlined'
                     name="searchProgram"
                     onKeyDown={handleKeyPress}
                     onChange={onChangeClear}
                     inputRef={searchValue}
                     InputProps={{
                        endAdornment: <SearchIcon />
                     }}
                  />
               </Paper>

               <Outlet />

            </Stack>

         </Box>

         <Toaster richColors position="top-center" />
      </>
   );
}
