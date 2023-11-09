import { Stack, Button } from "@mui/material";

function ButtonsNavigationCheck({step, nextStep, previusStep}) {
    return (
        <>
            <Stack flexDirection='row' gap='20px' justifyContent='space-around'>
                {step > 1 && <Button onClick={previusStep} variant="contained">Anterior</Button>}
                <Button onClick={nextStep} variant="contained">Siguiente</Button>
            </Stack>
        </>
    );
}

export { ButtonsNavigationCheck };