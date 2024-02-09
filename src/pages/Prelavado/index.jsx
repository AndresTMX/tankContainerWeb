import { useState, useContext } from "react";
//imports materialui
import { Container, Box, Tabs, Tab, Button, Stack, Fade, Paper, Divider, Chip } from "@mui/material";
import { StoreMap } from "../../components/StoreMap";
import { currentDate } from "../../Helpers/date";
//components
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { LoadingState } from "../../components/LoadingState";
import { Notification } from "../../components/Notification"
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
   const { washing, loadignWashing, errorWashing, updater, } = usePreWashing('prelavado');

   const IsSmall = useMediaQuery('(max-width:900px)');
   const isMovile = useMediaQuery("(max-width:640px)");

   const { selectCheck } = state;

   return (
      <>
         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px', overflowX: 'hidden', minHeight: '90vh' }}>

            {!state.selectCheck &&
               <Box sx={{ width: '90vw', maxWidth: '750px' }}>
                  <Fade in={!state.selectCheck} timeout={300}>
                     <Box
                        sx={{
                           gap: '10px',
                           display: 'flex',
                           flexDirection: 'column',
                           justifyContent: 'center',
                           alignItems: 'center',
                        }}
                     >
                        <Paper
                           elevation={2}
                           sx={{
                              width: '100%',
                              padding: IsSmall ? '0px' : '10px',
                              background: 'whitesmoke',
                              alignItems: isMovile ? 'center' : '',
                           }}>

                           <Stack
                              sx={{
                                 padding:'10px',
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
                                    color={'warning'}
                                    label="pendientes"
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

                        <ListWashing
                           washingList={washing}
                           loadignWashing={loadignWashing}
                           errorWashing={errorWashing}
                        />

                     </Box>
                  </Fade>
               </Box>}

            {selectCheck && (
               <Paper
                  elevation={4}
                  sx={{
                     display: 'flex',
                     justifyContent: 'center',
                     width: 'auto',
                     maxWidth: '95vw',
                     padding: '10px',
                  }}>
                  <Box sx={{ padding: isMovile ? '0px' : '15px', width: '90vw', maxWidth: '800px' }}>
                     <ItemWashing data={selectCheck} type={'header'} />
                     <CheckListPrelavado updater={updater} />
                  </Box>
               </Paper>
            )}

         </Box>

         <LoadingState duration={1000} />

         <Notification />

      </>
   );
}

export { Prelavado };

