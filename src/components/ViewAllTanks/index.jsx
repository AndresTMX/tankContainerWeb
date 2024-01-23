import { useEffect, useState, useContext } from "react";
import { Container, Box, Paper, Chip, Button, Stack, Tab, Tabs, Typography, Modal, IconButton, TextField, InputLabel, Select, MenuItem, FormControl, Divider, Skeleton } from "@mui/material";
import { CustomTabPanel } from "../CustomTabPanel";
import { useGetTanks } from "../../Hooks/tanksManagment/useGetTanks";
import { ContainerScroll } from "../ContainerScroll";
import { DataGrid } from "@mui/x-data-grid";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { useAddTanks } from "../../Hooks/Maniobras/useAddTanks";

function ViewAllTanks() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    const { getAllTanks, tanks, tankError, tankLoading } = useGetTanks()

    const { updateTankStatus, deleteTanks, updateTanksRepair } = useAddTanks();

    const [tab, setTab] = useState(0);
    const [editTank, setEditTank] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectTank, setSelectTank] = useState([]);
    const [tankStatus, setTankStatus] = useState({ status: '', tamaño: '', })
    const tanksSelected = tanks.length >= 1 ? tanks.filter((tanque) => selectTank.includes(tanque.tanque)) : [];
    const [tankEditing, setTankEditing] = useState(tanksSelected);

    // useEffect(() => {
    //     getTanks();
    // }, [editTank, deleteModal])

    // useEffect(() => {
    //     setTankEditing(tanksSelected)
    // }, [editTank])

    const ToggleTab = (event, newValue) => {
        setTab(newValue)
    }

    const OnSubmit = async (e, type) => {
        e.preventDefault();

        const routerUpdates = {
            status: async () => await updateTankStatus({ status: tankStatus.status }, selectTank),
            size: async () => await updateTankStatus({ tamaño: tankStatus.tamaño }, selectTank),
            repair: async () => await updateTanksRepair(tankEditing)
        }

        if (routerUpdates[type]) {
            try {
                await routerUpdates[type]();
            } catch (error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: `Error al ejecutar la acción para ${type}: ${error.message}`
                })
            }
        } else {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: `No se encontro una accion predeterminada para carga tipo ${type}`
            })
        }

        setEditTank(!editTank)

    }

    const OnDelete = async () => {
        await deleteTanks(selectTank)
        setTimeout(() => {
            setDeleteModal(!deleteModal)
        })

    }

    const toggleEdit = () => {
        if (selectTank.length >= 1) {
            setEditTank(!editTank)
        } else {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Selecciona al menos un tanque primero'
            })
        }
    }

    const toggleDelet = () => {
        if (selectTank.length >= 1) {
            setDeleteModal(!deleteModal)
        } else {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Selecciona al menos un tanque primero'
            })
        }
    }

    const OnEditTank = (tanque, type, e) => {

        const copyState = [...tankEditing]

        const index = copyState.findIndex((item) => item.tanque === tanque);

        type === 'internas' ?
            copyState[index].reparaciones_internas = e.target.value
            : copyState[index].reparaciones_externas = e.target.value

        setTankEditing(copyState)
    }

    const columns = [
        { field: 'col1', headerName: 'Tanque', width: 120 },
        { field: 'col2', headerName: 'Status', renderCell: (params) => (<CustomChip status={params.value} />), width: 120 },
        { field: 'col3', headerName: 'Reparaciones internas', width: 200 },
        { field: 'col4', headerName: 'Reparaciones externas', width: 200 },
        { field: 'col5', headerName: 'Reingresos', width: 200 },
    ];

    return (
        <>

            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', }}>
                <Paper sx={{ width: '95vw', maxWidth: '1000px', justifyContent: 'center', display: 'flex' }}>
                    <ContainerScroll background={'white'} height={'auto'} maxHeight={'70vh'}>
                        <TableIsotanques />
                    </ContainerScroll>
                </Paper>
            </Box>

            <Modal open={editTank}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '100vh',
                        marginTop: '10%'
                    }}
                >

                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '20px',
                            width: '400px'
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Tabs
                                value={tab}
                                onChange={ToggleTab}
                                variant={"scrollable"}
                                scrollButtons="auto"
                            >
                                <Tab label="status" />
                                <Tab label="reparaciones" />
                            </Tabs>
                        </Box>

                        <CustomTabPanel index={0} value={tab}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                }}
                            >
                                <form onSubmit={(e) => OnSubmit(e, 'status')}>
                                    <Stack gap={'15px'}>
                                        <Stack
                                            flexDirection={'row'}
                                            alignItems={'center'}
                                            justifyContent={'flex-start'}
                                        >
                                            <Typography>
                                                {`Tanques seleccionados :  `}
                                                {selectTank?.length >= 1 ?
                                                    selectTank.map((tanque) =>
                                                        (<strong>{tanque}</strong>)) : []}
                                            </Typography>
                                        </Stack>

                                        <Stack
                                            gap={'10px'}
                                            alignItems={'center'}
                                        >

                                            <FormControl fullWidth>
                                                <InputLabel>Nuevo status</InputLabel>
                                                <Select
                                                    required={true}
                                                    defaultValue=""
                                                    value={tankStatus.status}
                                                    label="Nuevo status"
                                                    onChange={(e) => setTankStatus({ ...tankStatus, status: e.target.value })}
                                                >
                                                    <MenuItem value={'ready'}>Ready</MenuItem>
                                                    <MenuItem value={'maniobras'}>Maniobras</MenuItem>
                                                    <MenuItem value={'eir'}>EIR</MenuItem>
                                                    <MenuItem value={'parked'}>Parked</MenuItem>

                                                </Select>
                                            </FormControl>

                                        </Stack>

                                        <Stack
                                            flexDirection={'column'}
                                            gap={'5px'}
                                        >
                                            <Button
                                                type="submit"
                                                fullWidth
                                                color="primary"
                                                variant="contained"
                                            >
                                                Actualizar
                                            </Button>

                                            <Button
                                                onClick={() => setEditTank(false)}
                                                fullWidth
                                                color="error"
                                                variant="contained"
                                            >
                                                Cancelar
                                            </Button>

                                        </Stack>

                                    </Stack>
                                </form>
                            </Box>
                        </CustomTabPanel>

                        <CustomTabPanel index={1} value={tab}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                }}
                            >
                                <form onSubmit={(e) => OnSubmit(e, 'repair')}>
                                    <Stack gap='10px'>
                                        <Stack
                                            gap={'10px'}
                                            alignItems={'center'}
                                            flexDirection={'row'}
                                            justifyContent={'flex-start'}
                                        >
                                            {`Tanques seleccionados :  `}
                                            {tankEditing?.length >= 1 ?
                                                tankEditing.map((tanque, index) =>
                                                    (<strong key={index}>{`${tanque.tanque} , `}</strong>)) : []}
                                        </Stack>

                                        <ContainerScroll background={'white'} height={'250px'}>
                                            <Stack
                                                padding={'0px'}
                                                spacing={'10px'}
                                            >

                                                {tankEditing.map((tanque) => (
                                                    <ItemEditTank
                                                        key={tanque.tanque}
                                                        tanque={tanque.tanque}
                                                        OnEditTank={OnEditTank}
                                                        internas={tanque.reparaciones_internas}
                                                        externas={tanque.reparaciones_externas}
                                                    />
                                                ))}

                                            </Stack>
                                        </ContainerScroll>

                                        <Stack
                                            flexDirection={'column'}
                                            gap={'5px'}
                                        >
                                            <Button
                                                type="submit"
                                                fullWidth
                                                color="primary"
                                                variant="contained"
                                            >
                                                Actualizar
                                            </Button>

                                            <Button
                                                onClick={() => setEditTank(false)}
                                                fullWidth
                                                color="error"
                                                variant="contained"
                                            >
                                                Cancelar
                                            </Button>

                                        </Stack>
                                    </Stack>
                                </form>
                            </Box>
                        </CustomTabPanel>


                    </Paper>

                </Box>

            </Modal >

            <Modal open={deleteModal}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '100vh',
                        marginTop: '10%'
                    }}
                >
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '20px',
                            width: '400px'
                        }}
                    >
                        <Stack gap='10px' >
                            <Typography textAlign={'center'}>
                                Estas a punto de eliminar {selectTank.length} tanques
                            </Typography>

                            <Stack flexDirection={'row'} gap={'5px'} flexWrap={'wrap'}>
                                {selectTank.map((tanque) => (
                                    <strong key={tanque.tanque}>{tanque}</strong>
                                ))}
                            </Stack>

                            <Typography textAlign={'center'}>
                                ¿quieres continuar?
                            </Typography>

                            <Stack
                                gap={'10px'}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setDeleteModal(false)}
                                >cancelar</Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={OnDelete}
                                >eliminar</Button>
                            </Stack>

                        </Stack>
                    </Paper>

                </Box>
            </Modal>

        </>
    )
}

export { ViewAllTanks };

function ItemViewTank({ tanque, onClick }) {
    return (
        <Paper
            elevation={2}
            key={tanque.tanque}
        >
            <Stack
                padding={'10px'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                gap={'20px'}
            >
                <Typography>
                    {tanque.tanque}
                </Typography>

                <Stack
                    gap={'10px'}
                    flexDirection={'row'}>

                    <Stack
                        flexDirection={'row'}
                        alignItems={'center'}
                        gap={'10px'}
                    >
                        <Typography
                            color='gray'
                            variant='caption'>
                            status
                        </Typography>
                        <Chip
                            size="small"
                            color="info"
                            label={tanque.status}
                        />
                    </Stack>

                    <Button
                        onClick={() => onClick(tanque)}
                        variant="contained"
                        color="warning"
                        size="small"
                    >
                        Editar
                    </Button>
                </Stack>

            </Stack>
        </Paper>
    );
}

export { ItemViewTank };


function CustomChip({ status }) {

    const routerColors = {
        forconfirm: "default",
        reparacion: "error",
        ready: "success",
        eir: "warning",
        finish: "error",
        prelavado: "info",
    }

    return (
        <Chip size="small" label={status} color={routerColors[status]} />
    );
}

function HeaderTable({ toggleEdit, toggleDelet }) {

    return (
        <Box>
            <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} padding={'15px'}>

                <Typography variant='button'>
                    Tanques registrados
                </Typography>

                <Stack flexDirection={'row'} gap={'10px'}>

                    <Button
                        onClick={toggleEdit}
                        size="small"
                        variant="contained"
                        color="info"
                    >Actualizar </Button>

                    <Button
                        onClick={toggleDelet}
                        size="small"
                        variant="contained"
                        color="error"
                    >Eliminar</Button>

                </Stack>

            </Stack>
        </Box>
    );
}

export function ItemEditTank({ tanque, internas, externas, OnEditTank }) {

    return (
        <Stack bgcolor={'whitesmoke'} padding={'15px'} gap={'10px'} borderRadius={'4px'}>

            <Stack flexDirection={'flex-start'} >
                <Chip sx={{ width: '80px' }} size="small" label={tanque} color="info" />
            </Stack>

            <Stack flexDirection={'row'} gap={'10px'}>
                <TextField
                    helperText={'internas'}
                    size="small"
                    value={internas === null ? "0" : internas}
                    onChange={(e) => OnEditTank(tanque, 'internas', e)}
                />
                <TextField
                    helperText={'externas'}
                    size="small"
                    value={externas === null ? "0" : externas}
                    onChange={(e) => OnEditTank(tanque, 'externas', e)}
                />
            </Stack>
        </Stack>
    )
}

export function TableIsotanques({ }) {

    const { getAllTanks, tanks, tankError, tankLoading } = useGetTanks();

    useEffect(() => {
        getAllTanks();
    }, [])

    return (
        <>
            <Box sx={{ overflowY: 'auto', borderRadius: '4px' }}>
                <Stack
                    flexDirection='row'
                    alignItems='center'
                    justifyContent='flex-start'
                    bgcolor='#0092ba'
                    padding='20px'
                    width='100%'
                    minWidth='750px'
                    gap='10px'
                    color='white'
                >
                    <Typography width='80px' variant="button">
                        Tanque
                    </Typography>
                    <Divider flexItem orientation='vertical' />

                    <Typography width='150px' variant="button">
                        Estado
                    </Typography>
                    <Divider flexItem orientation='vertical' />

                    <Typography textAlign='center' width='200px' variant="button">
                        Reparaciones Internas
                    </Typography>
                    <Divider flexItem orientation='vertical' />

                    <Typography textAlign='center' width='200px' variant="button">
                        Reparaciones Externas
                    </Typography>
                    <Divider flexItem orientation='vertical' />

                    <Typography textAlign='center' width='100px' variant="button">
                        Reingresos
                    </Typography>
                </Stack>

                <Stack>
                    {tanks.map((tanque, index) => (
                        <ItemDetailsTanque
                            key={`${tanque.numero_tanque}_${index}`}
                            numero_tanque={tanque.numero_tanque}
                            status={tanque.status}
                        />
                    ))}
                </Stack>
            </Box>
        </>
    )
}

export function ItemDetailsTanque({ numero_tanque, status }) {

    const { getDetailsForTank, detailTank, errorDetail, loadingDetail, } = useGetTanks();

    const { reparaciones_internas, reparaciones_externas, reingresos } = detailTank[0] || {};

    useEffect(() => {
        getDetailsForTank(numero_tanque);
    }, [])

    return (
        <Paper>

            {(!loadingDetail && !errorDetail) &&
                <Stack
                    flexDirection='row'
                    alignItems='center'
                    justifyContent='flex-start'
                    bgcolor='whitesmoke'
                    padding='20px'
                    width='100%'
                    minWidth='750px'
                    gap='10px'
                >
                    <Typography textTransform='uppercase' width='80px' variant='subtitle'>
                        {numero_tanque}
                    </Typography>

                    <Typography width='150px' variant='subtitle'>
                        <Chip label={ status === 'interna' || status === 'externa'? `reparación ${status}` : status }/>
                    </Typography>

                    <Typography textAlign='center' width='200px' variant='subtitle'>
                        {reparaciones_internas | 0}
                    </Typography>

                    <Typography textAlign='center' width='200px' variant='subtitle'>
                        {reparaciones_externas | 0}
                    </Typography>

                    <Typography textAlign='center' width='100px' variant='subtitle'>
                        {reingresos}
                    </Typography>
                </Stack>}


            {(loadingDetail && !errorDetail) &&
                <Skeleton variant='text' width='100%' height='50px' />
            }
        </Paper>
    )


}