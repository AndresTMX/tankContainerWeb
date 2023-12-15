import { useEffect, useState } from "react";
import { Container, Box, Paper, Chip, Button, Alert, Skeleton, Stack, Typography, Modal, IconButton, TextField, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { useGetTanks } from "../../Hooks/tanksManagment/useGetTanks";
import { ContainerScroll } from "../ContainerScroll";
import CloseIcon from '@mui/icons-material/Close';

import { useAddTanks } from "../../Hooks/Maniobras/useAddTanks";

function ViewAllTanks() {

    const { getTanks, tanks, tankError, tankLoading } = useGetTanks();
    const { updateTank } = useAddTanks();

    const [editTank, setEditTank] = useState(false);
    const [selectTank, setSelectTank] = useState({});

    useEffect(() => {
        getTanks();
    }, [editTank])

    const [newStatusTank, setNewStatusTank] = useState('')

    const selected = (tank) => {
        setSelectTank(tank)
        setEditTank(!editTank)
    }

    const OnSubmit = async(e) => {
        e.preventDefault();

        const tanque = selectTank.tanque;

        const updates = {
            status: newStatusTank,
        }

        await updateTank(updates, tanque)
        setTimeout( ()=> {
            setEditTank(!editTank)
        })

    }


    return (
        <>

            <Container>
                <Box>
                    <Stack>
                        <Typography variant='button'>
                            Todos los tanques registrados
                        </Typography>
                    </Stack>
                    <Paper>
                        <ContainerScroll height={'75vh'}>
                            <Stack spacing={1}>


                                {(!tankError && !tankLoading) &&
                                    tanks.map((tanque) => (
                                        <ItemViewTank
                                            key={tanque.tanque}
                                            tanque={tanque}
                                            onClick={selected}
                                        />
                                    ))}

                                {(tankLoading) &&
                                    <>
                                        <Skeleton variant='rounded' width={'100%'} height={'40px'} />
                                        <Skeleton variant='rounded' width={'100%'} height={'40px'} />
                                        <Skeleton variant='rounded' width={'100%'} height={'40px'} />
                                        <Skeleton variant='rounded' width={'100%'} height={'40px'} />
                                        <Skeleton variant='rounded' width={'100%'} height={'40px'} />
                                        <Skeleton variant='rounded' width={'100%'} height={'40px'} />
                                        <Skeleton variant='rounded' width={'100%'} height={'40px'} />
                                        <Skeleton variant='rounded' width={'100%'} height={'40px'} />
                                    </>
                                }

                                {(tankError) &&
                                    <Alert severity="error">Error al cargar los tanques, intenta de nuevo.</Alert>
                                }

                                {(tanks.length === 0 && !tankError && !tankLoading) &&
                                    <Alert severity="error">Error al cargar los tanques, intenta de nuevo.</Alert>

                                }
                            </Stack>
                        </ContainerScroll>
                    </Paper>
                </Box>
            </Container>

            <Modal open={editTank}>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '100vh',
                        marginTop: '10%'
                    }}
                >
                    <Box>
                        <form onSubmit={OnSubmit}>
                            <Paper
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '20px',
                                    width: '400px',
                                    gap: '10px',
                                }}
                            >
                                <Stack
                                    flexDirection={'row'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                >
                                    <Typography>
                                        Editar tanque <strong>{selectTank.tanque}</strong>
                                    </Typography>
                                    <IconButton onClick={() => setEditTank(false)}>
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>

                                <Stack
                                    gap={'10px'}
                                    alignItems={'center'}
                                >
                                    <TextField
                                        disabled
                                        fullWidth
                                        label={'Numero de tanque'}
                                        value={selectTank.tanque}
                                    />

                                    <FormControl fullWidth>
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            defaultValue={selectTank.status}
                                            value={newStatusTank.length === 0 ? selectTank.status : newStatusTank}
                                            label="Status"
                                            onChange={(e) => setNewStatusTank(e.target.value)}
                                        >
                                            <MenuItem value={'ready'}>Ready</MenuItem>
                                            <MenuItem value={'maniobras'}>Maniobras</MenuItem>
                                            <MenuItem value={'eir'}>EIR</MenuItem>
                                            <MenuItem value={'parked'}>Parked</MenuItem>

                                        </Select>
                                    </FormControl>

                                </Stack>

                                <Button
                                    type="submit"
                                    fullWidth
                                    color="primary"
                                    variant="contained"
                                >
                                    Actualizar
                                </Button>

                            </Paper>
                        </form>
                    </Box>
                </Container>
            </Modal>

        </>
    )
}

export { ViewAllTanks };

function ItemViewTank({ tanque, onClick }) {
    return (
        <Paper
            elevation={2}
            key={tanque.tanque}
        >
            <Stack
                padding={'10px'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                gap={'20px'}
            >
                <Typography>
                    {tanque.tanque}
                </Typography>

                <Stack
                    gap={'10px'}
                    flexDirection={'row'}>

                    <Stack
                        flexDirection={'row'}
                        alignItems={'center'}
                        gap={'10px'}
                    >
                        <Typography
                            color='gray'
                            variant='caption'>
                            status
                        </Typography>
                        <Chip
                            size="small"
                            color="info"
                            label={tanque.status}
                        />
                    </Stack>

                    <Button
                        onClick={() => onClick(tanque)}
                        variant="contained"
                        color="warning"
                        size="small"
                    >
                        Editar
                    </Button>
                </Stack>

            </Stack>
        </Paper>
    );
}

export { ItemViewTank };
