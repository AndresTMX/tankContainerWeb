import { useState, useContext, useEffect } from "react";
//componentes
import { Box, Stack, Typography, Paper, IconButton, Button } from "@mui/material";
import {InputText} from "../../components/InputText";
import { SelectSimple } from "../SelectSimple";
//icons
import CloseIcon from '@mui/icons-material/Close';
//helpers
import { transformRegisters } from "../../Helpers/transformRegisters";
//hooks
import { useEditRegisters } from "../../Hooks/registersManagment/useEditRegisters";

function FormEditManiobras({ data, toggleModal }) {

    const {
        typeRegister,
        linea,
        tanques,
        operador,
        tracto,
        numeroTanques,
        typeChargue,
        dayInput,
        dateInput,
        OperatorSliceName,
        shortNameOperator,
        tracto_status,
        dayCreat,
        dateCreate,
    } = transformRegisters(data);

    const { editRegister } = useEditRegisters();

    const [idTracto, setIdTracto] = useState('');
    const [numeroPipa, setNumeroPipa] = useState('');
    const [nameOperador, setNameOperador] = useState('');
    const [nameTransporter, setNameTransporter] = useState('');
    const cacheOperadores = JSON.parse(localStorage.getItem('operadores'));
    const cacheTransportistas = JSON.parse(localStorage.getItem('transportistas'));
    const cacheTractos = JSON.parse(localStorage.getItem('tractos_list'));

    const nameOperadores = cacheOperadores.map((operador) => ({
        nombre: operador.nombre,
        id: operador.id
    }));

    const nameTransportistas = cacheTransportistas.map((transporter) => ({
        nombre: transporter.name,
        id: transporter.id
    }));

    const tractosList = []

    const extractTractos = () => {
        cacheTractos.map((item) => {
            tractosList.push(item.tracto)
        });
    }

    extractTractos();

    const SendChangues = () => {

        const updates = {
            tracto: idTracto != '' ? idTracto : tracto,
            operador: nameOperador != '' ? nameOperador : operador.id,
            transportista: nameTransporter != '' ? nameTransporter : data.registros_detalles_entradas[0].transportistas.id,
            pipa: numeroPipa != ''? numeroPipa : data.registros_detalles_entradas[0].numero_pipa
        }

        editRegister(data.id, data, updates)
        toggleModal(false)
    }

    return (
        <>
            <Paper elevation={3}>
                <Box display={'flex'} flexDirection={'column'} minWidth={'300px'} padding={'20px'} gap={'10px'}>

                    <Stack
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Typography>
                            Edicion del registro
                        </Typography>
                        <IconButton onClick={() => toggleModal(false)}>
                            <CloseIcon color="error" />
                        </IconButton>
                    </Stack>

                    <Stack alignItems={'center'}>

                        {typeChargue === 'Pipa' && (
                            <InputText
                            label={'Nueva pipa'}
                            value={numeroPipa}
                            onChangue={(e) => setNumeroPipa(e.target.value)}
                            width={'100%'}
                            />
                        )}

                        <SelectSimple
                            title={'Nuevo operador'}
                            value={nameOperador}
                            options={nameOperadores}
                            width={'100%'}
                            required={true}
                            type={'obj'}
                            onChange={(e) => setNameOperador(e.target.value)}
                        />

                        <SelectSimple
                            title={'Nueva linea transportista'}
                            value={nameTransporter}
                            options={nameTransportistas}
                            width={'100%'}
                            required={true}
                            type={'obj'}
                            onChange={(e) => setNameTransporter(e.target.value)}
                        />

                        <SelectSimple
                            title={'Nueva tractocamion'}
                            value={idTracto}
                            options={tractosList}
                            width={'100%'}
                            required={true}
                            onChange={(e) => setIdTracto(e.target.value)}
                        />

                    </Stack>

                    <Stack gap={'10px'}>
                        <Button
                            onClick={() => toggleModal(false)}
                            size='small'
                            variant='contained'
                            color='error'
                        >descartar
                        </Button>
                        <Button
                            onClick={SendChangues}
                            size='small'
                            variant='contained'
                            color='primary'
                        >Guardar
                        </Button>
                    </Stack>

                </Box>
            </Paper>
        </>
    );
}

export { FormEditManiobras };