import { useState } from "react";
import { Box, Slide } from "@mui/material";
import { StepBarProgress } from "../StepsManiobras/StepBarProgress";
import { Step1 } from "../StepsManiobras/Step1";
import { Step2 } from "../StepsManiobras/Step2";
import { Step3 } from "../StepsManiobras/Step3";
import { Step4 } from "../StepsManiobras/Step4";
import { Step5 } from "../StepsManiobras/Step5";
import { Step6 } from "../StepsManiobras/Step6";
import { Step7 } from "../StepsManiobras/Step7";
import { Step8 } from "../StepsManiobras/Step8";

function CheckListPrelavado() {

    const [step, setStep] = useState(1);

    const nextStep = (newStep) => {
            setStep(newStep)
    } 

    const previusStep = (newStep) => {
            setStep(newStep)
    }

    return ( 
        <>
           <Box 
           sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            maxWidth:'700px'
           }}>

            <StepBarProgress step={step} numSteps={9} />

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

           {step === 6 && (
               <Slide 
               direction='left'
               in={step === 6? true: false}
               timeout={500}
               mountOnEnter 
               unmountOnExit
               >
                <Box sx={{width:'100%'}}>
                <Step6 step={step} nextStep={nextStep} previusStep={previusStep}/>
                </Box>
               </Slide>
           )}

           {step === 7 && (
               <Slide 
               direction='left'
               in={step === 7? true: false}
               timeout={500}
               mountOnEnter 
               unmountOnExit
               >
                <Box sx={{width:'100%'}}>
                <Step7 step={step} nextStep={nextStep} previusStep={previusStep}/>
                </Box>
               </Slide>
           )}

            {step === 8 && (
               <Slide 
               direction='left'
               in={step === 8? true: false}
               timeout={500}
               mountOnEnter 
               unmountOnExit
               >
                <Box sx={{width:'100%'}}>
                <Step8 step={step} nextStep={nextStep} previusStep={previusStep}/>
                </Box>
               </Slide>
           )}


           </Box>
        </>
     );
}

export {CheckListPrelavado};