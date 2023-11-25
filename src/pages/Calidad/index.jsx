//imports materialui
import { Container, Box, Tabs, Tab, Button, Stack, Fade, Paper, Divider } from "@mui/material";
import { ViewerDocument } from "../../PDFs/components/Viewer"
import { EIR } from "../../PDFs/plantillas/EIR";

function Calidad() {
    return ( 
        <>
         <Container>
            <h2>Calidad</h2>
            <Box sx={{height:'100vh'}}>
               <ViewerDocument>
                  <EIR/>
               </ViewerDocument>
            </Box>
         </Container>
        </>
     );
}

export {Calidad};