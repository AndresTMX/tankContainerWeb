//imports materialui
import { useState } from "react";
import { Box, Tabs, Tab, Typography, } from "@mui/material";
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { ListPrelavadosPending } from "../../components/ListPrelavadosPending";
import { ListWashingForAprobe } from "../../components/ListWashingsForAprobe";
import { ListLiberations } from "../../components/ListLiberations";
import { LoadingState } from "../../components/LoadingState";
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
         <Box >

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <Tabs
                  value={tab}
                  onChange={ToggleTab}
                  variant={IsSmall ? "scrollable" : ''}
                  scrollButtons="auto"
               >
                  <Tab label="Prelavados" />
                  <Tab label="Lavados" />
                  <Tab label="Liberados" />
               </Tabs>
            </Box>

            <CustomTabPanel value={tab} index={0}>
               <Box sx={{ width: '90vw', maxWidth: '700px', marginX:'auto' }} >
                  <ListPrelavadosPending />
               </Box>
            </CustomTabPanel>

            <CustomTabPanel value={tab} index={1}>
               <Box sx={{ width: '90vw', maxWidth: '700px', marginX:'auto'  }}>
                  <ListWashingForAprobe />
               </Box>
            </CustomTabPanel>

            <CustomTabPanel value={tab} index={2}>
               <Box sx={{ width: '90vw', maxWidth: '700px', marginX:'auto'  }}>
                  <ListLiberations />
               </Box>
            </CustomTabPanel>


         </Box>

         <Notification />

         <LoadingState duration={1000} />
      </>
   );
}

export { Calidad };