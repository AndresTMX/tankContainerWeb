import { MobileStepper, Box, Stepper } from "@mui/material";

function StepBarProgress({step}) {
    return (
        <Box sx={{ width:'100%', transform: 'translate(22.5%)', backgroundColor:'transparent'}}>
            <MobileStepper
                variant="progress"
                position='null'
                steps={9}
                activeStep={step}
                sx={{
                     width:'100%',
                     backgroundColor:'transparent'
                    }}
            />
        </Box>
    );
}

export { StepBarProgress };