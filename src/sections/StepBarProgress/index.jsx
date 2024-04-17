import { MobileStepper, Box, } from "@mui/material";

function StepBarProgress({ step, numSteps }) {
    return (
        <Box sx={{ width: '100%', transform: 'translate(22.5%)', backgroundColor: 'transparent' }}>
            <MobileStepper
                variant="progress"
                position='static'
                steps={numSteps}
                activeStep={step}
                sx={{
                    width: '100%',
                    backgroundColor: 'transparent'
                }}
            />
        </Box>
    );
}

export { StepBarProgress };