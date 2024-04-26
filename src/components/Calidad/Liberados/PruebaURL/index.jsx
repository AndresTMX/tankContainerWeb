import { Modal, Container, Paper, Box, Stack, Typography, IconButton, TextField, } from "@mui/material";
//hooks
import { useParams, useNavigate } from "react-router-dom";
//icons
import ClearIcon from '@mui/icons-material/Clear';

export function PruebaURL() {

    const { URL } = useParams();
    const jsonURL = JSON.parse(decodeURIComponent(URL));

    const navigate = useNavigate();

    const { coments, pruebas } = jsonURL || {};


    return (
        <>
            <Modal
                open={true}
                onClose={() => navigate('/calidad/liberados')}
            >
                <Container sx={{ display: 'flex', justifyContent: 'center', paddingTop: 'center', }} >


                    <Paper
                        elevation={3}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px', gap: '10px', }}>

                        <Stack flexDirection='row' alignItems='center' justifyContent='space-between' width='100%'>
                            <Typography>Evidencias de URL</Typography>
                            <IconButton color='error' onClick={() => navigate('/calidad/liberados/listos')}>
                                <ClearIcon />
                            </IconButton>
                        </Stack>

                        <Box sx={{ bgcolor: 'whitesmoke', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Stack>

                                {pruebas &&
                                    pruebas.map((prueba, index) => (
                                        <Box
                                            key={index}
                                            sx={{ padding: '10px' }}
                                        >
                                            <img
                                                height="150px"
                                                src={prueba.image}
                                                alt={`tanque`}
                                            />
                                        </Box>
                                    ))
                                }

                            </Stack>

                            <Box>

                                {pruebas.map((prueba) => (
                                    <TextField
                                        disabled
                                        value={prueba.value}
                                        helperText={prueba.position}
                                    />
                                ))}

                                <Typography>Comentarios</Typography>

                                <TextField
                                    disabled
                                    value={coments}
                                    label={coments != '' ? coments : 'Sin comentarios'}
                                />

                            </Box>
                        </Box>

                    </Paper>

                </Container>
            </Modal>
        </>
    )
}
