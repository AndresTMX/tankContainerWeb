import { useState, useMemo, } from "react";
import { Box, Stack, Paper, Divider, Typography, Button } from "@mui/material"
//icons
import { SiMicrosoftexcel } from "react-icons/si";
import { TbTableImport } from "react-icons/tb";
//grid
import { DataGrid } from "@mui/x-data-grid";
//libraries
import * as XLSX from 'xlsx'
import { v4 as uuidv4 } from 'uuid';


export function ImportacionPage() {

    const [dataImport, setDataImport] = useState([]);
    const [dataObject, setDataObject] = useState([])
    console.log("🚀 ~ ImportacionPage ~ dataObject:", dataObject)

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
            setDataObject(objects)
        };

        reader.readAsArrayBuffer(file);
    };

    const columns = [
        { field: 'chasis', headerName: 'CHASIS', width: 150, editable: true },
        {
            field: 'checkIn',
            headerName: 'ENTRADA',
            type: 'text',
            editable: true,
            width: 150,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'checkOut',
            headerName: 'SALIDA',
            type: 'text',
            width: 180,
            editable: true,
        },
        {
            field: 'deuda',
            headerName: 'DEUDA',
            type: 'text',
            width: 150,
            editable: true,
        },
        {
            field: 'estancia',
            headerName: 'ESTANCIA',
            type: 'text',
            width: 150,
            editable: true,
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

                        <DataGrid rows={dataObject} columns={columns} />

                    </Paper>
                </Box>

            </Stack >
        </>
    )
}