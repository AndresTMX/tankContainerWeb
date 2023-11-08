import { Container, Box, Paper, Modal,  } from "@mui/material";
import { Step1 } from "../StepsManiobras/Step1";
import { Step2 } from "../StepsManiobras/Step2";
function CheckListMaiobras() {

    const step = 2

    return ( 
        <>
           <Box 
           sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
           }}>

           {step === 1 && (
               <Step1/>
           )}

           {step === 2 && (
               <Step2/>
           )}

           </Box>
        </>
     );
}

export {CheckListMaiobras};