import { Paper, Stack, Typography } from "@mui/material";

function DetailsUser({user}) {
    
    return (
        <>
            <Paper 
            sx={{
                padding:'20px',
                
            }}>
                <Stack>
                    <Typography variant="subtitle2">Puesto</Typography>
                    <Typography variant="subtitle">{user.position}</Typography>
                    <Typography variant="subtitle2">Usuario</Typography>
                    <Typography variant="subtitle">{`${user.first_name} ${user.last_name}`}</Typography>
                    <Typography variant="subtitle2">Contacto</Typography>
                    <Typography variant="subtitle2">{user.phone}</Typography>
                    <Typography variant="subtitle2">Mail</Typography>
                    <Typography variant="subtitle2">{user.email}</Typography>
                </Stack>
            </Paper>
        </>
    );
}

export { DetailsUser };