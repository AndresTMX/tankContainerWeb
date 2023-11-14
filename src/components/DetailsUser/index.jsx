import { Paper, Stack, Typography } from "@mui/material";
import { useSupabase } from "../../Hooks/useSupabase";

function DetailsUser({user}) {

    // const {supabase} = useSupabase()

    // const getSesion = async() => {
    //     const { data, error } = await supabase.auth.getSession()
    //     console.log("🚀 ~ file: index.jsx:8 ~ getSesion ~ data:", data)
    // }

    // getSesion()
    
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