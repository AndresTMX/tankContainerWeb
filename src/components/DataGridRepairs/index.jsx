import { useState } from 'react';
import { Box, Button, } from '@mui/material';
//icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
//dataGrid
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';

function DataGridRepairs({rows, rowModesModel, setRowModesModel, setRows , typeRepair}) {
    
    const columns = [
        { 
            field: 'cantidad', 
            headerName: 'cantidad', 
            type: 'number', 
            width: 80, 
            editable: true, 
        },
        {
            field: 'concepto',
            headerName: 'concepto',
            type: 'text',
            width: 120,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'descripcion',
            headerName: 'descripción',
            type: 'text',
            width: 250,
            editable: true,
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
                toolbar: EditToolbar,
            }}
            slotProps={{
                toolbar: { setRows, setRowModesModel, rows, typeRepair },
            }}
        />
    );
}

export { DataGridRepairs }

export function EditToolbar(props) {
    const { setRows, setRowModesModel, rows, typeRepair } = props;

    const handleClick = () => {
        const id = rows.length + 1;
        setRows((oldRows) => [...oldRows, { id, cantidad: '', concepto: '', descripcion: '', precio_unit: '', importe: '', isNew: true }]);
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
                nuevo concepto
            </Button>
        </GridToolbarContainer>
    );
}