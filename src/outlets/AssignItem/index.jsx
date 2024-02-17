import { Modal, Box, Button, Stack, Divider, Typography, IconButton, Chip, Card, CardHeader, CardContent, CardActions } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAssignTank } from "../../Hooks/Layout";
import { useState } from "react";
import { toast } from "sonner";

function AssignItem() {

    const { item } = useParams();

    const data = JSON.parse(item)
    const { columna, fila, nivel, bloque, tipos } = data || {};

    const navigate = useNavigate();

    const backtoLayout = () => {
        navigate('/ubicaciones')
    }

    const { tanques, assignTank } = useAssignTank(tipos, nivel);

    const [update, setUpdate] = useState({ id: '', numero_tanque: '', nivel: nivel, columna: columna, fila: fila, bloque: bloque })

    const Submit = async () => {
        try {
            if (update.numero_tanque === '') {
                toast.error('selecciona un tanque primero')
            } else {
                const { error } = await assignTank(update)

                if (error === null || error === undefined) {
                    toast.success(`Tanque guardado en nivel ${nivel}, columna ${update.columna} fila ${update.fila} `)
                }

                backtoLayout()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <Modal open={nivel}>
                <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '5%' }}>
                    <Card
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '15px',
                            width: '90vw',
                            maxWidth: '700px',
                        }}
                    >

                        <CardHeader
                            title={`Asignacion de espacio`}
                            titleTypographyProps={{ fontSize: '15px', fontWeight: '700' }}
                            subheader={
                                <Typography variant='body2' color='#0288d1'>
                                    Bloque <strong style={{ textTransform: 'uppercase' }}>{bloque}</strong>
                                    / Nivel <strong style={{ textTransform: 'uppercase' }}>{nivel}</strong>
                                    / Columna <strong style={{ textTransform: 'uppercase' }}>{columna}</strong>
                                    / Fila <strong style={{ textTransform: 'uppercase' }}>{fila}</strong>
                                </Typography>
                            }
                            subheaderTypographyProps={{ fontSize: '12px' }}
                            action={
                                <IconButton
                                    color="error"
                                    onClick={backtoLayout} >
                                    <CloseIcon />
                                </IconButton>
                            }
                        >

                        </CardHeader>

                        <Divider />

                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '15px', }}>

                            {update.numero_tanque != '' &&
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        gap: '10px',
                                        padding: '10px',
                                        bgcolor: 'whitesmoke',
                                        borderRadius: '4px'
                                    }}>
                                    <Typography>Tanque seleccionado</Typography>
                                    <Chip color='info' label={update.numero_tanque} />
                                </Box>}


                            <Typography variant='caption' >{tanques.length} Tanques por asignar</Typography>
                            <Stack
                                sx={{
                                    overflowY: 'auto',
                                    maxHeight: '250px',
                                    width: '100%'

                                }}
                                justifyContent='center'
                                flexDirection='row'
                                flexWrap='wrap'
                                gap='10px'
                            >

                                {tanques.map((element) => (
                                    <Chip
                                        key={element.id}
                                        label={element.numero_tanque}
                                        color={element.numero_tanque != update.numero_tanque ? 'info' : 'warning'}
                                        onDelete={() => setUpdate({ ...update, numero_tanque: element.numero_tanque, id: element.id })}
                                        deleteIcon={<AddIcon />}
                                    />
                                ))}
                            </Stack>
                        </CardContent>

                        <CardActions>
                            <Button
                                fullWidth
                                onClick={Submit}
                                size='small'
                                variant='contained'>
                                Asignar
                            </Button>
                        </CardActions>

                    </Card>
                </Box>
            </Modal>
        </>
    );
}

export { AssignItem };