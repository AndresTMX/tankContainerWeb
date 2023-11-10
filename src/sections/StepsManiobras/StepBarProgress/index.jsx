import { MobileStepper, Box, Stepper } from "@mui/material";

function StepBarProgress({step}) {
    return (
        <Box sx={{ width:'80vw', transform: 'translate(22.5%)'}}>
            <MobileStepper
                variant="progress"
                position='null'
                steps={9}
                activeStep={step}
                sx={{
                     width:'100%'
                    }}
            />
        </Box>
    );
}

export { StepBarProgress };