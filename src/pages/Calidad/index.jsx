//imports materialui
import { useState } from "react";
import { Box, Tabs, Tab, } from "@mui/material";
import { CustomTabPanel } from "../../components/CustomTabPanel";
// import { ListWashingForAprobe } from "../../components/ListWashingsForAprobe";
// import { ListLiberations } from "../../components/ListLiberations";
//hooks
import { Outlet, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCalidadContext } from "../../Context/CalidadContext";

function Calidad() {

   const { pathname } = useCalidadContext();
   const navigate = useNavigate();

   const IsSmall = useMediaQuery('(max-width:900px)');
   const [tab, setTab] = useState(pathname);

   const ToggleTab = (event, newValue) => {
      setTab(newValue)
      navigate(newValue)
   }

   return (
      <>

         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Tabs
               value={tab}
               onChange={ToggleTab}
               variant={IsSmall ? "scrollable" : ''}
               scrollButtons="auto"
            >
               <Tab label="Prelavados" value='/calidad/prelavados/pendientes' />
               <Tab label="Lavados" value='/calidad/lavados/pendientes' />
               <Tab label="Liberados" value='liberados' />
            </Tabs>
         </Box>

         <CustomTabPanel value={tab} index={'/calidad/prelavados/pendientes'}>
            <Box>
               <Outlet />
            </Box>
         </CustomTabPanel>

         <CustomTabPanel value={tab} index={'/calidad/lavados/pendientes'}>
            <Box>
               <Outlet />
            </Box>
         </CustomTabPanel>

         <CustomTabPanel value={tab} index={'liberados'}>
            <Box>
               {/* <ListLiberations /> */}
               <Outlet />
            </Box>
         </CustomTabPanel>

      </>
   );
}

export { Calidad };