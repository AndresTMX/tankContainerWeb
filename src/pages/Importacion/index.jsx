import { useState, useRef } from "react";
import { Box, Stack, Paper, Typography, Button, FormControl, InputLabel, Select, MenuItem, TextField, Modal, Container, Tabs, Tab, IconButton, } from "@mui/material"
import { CustomTabPanel } from "../../components/CustomTabPanel";
//icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
//grid
import { DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from "@mui/x-data-grid";
//libraries
import * as XLSX from 'xlsx'
import { v4 as uuidv4 } from 'uuid';
//hooks
import { useRealtime } from "../../Hooks/FetchData";
//services
import { getAllClientes } from "../../services/clientes";
import { getAllOperadores } from "../../services/operadores";
import { getAllTransportistas } from "../../services/transportistas";

export function ImportacionPage() {

    const { loading: loadingOperadores, error: errorOperadores, data: dataOperadores } = useRealtime(getAllOperadores, 'operadores', 'operadores');

    const { loading: loadingTransportistas, error: errorTransportistas, data: dataTransportistas } = useRealtime(getAllTransportistas, 'transportistas', 'transportistas');

    const { loading: loadingClientes, error: errorClientes, data: dataClientes } = useRealtime(getAllClientes, 'clientes', 'clientes');


    function extractKeysValues(array, keyValue) {
        return array.map((item) => item[keyValue])
    }

    const arrayTypes = ['AGMU', 'AFIU', 'DYOU']

    const arrayEspects = ['NFC', 'FCOJ', 'OR-OIL', 'DLIMONENE', 'TEQUILA', 'NFC/FCOJ']

    const defaultRows = [
        { id: 1, tracto: '1235', operador: '', carga: '', transportista: '', numero_tanque: '00000-0', cliente: '', tipo: '', especificacion: '' },
    ]

    const [rows, setRows] = useState(defaultRows);
    const [rowModesModel, setRowModesModel] = useState({});

    const columns = [
        {
            field: 'tracto',
            headerName: 'N° TRACTO',
            width: 150,
            editable: true,
            type: 'text',
        },
        {
            field: 'operador',
            headerName: 'OPERADOR',
            editable: true,
            width: 200,
            align: 'left',
            headerAlign: 'left',
            type: 'singleSelect',
            valueOptions: extractKeysValues(dataOperadores, 'nombre')
        },
        {
            field: 'carga',
            headerName: 'TIPO DE CARGA',
            type: 'singleSelect',
            width: 150,
            editable: true,
            align: 'left',
            headerAlign: 'left',
            valueOptions: ['tanque', 'pipa']
        },
        {
            field: 'transportista',
            headerName: 'LINEA TRANSPORTISTA',
            type: 'singleSelect',
            width: 200,
            editable: true,
            align: 'left',
            headerAlign: 'left',
            valueOptions: extractKeysValues(dataTransportistas, 'name')

        },
        {
            field: 'numero_tanque',
            headerName: 'N° TANQUE',
            type: 'text',
            width: 150,
            editable: true,
        },
        {
            field: 'cliente',
            headerName: 'CLIENTE',
            type: 'singleSelect',
            width: 200,
            editable: true,
            align: 'left',
            headerAlign: 'left',
            valueOptions: extractKeysValues(dataClientes, 'cliente')
        },
        {
            field: 'tipo',
            headerName: 'TIPO',
            width: 150,
            editable: true,
            align: 'left',
            headerAlign: 'left',
            type: 'singleSelect',
            valueOptions: arrayTypes
        },
        {
            field: 'especificacion',
            headerName: 'ESPECIFICACION',
            type: 'singleSelect',
            width: 150,
            editable: true,
            align: 'left',
            headerAlign: 'left',
            valueOptions: arrayEspects
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    async function SendRegisters(register) {
        try {

            //agrupar los registros con el mismo numero de tracto

            //function asyncrona por grupo
            //crear un registro general
            //crear los registros de cada tanque (array de promesas)
            //retornar mensaje de exito por cada grupo

            //campos requeridos para registro general

            //numero economico || numero de tracto
            //nombre de operador

            //carga : tanque
            //nombre de linea transportista
            //entrada_id
            //numero_tanque
            //cliente
            //tipo 
            //especificacion
            //

        } catch (error) {

        }
    }

    //modal
    const [modal, setModal] = useState(false)

    return (
        <>
            <Stack>

                <Box sx={{ width: '95vw', marginInline: 'auto', paddingTop: '10px' }} >
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px',
                            width: '100%',
                            border: '1px',
                            borderStyle: 'solid',
                            borderColor: '#E4E4E7'
                        }}
                    >

                        <Typography variant='title' fontWeight='500' >
                            Importación de tanques
                        </Typography>

                        <Stack flexDirection='row' alignItems='center' gap='10px' >

                            <Button
                                variant="contained"
                            >
                                operadores
                            </Button>

                            <Button
                                variant="contained"
                            >
                                nueva linea
                            </Button>

                            <Button
                                variant="contained"
                            >
                                nuevo cliente
                            </Button>
                        </Stack>

                    </Paper>
                </Box>

                <Box
                    sx={{
                        height: '82vh',
                        width: '95vw',
                        marginTop: '10px',
                        marginInline: 'auto',
                        '& .actions': {
                            color: 'text.secondary',
                        },
                        '& .textPrimary': {
                            color: 'text.primary',
                        },
                    }}
                >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        slots={{
                            toolbar: EditToolbar,
                        }}
                        slotProps={{
                            toolbar: { setRows, setRowModesModel },
                        }}
                    />
                </Box>
            </Stack >

            <ModalEdit modal={modal} setModal={setModal} transportistas={dataTransportistas}/>
        </>
    )
}

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = uuidv4();
        setRows((oldRows) => [...oldRows, { id, tracto: '00000-0', operador: '', carga: '', transportista: '', numero_tanque: '00000', cliente: '', tipo: '', especificacion: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'tracto' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Añadir registro
            </Button>
        </GridToolbarContainer>
    );
}

function ModalEdit({ modal, setModal, transportistas, operadores, clientes }) {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Modal open={true}>
                <Container sx={{ paddingTop: '5%' }}>
                    <Paper
                        sx={{
                            display: 'flex',
                            padding: '10px',
                            height: '500px',
                        }}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            <Tab label="Transportistas" />
                            <Tab label="Operadores" />
                            <Tab label="Clientes" />
                        </Tabs>

                        <CustomTabPanel value={value} index={0}>
                            <Box sx={{ padding: '10px', display:'flex', flexDirection:'column', gap:'10px' }}>
                                {transportistas.map((transport) => (
                                    <ItemTransportista key={transport.id} transport={transport}/>
                                ))}
                            </Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Box sx={{ padding: '10px' }}>
                                <ItemOperator />
                            </Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <Box sx={{ padding: '10px' }}>
                                <ItemCliente />
                            </Box>
                        </CustomTabPanel>

                    </Paper>
                </Container>
            </Modal>
        </>
    )
}

function ItemOperator({operador}) {

    const [edit, setEdit] = useState(false)

    const nombre = useRef();
    const correo = useRef();
    const contacto = useRef();

    function saveChangues() {
        try {
            const changues = {
                nombre: nombre.current.value,
                correo: correo.current.value,
                contacto: contacto.current.value
            }
            console.log(changues)
        } catch (error) {

        }
    }

    return (
        <>
            <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: '10px', gap: '5px' }} >

                <Stack flexDirection='row' justifyContent='flex-end' >
                    <IconButton
                        size='small'
                        onClick={() => setEdit(!edit)}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        size='small'
                        color={edit ? "primary" : "default"}
                        disabled={!edit}
                        onClick={saveChangues}
                    >
                        <SaveIcon />
                    </IconButton>

                    <IconButton
                        size='small'
                        color='error'
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stack>

                <Stack gap='10px' flexDirection='row'>
                    <TextField disabled={!edit} inputRef={nombre} defaultValue="nombre" placeholder="nombre" />
                    <TextField disabled={!edit} inputRef={correo} defaultValue="correo" placeholder="correo" />
                    <TextField disabled={!edit} inputRef={contacto} defaultValue="contacto" placeholder="contacto" />
                </Stack>
            </Paper>
        </>
    )
}

function ItemTransportista({transport}) {
console.log("🚀 ~ ItemTransportista ~ transport:", transport)

    const [edit, setEdit] = useState(false)

    const transportista = useRef()

    function saveChangues() {
        try {
            const changues = {
                name: transportista.current.value,
            }
            console.log(changues)
        } catch (error) {

        }
    }

    return (
        <>
            <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: '10px', gap: '5px' }} >

                <Stack flexDirection='row' justifyContent='flex-end' >
                    <IconButton
                        size='small'
                        onClick={() => setEdit(!edit)}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        size='small'
                        color={edit ? "primary" : "default"}
                        disabled={!edit}
                        onClick={saveChangues}
                    >
                        <SaveIcon />
                    </IconButton>

                    <IconButton
                        size='small'
                        color='error'
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stack>

                <Stack gap='10px' flexDirection='row'>
                    <TextField disabled={!edit} inputRef={transportista} defaultValue={transport.name} />
                </Stack>
            </Paper>
        </>
    )
}

function ItemCliente() {

    const [edit, setEdit] = useState(false)

    const cliente = useRef()

    function saveChangues() {
        try {
            const changues = {
                name: transportista.current.value,
            }
            console.log(changues)
        } catch (error) {

        }
    }

    return (
        <>
            <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'column', padding: '10px', gap: '5px' }} >

                <Stack flexDirection='row' justifyContent='flex-end' >
                    <IconButton
                        size='small'
                        onClick={() => setEdit(!edit)}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        size='small'
                        color={edit ? "primary" : "default"}
                        disabled={!edit}
                        onClick={saveChangues}
                    >
                        <SaveIcon />
                    </IconButton>

                    <IconButton
                        size='small'
                        color='error'
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stack>

                <Stack gap='10px' flexDirection='row'>
                    <TextField disabled={!edit} inputRef={cliente} defaultValue="cliente" placeholder="cliente" />
                </Stack>
            </Paper>
        </>
    )
}

