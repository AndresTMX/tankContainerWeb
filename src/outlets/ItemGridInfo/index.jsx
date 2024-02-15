import { Paper, Modal, Box, Typography, Stack, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ItemGridInfo() {

    const { item } = useParams();

    const navigate = useNavigate();

    const returnLayout = () => {
        navigate('/ubicaciones')
    }

    const dataObject = JSON.parse(decodeURIComponent(item));

    const { id, bloque, numero_tanque, tipo, columna, fila, clientes, transportistas, especificacion, nivel } = dataObject || {}

    return (
        <>
            <Modal open={id}>

                <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '5%' }}>
                    <Paper
                        sx={{
                            padding: '15px',
                        }}>
                        <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
                            <strong>Tanque {tipo} {numero_tanque}</strong>
                            <IconButton
                                color="error"
                                onClick={returnLayout}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>

                        <Stack flexDirection='column' gap='4px'>
                            <Typography variant='body2' color='#0288d1'>
                                Bloque <strong style={{ textTransform: 'uppercase' }}>{bloque}</strong>
                                / Nivel <strong style={{ textTransform: 'uppercase' }}>{nivel}</strong>
                                / Columna <strong style={{ textTransform: 'uppercase' }}>{columna}</strong>
                                / Fila <strong style={{ textTransform: 'uppercase' }}>{fila}</strong>
                            </Typography>

                            <Typography variant='caption'>Id {id}</Typography>

                        </Stack>

                        <Stack>
                            <Typography variant='subtitle2'>Linea transportista</Typography>
                            <Typography variant='body'>{transportistas.name} </Typography>
                        </Stack>

                        <Stack>
                            <Typography variant='subtitle2'>Especificación</Typography>
                            <Typography variant='body'>{especificacion} </Typography>
                        </Stack>



                    </Paper>
                </Box>

            </Modal>
        </>
    );
}

export { ItemGridInfo };