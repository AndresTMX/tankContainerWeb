import { Stack, Chip, Typography } from "@mui/material";

function NotConexionState() {
    return (
        <>
            <Stack
                sx={{
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "4px",
                }}
                flexDirection="column"
                gap="5px"
                justifyContent="flex-start"
            >
                <Chip
                    sx={{ width: "130px" }}
                    color="warning"
                    label="¡Error al cargar!"
                />

                <Typography variant="caption">
                    probablemente no tienes internet, esta es la Información de la
                    ultima consulta exitosa a la base de datos, suerte.
                </Typography>
            </Stack>
        </>
    );
}

export { NotConexionState };