import { Modal, Container, Paper, Stack, IconButton, Button, Typography, } from "@mui/material";
import { ContainerScroll } from "../../../ContainerScroll";
import { useParams, useNavigate } from "react-router-dom";
//icons
import ClearIcon from '@mui/icons-material/Clear';


export function DetallesLavado() {

    const navigate = useNavigate();
    const { data } = useParams();
    const JsonData = JSON.parse(decodeURIComponent(data));

    return (
        <>

            <Modal 
            open={true} 
            onClose={() => navigate('/calidad/prelavados/realizados')} 
            sx={{ display: 'flex', flexDirection: 'column', paddingTop: '3%', alignItems: 'center' }}
            >

                <Paper sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '95vw', maxWidth: '700px' }}>
                    <Stack
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Typography variant="button">
                            inspección de calidad
                        </Typography>

                        <IconButton
                            onClick={() => navigate(`/calidad/prelavados/realizados`)}
                        >
                            <ClearIcon color='error' />
                        </IconButton>
                    </Stack>

                    <ContainerScroll height={'400px'}>
                        <Stack gap='8px'>
                            {JsonData.map((question) => (
                                <Paper elevation={2} sx={{ padding: '15px' }} key={question.question}>
                                    <Stack gap={'5px'}>
                                        <Typography variant='body2'>
                                            {question.question}
                                        </Typography>

                                        <Typography variant='caption'>
                                            {question.value}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            ))}
                        </Stack>
                    </ContainerScroll>


                </Paper>
            </Modal>

        </>
    )

}
