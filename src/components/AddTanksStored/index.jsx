import { useEffect, useState } from "react";
import { Stack, Typography, Chip, Paper, Alert, Skeleton } from "@mui/material";
//hooks
import { useGetTanks } from "../../Hooks/tanksManagment/useGetTanks";
//icons
import AddIcon from '@mui/icons-material/Add';

function AddTanksStored({ dataTank, validateNumTank, setDataTank }) {

    //hooks de tanques
    const { tanks, tankError, tankLoading, getTanks } = useGetTanks();

    const [tanksManiobra, setTankManiobra] = useState([]);

    useEffect(() => {
        if (!tankLoading) {
            setTankManiobra(tanks)
        }

        if (tankLoading === null) {
            getTanks()
        }

        setDataTank([])
    }, [tankLoading])

    const addTankManiobra = (tank) => {

        if (validateNumTank()) {
            //copia el estado y agrega el nuevo tanque
            const newState = dataTank.length >= 1 ? [...dataTank] : [];
            newState.push(tank)

            //copia el estado y elimina el tanque seleccionado
            const newStateTanks = tanksManiobra.length >= 1 ? [...tanksManiobra] : [];
            const indexSelected = newStateTanks.findIndex((item) => item.numero_tanque === tank.numero_tanque);
            newStateTanks.splice(indexSelected, 1);

            //actualiza los estados
            setTankManiobra(newStateTanks)
            setDataTank(newState)
        }

    }

    const deleteTankManiobra = (tank) => {

        //copia el estado anterior de los tanques seleccionados y elimina el tanque seleccionado
        const newStateSelected = dataTank.length >= 1 ? [...dataTank] : [];
        const indexSelected = newStateSelected.findIndex((item) => item.numero_tanque === tank.numero_tanque);
        newStateSelected.splice(indexSelected, 1);

        //copia el estado de tanques disponibles y agrega el tanque seleccionado
        const newState = tanksManiobra.length >= 1 ? [...tanksManiobra] : [];
        newState.push(tank)

        //actualiza los estados
        setDataTank(newStateSelected)
        setTankManiobra(newState)

    }

    return (
        <>
            <Stack width={'100%'} gap='10px'>

                <Paper>
                    <Stack padding='10px' gap='10px'>
                        <Typography variant="button">
                            Tanques agregados {dataTank.length}
                        </Typography>

                        <Stack flexDirection={'row'} gap='10px'>
                            {dataTank.map((item) => (
                                <Chip
                                    sx={{ textTransform: 'uppercase' }}
                                    color="error"
                                    key={item.tanque}
                                    label={item.numero_tanque}
                                    onDelete={() => deleteTankManiobra(item)}
                                />
                            ))}
                        </Stack>
                    </Stack>
                </Paper>

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
                    {tanksManiobra.map((item) => (
                        <Chip
                            sx={{ textTransform: 'uppercase' }}
                            color="info"
                            key={item.tanque}
                            label={item.numero_tanque}
                            deleteIcon={<AddIcon />}
                            onDelete={() => addTankManiobra(item)}
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

                    {(!tankLoading && tanksManiobra.length === 0) &&
                        <Typography variant='caption'>Sin tanques disponibles</Typography>
                    }

                </Paper>

            </Stack>
        </>
    );
}

export { AddTanksStored };