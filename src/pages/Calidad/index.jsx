//imports materialui
import { useContext } from "react";
import { Container, Box, Tabs, Tab, Button, Stack, Fade, Paper, Divider } from "@mui/material";

//experimental component
import { UploadFileCloudinary } from "../../components/uploadFileCloudinary";

function Calidad() {

    return ( 
        <>
         <Container>
            <h2>Calidad</h2>
            <Box sx={{height:'100vh'}}>

               <UploadFileCloudinary/>
           
            </Box>
         </Container>
        </>
     );
}

export {Calidad};