import { useState } from 'react';
import { Button, CardMedia, Modal, Card, Box, FormControl, Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//icons
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function InputImage({ index, preview, onChangue, discardImage }) {

    const [modal, setModal] = useState(false);

    const ToggleModal = () => {
        setModal(!modal)
    }


    const DiscardAndClose = () => {
        discardImage(index)
        ToggleModal()
    }


    return (
        <>
            <FormControl>
                <input
                    type="file"
                    accept="image/*"
                    id={`image-${index}input`}
                    style={{ display: "none" }}
                    onChange={onChangue}
                    disabled={preview ? true : false}
                />
                <label htmlFor={`image-${index}input`}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                        <Button
                            onClick={preview ? ToggleModal : () => { }}
                            variant="contained"
                            component="span"
                            startIcon={<AddAPhotoIcon />}
                        >
                            {preview ? 'Ver' : 'Subir'}
                        </Button>
                        <CheckCircleIcon sx={{ color: preview ? 'green' : 'gray' }} />
                    </Box>
                </label>

            </FormControl>

            {modal && (
                <Modal
                    open={modal}>
                    <Container
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        p: 4,
                    }}
                    >
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                padding: '15px',
                                maxWidth: '400px',
                                minWidth: '300px'
                            }}>
                            <CardMedia
                                component="img"
                                alt="Selected"
                                height="200"
                                image={preview}
                            />

                            <Button
                                onClick={ToggleModal}
                                fullWidth
                                variant='contained'
                                color='error'
                            >Cerrar</Button>

                            <Button
                                onClick={DiscardAndClose}
                                fullWidth
                                variant='contained'
                                color='warning'
                            >Descartar</Button>

                        </Card>
                    </Container>

                </Modal>)}

        </>
    );
}

export { InputImage };