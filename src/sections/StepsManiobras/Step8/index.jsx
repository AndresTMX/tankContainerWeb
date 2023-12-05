import { useState, useContext } from "react";
//context
import { PrelavadoContext } from "../../../Context/PrelavadoContext";
//components
import { TextGeneral } from "../../../components/TextGeneral";
import { Box, Stack, Button, Paper, Typography , Chip, Divider} from "@mui/material";
//icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Step8({previusStep}) {

    const [state, dispatch] = useContext(PrelavadoContext)
    const { checklist } = state;

    const TypeValvula3A = checklist.empaques?.checkList[3].value === 'si'? true: false;
    const TypeValvulaCierre3 = checklist.empaques?.checkList[4].value === 'si'? true:false;
    const TypeValvula = TypeValvula3A? 'Valvula 3A': 'Valvula Cierre 3';

    const TypeCubierataValvula = checklist.cuviertaValvula.type;
    const ValvulasDescargaChecklist = checklist.valvulasDescarga?.checkList? checklist.valvulasDescarga.checkList:[];
    const CheckListCubiertaValvula = checklist.cuviertaValvula?.checkList ? checklist.cuviertaValvula.checkList: [];
    const TapaderaDomoCheckList = checklist.tapaderaDomo?.checkList ? checklist.tapaderaDomo.checkList:[];
    const EmpaquesTapaderaSuperior = checklist.empaques?.checkList? checklist.empaques.checkList: [];
    //si es 3A
    const cambiosValvula3A = checklist?.valvula3A? checklist.valvula3A.checklist.filter((question) => question.value != null):[]

    //si es cierre 3

    
    return ( 
        <>
        <Paper 
        elevation={4}
        sx={{
            display:'flex',
            flexDirection:'column',
            gap:'20px',
            padding:'20px'
        }}>

            <Stack flexDirection='row' alignItems='center' gap='10px'>
            <Typography variant="h6">
                Check list de inspección completado
            </Typography>
            <CheckCircleIcon sx={{color:'green'}}/>
            </Stack>

            <Stack>
                <Button variant="contained" color="primary">Descargar documento</Button>
            </Stack>

            <Typography variant="subtitle1">
                Recapitulación
            </Typography>

            <Stack>

                <Paper 
                sx={{
                    padding:'10px',
                    backgroundColor:'whitesmoke',
                    width:'100%'
                }}>
                   

                   <Stack>
                    <strong>Tipo de valvula</strong>
                    <span>{TypeValvula}</span>
                    <Divider orientation={'horizontal'} flexItem />
                   </Stack>

                   {TypeValvula === 'Valvula 3A' && <Box sx={{display:'flex', flexDirection:'column', gap:'10px'}}>
                   <strong>Cambios de empaques</strong>
                   <Stack gap='5px' width='150px'>
                            {cambiosValvula3A.map((item) => (
                                <TextGeneral key={item.part} label={item.part} text={item.value} />
                            ))}   
                   </Stack>
                    <Divider orientation={'horizontal'} flexItem />
                   </Box>}

                   <Box sx={{display:'flex', flexDirection:'column', gap:'10px'}}>
                   <strong>Estado de la cubierta</strong>
                   <TextGeneral text={TypeCubierataValvula} label={'Tipo de cubierta'}/>
                   <Stack gap='5px' width='150px'>
                            {CheckListCubiertaValvula.map((item) => (
                                <TextGeneral key={item.question} label={item.question} text={item.value} />
                            ))}   
                   </Stack>
                    <Divider orientation={'horizontal'} flexItem />
                   </Box>

                   <Box sx={{display:'flex', flexDirection:'column', gap:'10px'}}>
                   <strong>Cambios de empaque tapadera superior</strong>
                   <Stack gap='5px'>
                            {EmpaquesTapaderaSuperior.map((item) => (
                                <TextGeneral key={item.question} label={item.question} text={item.value} />
                            ))}   
                   </Stack>
                    <Divider orientation={'horizontal'} flexItem />
                   </Box>

                   <Box sx={{display:'flex', flexDirection:'column', gap:'10px'}}>
                   <strong>Empaques de la valvula de descarga </strong>
                   <Stack gap='5px'>
                            {ValvulasDescargaChecklist.map((item) => (
                                <TextGeneral key={item.question} label={item.question} text={item.value} color="warning"/>
                            ))}   
                   </Stack>
                   </Box>

                   <Box sx={{display:'flex', flexDirection:'column', gap:'10px'}}>
                   <strong>Estado de la cubierta tapa superior </strong>
                   <Stack gap='5px'>
                            {TapaderaDomoCheckList.map((item) => (
                                <TextGeneral key={item.question} label={item.question} text={item.value} color="warning"/>
                            ))}   
                   </Stack>
                   </Box>

                </Paper>

            </Stack>

            <Button 
            variant="contained"
            color="warning"
            onClick={() => previusStep(7)}>
            anterior</Button>


        </Paper>
        </>
     );
}

export {Step8};