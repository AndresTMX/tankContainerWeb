import { useState } from "react";
import { Box, Slide } from "@mui/material";
import { Step1 } from "../StepsManiobras/Step1";
import { Step2 } from "../StepsManiobras/Step2";
import { Step3 } from "../StepsManiobras/Step3";
import { Step4 } from "../StepsManiobras/Step4";
import { Step5 } from "../StepsManiobras/Step5";

function CheckListMaiobras() {

    const [step, setStep] = useState(5);

    const nextStep = () => {
        setStep(step + 1)
    }

    const previusStep = () => {
        setStep(step - 1)
    }

    return ( 
        <>
           <Box 
           sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
           }}>

           {step === 1 && (
               <Slide 
               direction='right'
               in={step === 1? true: false}
               timeout={500}
               mountOnEnter 
               unmountOnExit
               >
                <Box>
                <Step1 nextStep={nextStep}/>
                </Box>
               </Slide>
           )}

           {step === 2 && (
               <Slide 
               direction='left'
               in={step === 2? true: false}
               timeout={500}
               mountOnEnter 
               unmountOnExit
               >
                <Box sx={{width:'100%'}}>
                <Step2 step={step} nextStep={nextStep} previusStep={previusStep}/>
                </Box>
               </Slide>
           )}

           {step === 3 && (
               <Slide 
               direction='left'
               in={step === 3? true: false}
               timeout={500}
               mountOnEnter 
               unmountOnExit
               >
                <Box sx={{width:'100%'}}>
                <Step3 step={step} nextStep={nextStep} previusStep={previusStep}/>
                </Box>
               </Slide>
           )}

           {step === 4 && (
               <Slide 
               direction='left'
               in={step === 4? true: false}
               timeout={500}
               mountOnEnter 
               unmountOnExit
               >
                <Box sx={{width:'100%'}}>
                <Step4 step={step} nextStep={nextStep} previusStep={previusStep}/>
                </Box>
               </Slide>
           )}

           {step === 5 && (
               <Slide 
               direction='left'
               in={step === 5? true: false}
               timeout={500}
               mountOnEnter 
               unmountOnExit
               >
                <Box sx={{width:'100%'}}>
                <Step5 step={step} nextStep={nextStep} previusStep={previusStep}/>
                </Box>
               </Slide>
           )}

           </Box>
        </>
     );
}

export {CheckListMaiobras};