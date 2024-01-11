import { useEffect } from "react";
import { Stack, Typography, Chip, Paper, Alert, Skeleton } from "@mui/material";
//hooks
import { useGetTanks } from "../../Hooks/tanksManagment/useGetTanks";
//icons
import AddIcon from '@mui/icons-material/Add';

function AddTanksStored({ toggleTank }) {

    useEffect(() => {
        getTanks();
    }, [])

    //hooks de tanques
    const { tanks, tankError, tankLoading, tanksReady, getTanks } = useGetTanks();

    return (
        <>
            <Stack width={'100%'} gap='10px'>
                <Paper
                    elevation={2}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        padding: '15px',
                        width: '100%',
                        gap: '10px'
                    }}
                >
                    {tanksReady.map((item) => (
                        <Chip
                            key={item.tanque}
                            label={item.tanque}
                            deleteIcon={<AddIcon />}
                            onDelete={() => toggleTank(item.tanque)}
                        />
                    ))}

                    {tankLoading && (
                        <Stack
                            flexDirection={'row'}
                            alignItems={'center'}
                            flexWrap={'wrap'}
                            gap={'10px'}
                        >
                            <Skeleton variant='rounded' width={'85px'} height={'32px'} />
                            <Skeleton variant="rounded" width={'85px'} height={'32px'} />
                            <Skeleton variant="rounded" width={'85px'} height={'32px'} />
                        </Stack>
                    )}

                    {tankError &&
                        <Alert severity="error">Hubo un error al cargar los tanques, intenta de nuevo</Alert>
                    }

                    {(!tankLoading && tanksReady.length === 0) &&
                        <Typography variant='caption'>Sin tanques disponibles</Typography>
                    }

                </Paper>

            </Stack>
        </>
    );
}

export { AddTanksStored };