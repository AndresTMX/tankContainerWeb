//imports materialui
import { Container, Box, Tabs, Tab, Button, Stack, Fade, Paper, Divider } from "@mui/material";
import { StoreMap } from "../../components/StoreMap";
import { currentDate } from "../../Helpers/date";
function Prelavado() {

   const mockDataContainers = [
      {
         id:0,
         checkIn:currentDate,
         number:'C-2356',
         line:'Linea random',
         date_preWashing:currentDate,
         repairs:{
            intern:10,
            extern:5
         },
         last_reparation:{
            type:'inter',
            description:'se reparo de las puertas'
         },
         location:{
            block:'A',
            position:1
         },
         status: true
      },
      {
         id:1,
         checkIn:currentDate,
         number:'C-2356',
         line:'Linea random',
         date_preWashing:currentDate,
         repairs:{
            intern:10,
            extern:5
         },
         last_reparation:{
            type:'inter',
            description:'se reparo de las puertas'
         },
         location:{
            block:'B',
            position:2
         }
      },
      {
         id:2,
         checkIn:currentDate,
         number:'C-2356',
         line:'Linea random',
         date_preWashing:currentDate,
         repairs:{
            intern:10,
            extern:5
         },
         last_reparation:{
            type:'inter',
            description:'se reparo de las puertas'
         },
         location:{
            block:'C',
            position:3
         }
      },
      {
         id:3,
         checkIn:currentDate,
         number:'C-2356',
         line:'Linea random',
         date_preWashing:currentDate,
         repairs:{
            intern:10,
            extern:5
         },
         last_reparation:{
            type:'inter',
            description:'se reparo de las puertas'
         },
         location:{
            block:'C',
            position:4
         }
      },
      {
         id:4,
         checkIn:currentDate,
         number:'C-2356',
         line:'Linea random',
         date_preWashing:currentDate,
         repairs:{
            intern:10,
            extern:5
         },
         last_reparation:{
            type:'inter',
            description:'se reparo de las puertas'
         },
         location:{
            block:'A',
            position:5
         }
      },
      {
         id:5,
         checkIn:currentDate,
         number:'C-2356',
         line:'Linea random',
         date_preWashing:currentDate,
         repairs:{
            intern:10,
            extern:5
         },
         last_reparation:{
            type:'inter',
            description:'se reparo de las puertas'
         },
         location:{
            block:'B',
            position:6
         }
      },
      {
         id:6,
         checkIn:currentDate,
         number:'C-2356',
         line:'Linea random',
         date_preWashing:currentDate,
         repairs:{
            intern:10,
            extern:5
         },
         last_reparation:{
            type:'inter',
            description:'se reparo de las puertas'
         },
         location:{
            block:'C',
            position:7
         }
      },
      {
         id:7,
         checkIn:currentDate,
         number:'C-2356',
         line:'Linea random',
         date_preWashing:currentDate,
         repairs:{
            intern:10,
            extern:5
         },
         last_reparation:{
            type:'inter',
            description:'se reparo de las puertas'
         },
         location:{
            block:'A',
            position:8
         }
      },
      {
         id:8,
         checkIn:currentDate,
         number:'C-2356',
         line:'Linea random',
         date_preWashing:currentDate,
         repairs:{
            intern:10,
            extern:5
         },
         last_reparation:{
            type:'inter',
            description:'se reparo de las puertas'
         },
         location:{
            block:'B',
            position:9
         }
      },
      {
         id:9,
         checkIn:currentDate,
         number:'C-2356',
         line:'Linea random',
         date_preWashing:currentDate,
         repairs:{
            intern:10,
            extern:5
         },
         last_reparation:{
            type:'inter',
            description:'se reparo de las puertas'
         },
         location:{
            block:'C',
            position:10
         }
      },
      {
         id:10,
         checkIn:currentDate,
         number:'C-2356',
         line:'Linea random',
         date_preWashing:currentDate,
         repairs:{
            intern:10,
            extern:5
         },
         last_reparation:{
            type:'inter',
            description:'se reparo de las puertas'
         },
         location:{
            block:'B',
            position:11
         }
      },
      {
         id:11,
         checkIn:currentDate,
         number:'',
         line:'Linea random',
         date_preWashing:currentDate,
         repairs:{
            intern:10,
            extern:5
         },
         last_reparation:{
            type:'inter',
            description:'se reparo de las puertas'
         },
         location:{
            block:'C',
            position:12
         }
      },
      
   ]

    return ( 
        <>
         <Container sx={{display:'flex', flexDirection:'column', gap:'20x', alignItems:'center'}}>
            <h2>Contenedores en prelavado</h2>
            <Box
            sx={{
               display:'flex',
               placeItems:'center'
            }}
            >
               <Paper elevation={4} sx={{padding:'10px'}}>
                <StoreMap dataContainers={mockDataContainers}/>
               </Paper>
            </Box>
         </Container>
        </>
     );
}

export {Prelavado};