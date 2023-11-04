import { useState } from "react";
//imports materialui
import { Container, Box, Tabs, Tab, Button, Stack, Fade, Paper, Divider } from "@mui/material";
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { StoreMap } from "../../components/StoreMap";
import { currentDate } from "../../Helpers/date";
//calendar experimental
import { WashingAgend } from "../../components/WashingAgend";
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

   const [tab, setTab] = useState(0)
   const [fade, setFade] = useState(false)

   const ToggleTab = (event, newValue) => {
      setTab(newValue)
      setFade(!fade)
   }

    return ( 
        <>
         <Container sx={{display:'flex', flexDirection:'column', gap:'20x', alignItems:'center'}}>

            <Tabs value={tab} onChange={ToggleTab} >
                <Tab label="Agenda de lavados"  />
                <Tab label="Mapa de almacen" />
            </Tabs>

             <CustomTabPanel value={tab} index={0}>
                <Container>
                   <Fade in={!fade} timeout={500}>
                      <Box
                         sx={{
                            display: 'flex',
                            placeItems: 'center'
                         }}
                      >
                         <Paper elevation={4} sx={{ padding: '10px' }}>
                           <WashingAgend/>
                         </Paper>
                      </Box>
                   </Fade>
                </Container>
             </CustomTabPanel>

             <CustomTabPanel value={tab} index={1}>
                <Container>
                   <Fade in={fade} timeout={500}>
                      <Box
                         sx={{
                            display: 'flex',
                            placeItems: 'center'
                         }}
                      >
                         <Paper elevation={4} sx={{ padding: '10px' }}>
                            <StoreMap dataContainers={mockDataContainers} />
                         </Paper>
                      </Box>
                   </Fade>
                </Container>
             </CustomTabPanel>

         </Container>
        </>
     );
}

export {Prelavado};