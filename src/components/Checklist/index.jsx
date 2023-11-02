import { FormGroup, Stack, Paper, Divider } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { InputCheck } from "../InputCheck";
import { InputImage } from "../InputImage";
import { InputText } from "../InputText";

function CheckList({listInputs, ChangueInput, ChangueComent, ChangueImage, DiscardImage}) {

    const IsSmall = useMediaQuery('(max-width:850px)');

    return ( 
        <Paper
            elevation={4}
        >
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
                {listInputs.map((item, index) => (
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
                        
                        <InputCheck name={item.name} value={item.value} onchangue={(e) => ChangueInput(index, e.target.value)} />
                        <InputText width={IsSmall? '100%' : '300px'} value={item.coment} label={'Comentarios'} onChangue={(e) => ChangueComent(index, e.target.value)} />
                        <InputImage index={index} discardImage={DiscardImage} preview={item.preview} onChangue={(e) => ChangueImage(index, e)} />
                        {IsSmall && <Divider orientation={'horizontal'} flexItem />}
                    </Stack>
                ))}
            </FormGroup>
        </Paper>
     );
}

export {CheckList};