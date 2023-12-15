import { useState, useEffect, useContext } from "react";
//componentes
import { Box, Stack, Typography, Paper, IconButton, Button, } from "@mui/material";
import { ViewAndDeletTanks, ViewAndSelectTanks } from "../ViewAndSelectTanks";
import { InputText } from "../../components/InputText";
import { SelectSimple } from "../SelectSimple";
//icons
import CloseIcon from '@mui/icons-material/Close';
//helpers
import { transformRegisters } from "../../Helpers/transformRegisters";
//hooks
import { useEditManiobra } from "../../Hooks/Maniobras/useEditManiobra";
import { useSelectManiobras } from "../../Hooks/Maniobras/useSelectManiobras";
import { useGetTanks } from "../../Hooks/tanksManagment/useGetTanks";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function FormEditManiobras({ data, toggleModal, updater }) {

    useEffect(() => {
        getTanks()
    }, [data])

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const { tanks, tanksReady, tankLoading, tankError, getTanks } = useGetTanks();

    const {
        typeRegister,
        linea,
        tanques,
        operador,
        transportista,
        tanquesManiobras,
        tracto,
        numeroTanques,
        typeChargue,
    } = transformRegisters(data);

    const IsMovile = useMediaQuery("(max-width:700px)")

    const { routerFetch } = useEditManiobra();
    const { colorItemTank, toggleTank, deletTanksChargue, dataTank, copyTanksFree, copyTanksManiobras } = useSelectManiobras(tanquesManiobras, tanksReady, tankLoading)

    const [newType, setNewType] = useState('');
    const [idTracto, setIdTracto] = useState('');
    const [typePipa, setTypePipa] = useState('');
    const [nameOperador, setNameOperador] = useState('');
    const [nameTransporter, setNameTransporter] = useState('');
    const [dataPipa, setDataPipa] = useState({ pipa1: "", pipa2: "" });
    const cacheOperadores = JSON.parse(localStorage.getItem('operadores'));
    const cacheTransportistas = JSON.parse(localStorage.getItem('transportistas'));

    const nameOperadores = cacheOperadores.map((operador) => ({
        nombre: operador.nombre,
        id: operador.id
    }));

    const nameTransportistas = cacheTransportistas.map((transporter) => ({
        nombre: transporter.name,
        id: transporter.id
    }));

    const SendChangues = async () => {
        try {

            if(newType === 'tanque' && copyTanksManiobras.length === 0){
                throw new Error(`No puedes cambiar la maniobra al tipo tanque sin agregar tanques`)
            }

            if(newType === 'pipa' && typePipa === '' ){
                throw new Error(`No puedes cambiar la maniobra al tipo pipa sin agregar pipas`)
            }

            if(newType === 'pipa' && typePipa === 'sencilla' && dataPipa.pipa1.trim() === ""){
                throw new Error(`No puedes cambiar la maniobra al tipo pipa sin agregar pipas`)
            }

            if(newType === 'pipa' && typePipa === 'doble' && dataPipa.pipa1.trim() === "" && dataPipa.pipa2.trim() === ""){
                throw new Error(`No puedes cambiar la maniobra al tipo pipa sin agregar pipas`)
            }

            const updates = {
                tracto: idTracto != '' ? idTracto : tracto,
                operador: nameOperador != '' ? nameOperador : operador.id,
                transportista: nameTransporter != '' ? nameTransporter : transportista.id,
            }

            routerFetch(typeChargue, newType, typeRegister, copyTanksFree, copyTanksManiobras, dataPipa, updates, data.id)
            setTimeout(() => {
                toggleModal(false)
                updater()
            }, 1500)

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }


    }

    return (
        <>
            <Paper elevation={3}>
                <Box display={'flex'} flexDirection={'column'} width={'90vw'} maxWidth={'700px'} padding={'20px'} gap={'8px'}>

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

                    <Stack alignItems={'center'} flexDirection={IsMovile ? 'column' : 'row'} >

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

                        {typeChargue === 'vacio' &&
                            <SelectSimple
                                title={'Nuevo tipo de registro'}
                                value={newType}
                                options={['tanque', 'pipa']}
                                width={'100%'}
                                onChange={(e) => setNewType(e.target.value)}
                            />
                        }

                        <InputText
                            label={'Nuevo numero de tracto'}
                            value={idTracto}
                            width={'100%'}
                            required={true}
                            onChangue={(e) => setIdTracto(e.target.value)}
                        />

                    </Stack>

                    {(typeChargue === 'tanque' || newType === 'tanque') &&
                        <ViewAndDeletTanks
                            dataTank={copyTanksManiobras}
                            deleteTank={deletTanksChargue}
                        />}

                    {(typeChargue === 'tanque' || newType === 'tanque') &&
                        <ViewAndSelectTanks
                            tankChargue={copyTanksManiobras}
                            colorItemTank={colorItemTank}
                            tanksReady={copyTanksFree}
                            tankLoading={tankLoading}
                            toggleTank={toggleTank}
                            tankError={tankError}
                            dataTank={dataTank}
                        />}

                    {(typeChargue === 'pipa' || newType === 'pipa') &&
                        <Stack
                            alignItems={'center'}
                            flexDirection={IsMovile ? 'column' : 'row'}
                            width={'100%'}
                            gap={'10px'}
                        >

                            <SelectSimple
                                required={true}
                                width={'100%'}
                                title={'Tipo de pipa'}
                                value={typePipa}
                                options={['sencilla', 'doble']}
                                onChange={(e) => setTypePipa(e.target.value)}
                            />

                            {typePipa != '' &&
                                <InputText
                                    required={true}
                                    width={'100%'}
                                    label='Pipa 1'
                                    value={dataPipa.pipa1}
                                    onChangue={(e) => setDataPipa({ ...dataPipa, pipa1: e.target.value })}
                                />}

                            {typePipa === 'doble' &&
                                <InputText
                                    required={true}
                                    width={'100%'}
                                    label='Pipa 2'
                                    value={dataPipa.pipa2}
                                    onChangue={(e) => setDataPipa({ ...dataPipa, pipa2: e.target.value })}
                                />}
                        </Stack>}

                    <Stack
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        gap={'10px'}>

                        <Button
                            onClick={SendChangues}
                            size='small'
                            variant='contained'
                            color='primary'
                        >Guardar
                        </Button>

                        <Button
                            onClick={() => toggleModal(false)}
                            size='small'
                            variant='contained'
                            color='error'
                        >descartar
                        </Button>
                    </Stack>

                </Box>
            </Paper>
        </>
    );
}

export { FormEditManiobras };