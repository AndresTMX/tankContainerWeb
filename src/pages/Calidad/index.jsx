//imports materialui
import { useContext } from "react";
import { Container, Box, Tabs, Tab, Button, Stack, Fade, Paper, Divider } from "@mui/material";
import { ViewerDocument } from "../../PDFs/components/Viewer"
import { EIR } from "../../PDFs/plantillas/EIR";
import { DevelopmentContext } from "../../Context/DevelopmentContext";

function Calidad() {

   const [state, dispatch] = useContext(DevelopmentContext);

   const { maniobrasCheckList } = state;
   console.log("🚀 ~ file: index.jsx:13 ~ Calidad ~ maniobrasCheckList:", maniobrasCheckList)

    return ( 
        <>
         <Container>
            <h2>Calidad</h2>
            <Box sx={{height:'100vh'}}>
               <ViewerDocument>
                  <EIR checkList={maniobrasCheckList}/>
               </ViewerDocument>
            </Box>
         </Container>
        </>
     );
}

export {Calidad};