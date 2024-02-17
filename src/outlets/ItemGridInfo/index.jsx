import { Modal, Box, Typography, Stack, IconButton, Button, Chip, Divider, Card, CardHeader, CardContent, CardActions } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EastIcon from '@mui/icons-material/East';
import { clearPosition, useGetRepairs } from "../../Hooks/Layout";
import { tiempoTranscurrido, dateInText } from "../../Helpers/date";

function ItemGridInfo() {

    const { item } = useParams();

    const navigate = useNavigate();

    const returnLayout = () => {
        navigate('/ubicaciones')
    }

    const dataObject = JSON.parse(decodeURIComponent(item));

    const { id, bloque, numero_tanque, tipo, columna, fila, clientes, transportistas, especificacion, nivel, registros } = dataObject || {}

    const { repairs, loading } = useGetRepairs(id)

    const handlerRemove = async () => {
        await clearPosition(id)
        returnLayout();
    }

    return (
        <>
            <Modal open={id}>

                <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '5%', }}>
                    <Card
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '15px',
                            width: '90vw',
                            maxWidth: '700px',
                        }}>
                        <CardHeader
                            title={`Detalles de ${tipo} ${numero_tanque}`}
                            titleTypographyProps={{ fontSize: '15px', fontWeight: '700' }}
                            subheader={id}
                            subheaderTypographyProps={{ fontSize: '12px' }}
                            action={
                                <IconButton
                                    color="error"
                                    onClick={returnLayout}>
                                    <CloseIcon />
                                </IconButton>
                            }
                        >
                        </CardHeader>

                        <Divider flexItem />

                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px', }}>

                            <Stack flexDirection='column' gap='4px'>
                                <Typography variant='body2' color='Highlight' >
                                    Bloque <strong style={{ textTransform: 'uppercase' }}>{bloque}</strong>
                                    / Nivel <strong style={{ textTransform: 'uppercase' }}>{nivel}</strong>
                                    / Columna <strong style={{ textTransform: 'uppercase' }}>{columna}</strong>
                                    / Fila <strong style={{ textTransform: 'uppercase' }}>{fila}</strong>
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography color='Highlight' variant='subtitle2'>Linea transportista</Typography>
                                <Typography variant='body'>{transportistas.name} </Typography>
                            </Stack>

                            <Stack>
                                <Typography color='Highlight' variant='subtitle2'>Especificación</Typography>
                                <Typography variant='body'>{especificacion} </Typography>
                            </Stack>

                            <Stack>
                                <Typography color='Highlight' variant='subtitle2'>Reparaciones aplicadas</Typography>
                                <Typography variant='body'>{repairs.length} </Typography>
                            </Stack>

                            <Stack>
                                <Typography color='Highlight' variant='subtitle2'>Almacenado {dateInText(registros.checkIn)} </Typography>
                                <Typography variant='body'>{tiempoTranscurrido(registros.checkIn)} </Typography>
                            </Stack>


                        </CardContent>

                        <CardActions >

                            <Button
                                size="small"
                                color='primary'
                                variant="contained"
                                endIcon={<EastIcon />}
                            >
                                enviar a lavado
                            </Button>

                            <Button
                                size="small"
                                color='error'
                                variant="contained"
                                endIcon={<DeleteIcon />}
                                onClick={handlerRemove}
                            >
                                limpiar posición
                            </Button>
                        </CardActions>


                    </Card>
                </Box>

            </Modal>
        </>
    );
}

export { ItemGridInfo };