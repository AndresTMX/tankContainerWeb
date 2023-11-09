import { useContext, useState } from "react";
import { DevelopmentContext } from "../../../Context";
import { actionTypes } from "../../../Reducers";
import { Typography, Stack, Paper, FormGroup, Divider, IconButton, Button, Container, Modal, Fade } from "@mui/material";
import { useCheckList } from "../../../Hooks/useChecklist";
import { InputImage } from "../../../components/InputImage";
import { InputText } from "../../../components/InputText";
import { InputCheck } from "../../../components/InputCheck";
import { ButtonsNavigationCheck } from "../../ButtonsNavigationCheck";
import useMediaQuery from "@mui/material/useMediaQuery";
//icons
import ChatIcon from '@mui/icons-material/Chat';

function Step5({ step, nextStep, previusStep }) {

    const [baseQuestion, setBaseQuestion] = useState('')
    const IsSmall = useMediaQuery('(max-width:850px)');
    const [state, dispatch] = useContext(DevelopmentContext);

    const { maniobrasCheckList } = state;

    const SaveChanguesOnGloablState = (newValue) => {
        setBaseQuestion(newValue)
        const newState = { ...state.maniobrasCheckList, cuviertaValvula: newValue }
        dispatch({ type: actionTypes.setManiobrasCheck, payload: newState })
        // nextStep()
    }

    return (
        <>
            <Paper
                elevation={4}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '20px',
                    width: '100%'
                }}>
                <Typography variant="h6">
                    Revisión de cubierta de valvula de descarga
                </Typography>

                <FormGroup
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: '4px',
                        gap: '5px'
                    }}
                >
                    <Stack
                        flexDirection={IsSmall ? 'column' : 'row'}
                        gap='20px'
                        spacing='10px'
                        alignItems={IsSmall ? 'start' : 'center'}
                        justifyContent='space-between'
                        sx={{
                            width: '100%',
                            backgroundColor: 'whitesmoke',
                            padding: '20px'
                        }}
                    >
                        <Stack width={IsSmall ? '100%' : '50%'}>
                            <p>¿Que estilo de cubierta tiene la valvula de descarga?</p>
                        </Stack>

                        <Stack flexDirection='row' gap='20px' alignItems='center' justifyContent='center'>
                            <Stack flexDirection='column' alignItems='center' >
                                <strong>Cabinet</strong>
                                <InputCheck value={baseQuestion === 'cabinet' ? true: false} onchangue={() => SaveChanguesOnGloablState('cabinet')} />

                            </Stack>
                            <Stack flexDirection='column' alignItems='center'>
                                <strong>Bucket</strong>
                                <InputCheck value={baseQuestion === 'bucket' ? true: false} onchangue={() => SaveChanguesOnGloablState('bucket')} />
                            </Stack>
                        </Stack>

                    </Stack>
                </FormGroup>

                

            </Paper>

        </>
    );
}

export { Step5 };