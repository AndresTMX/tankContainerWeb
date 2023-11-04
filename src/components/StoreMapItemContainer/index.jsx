import { useState } from "react";
import { Box, Paper, Modal, Container, Button, IconButton, Fade, Typography, Stack } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
function StoreMapItemContainer({ infoContainer }) {

    /*/
    #Example item

    {
         id:0,
         checkIn:currentDate,
         number:'C-2356',
         line:'Linea random',
         date_preWashing:currentDate,
         repairs:{
            intern:10,
            extern:5
         },
         last_reparation:{
            type:'inter',
            description:'se reparo de las puertas'
         },
         location:{
            block:'A',
            position:1
         },
         status: true
      },

    /*/

    const [modal, setModal] = useState(false);
    const colorContainer = infoContainer.number != '' ? '#0092ba' : 'whitesmoke';
    const textContainer = infoContainer.number != '' ? infoContainer.number : '';
    const dateCheck = infoContainer.number != '' ? infoContainer.checkIn : false;
    const dayTransform = dateCheck ? `${dateCheck.$D}/${dateCheck.$H}/${dateCheck.$y}` : '00:00';
    const dateTransform = dateCheck ? `${dateCheck.$H}:${dateCheck.$m}` : '00:00';
    const totalRepairs = dateCheck ? infoContainer.repairs.intern + infoContainer.repairs.extern : false;

    const ToggleModal = () => {
        setModal(!modal)
    }

    return (
        <>
            <Paper elevation="2" sx={{display:'flex', width: '50px', height: '25px', padding: '2px', backgroundColor: colorContainer, justifyContent:'center',alignItems:'center'  }}>
                <IconButton onClick={ToggleModal} sx={{ display:'flex', fontSize: '9px', color: 'whitesmoke',}} >
                    {textContainer}
                    {!dateCheck && <InfoIcon color="warning" sx={{fontSize:'18px'}}/>}
                </IconButton>
            </Paper>

            <Modal open={modal}>
                <Fade in={modal} timeout={500}>
                    <Container sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%', width:'100%'}}>
                        <Box>
                            <Paper sx={{ display:'flex', padding:'20px', gap:'10px', flexDirection:'column'}}>
                                <Typography variant="h6">
                                    {textContainer != '' ? `Detalles del contendor ${textContainer}` : 'Espacio disponible'}
                                </Typography>

                                {dateCheck && <Box>
                                    <Stack>
                                        <strong>Line de contenedor</strong>
                                        <span>{infoContainer.line}</span>
                                    </Stack>

                                    <Stack>
                                        <strong>Almacenado desde</strong>
                                        <span>{dayTransform}</span>
                                    </Stack>

                                    <Stack flexDirection='column' justifyContent='space-around'>
                                        <strong>Reparaciones</strong>
                                        <Stack flexDirection='row' justifyContent='space-between'>
                                            <span>Internas</span>
                                            <span>Externas</span>
                                            <span>Totales</span>
                                        </Stack>

                                        <Stack flexDirection='row' justifyContent='space-between'>
                                            <span>{infoContainer.repairs.intern}</span>
                                            <span>{infoContainer.repairs.extern}</span>
                                            <span>{totalRepairs}</span>
                                        </Stack>

                                    </Stack>

                                    <Stack spacing='0'>
                                        <strong>Ultima reparacion</strong>
                                        <span>{infoContainer.last_reparation.type === 'inter'? 'Interna' : 'Externa'}</span>
                                        <p>{infoContainer.last_reparation.description}</p>
                                    </Stack>

                                </Box>}

                                <Stack flexDirection='row' justifyContent={dateCheck? 'space-between': 'center'} gap='10px'>
                                    {dateCheck && <Button fullWidth variant='contained' color='primary'>Lavar</Button>}
                                    <Button
                                        fullWidth
                                        onClick={ToggleModal}
                                        variant='contained'
                                        color='error'>
                                        Cerrar
                                    </Button>
                                </Stack>

                            </Paper>
                        </Box>
                    </Container>
                </Fade>
            </Modal>
        </>
    );
}

export { StoreMapItemContainer };