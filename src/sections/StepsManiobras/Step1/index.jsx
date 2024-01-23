import { Typography, Button, Stack, Paper } from "@mui/material";
import { ContainerScroll } from "../../../components/ContainerScroll";

function Step1({ setStep }) {
    return (
        <>
            <ContainerScroll height={'auto'}>
                <Paper
                    elevation={4}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        padding: '20px',
                    }}>
                    <Typography variant="h6">Revisión de empaques de valvula de descarga</Typography>

                    <Typography variant='body1'>
                        {'Desensamble la válvula de descarga, asegúrese de que todas las partes estén trabajando correctamente y no tienen daños mayores (Abolladuras, rayas profundas, etc.)'}
                    </Typography>

                    <Typography variant='body1'>
                        {'Mientras la válvula de descarga se encuentra desensamblada, revise si algunos de los empaques (Gasket) necesita remplazarse y remplácelo con uno nuevo.'}
                    </Typography>

                    <Stack
                        alignItems='center'>
                        <Button
                            fullWidth
                            onClick={() => setStep(2)}
                            sx={{ maxWidth: '250px' }}
                            variant="contained"
                            color="primary"
                        >
                            Ok
                        </Button>
                    </Stack>

                </Paper>
            </ContainerScroll>
        </>
    );
}

export { Step1 };