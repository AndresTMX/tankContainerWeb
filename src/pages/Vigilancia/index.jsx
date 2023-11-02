//imports hooks
import { useState } from "react";
//imports materialui
import { Container, Box, Tabs, Tab, Button, Stack, Fade } from "@mui/material";
//import custom components
import { SelectSimple } from "../../components/SelectSimple";
import { InputText } from "../../components/InputText";
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { HistoryItem } from "../../components/HistoryItem";
//days
import { currentDate } from "../../Helpers/date";

function Vigilancia() {
        
    const listTransporters = [
        'transportista 1',
        'transportista 2',
        'transportista 3',
        'transportista 4',
        'transportista 5',
    ]

    const listOperators = [
        'operador 1',
        'operador 2',
        'operador 3',
        'operador 4',
        'operador 5',
        'operador 6',
        'operador 7',
    ]

    const mockHistory = [
        {
            hora:currentDate,
            linea:'Linea random',
            tracto:'Un tracto chido',
            tipo:'Salida',
            tanque:'C-2356',
            operador:'Juan Miguel Salazar Perez',
            celular:'5577828470'
        },
        {
            hora:currentDate,
            linea:'Linea random2',
            tracto:'Un tracto maso',
            tipo:'Entrada',
            tanque:'C-2352',
            operador:'Lucas Ascencio Lopez',
            celular:'5577828470'
        },
        {
            hora:currentDate,
            linea:'Linea random3',
            tracto:'Un tracto ñe',
            tipo:'Salida',
            tanque:'C-8299',
            operador:'Armando Mendoza Lopez',
            celular:'5577828470'
        }
    ]

    const [select, setSelet] = useState('');
    const [tracto, setTracto] = useState('');
    const [typeMove, setTypeMove] = useState('');
    const [operator, setOperator] = useState('') 
    const [tab, setTab] = useState(0) 

    const handleChangeList = (event) => {
        setSelet(event.target.value);
    };

    const handleChangeTracto = (event) => {
        setTracto(event.target.value);
    };

    const handleChangueTypeMove = (event) => {
        setTypeMove(event.target.value)
    }

    const handleChangueOperator = (value) => {
        setOperator(value)
    }

    const ToggleTab = (event, newValue) => {
        setTab(newValue)
    }

    return ( 
        <>
        <Container
        sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            width:'100%',
        }}
        >

            <Tabs value={tab} onChange={ToggleTab} >
                <Tab label="Registro"  />
                <Tab label="Historial" />
            </Tabs>
            
            <CustomTabPanel value={tab} index={0}>
            <Fade 
            timeout={500}
            in={tab === 0? true: false}
            >
            <Box
            sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                gap:'15px',
                backgroundColor:'whitesmoke',
                width:'auto',
                padding:'20px',
                borderRadius:'4px'
            }}
            >

                <SelectSimple
                title={'Tipo de registro'}
                value={typeMove}
                options={['Entrada', 'Salida']}
                onChange={handleChangueTypeMove}
                />

                <SelectSimple 
                title={'Linea transportista'}
                value={select}
                options={listTransporters}
                onChange={handleChangeList}
                />

                <InputText 
                label='Numero de tracto'
                value={tracto}
                onChangue={handleChangeTracto}
                />

                <SelectSimple
                title={'Operador'}
                value={operator}
                options={listOperators}
                onChange={(e) => handleChangueOperator(e.target.value)}
                />   

                <Button fullWidth variant="contained">Registrar</Button>             
                
            </Box>
            </Fade>
            </CustomTabPanel>

            <CustomTabPanel value={tab} index={1}>
            <Fade 
            timeout={500}
            in={tab === 1? true: false}
            >
                <Box>
                    <Stack spacing='5px'>
                        {
                            mockHistory.map((item, index) => (
                                <HistoryItem
                                key={index}
                                hora={item.hora}
                                linea={item.linea}
                                tracto={item.tracto}
                                tipo={item.tipo}
                                tanque={item.tanque}
                                operador={item.operador}
                                celular={item.celular}
                                />
                            ))
                        }
                    </Stack>
                </Box>
                </Fade>
            </CustomTabPanel>

            

        </Container>
        </>
     );
}

export {Vigilancia};