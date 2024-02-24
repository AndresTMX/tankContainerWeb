import { useState, useContext } from "react";
import { Paper, Box, Typography, FormControl, InputLabel, MenuItem, Select, TextField, IconButton, Stack, Button } from "@mui/material";
//hooks
import { useEditManiobra } from "../../Hooks/Maniobras/useEditManiobra";
//icons
import ClearIcon from '@mui/icons-material/Clear';
//context
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes } from "../../Reducers/GlobalReducer";

function ModalAddCarga({ details, setModal, updater, registerData }) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const { carga } = registerData;

    const { addNewCarga } = useEditManiobra(updater);

    const [newChargue, setNewChargue] = useState({ tipo: '', numero_pipa: '', numero_tanque: '', especificacion:'' })

    const onChange = (value) => {
        if (carga === 'tanque') {
            setNewChargue({ ...newChargue, numero_tanque: value })
        }

        if (carga === 'pipa') {
            setNewChargue({ ...newChargue, numero_pipa: value })
        }
    }

    const espectOptions = ['nfc', 'fcoj', 'or-oil', 'dlimonene', 'tequila', 'nfc/fcoj']

    const OnSubmit = async (e) => {
        e.preventDefault();
        if (details.length === 4) {
            setModal(false)
            dispatchGlobal({
                type: actionTypes.setNotification,
                payload: 'No puedes agregar más de 4 tanques'
            })
        } else {
            await addNewCarga({ ...registerData, ...newChargue })
            setModal(false)
            updater()
        }
    }

    return (
        <>
            <form onSubmit={(e) => OnSubmit(e)}>
                <Paper
                    sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}
                >
                    <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
                        <Typography>Agrega una nueva carga</Typography>
                        <IconButton onClick={() => setModal(false)}>
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
                                    onChange={(e) => setNewChargue({...newChargue, especificacion: e.target.value })}
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
        </>
    );
}

export { ModalAddCarga };