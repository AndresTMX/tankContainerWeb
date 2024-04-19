import { useState } from "react";
import { Paper, Box, Typography, FormControl, InputLabel, MenuItem, Select, TextField, IconButton, Stack, Button, Modal } from "@mui/material";
//hooks
import { useNavigate, useParams } from "react-router-dom";
//icons
import ClearIcon from '@mui/icons-material/Clear';
//services
import { addItemManiobra } from "../../services/registros";
//libraries
import { toast } from "sonner";

export function AgregarCarga() {

    const { registro } = useParams();

    const jsonRegister = JSON.parse(decodeURI(registro));

    const { register, details } = jsonRegister || {};

    const { type, id: entrada_id, } = register || {};

    const { carga, cliente_id, status, transportista_id } = details?.[0] || {};


    const navigate = useNavigate();


    const [newChargue, setNewChargue] = useState({ tipo: '', numero_pipa: '', numero_tanque: '', especificacion: '' })

    const onChange = (value) => {
        if (carga === 'tanque') {
            setNewChargue({ ...newChargue, numero_tanque: value })
        }

        if (carga === 'pipa') {
            setNewChargue({ ...newChargue, numero_pipa: value })
        }
    }

    const espectOptions = ['NFC', 'FCOJ', 'OR-OIL', 'DLIMONENE', 'TEQUILA', 'NFC/FCOJ']

    async function OnSubmit(e) {
        e.preventDefault()
        try {

            if (details.length === 4) {
                throw new Error('El tracto ya no puede recibir más tanques')
            }

            let newRegister = {
                transportista_id,
                entrada_id,
                cliente_id,
                status,
                carga,
                ...newChargue
            }

            const { error } = await addItemManiobra(newRegister);

            if (error) {
                throw new Error(error)
            } else {

                toast.success('Nueva carga añadida')
                navigate('/maniobras')
            }


        } catch (error) {
            toast.error(error?.message)

        }

    }

    return (
        <>
            <Modal
                open={true}
                onClose={() => navigate('/maniobras')}
                sx={{ display: 'flex', justifyContent: 'center', paddingTop: '3%' }}
            >
                <Paper elevation={4} sx={{ width: 'fit-content', height: 'fit-content' }}>
                    <form onSubmit={(e) => OnSubmit(e)}>
                        <Paper
                            sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}
                        >
                            <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
                                <Typography>Agrega una nueva carga</Typography>
                                <IconButton onClick={() => navigate('/maniobras')}>
                                    <ClearIcon />
                                </IconButton>
                            </Stack>

                            <Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px', }}>

                                    <FormControl sx={{ width: '100%' }}>
                                        <InputLabel>Tipo</InputLabel>
                                        <Select
                                            required
                                            sx={{ width: '100%' }}
                                            label='Tipo'
                                            value={newChargue.tipo}
                                            onChange={(e) => setNewChargue({ ...newChargue, tipo: e.target.value })}
                                        >
                                            <MenuItem value='AGMU'>AGMU</MenuItem>
                                            <MenuItem value='AFIU'>AFIU</MenuItem>
                                            <MenuItem value='DYOU'>DYOU</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }}>
                                        <InputLabel>Especificación</InputLabel>
                                        <Select
                                            sx={{ width: '100%', textTransform: 'uppercase' }}
                                            label='Especificación'
                                            value={newChargue.especificacion}
                                            onChange={(e) => setNewChargue({ ...newChargue, especificacion: e.target.value })}
                                        >
                                            {espectOptions.map((option) => (
                                                <MenuItem sx={{ textTransform: 'uppercase' }} key={option} value={option}>{option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }}>
                                        <TextField
                                            required
                                            sx={{ width: '100%' }}
                                            value={newChargue.numero_tanque || newChargue.numero_pipa}
                                            onChange={(e) => onChange(e.target.value)}
                                            label={`Número de ${carga}`}
                                        />
                                    </FormControl>

                                </Box>
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Agregar
                            </Button>
                        </Paper>
                    </form>
                </Paper>
            </Modal>
        </>
    );
}

