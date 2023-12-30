//imports materialui
import { useContext, useState } from "react";
import { Container, Box, Tabs, Tab, Button, Stack, Fade, Paper, Divider, Typography, } from "@mui/material";
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { ListPrelavadosPending } from "../../components/ListPrelavadosPending";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { usePreWashing } from "../../Hooks/Prelavado/usePreWashing";

function Calidad() {

   const IsSmall = useMediaQuery('(max-width:900px)');

   const { washing, loadignWashing, errorWashing, updater, type, cache } = usePreWashing('lavado');

   const [tab, setTab] = useState(0);

   const ToggleTab = (event, newValue) => {
      setTab(newValue)
   }


   return (
      <>
         <Box sx={{ display: 'flex', flexDirection:'column', alignItems: 'center', width: '100%' }}>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
               <Tabs
                  value={tab}
                  onChange={ToggleTab}
                  variant={IsSmall ? "scrollable" : ''}
                  scrollButtons="auto"
               >
                  <Tab label="Prelavados" />
                  <Tab label="Liberaciones" />
               </Tabs>
            </Box>

            <CustomTabPanel value={tab} index={0}>
               <Box sx={{ width:'90vw', maxWidth:'700px' }} > 
                  <ListPrelavadosPending
                     loading={loadignWashing}
                     prelavados={washing}
                     error={errorWashing}
                     updateList={updater}
                     cache={cache}
                  />
               </Box>
            </CustomTabPanel>

            <CustomTabPanel value={tab} index={1}>
               <Box>
                  <Typography>Liberaciones</Typography>
               </Box>
            </CustomTabPanel>


         </Box>
      </>
   );
}

export { Calidad };