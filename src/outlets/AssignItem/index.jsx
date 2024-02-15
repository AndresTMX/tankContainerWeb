import { Modal, Box, Paper, Button, Stack, Typography, IconButton, Chip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAssignTank } from "../../Hooks/Layout";
import { useState } from "react";

function AssignItem() {

    const { item } = useParams();
    const data = JSON.parse(item)
    const { columna, fila, nivel, bloque, tipos, id } = data || {};

    const navigate = useNavigate();

    const backtoLayout = () => {
        navigate('/ubicaciones')
    }

    const toggleAdd = (tanque) => {
        setUpdate({ ...update, numero_tanque: tanque })
    }

    const { tanques, assignTank } = useAssignTank(tipos, nivel);

    const [update, setUpdate] = useState({ id: id, numero_tanque: '', nivel: nivel, columna: columna, fila: fila })

    return (
        <>
            <Modal open={nivel}>
                <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '5%' }}>
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '15px'
                        }}
                    >

                        <Stack flexDirection='row' alignItems='center' justifyContent='space-between' gap='10px'>
                            <Typography fontWeight='700'>
                                Asignación de espacio
                            </Typography>
                            <IconButton
                                color="error"
                                onClick={backtoLayout} >
                                <CloseIcon />
                            </IconButton>
                        </Stack>

                        <Typography variant='body2' color='#0288d1'>
                            Bloque <strong style={{ textTransform: 'uppercase' }}>{bloque}</strong>
                            / Nivel <strong style={{ textTransform: 'uppercase' }}>{nivel}</strong>
                            / Columna <strong style={{ textTransform: 'uppercase' }}>{columna}</strong>
                            / Fila <strong style={{ textTransform: 'uppercase' }}>{fila}</strong>
                        </Typography>

                        <Typography>Tanque seleccionado</Typography>
                        <Stack>
                            {update.numero_tanque != '' && <Chip color='info' label={update.numero_tanque} />}
                        </Stack>

                        <Typography>Tanques por asignar</Typography>
                        <Stack
                            sx={{
                                overflowY: 'auto',
                                maxHeight: '250px'
                            }}
                            justifyContent='center'
                            flexDirection='row'
                            maxWidth='500px'
                            flexWrap='wrap'
                            width='auto'
                            gap='10px'
                        >

                            {tanques.map((element) => (
                                <Chip
                                    key={element.id}
                                    label={element.numero_tanque}
                                    color={element.numero_tanque != update.numero_tanque? 'info': 'warning'}
                                    onDelete={() => toggleAdd(element.numero_tanque)}
                                    deleteIcon={<AddIcon />}
                                />
                            ))}
                        </Stack>

                        <Button 
                        size='small'
                        variant='contained'>
                            Asignar
                        </Button>

                    </Paper>
                </Box>
            </Modal>
        </>
    );
}

export { AssignItem };