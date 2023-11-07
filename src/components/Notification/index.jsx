import { useContext } from "react";
import { actionTypes } from "../../Reducers";
import { DevelopmentContext } from "../../Context";
import { Container, Box, Paper, Button, Fade, Modal, Typography } from "@mui/material";

function Notification() {

    const [state, dispatch] = useContext(DevelopmentContext);
    
    const {notification} = state;

    const CloseNotification = () => {
        dispatch({type: actionTypes.setNotification, payload: false})
    }


    return ( 
        <>
        {notification && 
        (<Modal open={notification}>
                <Fade in={notification} timeout={500}>
                    <Container>
                        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100vh'}}>
                            <Paper sx={{display: 'flex', flexDirection:'column', padding:'20px', gap:'20px'}}>
                                <Typography>{notification}</Typography>

                                <Button 
                                fullWidth
                                color='primary'
                                variant="contained"
                                onClick={CloseNotification}>Ok</Button>
                            </Paper>
                        </Box>
                    </Container>
                </Fade>
            </Modal>)}
        </>
     );
}

export {Notification};