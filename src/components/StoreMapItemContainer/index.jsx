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

    const [modal, setModal] = useState({modal1:false, modal2:false});
    const colorContainer = infoContainer.number != '' ? '#0092ba' : 'whitesmoke';
    const textContainer = infoContainer.number != '' ? infoContainer.number : '';
    const dateCheck = infoContainer.number != '' ? infoContainer.checkIn : false;
    const dayTransform = dateCheck ? `${dateCheck.$D}/${dateCheck.$H}/${dateCheck.$y}` : '00:00';
    const dateTransform = dateCheck ? `${dateCheck.$H}:${dateCheck.$m}` : '00:00';
    const totalRepairs = dateCheck ? infoContainer.repairs.intern + infoContainer.repairs.extern : false;

    const ToggleModal = () => {
        if(textContainer != ''){
            setModal({...modal, modal1: !modal.modal1})
        }else{
            setModal({...modal, modal2: !modal.modal2})
        }
    }

    return (
        <>
            <Paper elevation="2" sx={{display:'flex', width: '50px', height: '25px', padding: '2px', backgroundColor: colorContainer, justifyContent:'center',alignItems:'center'  }}>
                <IconButton onClick={ToggleModal} sx={{ display:'flex', fontSize: '9px', color: 'whitesmoke',}} >
                    {textContainer}
                    {!dateCheck && <InfoIcon color="warning" sx={{fontSize:'18px'}}/>}
                </IconButton>
            </Paper>

            <Modal open={modal.modal1}>
                <Fade in={modal.modal1} timeout={500}>
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                        <Box>
                            <Paper sx={{ display: 'flex', padding: '20px', gap: '10px', flexDirection: 'column' }}>
                                <Typography variant="h6">
                                    {`Detalles del contendor ${textContainer}`}
                                </Typography>

                                <Stack flexDirection='row' alignItems='center' gap='10px'>
                                    <Stack flexDirection='row' gap='5px'>
                                        <strong>Bloque: </strong>
                                        <span>{infoContainer.location.block}</span>
                                    </Stack>
                                    <Stack flexDirection='row' gap='5px'>
                                        <strong>Número: </strong>
                                        <span>{infoContainer.location.position}</span>
                                    </Stack>
                                </Stack>

                                <Stack>
                                    <strong>Linea de contenedor</strong>
                                    <span>{infoContainer.line}</span>
                                </Stack>

                                <Stack>
                                    <strong>Almacenado desde</strong>
                                    <span>{dayTransform}</span>
                                </Stack>

                                <strong>Reparaciones</strong>
                                <Stack flexDirection='row' justifyContent='space-around'>
                                    <Stack flexDirection='column' gap='4px' alignItems='center'>
                                        <strong>Internas</strong>
                                        <span>{infoContainer.repairs.intern}</span>
                                    </Stack>

                                    <Stack flexDirection='column' gap='4px' alignItems='center'>
                                        <strong>Externas</strong>
                                        <span>{infoContainer.repairs.extern}</span>
                                    </Stack>

                                    <Stack flexDirection='column' gap='4px' alignItems='center'>                                        
                                        <strong>Totales</strong>
                                        <span>{totalRepairs}</span>
                                    </Stack>

                                </Stack>

                                    <strong>Ultima reparacion</strong>
                                <Stack flexDirection='row' gap='10px'>
                                    <strong>Tipo:</strong>
                                    <span>{infoContainer.last_reparation.type === 'inter' ? 'Interna' : 'Externa'}</span>
                                </Stack>

                                <Stack spacing='5px'>
                                    <strong>Comentarios</strong>
                                    <p>{infoContainer.last_reparation.description}</p>
                                </Stack>


                                <Stack 
                                flexDirection='row' 
                                justifyContent={dateCheck ? 'space-between' : 'center'} 
                                marginTop='10px'
                                gap='10px'>
                                    <Button
                                        fullWidth
                                        variant='contained'
                                        color='primary'>
                                        Lavar
                                    </Button>
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

            <Modal open={modal.modal2}>
                <Fade in={modal.modal2} timeout={500}>
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                        <Box>
                            <Paper sx={{ display: 'flex', padding: '20px', gap: '10px', flexDirection: 'column' }}>
                                <Typography variant="h6">
                                    Espacio disponible
                                </Typography>

                                <Stack flexDirection='row' alignItems='center' gap='10px'>
                                    <Stack flexDirection='row' gap='5px'>
                                        <strong>Bloque: </strong>
                                        <span>{infoContainer.location.block}</span>
                                    </Stack>
                                    <Stack flexDirection='row' gap='5px'>
                                        <strong>Número: </strong>
                                        <span>{infoContainer.location.position}</span>
                                    </Stack>
                                </Stack>


                                <Button
                                    fullWidth
                                    onClick={ToggleModal}
                                    variant='contained'
                                    color='error'>
                                    Cerrar
                                </Button>

                            </Paper>
                        </Box>
                    </Container>
                </Fade>
            </Modal>


        </>
    );
}

export { StoreMapItemContainer };