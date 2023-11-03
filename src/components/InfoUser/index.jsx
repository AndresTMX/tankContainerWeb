//materialui 
import { Stack, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

function InfoUser({title, value, onChangue}) {
    return (
        <>
            <Stack sx={{ position: 'relative', backgroundColor: 'whitesmoke', padding: '20px', borderRadius: '4px', width:'250px' }}>
                {(title != 'Departamento' ) && (title != 'Puesto de trabajo' ) && <IconButton
                onChange={onChangue}
                sx={{
                    position: 'absolute',
                    bottom: '45%',
                    left: '70%',
                }}>
                    <EditIcon sx={{ fontSize: '20px' }} />
                </IconButton>}
                <strong>{title}</strong>
                <span>{value}</span>
            </Stack>
        </>
    );
}

export { InfoUser };