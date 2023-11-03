import { useState } from "react";
import { Box, Button, IconButton, Chip, Stack, Modal, Typography, Divider, Fade } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

function HistoryItem({hora, linea, tracto, tipo, tanque, operador, celular, firma, children}) {

    const IsSmall = useMediaQuery('(max-width:840px)');
    const IsExtraSmall = useMediaQuery('(max-width:450px)');

    const dayTransform = `${hora.$D}/${hora.$H}/${hora.$y}`

    const dateTransform = `${hora.$H}:${hora.$m}`

    const sliceName = operador.split(' ').slice(0,2);

    const shortName = `${sliceName[0]} ${sliceName[1]}`;

    const [modal, setModal] = useState(false);

    const ToggleModal = () => {
        setModal(!modal)
    }

    return ( 
        <>
        <Box 
        sx={{
            display:'flex', 
            flexDirection:IsSmall?'column':'row', 
            gap:'10px',
            justifyContent:'space-between',
            backgroundColor:'whitesmoke',
            padding:'20px',
            borderRadius:'4px',
            minWidth:'300px'
        }}>
            <Stack flexDirection='row' alignItems='center'>
            {/* <Chip color={tipo === 'Entrada'? 'success':'warning'} label={tipo}/> */}
            <Chip color='info' label={dateTransform} icon={<AccessTimeIcon/>} sx={{fontWeight:500, paddingRight:'2px'}}/>
            </Stack>

            <Stack 
            width={IsSmall? 'auto': '400px'}
            flexDirection={IsExtraSmall? 'column' : 'row'} 
            justifyContent={IsExtraSmall? 'flex-start' : 'space-around'}
            alignItems={IsSmall? 'start':'center'} 
            gap='10px'>
            <span>{linea}</span>
            <Divider orientation={IsExtraSmall? 'horizontal' : 'vertical'} flexItem />
            <span>{tracto}</span>
            <Divider orientation={IsExtraSmall? 'horizontal' : 'vertical'} flexItem />
            <span>{tanque}</span>
            {!IsSmall && <Divider orientation='vertical' flexItem />}
            </Stack>

            <Stack 
            flexDirection={IsSmall? 'column':'row'} 
            width={IsSmall? '100%' : '300px'} 
            alignItems={IsSmall? 'start': 'center'} 
            justifyContent='space-between' 
            gap='10px'>
            <span>{shortName}</span>
            <Stack flexDirection='row'>
                {children}
            <IconButton
            color="primary"
            onClick={ToggleModal}>
                <ContactPhoneIcon/>
            </IconButton>
            </Stack>
            
            </Stack>
        </Box>

            <Modal
                open={modal}
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    position:'absolute',
                    justifyContent:'center',
                    alignItems:'center'

                }}
            >
                <Fade
                 timeout={500}
                 in={modal}
                >
                  <Box 
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    gap:'15px',
                    alignItems:'start',
                    justifyContent:'center',
                    backgroundColor:'white',
                    width:'auto',
                    padding:'20px',
                    borderRadius:'4px'
                }}
                >
                    <Typography variant='h6' >Informacion del operador</Typography>
                    <Stack spacing='0px'>
                    <strong>Nombre del operador</strong>
                    <p>{operador}</p> 
                    </Stack>
                    
                    <Stack spacing='0px'>
                    <strong>Contacto</strong>
                    <p>{celular}</p>
                    </Stack>

                    <Button 
                    fullWidth 
                    variant="contained" 
                    color='error'
                    onClick={ToggleModal}>
                    cerrar
                    </Button>

                </Box>  
                </Fade>
                

            </Modal>
        </>
     );
}

export {HistoryItem};