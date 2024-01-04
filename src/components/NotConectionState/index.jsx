import { Stack, Typography, Alert } from "@mui/material";

function NotConexionState() {
    return (
        <>
            <Stack
                sx={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "4px",
                }}
                flexDirection="column"
                gap="10px"
                justifyContent="flex-start"
            >
               <Alert severity="error">
                Error al cargar
               </Alert>

                <Typography variant="caption">
                    Probablemente no tienes internet, esta es la Información de la
                    ultima consulta exitosa a la base de datos, suerte.
                </Typography>
            </Stack>
        </>
    );
}

export { NotConexionState };