import { useState } from "react";
import { Container, Box, Paper, Typography, Stack, Button } from "@mui/material";
import { SelectSimple } from "../SelectSimple";
import { InputText } from "../InputText";
//hooks
import { useAddTanks } from "../../Hooks/Maniobras/useAddTanks";

function AddNewTanks({ toggleModal }) {

    const { addTanks } = useAddTanks();

    //modal de tanques
    const [newTank, setNewTank] = useState('');
    const [newTankStatus, setNewTankStatus] = useState('');
    const [optionTanks, setOptionTanks] = useState('')

    const dividerNumTanks = async () => {
        const arrayCleanSpaces = newTank.trim().split(',');
        let dataTanks = arrayCleanSpaces.map((tank) => tank.replace(/\s/g, ''));
        await addTanks(dataTanks, newTankStatus);
        toggleModal()
    }

    const singleTank = async () => {
        let dataTanks = []
        dataTanks.push(newTank.replace(/\s/g, ''))
        await addTanks(dataTanks, newTankStatus);
        toggleModal()
    }

    const routerTanks = (e) => {
        e.preventDefault();

        const options = {
            sencillo: () => singleTank(),
            multiple: () => dividerNumTanks()
        }

        if (options[optionTanks]) {
            options[optionTanks]()
        }

    }

    return (
        <Container>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <form onSubmit={routerTanks}>
                    <Paper sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Typography variant='button'>Agrega contedores a la base de datos</Typography>
                        <Stack display={'flex'} gap={'10px'} alignItems={'center'}>

                            <SelectSimple
                                width={'100%'}
                                title={'Tipo de registro'}
                                value={optionTanks}
                                required={true}
                                options={['sencillo', 'multiple']}
                                onChange={(e) => setOptionTanks(e.target.value)}
                                helperText={'Sencillo para agregar solo un registro, multiple para agregar varios'}
                            />

                            {(optionTanks === 'sencillo') &&
                                <>
                                    <Typography textAlign={'start'} width={'100%'} variant='caption'>Agrega un nuevo contedor a la base de datos</Typography>
                                    <InputText
                                        label={'Numero de contenedor'}
                                        width={'100%'}
                                        value={newTank}
                                        required={true}
                                        onChangue={(e) => setNewTank(e.target.value)}
                                    />
                                </>
                            }

                            {(optionTanks === 'multiple') &&
                                <>
                                    <Typography textAlign={'start'} width={'100%'} variant='caption'>Agrega varios contenedores a la base de datos</Typography>
                                    <InputText
                                        type={'textarea'}
                                        label={'Numeros de contenedores separados por comas'}
                                        width={'100%'}
                                        value={newTank}
                                        required={true}
                                        onChangue={(e) => setNewTank(e.target.value)}
                                    />
                                </>
                            }

                            <SelectSimple
                                width={'100%'}
                                title={'Estatus'}
                                value={newTankStatus}
                                required={true}
                                options={['ready', 'maniobras', 'parked', 'reparacion', 'prelavado',]}
                                onChange={(e) => setNewTankStatus(e.target.value)}
                                helperText={'Para usarlo inmediatamente despues de agregrarlo selecciona ready'}
                            />
                        </Stack>

                        <Stack flexDirection='row' justifyContent='space-between' gap='10px'>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                            >Agregar</Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color="error" on
                                onClick={toggleModal}>
                                Cancelar</Button>
                        </Stack>

                    </Paper>
                </form>
            </Box>
        </Container>
    );
}

export { AddNewTanks };