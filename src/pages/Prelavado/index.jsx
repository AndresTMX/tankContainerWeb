import { useState, useContext } from "react";
//imports materialui
import { Container, Box, Tabs, Tab, Button, Stack, Fade, Paper, Divider, Chip } from "@mui/material";
import { StoreMap } from "../../components/StoreMap";
import { currentDate } from "../../Helpers/date";
//components
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { LoadingState } from "../../components/LoadingState";
import { Notification } from "../../components/Notification"
import { FormWashing } from "../../components/FormWashing";
import { Searcher } from "../../components/Searcher";
import { ItemWashing } from "../../components/ItemWashing";
//calendar experimental
import { WashingAgend } from "../../components/WashingAgend";
//hooks
import { usePreWashing } from "../../Hooks/Prelavado/usePreWashing";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSearcher } from "../../Hooks/useSearcher";
//context
import { PrelavadoContext } from "../../Context/PrelavadoContext";
import { ListWashing } from "../../components/ListWashing";
//checklist
import { CheckListPrelavado } from "../../sections/CheckListPrelavado";

function Prelavado() {

   const [state, dispatch] = useContext(PrelavadoContext);
   const { washing, loadignWashing, errorWashing, updater, changueTypeWashing, type } = usePreWashing('prelavado');

   const IsSmall = useMediaQuery('(max-width:900px)');
   const isMovile = useMediaQuery("(max-width:640px)");

   const { selectCheck } = state

   // const { } = useSearcher()

   const mockDataContainers = [
      {
         id: 0,
         checkIn: currentDate,
         number: 'C-2356',
         line: 'Linea random',
         date_preWashing: currentDate,
         repairs: {
            intern: 10,
            extern: 5
         },
         last_reparation: {
            type: 'inter',
            description: 'se reparo de las puertas'
         },
         location: {
            block: 'A',
            position: 1
         },
         status: true
      },
      {
         id: 1,
         checkIn: currentDate,
         number: 'C-2356',
         line: 'Linea random',
         date_preWashing: currentDate,
         repairs: {
            intern: 10,
            extern: 5
         },
         last_reparation: {
            type: 'inter',
            description: 'se reparo de las puertas'
         },
         location: {
            block: 'B',
            position: 2
         }
      },
      {
         id: 2,
         checkIn: currentDate,
         number: 'C-2356',
         line: 'Linea random',
         date_preWashing: currentDate,
         repairs: {
            intern: 10,
            extern: 5
         },
         last_reparation: {
            type: 'inter',
            description: 'se reparo de las puertas'
         },
         location: {
            block: 'C',
            position: 3
         }
      },
      {
         id: 3,
         checkIn: currentDate,
         number: 'C-2356',
         line: 'Linea random',
         date_preWashing: currentDate,
         repairs: {
            intern: 10,
            extern: 5
         },
         last_reparation: {
            type: 'inter',
            description: 'se reparo de las puertas'
         },
         location: {
            block: 'C',
            position: 4
         }
      },
      {
         id: 4,
         checkIn: currentDate,
         number: 'C-2356',
         line: 'Linea random',
         date_preWashing: currentDate,
         repairs: {
            intern: 10,
            extern: 5
         },
         last_reparation: {
            type: 'inter',
            description: 'se reparo de las puertas'
         },
         location: {
            block: 'A',
            position: 5
         }
      },
      {
         id: 5,
         checkIn: currentDate,
         number: 'C-2356',
         line: 'Linea random',
         date_preWashing: currentDate,
         repairs: {
            intern: 10,
            extern: 5
         },
         last_reparation: {
            type: 'inter',
            description: 'se reparo de las puertas'
         },
         location: {
            block: 'B',
            position: 6
         }
      },
      {
         id: 6,
         checkIn: currentDate,
         number: 'C-2356',
         line: 'Linea random',
         date_preWashing: currentDate,
         repairs: {
            intern: 10,
            extern: 5
         },
         last_reparation: {
            type: 'inter',
            description: 'se reparo de las puertas'
         },
         location: {
            block: 'C',
            position: 7
         }
      },
      {
         id: 7,
         checkIn: currentDate,
         number: 'C-2356',
         line: 'Linea random',
         date_preWashing: currentDate,
         repairs: {
            intern: 10,
            extern: 5
         },
         last_reparation: {
            type: 'inter',
            description: 'se reparo de las puertas'
         },
         location: {
            block: 'A',
            position: 8
         }
      },
      {
         id: 8,
         checkIn: currentDate,
         number: 'C-2356',
         line: 'Linea random',
         date_preWashing: currentDate,
         repairs: {
            intern: 10,
            extern: 5
         },
         last_reparation: {
            type: 'inter',
            description: 'se reparo de las puertas'
         },
         location: {
            block: 'B',
            position: 9
         }
      },
      {
         id: 9,
         checkIn: currentDate,
         number: 'C-2356',
         line: 'Linea random',
         date_preWashing: currentDate,
         repairs: {
            intern: 10,
            extern: 5
         },
         last_reparation: {
            type: 'inter',
            description: 'se reparo de las puertas'
         },
         location: {
            block: 'C',
            position: 10
         }
      },
      {
         id: 10,
         checkIn: currentDate,
         number: 'C-2356',
         line: 'Linea random',
         date_preWashing: currentDate,
         repairs: {
            intern: 10,
            extern: 5
         },
         last_reparation: {
            type: 'inter',
            description: 'se reparo de las puertas'
         },
         location: {
            block: 'B',
            position: 11
         }
      },
      {
         id: 11,
         checkIn: currentDate,
         number: '',
         line: 'Linea random',
         date_preWashing: currentDate,
         repairs: {
            intern: 10,
            extern: 5
         },
         last_reparation: {
            type: 'inter',
            description: 'se reparo de las puertas'
         },
         location: {
            block: 'C',
            position: 12
         }
      },

   ]

   const [tab, setTab] = useState(1)
   const [step, setStep] = useState(1);

   const ToggleTab = (event, newValue) => {
      setTab(newValue)
   }

   return (
      <>
         <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px', overflowX: 'hidden', minHeight: '100vh' }}>

            <Tabs value={tab} onChange={ToggleTab}>
               <Tab label="Agenda de lavados" />
               <Tab label="Prelavados" />
               <Tab label="Mapa de almacen" />
            </Tabs>

            <CustomTabPanel value={tab} index={0}>
               <Container>
                  <Fade in={tab === 0 ? true : false} timeout={500}>
                     <Box
                        sx={{
                           display: 'flex',
                           placeItems: 'center'
                        }}
                     >
                        <Paper elevation={4} sx={{ padding: '10px' }}>
                           <WashingAgend />
                        </Paper>
                     </Box>
                  </Fade>
               </Container>
            </CustomTabPanel>

            <CustomTabPanel value={tab} index={1}>
               {!state.selectCheck &&
                  <Box>
                     <Fade in={tab === 1 ? true : false} timeout={500}>
                        <Container
                           sx={{
                              gap: '10px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              padding: '0px',
                              alignItems: 'center'

                           }}
                        >
                           <Paper
                              elevation={2}
                              sx={{
                                 width: '95vw',
                                 padding: IsSmall ? '0px' : '10px',
                                 maxWidth: '700px',
                                 background: 'whitesmoke',
                                 alignItems: isMovile ? 'center' : '',
                              }}>

                              <Stack
                                 sx={{
                                    padding: IsSmall ? '15px' : '20px',
                                    borderRadius: '4px',
                                 }}
                                 flexDirection="row"
                                 justifyContent={isMovile ? "center" : "space-between"}
                                 alignItems="center"
                                 flexWrap="wrap"
                                 gap="20px"

                              >
                                 <Stack
                                    flexDirection="row"
                                    alignItems="center"
                                    flexWrap="wrap"
                                    gap="10px"
                                    width={isMovile ? "100%" : "auto"}
                                 >
                                    <Chip
                                       onClick={() => changueTypeWashing("prelavado")}
                                       color={type === "prelavado" ? "warning" : "default"}
                                       label="pendientes"
                                    />
                                    <Chip
                                       onClick={() => changueTypeWashing("lavado")}
                                       color={type === "lavado" ? "success" : "default"}
                                       label="realizados"
                                    />

                                 </Stack>

                                 <Stack width={isMovile ? '100%' : '350px'}>
                                    <Searcher
                                    // search={search}
                                    // searching={searching}
                                    // placeholder={'Busca registros usando ....'}
                                    // searchingKey={searchingKey}
                                    // onChangueSearch={onChangueSearch}
                                    />
                                 </Stack>

                              </Stack>

                           </Paper>

                           {/* <ListWashing
                              typeWashing={type}
                              washingList={washing}
                              loadignWashing={loadignWashing}
                              errorWashing={errorWashing}
                           /> */}

                        </Container>
                     </Fade>
                  </Box>}
            </CustomTabPanel>

            <CustomTabPanel value={tab} index={2}>
               <Container>
                  <Fade in={tab === 2 ? true : false} timeout={500}>
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

            {selectCheck && (
               <Paper
                  elevation={4}
                  sx={{
                     display: 'flex',
                     justifyContent: 'center',
                     width: '700px',
                     maxWidth: '95vw',
                     padding: '10px',
                  }}>
                  <Box sx={{ padding: isMovile ? '0px' : '15px', width: '100%' }}>
                     <Stack alignItems={'center'}>
                        <ItemWashing data={selectCheck} updater={updater} step={step} setStep={setStep} />
                        <CheckListPrelavado step={step} setStep={setStep} />
                     </Stack>
                  </Box>
               </Paper>
            )}

         </Container>

         <LoadingState duration={1000} />

         <Notification />

      </>
   );
}

export { Prelavado };