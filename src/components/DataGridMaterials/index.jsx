import { Button, } from '@mui/material';
//icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
//hook de materiales
import { useMaterials } from '../../Hooks/Maniobras/useMaterials';
//dataGrid
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';

function DataGridMaterials({rows, rowModesModel, setRowModesModel, setRows, typeRepair}) {

    const { materiales } = useMaterials()
    
    const arrayMaterials =  materiales.map((element) => element.material)
    
    const columns = [
        { 
            field: 'cantidad', 
            headerName: 'cantidad', 
            type: 'number', 
            width: 100, 
            editable: true, 
        },
        {
            field: 'material',
            headerName: 'material',
            type: 'singleSelect',
            width: 250,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            valueOptions: arrayMaterials,
        },
        {
            field: 'precio_unit',
            headerName: 'precio unitario',
            width: 150,
            editable: true,
            type: 'number',
        },
        {
            field: 'importe',
            headerName: 'importe',
            width: 100,
            editable: true,
            type: 'number',
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'admin',
            width: 200,
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
                        disabled={typeRepair != 'completado'? false: true}
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        disabled={typeRepair != 'completado'? false: true}
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
        // const saveRow = rows.find((item) => item.id === id)
        // const indexMaterial = rows.findIndex((item) => item.material === saveRow.material)
        // const newRowWhitPrice = {...saveRow, cantidad: saveRow.cantidad + 1, importe: materiales[indexMaterial].precio_unitario, precio_unit:  materiales[indexMaterial].precio_unitario }
        // setRows(...rows, newRowWhitPrice)
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


    return (

        <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
                toolbar: EditMaterials,
            }}
            slotProps={{
                toolbar: { setRows, setRowModesModel, rows, typeRepair },
            }}
        />
    );
}

export { DataGridMaterials }

export function EditMaterials(props) {
    const { setRows, setRowModesModel, rows, typeRepair } = props;

    const handleClick = () => {
        const id = rows.length + 1;
        setRows((oldRows) => [...oldRows, { id, cantidad: '', material: '', precio_unit: '', importe: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'cantidad' },
        }));
    };

    return (
        <GridToolbarContainer sx={{padding:'15px 15px 0px'}}>
            <Button
                disabled={typeRepair != 'completado'? false: true}
                color="primary"
                size="small"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleClick}>
                nuevo material
            </Button>
        </GridToolbarContainer>
    );
}