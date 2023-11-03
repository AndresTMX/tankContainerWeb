//imports hooks
import { useState } from "react";
//imports materialui
import { Container, Box, Tabs, Tab, Button, Stack, Fade, Paper, Divider } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { MaintenancesItem } from "../../components/MaintenancesITem";
import { currentDate } from "../../Helpers/date";

function Reparaciones() {

    const IsSmall = useMediaQuery('(max-width:900px)')
    const IsExtraSmall = useMediaQuery('(max-width:450px)');


    const [tab, setTab] = useState(0);

    const ToggleTab = (event, newValue) => {
        setTab(newValue)
    }

    const mockMaintances = [
        {
            id:0,
            hora: currentDate,
            linea:'Linea random',
            tracto:'Un tracto chido',
            tanque:'C-2356',
            operador:'Juan Miguel Salazar Perez',
            celular:'5577828470',
            status:'pending',
            tipo:'interno',
            date_end:''
        },
        {
            id:2,
            hora: currentDate,
            linea:'Linea random',
            tracto:'Un tracto chido',
            tanque:'C-2356',
            operador:'Lucas Ascencio Lopez',
            celular:'5577828470',
            status:'pending',
            tipo:'interno',
            date_end:''
        },
        {
            id:3,
            hora: currentDate,
            linea:'Linea random',
            tracto:'Un tracto chido',
            tanque:'C-2356',
            operador:'Armando Mendoza Lopez',
            celular:'5577828470',
            status:'complete',
            tipo:'externo',
            date_end:''
        },
        {
            id:4,
            hora: currentDate,
            linea:'Linea random',
            tracto:'Un tracto chido',
            tanque:'C-2356',
            operador:'Antonio Lopez De La Cruz',
            celular:'5577828470',
            status:'proces',
            tipo:'interno',
            date_end:''
        },
    ]

    const maintenancesPending = mockMaintances.filter(item => item.status === 'pending')
    const maintenancesComplete = mockMaintances.filter(item => item.status === 'complete')
    const maintenancesProces = mockMaintances.filter(item => item.status === 'proces')



    return ( 
        <>
        <Container
          sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            width:'100%',
            overflow:'hidden'
        }}
        >

             <Tabs 
             value={tab}
              onChange={ToggleTab}
              variant={IsSmall? "scrollable": ''}
              scrollButtons="auto"
              >
                <Tab label="Reparaciones Pendientes"  />
                <Tab label="Reparaciones En Proceso"  />
                <Tab label="Reparaciones Realizadas" />
            </Tabs>

            <CustomTabPanel value={tab} index={0}>
                <Fade timeout={500} in={tab === 0? true: false}>
                    <Box>
                    <h1>Reparaciones Pendientes</h1>
                    <p>Todos las reparaciones pendientes</p>
                    <Paper 
                    elevation={4}
                    sx={{
                        padding:IsExtraSmall? '10px' : '20px',
                    }}
                    >
                        <Stack gap='10px'>
                        {maintenancesPending.map((item) => (
                            <MaintenancesItem key={item.id} maintance={item}/>
                        ))}
                        </Stack>
                    </Paper>
                    </Box>
                </Fade>
            </CustomTabPanel>

            <CustomTabPanel value={tab} index={1}>
                <Fade timeout={500} in={tab === 1? true: false}>
                <Box>
                <h1>Reparaciones en proceso</h1>
                <p>Todos las reparaciones en proceso</p>

                <Paper 
                    elevation={4}
                    sx={{
                        padding:'20px'
                    }}
                    >
                        <Stack gap='10px'>
                        {maintenancesProces.map((item) => (
                            <MaintenancesItem key={item.id} maintance={item}/>
                        ))}
                        </Stack>
                    </Paper>
                </Box>
                </Fade>
            </CustomTabPanel>

            <CustomTabPanel value={tab} index={2}>
                <Fade timeout={500} in={tab === 2? true: false}>
                <Box>
                <h1>Reparaciones realizadas</h1>
                <p>Ultimas 20 reparaciones</p>

                <Paper 
                    elevation={4}
                    sx={{
                        padding:'20px'
                    }}
                    >
                        <Stack gap='10px'>
                        {maintenancesComplete.map((item) => (
                            <MaintenancesItem key={item.id} maintance={item}/>
                        ))}
                        </Stack>
                    </Paper>
                </Box>
                </Fade>
            </CustomTabPanel>

        </Container>
        </>
     );
}

export {Reparaciones};