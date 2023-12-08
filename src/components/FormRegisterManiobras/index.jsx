import { useContext, useEffect, useState, } from "react";
//components
import { Container, Paper, Box, Stack, Typography, Button, IconButton, Modal, Fade, Chip } from "@mui/material";
import { SelectSimple } from "../SelectSimple";
import { InputText } from "../InputText";
//context
import { GlobalContext } from "../../Context/GlobalContext";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { useFormRegister } from "../../Hooks/useFormRegister";
import { useGetTractos } from "../../Hooks/tractosManagment/useGetTractos";
import { useGetOperators } from "../../Hooks/operadoresManagment/useGetOperators";
import { useGetTransporters } from "../../Hooks/transportersManagment/useGetTransporters";
import { useGetTanks } from "../../Hooks/tanksManagment/useGetTanks";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
//icons
import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';

function FormRegisterManiobras() {

    useEffect(() => {
        getTanks();
    }, [])

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const IsSmall = useMediaQuery('(max-width:900px)');
    const IsMovile = useMediaQuery('(max-width:500px)');

    //hooks de tanques
    const { tanks, tankError, tankLoading, tanksReady, getTanks } = useGetTanks();

    //hook de operadores
    const { states, functions } = useGetOperators();
    const { updateOperators } = functions;
    //hook de tractos
    const { tractos, errorTractos, GetNumTractos } = useGetTractos();
    const allTractos = tractos.map((tracto) => tracto.tracto)
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
        { id: 'Tanque', nombre: 'Tanque' },
        { id: 'Pipa', nombre: 'Pipa' },
        { id: 'Vacio', nombre: 'Sin carga' },
    ]

    const ToggleModalForm = (event) => {
        setModal(!modal)
    }

    const submitRegister = () => {
        if (!allTractos.includes(tracto.trim())) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Este tracto no esta registrado, comuniquese con el administrador'
            })
            setModal(!modal)
        } else {
            routerRegisters()
            setModal(!modal)
        }
    }

    const colorItemTank = (tanque) => dataTank.find((item) => item === tanque)? 'primary': 'default';

    const [modal, setModal] = useState(false)

    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '50px'
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
                                onClick={() => { updateOperators(); updateAllTransports(); GetNumTractos(); }}>
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
                                width: '100%',
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

                            {(typeChargue === 'Tanque') &&
                                <Stack width={'100%'} gap='10px'>
                                    <Typography variant='caption'>Tanques disponibles</Typography>
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
                                                label={item.tanque}
                                                deleteIcon={<AddIcon />}
                                                color={colorItemTank(item.tanque)}
                                                onDelete={() => toggleTank(item.tanque)}
                                            />
                                        ))}
                                    </Paper>
                                </Stack>}


                            {typeChargue === 'Pipa' &&
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

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained">
                                Registrar
                            </Button>

                        </Paper>
                    </form>
                </Box>
            </Container>

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

            {/* <Modal
                open={state.modalSendRegisters}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Fade timeout={500} in={state.modalSendRegisters}>
                    <Box>
                        <FormCheckTank />
                    </Box>
                </Fade>
            </Modal> */}
        </>
    );
}

export { FormRegisterManiobras };