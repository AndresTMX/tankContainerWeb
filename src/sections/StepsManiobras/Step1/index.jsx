import { Typography, Button, Stack, Paper } from "@mui/material";

function Step1() {
    return ( 
        <>
        <Paper 
        elevation={4}
        sx={{
            display:'flex', 
            flexDirection:'column', 
            gap:'20px', 
            padding:'20px',
            }}>
            <Typography variant="h6">Revisión de empaques</Typography>

            <Typography variant='body1'>
            {'Desensamble la válvula de descarga, asegúrese de que todas las partes estén trabajando correctamente y no tienen daños mayores (Abolladuras, rayas profundas, etc.)'}
            </Typography>

            <Typography variant='body1'>
            {'Mientras la válvula de descarga se encuentra desensamblada, revise si algunos de los empaques (Gasket) necesita remplazarse y remplácelo con uno nuevo.'}
            </Typography>

            <Stack
            alignItems='center'>
            <Button 
            sx={{maxWidth:'250px'}}
            fullWidth
            color="primary" 
            variant="contained">
            Ok
            </Button>
            </Stack>

        </Paper>
        </>
     );
}

export {Step1};