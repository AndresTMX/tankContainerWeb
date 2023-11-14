//imports materialui
import { Container, Box, Tabs, Tab, Button, Stack, Fade, Paper, Divider, IconButton, Typography } from "@mui/material";
//icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
//router
import { NavLink } from "react-router-dom";
//components
import { InfoUser } from "../../components/InfoUser";
//suppabase
import { useRegister } from "../../Hooks/useRegister";

function Perfil() {

   const {addUserSuppabase} = useRegister()

   const dataUser = [
      {
         title:'Usuario',
         value:'Nombre de usuario',
         onChangue: () => {}
      },
      {
         title:'Departamento',
         value:'departamento',
         onChangue: () => {}
      },
      {
         title:'Puesto de trabajo',
         value:'puesto',
         onChangue: () => {}
      },
      {
         title:'Correo electronico',
         value:'correo@mail.com',
         onChangue: () => {}
      },
      {
         title:'Celular',
         value:'5577828470',
         onChangue: () => {}
      },
   ]

    return ( 
        <>
         <Container>

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
               display:'flex',
               flexDirection:'column',
               gap:'20px',
            }}
            >
               <Typography variant="h6">Información personal</Typography>
               <Paper 
               elevation={4}
               sx={{
                  display:'flex',
                  flexDirection:'column',
                  padding:'20px',
                  width:'auto'
               }}
               >
               <Stack 
               flexWrap='wrap'
               flexDirection='row'
               alignItems='center'
               justifyContent='start'
               gap='20px'
               >
                 {dataUser.map((item) => (
                  <InfoUser key={item.title} title={item.title} value={item.value} />
                 ))}

               </Stack>

               </Paper>
            </Box>

            <Button variant='contained' onClick={addUserSuppabase}>Registrar usuario</Button>

         </Container>
        </>
     );
}

export {Perfil};