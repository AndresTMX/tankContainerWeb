//imports materialui
import { useContext } from "react";
import { Container, Box, Tabs, Tab, Button, Stack, Fade, Paper, Divider } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
import { Proforma } from "../../PDFs/plantillas/proforma";

function Calidad() {

    return ( 
        <>
         <Container>
            <h2>Calidad</h2>
            <Box sx={{height:'100vh'}}>
               <PDFViewer style={{ width: '100%', height: '90%', }}>
                  <Proforma typeProforma={'sencillo'}/>
               </PDFViewer>
            </Box>
         </Container>
        </>
     );
}

export {Calidad};