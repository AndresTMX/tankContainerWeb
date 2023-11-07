import { DevelopmentContext } from "../../Context";
import { useEffect, useContext, useState } from "react";
import { Box, Typography, Modal, Fade, Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from 'prop-types';

function LoadingState({ duration }) {

    const [state, dispatch] = useContext(DevelopmentContext);
    const [progres, setProgress] = useState(0)
    const { loading } = state;

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
          }, duration);
          return () => {
            clearInterval(timer);
          };
    }, [])

    LoadingState.propTypes = {
        value: PropTypes.number.isRequired,
    }

    return (
        <>
            <Container>
                <Modal open={loading}>
                    <Fade in={loading} timeout={100}> 
                        <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'100vh' }}>
                            <CircularProgress variant="determinate" value={progres}/>
                            <Box 
                             sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                                <Typography variant="caption" component="div" color="white">
                                    {`${Math.round(progres)}%`}
                                </Typography>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Container>

        </>
    );
}

export { LoadingState }
