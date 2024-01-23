//imports materialui
import { useState } from "react";
import { Box, Tabs, Tab,  Typography, } from "@mui/material";
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { ListPrelavadosPending } from "../../components/ListPrelavadosPending";
import { Notification } from "../../components/Notification";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";

function Calidad() {

   const IsSmall = useMediaQuery('(max-width:900px)');

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
                  <Tab label="Lavados" />
                  <Tab label="Documentacion" />
               </Tabs>
            </Box>

            <CustomTabPanel value={tab} index={0}>
               <Box sx={{ width:'90vw', maxWidth:'700px' }} > 
                  <ListPrelavadosPending/>
               </Box>
            </CustomTabPanel>

            <CustomTabPanel value={tab} index={1}>
               <Box>
                  <Typography>Lavados</Typography>
               </Box>
            </CustomTabPanel>


         </Box>

         <Notification/>
      </>
   );
}

export { Calidad };