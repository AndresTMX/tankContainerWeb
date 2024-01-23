import {
    Box,
    FormControl,
    IconButton,
    Button,
    Paper,
    Stack,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    TextField,
    Modal,
    Fade,
    Container,
} from "@mui/material";
import { AddDataTanks } from "../../components/AddNewTanks"
import { Notification } from "../../components/Notification";
//icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCustomers } from "../../Hooks/Customers/useCustomers";
import { useFormRegister } from "../../Hooks/Maniobras/useFormRegister";
import { useGetOperators } from "../../Hooks/operadoresManagment/useGetOperators";
import { useGetTransporters } from "../../Hooks/transportersManagment/useGetTransporters";

function ManiobrasForm() {

    //responsive query
    const isMovile = useMediaQuery("(max-width:700px)");

    //hook de formulario
    const { statesFormRegister, functionsFormRegister } = useFormRegister();

    //navigator
    const navigate = useNavigate();

    const {
        typeChargue,
        tracto,
        select,
        operator,
        dataTank,
        dataPipa,
        typePipa,
        cliente,
        dataClient,
        economico,
        placas,
        typeTank,
    } = statesFormRegister;

    const {
        handleChangeList,
        handleChangeTracto,
        handleChangueTypeChargue,
        handleChangueOperator,
        validateNumTank,
        routerRegisters,
        setDataPipa,
        setTypePipa,
        setDataTank,
        setTypeTank,
        selectClient,
        setEconomico,
        setPlacas,
        setDataClient,
    } = functionsFormRegister;

    //hooks de clientes
    const { customers, updateCustomer, createCustomer, updateCustomers } = useCustomers();
    //hook de transportistas
    const { transporters } = useGetTransporters();
    //hook de operadores
    const { states } = useGetOperators();

    //submit control
    const [modal, setModal] = useState(false);

    const toggleModalForm = (event) => {
        event.preventDefault();
        setModal(!modal)
    }

    const submitRegister = () => {
        routerRegisters();
        setModal(!modal);
        const parametro = 'pendiente'
        navigate(`/maniobras/${parametro}`);
    }

    //edit customer control
    const [modalCustomer, setModalCustomer] = useState(false);

    const handleDataClient = (newValue) => {
        setDataClient({ ...dataClient, ...newValue })
    }

    const submitEditClient = async () => {
        await updateCustomer([dataClient])
        setModalCustomer(!modalCustomer)
        updateCustomers()
    }

    //add client control
    const [modalAddCustomer, setModalAddCustomer] = useState(false);

    const submitAddClient = async () => {
        await createCustomer(dataClient)
        setModalAddCustomer(!modalAddCustomer)
        updateCustomers()
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
                width: "100vw",
                backgroundColor: "whitesmoke",
                paddingTop: '70px',
                paddingBottom: '50px',
            }}
        >
            <Paper
                elevation={2}
                sx={{
                    position: "fixed",
                    padding: "10px",
                    width: "100%",
                    zIndex: '2',
                    top: '0px',
                    bgcolor: '#0092ba',
                    margin: '0px',
                    left: '0px',
                    borderRadius: '0px'
                }}
            >
                <Stack
                    justifyContent="space-between"
                    flexDirection="row"
                    alignItems="center"
                >
                    <IconButton
                        onClick={() => navigate('/maniobras')}
                    >
                        <ArrowBackIcon sx={{ color: 'white' }} />
                    </IconButton>

                    <Typography variant="button" color='white'>Nueva maniobra</Typography>
                </Stack>
            </Paper>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    maxWidth: "900px",

                }}
            >
                <form onSubmit={(event) => toggleModalForm(event)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        padding: '10px',

                    }}
                >

                    {/* cliente  */}
                    <Paper elevation={2} sx={{ padding: '20px' }}>
                        <Stack gap="10px" width="100%">
                            <Typography>Información del cliente</Typography>

                            <FormControl fullWidth>
                                <InputLabel id="select_cliente">Cliente</InputLabel>
                                <Select
                                    required
                                    value={cliente}
                                    label="Cliente"
                                    onChange={selectClient}>
                                    {customers.map((customer) => (
                                        <MenuItem key={customer.id} value={customer.id}>
                                            {customer.cliente}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Stack
                                gap="10px"
                                width="100%"
                                flexDirection={isMovile ? "column" : "row"}
                            >
                                <FormControl sx={{ width: isMovile ? "100%" : "33%" }}>
                                    {!dataClient.rfc && <InputLabel id="select_cliente_rfc">RFC</InputLabel>}
                                    <TextField value={dataClient.rfc || ''} disabled />
                                </FormControl>

                                <FormControl sx={{ width: isMovile ? "100%" : "33%" }}>
                                    {!dataClient.email && <InputLabel id="select_cliente_mail">Correo</InputLabel>}
                                    <TextField value={dataClient.email || ''} disabled />
                                </FormControl>

                                <FormControl sx={{ width: isMovile ? "100%" : "33%" }}>
                                    {!dataClient.phone && <InputLabel id="select_cliente_contacto">Telefono</InputLabel>}
                                    <TextField value={dataClient.phone || ''} disabled />
                                </FormControl>
                            </Stack>

                            <Stack
                                gap="10px"
                                width="100%"
                                flexDirection={isMovile ? "column" : "row"}
                            >
                                <Button
                                    onClick={() => setModalCustomer(!modalCustomer)}
                                    size='medium'
                                    variant="contained"
                                    color="warning">
                                    Editar
                                </Button>
                                <Button
                                    onClick={() => setModalAddCustomer(!modalAddCustomer)}
                                    size='medium'
                                    variant="contained"
                                    color="info">Nuevo cliente
                                </Button>
                            </Stack>

                        </Stack>
                    </Paper>

                    {/* carga y linea */}
                    <Paper elevation={2} sx={{ padding: '20px' }}>
                        <Stack gap="10px" width="100%">

                            <Typography>Información de maniobra</Typography>

                            <Stack
                                gap="10px"
                                width="100%"
                                flexDirection={isMovile ? "column" : "row"}
                            >

                                <FormControl sx={{ width: isMovile ? '100%' : '30%' }}>
                                    <InputLabel id="select_type_charge">Tipo de carga</InputLabel>
                                    <Select
                                        required
                                        value={typeChargue}
                                        label="Tipo de carga"
                                        onChange={handleChangueTypeChargue}>
                                        <MenuItem value={'pipa'}>Pipa</MenuItem>
                                        <MenuItem value={'tanque'}>Isotanque</MenuItem>
                                        <MenuItem value={'vacio'}>Tracto vacio</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ width: isMovile ? '100%' : '30%' }}>
                                    <InputLabel id="select_transportista">Linea transportista</InputLabel>
                                    <Select
                                        required
                                        value={select}
                                        label="Linea transportista"
                                        onChange={handleChangeList}>
                                        {transporters.map((linea) => (
                                            <MenuItem key={linea.id} value={linea.id}>{linea.name}</MenuItem>

                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ width: isMovile ? '100%' : '30%' }}>
                                    <InputLabel id="select_operador">Operador</InputLabel>
                                    <Select
                                        fullWidth
                                        required
                                        value={operator}
                                        label="Operador"
                                        onChange={handleChangueOperator}>
                                        {states.operators.map((operador) => (
                                            <MenuItem key={operador.id} value={operador.id}>{operador.nombre}</MenuItem>

                                        ))}
                                    </Select>
                                </FormControl>

                            </Stack>
                        </Stack>
                    </Paper>

                    {/* informacion de tractocamion */}
                    <Paper elevation={2} sx={{ padding: '20px' }}>
                        <Stack gap="10px" width="100%">
                            <Typography>Información del tractocamión</Typography>
                            <Stack
                                gap="10px"
                                width="100%"
                                flexDirection={isMovile ? "column" : "row"}
                            >
                                <FormControl sx={{ width: isMovile ? '100%' : '200px' }}>
                                    <TextField
                                        required
                                        id='numero_tracto'
                                        label='Número de tracto'
                                        value={tracto}
                                        onChange={handleChangeTracto}
                                    />
                                </FormControl>

                                <FormControl sx={{ width: isMovile ? '100%' : '200px' }}>
                                    <TextField 
                                    required
                                    id='numero_placas'
                                    label='Número de placas'
                                    value={placas}
                                    onChange={(e) => setPlacas(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl sx={{ width: isMovile ? '100%' : '200px' }}>
                                    <TextField 
                                    required
                                    id='numero_economico'
                                    label='Número económico'
                                    value={economico}
                                    onChange={(e) => setEconomico(e.target.value)}
                                    />
                                </FormControl>
                            </Stack>
                        </Stack>
                    </Paper>

                    {/* informacion de carga */}
                    <Paper elevation={2} sx={{ padding: '20px' }}>
                        <Stack gap="10px" width="100%">

                            <Typography>Información de carga</Typography>

                            <Stack
                                gap="10px"
                                width="100%"
                                flexDirection={isMovile ? "column" : "row"}
                            >

                                {(typeChargue === 'tanque') &&
                                    <AddDataTanks
                                    dataTank={dataTank}
                                    typeTank={typeTank}
                                    setDataTank={setDataTank}
                                    setTypeTank={setTypeTank}
                                    />
                                }

                                {typeChargue === 'pipa' &&
                                    <>

                                        <FormControl sx={{ width: isMovile ? '100%' : '33%' }}>
                                            <InputLabel id="select_type_pipa">Tipo de pipa</InputLabel>
                                            <Select
                                                required
                                                value={typePipa}
                                                label="Tipo de carga"
                                                onChange={(e) => setTypePipa(e.target.value)}>
                                                <MenuItem value={'sencilla'}>Sencilla</MenuItem>
                                                <MenuItem value={'doble'}>Doble</MenuItem>
                                            </Select>
                                        </FormControl>


                                        {typePipa != '' &&
                                            <TextField
                                                sx={{ width: isMovile ? '100%' : '33%' }}
                                                required={true}
                                                label='Pipa 1'
                                                value={dataPipa.pipa1}
                                                onChange={(e) => setDataPipa({ ...dataPipa, pipa1: e.target.value })}
                                            />}

                                        {typePipa === 'doble' &&
                                            <TextField
                                                sx={{ width: isMovile ? '100%' : '33%' }}
                                                required={true}
                                                label='Pipa 2'
                                                value={dataPipa.pipa2}
                                                onChange={(e) => setDataPipa({ ...dataPipa, pipa2: e.target.value })}
                                            />}
                                    </>
                                }

                            </Stack>

                        </Stack>
                    </Paper>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Registrar carga
                    </Button>

                </form>
            </Box>

            <Modal open={modal}>
                <Fade in={modal} timeout={300}>
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
                                        color="error"
                                        onClick={toggleModalForm}>
                                        Cancelar</Button>
                                </Stack>

                            </Paper>
                        </Box>
                    </Container>
                </Fade>
            </Modal>

            <Modal open={modalCustomer}>
                <Fade in={modalCustomer} timeout={300}>
                    <Container>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                            <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px', width: '400px', maxWidth: '90vw' }}>
                                <Typography variant="button">Editar cliente</Typography>

                                <Stack
                                    gap="10px"
                                    width="100%"
                                >
                                    <FormControl fullWidth>
                                        <TextField
                                            onChange={(e) => handleDataClient({ rfc: e.target.value })}
                                            label="RFC"
                                            value={dataClient.rfc || ''} />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <TextField
                                            onChange={(e) => handleDataClient({ email: e.target.value })}
                                            label="Correo"
                                            value={dataClient.email || ''} />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <TextField
                                            onChange={(e) => handleDataClient({ phone: e.target.value })}
                                            label="Telefono"
                                            value={dataClient.phone || ''} />
                                    </FormControl>
                                </Stack>


                                <Stack gap='8px'>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={() => submitEditClient()}>
                                        actualizar
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="error"
                                        onClick={() => setModalCustomer(!modalCustomer)}>
                                        Cancelar
                                    </Button>
                                </Stack>

                            </Paper>
                        </Box>
                    </Container>
                </Fade>
            </Modal>

            <Modal open={modalAddCustomer}>
                <Fade in={modalAddCustomer} timeout={300}>
                    <Container>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                            <form onSubmit={() => submitAddClient()}>
                                <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px', width: '400px', maxWidth: '90vw' }}>
                                    <Typography variant="button">Nuevo cliente</Typography>

                                    <Stack
                                        gap="10px"
                                        width="100%"
                                    >

                                        <FormControl fullWidth>
                                            <TextField
                                                required
                                                onChange={(e) => handleDataClient({ cliente: e.target.value })}
                                                label="Cliente"
                                                value={dataClient.cliente || ''} />
                                        </FormControl>

                                        <FormControl fullWidth>
                                            <TextField
                                                onChange={(e) => handleDataClient({ rfc: e.target.value })}
                                                label="RFC"
                                                value={dataClient.rfc || ''} />
                                        </FormControl>

                                        <FormControl fullWidth>
                                            <TextField
                                                onChange={(e) => handleDataClient({ email: e.target.value })}
                                                label="Correo"
                                                value={dataClient.email || ''} />
                                        </FormControl>

                                        <FormControl fullWidth>
                                            <TextField
                                                onChange={(e) => handleDataClient({ phone: e.target.value })}
                                                label="Telefono"
                                                value={dataClient.phone || ''} />
                                        </FormControl>
                                    </Stack>


                                    <Stack gap='8px'>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                        >
                                            agregar
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="error"
                                            onClick={() => setModalAddCustomer(!modalAddCustomer)}>
                                            Cancelar
                                        </Button>
                                    </Stack>

                                </Paper>
                            </form>
                        </Box>
                    </Container>
                </Fade>
            </Modal>

            <Notification />
        </Box>
    );
}

export { ManiobrasForm };
