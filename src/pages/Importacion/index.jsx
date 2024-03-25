import { useState, useRef } from "react";
import { Box, Stack, Paper, Typography, Button, TextField, Modal, Container, Tabs, Tab, IconButton, } from "@mui/material"
import { CustomTabPanel } from "../../components/CustomTabPanel";
//icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { SiMicrosoftexcel } from "react-icons/si";
import { TbTableImport } from "react-icons/tb";
import { MdFileUpload } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
//grid
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from "@mui/x-data-grid";
//libraries
import { v4 as uuidv4 } from 'uuid';
import { toast, Toaster } from "sonner";
import * as XLSX from 'xlsx'
//services
import { createMultipleRegisters } from "../../services/puerto";

export function ImportacionPage() {

    const defaultRows = [
        { id: 1, numero_tanque: '00000-0', tipo: '', especificacion: '' },
    ]

    const espectOptions = ['NFC', 'FCOJ', 'OR-OIL', 'DLIMONENE', 'TEQUILA', 'NFC/FCOJ']


    const [rows, setRows] = useState(defaultRows);
    const [rowModesModel, setRowModesModel] = useState({});

    const columns = [
        {
            field: 'numero_tanque',
            headerName: 'N° TANQUE',
            type: 'text',
            width: 150,
            editable: true,
        },
        {
            field: 'tipo',
            headerName: 'TIPO',
            width: 150,
            editable: true,
            align: 'left',
            headerAlign: 'left',
            type: 'singleSelect',
            valueOptions: ['AGMU', 'DYOU', 'AFIU',],
        },
        {
            field: 'especificacion',
            headerName: 'ESPECIFICACIÓN',
            width: 150,
            editable: true,
            align: 'left',
            headerAlign: 'left',
            type: 'singleSelect',
            valueOptions: espectOptions
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 150,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<FileCopyIcon />}
                            label="Duplicate"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleDuplicateCick(id)}
                        />,
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
                        icon={<FileCopyIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleDuplicateCick(id)}
                        color="inherit"
                    />,
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

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            // console.log(jsonData);

            const headers = jsonData[0];
            const objects = jsonData.slice(1).map(row => {
                const obj = {};
                headers.forEach((header, index) => {
                    obj[header] = row[index];
                });
                const id = uuidv4();
                return { ...obj, id: id };
            });
            console.log(objects)
            setRows(objects)
        };

        reader.readAsArrayBuffer(file);
    };

    const downloadTemplate = () => {

        const rowsTransform = rows.map((row, index) => ({
            id: index,
            numero_tanque: row.numero_tanque,
            especificacion: row.especificacion,
            tipo: row.tipo,
        }))

        const ws = XLSX.utils.json_to_sheet(rowsTransform);
        const wb = XLSX.utils.book_new();

        const columnWidths = [
            { wpx: 50 }, // Ancho de la primera columna en píxeles
            { wpx: 100 }, // Ancho de la segunda columna en píxeles
            { wpx: 100 }, // Ancho de la segunda columna en píxeles
            { wpx: 100 }, // Ancho de la segunda columna en píxeles

        ];
        ws['!cols'] = columnWidths;

        XLSX.utils.book_append_sheet(wb, ws, `plantilla`);
        XLSX.writeFile(wb, `plantilla_importacion.xlsx`);

    }

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

    const handleDuplicateCick = (id) => () => {
        const newId = uuidv4();
        const currentRow = rows.find((row) => row.id === id)

        setRows((oldRows) => [...oldRows, { ...currentRow, id: newId, }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'tracto' },
        }));
    }

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

    function hasDuplicateValuesForKey(array, key) {
        // Creamos un objeto para almacenar los valores únicos de la clave
        const uniqueValues = {};

        // Iteramos sobre el array de objetos
        for (const obj of array) {
            // Obtenemos el valor de la clave para el objeto actual
            const value = obj[key];

            // Si ya existe el valor en el objeto uniqueValues, significa que es un valor duplicado
            if (uniqueValues[value]) {
                return value; // Se encontró un valor duplicado
            } else {
                uniqueValues[value] = true; // Almacenamos el valor en el objeto uniqueValues
            }
        }

        // Si no se encontraron valores duplicados, retornamos false
        return false;
    }

    async function SendRegisters() {
        try {

            const tanquesSinTipo = rows.filter((t) => t.tipo === '' || t.especificacion === '');
            const repeat = hasDuplicateValuesForKey(rows, 'numero_tanque');

            if (tanquesSinTipo.length > 0) {
                throw new Error(`Error, ${tanquesSinTipo.length} items sin tipo o especificación`)
            }

            if (repeat) {
                throw new Error(`Error, items repetido ${repeat}`)
            }

            const rowsTransform = rows.map((row) => ({
                numero_tanque: row.numero_tanque,
                especificacion: row.especificacion,
                tipo: row.tipo,
            }))

            const { error } = await createMultipleRegisters(rowsTransform)

            if (error) {
                throw new Error(`Error, al importar tanques ${error}`)
            } else {
                toast.success(`Tanques importados correctamente`)
                setRows(defaultRows)
            }

        } catch (error) {
            toast.error(error?.message)
        }
    }


    return (
        <>
            <Stack>

                <Toaster richColors position='top-center' />

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
                                color='error'
                                variant="contained"
                                endIcon={<FaTrash />}
                                onClick={() => setRows(defaultRows)}
                            >
                                limpiar tabla
                            </Button>

                            <Button
                                color='success'
                                variant="contained"
                                endIcon={<SiMicrosoftexcel />}
                                onClick={downloadTemplate}
                            >
                                descargar plantilla
                            </Button>

                            <input
                                type="file"
                                accept=".xlsx, .xls"
                                id={`import-xls`}
                                style={{ display: 'none' }}
                                onChange={handleFileUpload} />


                            <label htmlFor="import-xls">
                                <Button
                                    color="success"
                                    variant="contained"
                                    component="span"
                                    size="medium"
                                    endIcon={<TbTableImport />}
                                >
                                    importar xls
                                </Button>

                            </label>

                            <Button
                                onClick={SendRegisters}
                                variant="contained"
                                endIcon={<MdFileUpload />}
                            >
                                subir tanques
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
                    />
                </Box>
            </Stack >

        </>
    )
}

function ModalEdit({ modal, setModal, transportistas, operadores, clientes }) {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function addNewTransportista() {
        try {
            const { error } = await createTransportista('Nueva linea transportista')

            if (error) {
                toast.error(error?.message)
            } else {
                toast.success('Transportista agregado')
            }

        } catch (error) {
            console.error(error)
        }
    }

    async function addNewCliente() {
        try {
            const { error } = await createNewCliente({ cliente: 'nuevo cliente' })

            if (error) {
                toast.error(error?.message)
            } else {
                toast.success('Nuevo cliente agregado')
            }

        } catch (error) {
            console.error(error)
        }
    }

    async function addNewOperador() {
        try {
            const { error } = await createOperador({ nombre: 'nuevo operador' })

            if (error) {
                toast.error(error?.message)
            } else {
                toast.success('Nuevo operador agregado')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Modal open={modal} onClose={() => setModal(false)} >
                <Container sx={{ paddingTop: '5%', }}>
                    <Paper
                        sx={{
                            display: 'flex',
                            padding: '10px',
                            height: '80vh',
                            zIndex: 10
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
                            <Box sx={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px', }}>
                                <Stack flexDirection='row' justifyContent='flex-end'>
                                    <IconButton
                                        color="primary"
                                        onClick={async () => await addNewTransportista()}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Stack>
                                <Stack gap='10px' padding='10px' maxHeight='70vh' overflow='auto'>
                                    {transportistas.map((transport) => (
                                        <ItemTransportista key={transport.id} transport={transport} />
                                    ))}
                                </Stack>
                            </Box>
                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={1}>
                            <Box sx={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px', }}>
                                <Stack flexDirection='row' justifyContent='flex-end'>
                                    <IconButton
                                        color="primary"
                                        onClick={async () => await addNewOperador()}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Stack>
                                <Stack gap='10px' padding='10px' maxHeight='70vh' overflow='auto'>
                                    {operadores.map((op) => (
                                        <ItemOperator key={op.id} operador={op} />
                                    ))}
                                </Stack>
                            </Box>
                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={2}>
                            <Box sx={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px', }}>
                                <Stack flexDirection='row' justifyContent='flex-end'>
                                    <IconButton
                                        color="primary"
                                        onClick={async () => await addNewCliente()}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Stack>
                                <Stack gap='10px' padding='10px' maxHeight='70vh' overflow='auto'>
                                    {clientes.map((client) => (
                                        <ItemCliente key={client.id} cliente={client} />
                                    ))}
                                </Stack>
                            </Box>
                        </CustomTabPanel>

                    </Paper>
                </Container>
            </Modal>
        </>
    )
}

function ItemOperator({ operador }) {

    const [edit, setEdit] = useState(false)

    const nombre = useRef();
    const contacto = useRef();

    async function saveChangues() {
        try {
            const changues = {
                nombre: nombre.current.value,
                contacto: contacto.current.value
            }

            const { error } = await updateOperador(operador.id, changues);

            if (error) {
                toast.error(error?.message)
            } else {
                toast.success('Operador actualizado')
                setEdit(!edit)
            }

        } catch (error) {
            console.error(error)
        }
    }

    async function deleteOperadorForId() {
        toast.custom((t) => (
            <Paper elevation={3} sx={{ padding: '10px' }}>
                <p>¿Seguro que deseas elimnar este operador?</p>
                <Stack flexDirection='row' gap='20px' alignItems='center' >

                    <Button
                        variant="contained"
                        size='small'
                        onClick={() => toast.dismiss(t)}
                    >
                        cancelar
                    </Button>

                    <Button
                        onClick={async () => {
                            await deleteOperador(operador.id)
                            toast.dismiss(t)
                        }
                        }
                        variant="contained"
                        size="small"
                        color="error">
                        eliminar
                    </Button>

                </Stack>
            </Paper>
        ))
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
                        onClick={deleteOperadorForId}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stack>

                <Stack gap='10px' flexDirection='row'>
                    <TextField fullWidth disabled={!edit} inputRef={nombre} defaultValue={operador.nombre} />
                    <TextField sx={{ width: '200px' }} disabled={!edit} inputRef={contacto} defaultValue={operador.contacto} />
                </Stack>
            </Paper>
        </>
    )
}

function ItemTransportista({ transport }) {

    const [edit, setEdit] = useState(false)

    const transportista = useRef()

    async function saveChangues() {
        try {
            const { error } = await updateTransportista(transport.id, transportista.current.value)

            if (error) {
                toast.error(error?.message)
            } else {
                toast.success('Transportista actualizado')
                setEdit(!edit)
            }

        } catch (error) {
            console.error(error)
        }
    }

    async function deleteTransport() {
        toast.custom((t) => (
            <Paper elevation={3} sx={{ padding: '10px' }}>
                <p>¿Seguro que deseas elimnar esta linea transportista?</p>
                <Stack flexDirection='row' gap='20px' alignItems='center' >

                    <Button
                        variant="contained"
                        size='small'
                        onClick={() => toast.dismiss(t)}
                    >
                        cancelar
                    </Button>

                    <Button
                        onClick={async () => {
                            await deleteTransportista(transport.id)
                            toast.dismiss(t)
                        }
                        }
                        variant="contained"
                        size="small"
                        color="error">
                        eliminar
                    </Button>

                </Stack>
            </Paper>
        ))
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
                        onClick={deleteTransport}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stack>

                <Stack gap='10px' flexDirection='row'>
                    <TextField fullWidth disabled={!edit} inputRef={transportista} defaultValue={transport.name} />
                </Stack>
            </Paper>
        </>
    )
}

function ItemCliente({ cliente }) {

    const [edit, setEdit] = useState(false)

    const clienteRef = useRef()

    async function saveChangues() {
        try {

            const { error } = await updateCliente(cliente.id, { cliente: clienteRef.current.value })

            if (error) {
                toast.error(`Error al actualizar cliente, error: ${error.message}`)
            } else {
                toast.success(`Cliente actualizado`)
                setEdit(!edit)
            }

        } catch (error) {
            console.error(error)
        }
    }

    async function deleteClientForID() {
        toast.custom((t) => (
            <Paper elevation={3} sx={{ padding: '10px' }}>
                <p>¿Seguro que deseas elimnar este cliente?</p>
                <Stack flexDirection='row' gap='20px' alignItems='center' >

                    <Button
                        variant="contained"
                        size='small'
                        onClick={() => toast.dismiss(t)}
                    >
                        cancelar
                    </Button>

                    <Button
                        onClick={async () => {
                            await deleteCliente(cliente.id)
                            toast.dismiss(t)
                        }
                        }
                        variant="contained"
                        size="small"
                        color="error">
                        eliminar
                    </Button>

                </Stack>
            </Paper>
        ))
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
                        onClick={deleteClientForID}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stack>

                <Stack gap='10px' flexDirection='row'>
                    <TextField fullWidth disabled={!edit} inputRef={clienteRef} defaultValue={cliente.cliente} />
                </Stack>
            </Paper>
        </>
    )
}

