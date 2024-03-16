import { useState, useMemo, } from "react";
import { Box, Stack, Paper, Divider, Typography, Button, FormControl, InputLabel, Select, MenuItem, TextField, } from "@mui/material"
//icons
import { SiMicrosoftexcel } from "react-icons/si";
import { TbTableImport } from "react-icons/tb";
//grid
import { DataGrid, useGridApiContext, useGridApiRef } from "@mui/x-data-grid";
//libraries
import * as XLSX from 'xlsx'
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from "react";
//context 
import { useContextImportacion } from "../../Context/ImportacionContext";
//helpers
import { currentDate } from "../../Helpers/date";


export function ImportacionPage() {

    const { dataRows, setDataRos } = useContextImportacion();

    const [dataImport, setDataImport] = useState([]);

    const arrayTypes = [
        {
            id: '1',
            tipo: 'AGMU'
        },
        {
            id: '2',
            tipo: 'AFIU'
        },
        {
            id: '3',
            tipo: 'DYOU'
        },
    ]

    const arrayEspects = [
        {
            id: '1',
            especificacion: 'NFC'
        },
        {
            id: '2',
            especificacion: 'FCOJ'
        },
        {
            id: '3',
            especificacion: 'OR-OIL'
        },
        {
            id: '4',
            especificacion: 'DLIMONENE'
        },
        {
            id: '5',
            especificacion: 'TEQUILA'
        },
        {
            id: '6',
            especificacion: 'NFC/FCOJ'
        },
    ]

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            console.log(jsonData);

            const headers = jsonData[0];
            const objects = jsonData.slice(1).map(row => {
                const obj = {};
                headers.forEach((header, index) => {
                    obj[header] = row[index];
                });
                const id = uuidv4();
                return { ...obj, id: id };
            });
            setDataRos(objects)
        };

        reader.readAsArrayBuffer(file);
    };

    const downloadTemplate = () => {

        const ws = XLSX.utils.json_to_sheet(dataRows);
        const wb = XLSX.utils.book_new();

        const columnWidths = [
            { wpx: 70 }, // Ancho de la primera columna en píxeles
            { wpx: 70 }, // Ancho de la segunda columna en píxeles
            { wpx: 70 }, // Ancho de la tercera columna en píxeles
            { wpx: 70 }, // Ancho de la tercera columna en píxeles
            { wpx: 90 }, // Ancho de la tercera columna en píxeles
            { wpx: 90 }, // Ancho de la tercera columna en píxeles
            { wpx: 90 }, // Ancho de la tercera columna en píxeles
            { wpx: 90 }, // Ancho de la tercera columna en píxeles
            { wpx: 90 }, // Ancho de la tercera columna en píxeles
        ];
        ws['!cols'] = columnWidths;

        XLSX.utils.book_append_sheet(wb, ws, `plantilla`);
        XLSX.writeFile(wb, `plantilla_importacion.xlsx`);

    }

    // const columns = [
    //     {
    //         field: 'chasis',
    //         headerName: 'CHASIS',
    //         width: 150,
    //         editable: true
    //     },
    //     {
    //         field: 'checkIn',
    //         headerName: 'ENTRADA',
    //         type: 'text',
    //         editable: true,
    //         width: 150,
    //         align: 'left',
    //         headerAlign: 'left',
    //     },
    //     {
    //         field: 'checkOut',
    //         headerName: 'SALIDA',
    //         type: 'text',
    //         width: 180,
    //         editable: true,
    //     },
    //     {
    //         field: 'deuda',
    //         headerName: 'DEUDA',
    //         type: 'text',
    //         width: 150,
    //         editable: true,
    //     },
    //     {
    //         field: 'estancia',
    //         headerName: 'ESTANCIA',
    //         type: 'text',
    //         width: 150,
    //         editable: true,
    //     },
    // ];

    const renderSelectEditInputCell = (params, options, keyValue) => {
        return <SelectEditInputCell props={params} options={options} keyValue={keyValue} />;
    };

    const columns = [
        {
            field: 'tracto',
            headerName: 'N° TRACTO',
            width: 150,
            editable: true,
            type: 'text',
            renderEditCell: (params) => (InputEditCell(params))

        },
        {
            field: 'operador_id',
            headerName: 'OPERADOR',
            type: 'text',
            editable: true,
            width: 200,
            align: 'left',
            headerAlign: 'left',
            renderEditCell: (params) => (renderSelectEditInputCell(params, [{ id: '1', nombre: 'operador 1' }, { id: '2', nombre: 'operador 2' }], 'nombre'))
        },
        {
            field: 'carga',
            headerName: 'TIPO DE CARGA',
            type: 'text',
            width: 150,
            editable: true,
            align: 'left',
            headerAlign: 'left',
            renderEditCell: (params) => (renderSelectEditInputCell(params, [{ id: '1', carga: 'tanque' }, { id: '2', carga: 'pipa' }], 'carga'))

        },
        {
            field: 'transportista_id',
            headerName: 'LINEA TRANSPORTISTA',
            type: 'text',
            width: 200,
            editable: true,
            align: 'left',
            headerAlign: 'left',
            renderEditCell: (params) => (renderSelectEditInputCell(params, [{ id: '1', transportista_id: 'transportista 1' }, { id: '2', transportista_id: 'transportista 2' }], 'transportista_id'))

        },
        {
            field: 'numero_tanque',
            headerName: 'N° TANQUE',
            type: 'text',
            width: 150,
            editable: true,
            renderEditCell: (params) => (InputEditCell(params))

        },
        {
            field: 'cliente_id',
            headerName: 'CLIENTE',
            type: 'text',
            width: 200,
            editable: true,
            align: 'left',
            headerAlign: 'left',
            renderEditCell: (params) => (renderSelectEditInputCell(params, [{ id: '1', cliente_id: 'cliente 1' }, { id: '2', cliente_id: 'cliente 2' }], 'cliente_id'))
        },
        {
            field: 'tipo',
            headerName: 'TIPO',
            type: 'text',
            width: 150,
            editable: true,
            align: 'left',
            headerAlign: 'left',
            renderEditCell: (params) => (renderSelectEditInputCell(params, arrayTypes, 'tipo'))
        },
        {
            field: 'especificacion',
            headerName: 'ESPECIFICACION',
            type: 'text',
            width: 150,
            editable: true,
            align: 'left',
            headerAlign: 'left',
            renderEditCell: (params) => (renderSelectEditInputCell(params, arrayEspects, 'especificacion'))

        },
    ];

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

    const handleCellEditCommit = useCallback(({ id, field, value }) => {
        setDataObject((prevDataObject) =>
            dataRows.map((row) =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    }, []);

    return (
        <>
            <Stack>

                <Box sx={{ width: '80vw', marginInline: 'auto', paddingTop: '10px' }} >
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
                            Importa tanques con un archivo de excel
                        </Typography>


                        <Stack flexDirection='row' alignItems='center' gap='10px' >

                            <input
                                type="file"
                                accept=".xlsx, .xls"
                                id={`import-xls`}
                                style={{ display: 'none' }}
                                onChange={handleFileUpload} />


                            <label htmlFor="import-xls">
                                <Button
                                    sx={{
                                        bgcolor: '#207245', color: 'white', paddingInline: '20px',
                                        '&:hover': {
                                            bgcolor: '#207245'
                                        }
                                    }}
                                    component="span"
                                    size="medium"
                                    endIcon={<TbTableImport />}
                                >
                                    importar tanques
                                </Button>

                            </label>


                            <Button
                                sx={{
                                    paddingInline: '20px',
                                }}
                                variant='outlined'
                                size="medium"
                                onClick={downloadTemplate}
                                endIcon={<SiMicrosoftexcel />}
                            >
                                Descargar plantilla
                            </Button>

                        </Stack>

                    </Paper>
                </Box>

                <Box sx={{ width: '80vw', marginInline: 'auto', paddingTop: '10px', height: '82vh' }} >
                    <Paper
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px',
                            height: '100%',
                            width: '100%',
                            border: '1px solid #E4E4E7',
                        }}
                    >

                        <DataGrid
                            editMode="row"
                            rows={dataRows}
                            columns={columns}
                        // onRowEditCommit={handleCellEditCommit}
                        // onCellEditStart={(params) => console.log(params)}
                        />

                    </Paper>
                </Box>

            </Stack >
        </>
    )
}


function SelectEditInputCell({ props, options, keyValue, keyId }) {

    const { id, value, field, tabIndex } = props;
    const apiRef = useGridApiContext();
    const { dataRows, setDataRows } = useContextImportacion();

    const handleChange = async (event) => {
        await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
        apiRef.current.stopCellEditMode({ id, field });
        const updates = apiRef.current.getRowWithUpdatedValues(id)
        let copyRows = [...dataRows]
        copyRows[tabIndex][field] = updates[field]
        setDataRows(copyRows)
    };

    const valueString = () => {
        const updates = apiRef.current.getRowWithUpdatedValues(id);
        const idOption = updates[field]
        const indexOption = options.findIndex((option) => option['id'] === idOption)
        return options[indexOption][keyValue]
    }

    const newValue = valueString()
    console.log("🚀 ~ SelectEditInputCell ~ newValue:", newValue)

    return (
        <Select
            fullWidth
            value={newValue}
            onChange={handleChange}
            size="small"
            sx={{ height: 1 }}
            native
            autoFocus
        >
            {options.map((op, index) => (
                <option key={op.id} value={op.id}>{op[keyValue]}</option>
            ))}
        </Select>
    );
}

function InputEditCell(props) {

    const { id, value, field, tabIndex } = props;
    const apiRef = useGridApiContext();
    const { dataRows, setDataRows } = useContextImportacion();

    const handleChange = async (event) => {
        await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
        apiRef.current.stopCellEditMode({ id, field });
        const updates = apiRef.current.getRowWithUpdatedValues(id)
        let copyRows = [...dataRows]
        copyRows[tabIndex][field] = updates[field]
        setDataRows(copyRows)
    };

    return (
        <TextField
            value={value}
            onChange={handleChange}
        />
    );
}


