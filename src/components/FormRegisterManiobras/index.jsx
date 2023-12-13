import { useContext, useEffect, useState, } from "react";
//components
import { Container, Paper, Box, Stack, Typography, Button, IconButton, Modal, Fade, Chip, } from "@mui/material";
import { SelectSimple } from "../SelectSimple";
import { InputText } from "../InputText";
//context
import { GlobalContext } from "../../Context/GlobalContext";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useFormRegister } from "../../Hooks/useFormRegister";
import { useGetOperators } from "../../Hooks/operadoresManagment/useGetOperators";
import { useGetTransporters } from "../../Hooks/transportersManagment/useGetTransporters";
import { useGetTanks } from "../../Hooks/tanksManagment/useGetTanks";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { actionTypes } from "../../Reducers/ManiobrasReducer";
//icons
import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';

function FormRegisterManiobras({ closeModal, forceUpdate, setTypeManiobra }) {

    useEffect(() => {
        getTanks();
    }, [])

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const [state, dispatch] = useContext(ManiobrasContext);
    const IsSmall = useMediaQuery('(max-width:900px)');
    const IsMovile = useMediaQuery('(max-width:500px)');

    //hooks de tanques
    const { tanks, tankError, tankLoading, tanksReady, getTanks } = useGetTanks();

    //modal de tanques
    const [newTank, setNewTank] = useState('');
    const [newTankStatus, setNewTankStatus] = useState('');
    const [optionTanks, setOptionTanks] = useState('')

    //hook de operadores
    const { states, functions } = useGetOperators();
    const { updateOperators } = functions;
    //hook de operadores
    const { loadingOperators, operators } = states;
    const operatorsName = !loadingOperators ? operators.map((operator) => ({
        id: operator.id,
        nombre: operator.nombre
    })) : [];
    //hook de formulario
    const { statesFormRegister, functionsFormRegister } = useFormRegister();
    const { typeChargue, tracto, select, operator, dataTank, dataPipa, typePipa } = statesFormRegister;
    const { handleChangeList, handleChangeTracto, handleChangueTypeChargue, handleChangueOperator, routerRegisters, setDataPipa, setTypePipa, toggleTank } = functionsFormRegister;
    //hook de transportistas
    const { transporters, updateAllTransports } = useGetTransporters();
    const arrayTransporters = transporters.length >= 1 ? transporters.map((transporter) => ({
        id: transporter.id,
        nombre: transporter.name
    })) : [];

    const optionSelect = [
        { id: 'tanque', nombre: 'Tanque' },
        { id: 'pipa', nombre: 'Pipa' },
        { id: 'vacio', nombre: 'Sin carga' },
    ]

    const ToggleModalForm = (event) => {
        setModal(!modal)
    }

    const submitRegister = () => {
        routerRegisters();
        setModal(!modal);
        closeModal();
        setTimeout(() => {
            forceUpdate();
            setTypeManiobra('pendiente')
        }, 1200)

    }

    const colorItemTank = (tanque) => dataTank.find((item) => item === tanque) ? 'primary' : 'default';

    const [modal, setModal] = useState(false)
    const [modalTank, setModalTank] = useState(false);

    return (
        <>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '90%',
                    padding: '20px',
                    maxWidth: '800px'
                }}>

                <Box width={'100%'} maxWidth={'900px'} display={'flex'} flexDirection={'column'} gap={'10px'}>
                    <Paper
                        elevation={2}
                        sx={{
                            paddingLeft: '10px',
                            paddingRight: '10px',
                            maxWidth: '900px',

                        }}>
                        <Stack
                            width='100%'
                            flexDirection='row'
                            alignItems='center'
                            justifyContent='space-between'>
                            <Typography color='GrayText'>
                                Actualizar datos
                            </Typography>
                            <IconButton
                                color="primary"
                                onClick={() => { updateOperators(); updateAllTransports(); }}>
                                <UpdateIcon />
                            </IconButton>
                        </Stack>
                    </Paper>

                    <form onSubmit={ToggleModalForm}>
                        <Paper
                            elevation={4}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '15px',
                                maxWidth: '900px',
                                minWidth: '200px',
                                padding: '20px',
                                borderRadius: '4px',
                            }}>

                            <Stack
                                flexDirection={IsMovile ? 'column' : 'row'}
                                width={'100%'}
                            >
                                <SelectSimple
                                    type={'obj'}
                                    required={true}
                                    width={'100%'}
                                    title={'Tipo de carga'}
                                    value={typeChargue}
                                    options={optionSelect}
                                    onChange={handleChangueTypeChargue}
                                />

                                <SelectSimple
                                    type='obj'
                                    required={true}
                                    width={'100%'}
                                    title={'Linea transportista'}
                                    value={select}
                                    options={arrayTransporters}
                                    onChange={handleChangeList}
                                />
                            </Stack>

                            {(typeChargue === 'tanque') &&
                                <Stack width={'100%'} gap='10px'>
                                    <Stack flexWrap={'wrap'} flexDirection={'row'} alignItems={'center'} gap={'20px'} justifyContent={'space-between'}>
                                        <Typography variant='caption'>Tanques disponibles</Typography>
                                        <Button onClick={() => setModalTank(!modalTank)} size="small" variant="contained" >nuevo tanque</Button>
                                    </Stack>
                                    <Paper
                                        elevation={2}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            padding: '15px',
                                            width: '100%',
                                            gap: '10px'
                                        }}
                                    >
                                        {tanksReady.map((item) => (
                                            <Chip
                                                key={item.tanque}
                                                label={item.tanque}
                                                deleteIcon={<AddIcon />}
                                                color={colorItemTank(item.tanque)}
                                                onDelete={() => toggleTank(item.tanque)}
                                            />
                                        ))}

                                        {(tanksReady.length === 0) &&
                                            <Typography variant='caption'>Sin tanques disponibles</Typography>
                                        }
                                    </Paper>
                                </Stack>}


                            {typeChargue === 'pipa' &&
                                <Stack
                                    alignItems={'center'}
                                    flexDirection={IsMovile ? 'column' : 'row'}
                                    width={'100%'}
                                    gap={'10px'}
                                >

                                    <SelectSimple
                                        required={true}
                                        width={'50%'}
                                        title={'Tipo de pipa'}
                                        value={typePipa}
                                        options={['sencilla', 'doble']}
                                        onChange={(e) => setTypePipa(e.target.value)}
                                    />

                                    {typePipa != '' &&
                                        <InputText
                                            required={true}
                                            width={'300px'}
                                            label='Pipa 1'
                                            value={dataPipa.pipa1}
                                            onChangue={(e) => setDataPipa({ ...dataPipa, pipa1: e.target.value })}
                                        />}

                                    {typePipa === 'doble' &&
                                        <InputText
                                            required={true}
                                            width={'300px'}
                                            label='Pipa 2'
                                            value={dataPipa.pipa2}
                                            onChangue={(e) => setDataPipa({ ...dataPipa, pipa2: e.target.value })}
                                        />}
                                </Stack>}


                            <Stack
                                alignItems={'center'}
                                flexDirection={IsMovile ? 'column' : 'row'}
                                width={'100%'}
                            >
                                <InputText
                                    required={true}
                                    width={'100%'}
                                    label='Numero de tracto'
                                    value={tracto}
                                    onChangue={handleChangeTracto}
                                />

                                <SelectSimple
                                    type={'obj'}
                                    required={true}
                                    width={'100%'}
                                    title={'Operador'}
                                    value={operator}
                                    options={operatorsName}
                                    onChange={(e) => handleChangueOperator(e.target.value)}
                                />
                            </Stack>

                            <Stack flexDirection={'row'} alignItems={'center'} width={'100%'} gap={'15px'}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained">
                                    Registrar
                                </Button>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="error"
                                    onClick={closeModal}
                                >
                                    Cancelar
                                </Button>
                            </Stack>

                        </Paper>
                    </form>
                </Box>
            </Paper>

            <Modal open={modal}>
                <Fade in={modal} timeout={500}>
                    <Container>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                            <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px' }}>
                                <Typography>¿Seguro que quiere enviar este registro?</Typography>
                                <Stack flexDirection='row' justifyContent='space-between' gap='10px'>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={submitRegister}
                                    >Enviar</Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="error" on
                                        onClick={ToggleModalForm}>
                                        Cancelar</Button>
                                </Stack>

                            </Paper>
                        </Box>
                    </Container>
                </Fade>
            </Modal>

            <Modal open={modalTank}>
                <Fade in={modalTank} timeout={500}>
                    <Container>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                            <Paper sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <Typography variant='button'>Agrega contedores a la base de datos</Typography>
                                <Stack display={'flex'} gap={'10px'} alignItems={'center'}>

                                    <SelectSimple
                                        width={'100%'}
                                        title={'Tipo de registro'}
                                        value={optionTanks}
                                        required={true}
                                        options={['sencillo', 'multiple']}
                                        onChange={(e) => setOptionTanks(e.target.value)}
                                        helperText={'Sencillo para agregar solo un registro, multiple para agregar varios'}
                                    />

                                    {(optionTanks === 'sencillo') &&
                                        <>
                                            <Typography textAlign={'start'} width={'100%'} variant='caption'>Agrega un nuevo contedor a la base de datos</Typography>
                                            <InputText
                                                label={'Numero de contenedor'}
                                                width={'100%'}
                                                value={newTank}
                                                required={true}
                                                onChangue={(e) => setNewTank(e.target.value)}
                                            />
                                        </>
                                    }

                                    {(optionTanks === 'multiple') &&
                                        <>
                                            <Typography textAlign={'start'} width={'100%'} variant='caption'>Agrega varios contenedores a la base de datos</Typography>
                                            <InputText
                                                type={'textarea'}
                                                label={'Numeros de contenedores separados por comas'}
                                                width={'100%'}
                                                value={newTank}
                                                required={true}
                                                onChangue={(e) => setNewTank(e.target.value)}
                                            />
                                        </>
                                    }

                                    <SelectSimple
                                        width={'100%'}
                                        title={'Estatus'}
                                        value={newTankStatus}
                                        required={true}
                                        options={['ready', 'maniobras', 'parked', 'reparacion', 'prelavado',]}
                                        onChange={(e) => setNewTankStatus(e.target.value)}
                                        helperText={'Para usarlo inmediatamente despues de agregrarlo selecciona ready'}
                                    />
                                </Stack>

                                <Stack flexDirection='row' justifyContent='space-between' gap='10px'>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setModalTank(!modalTank)}
                                    >Agregar</Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="error" on
                                        onClick={() => setModalTank(!modalTank)}>
                                        Cancelar</Button>
                                </Stack>

                            </Paper>
                        </Box>
                    </Container>
                </Fade>
            </Modal>

        </>
    );
}

export { FormRegisterManiobras };