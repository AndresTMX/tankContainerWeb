import { useEffect, useRef } from "react";
//imports materialui
import { Container, Box, Button, Stack, Paper, Divider, IconButton, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
//icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
//router
import { NavLink } from "react-router-dom";
//services
import { updateMetaData } from "../../services/usuarios";
//libraries
import { toast, Toaster } from "sonner";

function Perfil() {

   const session = JSON.parse(sessionStorage.getItem('tankUser'));

   const { user_metadata } = session || {};

   const firstNameRef = useRef();
   const lastNameRef = useRef();
   const phoneRef = useRef();
   const rolRef = useRef();

   async function saveChangues() {
      try {
         console.log(rolRef.current.value)
         const { error } = await
            updateMetaData({
               first_name: firstNameRef.current.value,
               last_name: lastNameRef.current.value,
               phone: phoneRef.current.value,
               rol: rolRef.current.value
            })

         if (error) {
            throw new Error(`Error al actualizar los datos de usuario, error: ${error.message}`)
         } else {
            toast.success('Información actualizada')
         }

      } catch (error) {
         toast.error(error?.message)
      }
   }

   return (
      <>
         <Container>

            <Toaster richColors position='top-center' />

            <Stack flexDirection='row' alignItems='center' gap='20px'>
               <NavLink to='/vigilancia'>
                  <IconButton>
                     <ArrowBackIcon />
                  </IconButton>
               </NavLink>
               <h2>Perfil</h2>
            </Stack>

            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
               }}
            >
               <Typography variant="h6">Información personal</Typography>
               <Paper
                  elevation={4}
                  sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     padding: '20px',
                     width: 'auto'
                  }}
               >
                  <Stack
                     flexWrap='wrap'
                     flexDirection='row'
                     alignItems='center'
                     justifyContent='start'
                     gap='20px'
                  >

                     <TextField
                        fullWidth
                        inputRef={firstNameRef}
                        label={'Nombres'}
                        defaultValue={user_metadata?.first_name}
                     />

                     <TextField
                        fullWidth
                        inputRef={lastNameRef}
                        label={'Apellidos'}
                        defaultValue={user_metadata?.last_name}
                     />

                     <TextField
                        fullWidth
                        inputRef={phoneRef}
                        label={'Telefono'}
                        defaultValue={user_metadata?.phone}
                     />

                     {user_metadata.rol === "developer" &&
                        <FormControl fullWidth>
                           <InputLabel>Rol</InputLabel>
                           <Select
                              inputRef={rolRef}
                              label={'Rol'}
                              defaultValue={user_metadata?.rol}
                           >
                              <MenuItem value={"admin"} >admin</MenuItem>
                              <MenuItem value={"developer"} >developer</MenuItem>
                              <MenuItem value={"vigilante"} >vigilante</MenuItem>
                              <MenuItem value={"maniobrista"} >maniobrista</MenuItem>
                              <MenuItem value={"gestor de calidad"} >gestor de calidad</MenuItem>
                           </Select>
                        </FormControl>
                     }

                  </Stack>

               </Paper>
               <Button
                  sx={{ width: 'fit-content' }}
                  variant='contained'
                  onClick={saveChangues}>
                  guardar cambios
               </Button>
            </Box>


         </Container>
      </>
   );
}

export { Perfil };