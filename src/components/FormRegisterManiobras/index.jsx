import { useState, } from "react";
//components
import { Container, Paper, Box, Stack, Typography, Button, IconButton, Modal, Fade, } from "@mui/material";
import { AddTankManiobra } from "../AddTankManiobra"
import { SelectSimple } from "../SelectSimple";
import { InputText } from "../InputText";
//hooks
import { useGetTransporters } from "../../Hooks/transportersManagment/useGetTransporters";
import { useGetOperators } from "../../Hooks/operadoresManagment/useGetOperators";
import { useFormRegister } from "../../Hooks/Maniobras/useFormRegister";
import { useCustomers } from "../../Hooks/Customers/useCustomers";
import useMediaQuery from "@mui/material/useMediaQuery";
//icons
import UpdateIcon from '@mui/icons-material/Update';

function FormRegisterManiobras({ toggleModal, forceUpdate, setTypeManiobra }) {

    const IsMovile = useMediaQuery('(max-width:500px)');

    //hooks de clientes
    const { selectCustomers } = useCustomers();

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
    const { statesFormRegister, functionsFormRegister } = useFormRegister(forceUpdate);
    const { typeChargue, tracto, select, operator, dataTank, dataPipa, typePipa, cliente } = statesFormRegister;
    const { handleChangeList, handleChangeTracto, handleChangueTypeChargue, handleChangueOperator, routerRegisters, setDataPipa, setTypePipa, toggleTank, setDataTank, selectClient } = functionsFormRegister;
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
        toggleModal();
        setTimeout(() => {
            setTypeManiobra('pendiente')
        }, 1200)

    }

    const [modal, setModal] = useState(false)

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

                        <Stack width='100%' flexDirection='row' alignItems='center' justifyContent='space-between'>
                            <Typography color='GrayText'>Actualizar datos</Typography>
                            <IconButton color="primary" onClick={() => { updateOperators(); updateAllTransports(); }}>
                                <UpdateIcon />
                            </IconButton>
                        </Stack>

                    </Paper>

                    <form onSubmit={ToggleModalForm}>
                        <Paper elevation={4}
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

                            <Stack width={'100%'}>
                                <SelectSimple
                                    type={'obj'}
                                    required={true}
                                    width={'100%'}
                                    title={'Cliente'}
                                    value={cliente}
                                    options={selectCustomers}
                                    onChange={selectClient}
                                />
                            </Stack>

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
                                <AddTankManiobra
                                    dataTank={dataTank}
                                    setDataTank={setDataTank}
                                    toggleTank={toggleTank}
                                />
                            }


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
                                    onClick={toggleModal}
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

        </>
    );
}

export { FormRegisterManiobras };