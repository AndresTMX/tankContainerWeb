import { Typography, Stack, Paper, FormGroup, Divider, IconButton, Button, Container, Modal, Fade } from "@mui/material";
import { useCheckList } from "../../../Hooks/useChecklist";
import { InputImage } from "../../../components/InputImage";
import { InputText } from "../../../components/InputText";
import { InputCheck } from "../../../components/InputCheck";
import useMediaQuery from "@mui/material/useMediaQuery";
//icons
import ChatIcon from '@mui/icons-material/Chat';

function Step2() {

    const IsSmall = useMediaQuery('(max-width:850px)');

    const mockListCheck = [
        {
            question: '¿Todas las partes estén trabajando correctamente?',
            value: null,
            value2: null,
            preview: '',
            image: '',
            coment: '',
        },
        {
            question: '¿Tiene daño mayores (Abolladuras, rayas profundas, etc.)?',
            value: null,
            value2: null,
            preview: '',
            image: '',
            coment: '',

        },
        {
            question: '¿Algunos de los empaques necesita remplazarse?',
            value: null,
            value2: null,
            preview: '',
            image: '',
            coment: '',

        },
        {
            question: '¿Es una válvulas sanitaria 3A?',
            value: null,
            value2: null,
            preview: '',
            image: '',
            coment: '',

        },
        {
            question: '¿La válvula de descarga tiene cierre 3?',
            value: null,
            value2: null,
            preview: '',
            image: '',
            coment: '',
        },

    ]
    const { actions, states } = useCheckList(mockListCheck)
    const { ChangueInput, ChangueComent, ChangueImage, DiscardImage, ChangueNextStep, SelectQuestionComent, ToggleModalComent } = actions
    const { listCheck, nextStep, indexQuestion, modalComent } = states
    return ( 
        <>
        <Paper
        elevation={4}
        sx={{
            display:'flex', 
            flexDirection:'column', 
            gap:'20px', 
            padding:'20px',
            width:'100%'
        }}>
             <FormGroup
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'whitesmoke',
                    padding: '20px',
                    borderRadius: '4px',
                }}
            >
                {listCheck.map((item, index) => (
                    <Stack
                        key={index}
                        flexDirection={IsSmall? 'column' : 'row'}
                        gap='20px'
                        spacing='10px'
                        alignItems={IsSmall? 'start' : 'center'}
                        justifyContent='space-between'
                        sx={{
                            width: '100%',
                        }}
                    >
                        <Stack width={'80%'} flexDirection='row' justifyContent='space-between'>
                        <p>{item.question}</p>
                           <Stack flexDirection={'row'} flexWrap='wrap'>
                            <InputCheck name={'Correcto'} value={item.value} onchangue={(e) => ChangueInput(index, 1)} />
                            <InputCheck name={'Incorrecto'} value={item.value2} onchangue={(e) => ChangueInput(index, 2)} />
                           </Stack>
                        </Stack>
                        <IconButton 
                        onClick={() => SelectQuestionComent(index)}
                        variant="contained" 
                        color="primary">
                            <ChatIcon/>
                        </IconButton>
                        <InputImage index={index} discardImage={DiscardImage} preview={item.preview} onChangue={(e) => ChangueImage(index, e)} />
                        {IsSmall && <Divider orientation={'horizontal'} flexItem />}
                    </Stack>
                ))}
            </FormGroup>
        </Paper>

        <Modal open={modalComent}>
            <Container 
            sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                height:'100vh'
            }}
            >
                <Fade in={modalComent} timeout={500}>
                    <Paper 
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'20px',
                        padding:'20px'
                    }}>
                        <Typography>Agregar comentarios</Typography>

                        <InputText 
                        width={IsSmall? '100%' : '300px'} 
                        value={listCheck[indexQuestion].coment} 
                        label={'Comentarios'} 
                        onChangue={ChangueComent}
                        />

                       <Button 
                       onClick={ToggleModalComent}
                       variant='contained' 
                       color='error'
                       >Cerrar
                       </Button>

                    </Paper>
                </Fade>
            </Container>
        </Modal>
        </>
     );
}

export {Step2};