import { FormGroup, Stack, Paper } from "@mui/material";
import { InputCheck } from "../InputCheck";
import { InputImage } from "../InputImage";
import { InputText } from "../InputText";

function CheckList({listInputs, ChangueInput, ChangueComent, ChangueImage, DiscardImage}) {

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
                        flexDirection='row'
                        gap='20px'
                        spacing='10px'
                        alignItems='center'
                        justifyContent='space-between'
                        sx={{
                            width: '100%',
                        }}
                    >
                        <InputCheck name={item.name} value={item.value} onchangue={(e) => ChangueInput(index, e.target.value)} />
                        <InputText width={'300px'} value={item.coment} label={'Comentarios'} onChangue={(e) => ChangueComent(index, e.target.value)} />
                        <InputImage index={index} discardImage={DiscardImage} preview={item.preview} onChangue={(e) => ChangueImage(index, e)} />
                    </Stack>
                ))}

            </FormGroup>
        </Paper>
     );
}

export {CheckList};