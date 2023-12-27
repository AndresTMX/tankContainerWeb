import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ContainerScroll } from "../ContainerScroll";
import { Container, Box, Paper, Stack, Button, Typography, TextField, Modal, Chip } from "@mui/material";
//hooks
import { useMaterials } from "../../Hooks/Maniobras/useMaterials";

function Materiales() {

    const { materiales, rowMaterials, loading, error, updater, addMaterial, deleteMaterial, updateMaterial } = useMaterials();

    const columns = [
        { field: 'col1', headerName: 'Material', width: 300 },
        { field: 'col2', headerName: 'Stock', renderCell: (params) => (<CustomChip status={params.value} />), width: 120 },
        { field: 'col3', headerName: 'Precio unitario', width: 200 },
    ];

    const [materials, setSelectMaterial] = useState([]);
    const [materialsEditables, setMaterialsEditables] = useState([])
    const [material, setMaterial] = useState({ material: '', stock: '', precio_unitario: '', });
    //modals
    const [modalAdd, setModalAdd] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);

    const resetMaterials = () => {
        setMaterial({ material: '', stock: '', precio_unitario: '', });
    }

    const editMaterial = ( type, index, e) => {

        const copyState = [...materialsEditables]
        
        const editRoute = {
            stock: () => copyState[index].stock = e.target.value,
            pu: () => copyState[index].precio_unitario = e.target.value
        }

        if(editRoute[type]){
            editRoute[type]()
        }

        setMaterialsEditables(copyState)
    }

    const toggleEdit = () => {
        setModalUpdate(!modalUpdate)
    }

    const toggleDelete = () => {
        setModalDelete(!modalDelete)
    }

    const toggleAdd = () => {
        setModalAdd(!modalAdd)
        resetMaterials()
    }

    const addSubmit = () => {
        addMaterial(material)
        resetMaterials()
        toggleAdd()
    }

    const editSubmit = () => {
        updateMaterial(materialsEditables)
        toggleEdit()
    }

    const deleteSubmit = () => {
        deleteMaterial(materials)
        setModalDelete(!modalDelete)
    }

    const selectElementsMaterials = materiales.filter((item) => materials.includes(item.id));

    useEffect(() => {
        setMaterialsEditables(selectElementsMaterials);
    }, [materials])

    return (
        <>
            <Container>
                <Box>

                    <Paper>
                        <ContainerScroll background={'white'} height={'75vh'}>

                            <DataGrid
                                rows={rowMaterials}
                                columns={columns}
                                checkboxSelection
                                disableSelectionOnClick
                                onRowSelectionModelChange={(rowModesModel) => setSelectMaterial(rowModesModel)}
                                slots={{
                                    toolbar: HeaderTable
                                }}
                                slotProps={{
                                    toolbar: { toggleAdd, toggleEdit, toggleDelete }
                                }}
                            />
                        </ContainerScroll>
                    </Paper>
                </Box>

            </Container>

            <Modal open={modalAdd}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10%' }}>
                    <Paper sx={{ padding: '20px', width: '400px', maxWidth: '90vw' }}>
                        <Box>
                            <form onSubmit={addSubmit}>
                                <Stack gap='10px' alignItems={'center'}>

                                    <Typography
                                        variant="subtitle2"
                                        width={'100%'}
                                    >
                                        Agrega un nuevo material
                                    </Typography>

                                    <TextField
                                        fullWidth
                                        label={'Nuevo material'}
                                        value={material.material}
                                        required={true}
                                        onChange={(e) => setMaterial({ ...material, material: e.target.value })}
                                    />

                                    <TextField
                                        fullWidth
                                        label={'20'}
                                        helperText={'Stock en unidades'}
                                        type='number'
                                        value={material.stock}
                                        required={true}
                                        onChange={(e) => setMaterial({ ...material, stock: e.target.value })}
                                    />

                                    <TextField
                                        fullWidth
                                        label={'100'}
                                        helperText={'Precio por unidad'}
                                        type="number"
                                        value={material.precio_unitario}
                                        required={true}
                                        onChange={(e) => setMaterial({ ...material, precio_unitario: e.target.value })}
                                    />

                                    <Button
                                        onClick={toggleAdd}
                                        fullWidth
                                        variant="contained"
                                        color="error"
                                    >
                                        cancelar
                                    </Button>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                    >
                                        Agregar
                                    </Button>

                                </Stack>
                            </form>
                        </Box>
                    </Paper>
                </Container>
            </Modal>

            <Modal open={modalUpdate}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10%' }}>
                    <Paper sx={{ padding: '20px', width: '400px', maxWidth: '90vw' }}>
                        <Box>
                            <form onSubmit={editSubmit}>
                                <Stack gap='10px' alignItems={'center'}>

                                    <Typography
                                        variant="subtitle2"
                                        width={'100%'}
                                    >
                                        Actualizar {selectElementsMaterials.length} materiales
                                    </Typography>

                                    <ContainerScroll height={'200px'} background={'white'}>
                                        <Stack gap={'5px'}>
                                            {materialsEditables.map((item, index) => (
                                                <ItemEditMaterial
                                                    key={item.id}
                                                    index={index}
                                                    stock={item.stock}
                                                    material={item.material}
                                                    pu={item.precio_unitario}
                                                    editMaterial={editMaterial}
                                                />
                                            ))}
                                        </Stack>
                                    </ContainerScroll>

                                    <Button
                                        onClick={toggleEdit}
                                        fullWidth
                                        variant="contained"
                                        color="error"
                                    >
                                        cancelar
                                    </Button>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                    >
                                        actualizar
                                    </Button>

                                </Stack>
                            </form>
                        </Box>
                    </Paper>
                </Container>
            </Modal>

            <Modal open={modalDelete}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10%' }}>
                    <Paper sx={{ padding: '20px', width: '350px', maxWidth: '90vw' }}>
                        <Box>
                            <form onSubmit={deleteSubmit}>
                                <Stack gap='10px' alignItems={'center'}>

                                    <Typography
                                        textAlign={'center'}
                                        variant="subtitle2"
                                        width={'100%'}
                                    >
                                        ¿Seguro que quieres eliminar {selectElementsMaterials.length} materiales del inventario?
                                    </Typography>

                                    <Stack flexDirection={'row'} gap={'10px'} flexWrap={'wrap'}>
                                        {selectElementsMaterials.map((item) => (
                                            <Chip color="warning" key={item.id} label={item.material} />
                                        ))}
                                    </Stack>

                                    <Button
                                        onClick={toggleDelete}
                                        fullWidth
                                        variant="outlined"
                                        color="error"
                                    >
                                        cancelar
                                    </Button>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="error"
                                    >
                                        eliminar
                                    </Button>

                                </Stack>
                            </form>
                        </Box>
                    </Paper>
                </Container>
            </Modal>


        </>
    );
}

export { Materiales };

function CustomChip({ status }) {

    return (
        <Chip size="small" label={status} color={'info'} />
    );
}

function HeaderTable({ toggleAdd, toggleEdit, toggleDelete }) {

    return (
        <Box>
            <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} padding={'15px'}>

                <Typography variant='button'>
                    Materiales en stock
                </Typography>

                <Stack flexDirection={'row'} gap={'10px'}>

                    <Button
                        onClick={toggleAdd}
                        endIcon={<AddIcon />}
                        size="small"
                        variant="contained"
                        color="info"
                    >Nuevo material </Button>

                    <Button
                        onClick={toggleEdit}
                        size="small"
                        variant="contained"
                        color="info"
                    >Actualizar </Button>

                    <Button
                        onClick={toggleDelete}
                        endIcon={<DeleteIcon />}
                        size="small"
                        variant="contained"
                        color="error"
                    >eliminar </Button>

                </Stack>

            </Stack>
        </Box>
    );
}

function ItemEditMaterial({ material, stock, pu, index, editMaterial }) {
    return (
        <Stack bgcolor={'whitesmoke'} alignItems={'start'} padding={'15px'} gap={'10px'} borderRadius={'4px'}>

            <Stack flexDirection={'flex-start'} >
                <Chip size="small" label={material} color="info" />
            </Stack>

            <Stack flexDirection={'row'} gap={'10px'}>
                <TextField
                    type="number"
                    helperText={'stock'}
                    size="small"
                    defaultValue={stock}
                    value={stock}
                    onChange={(e) => editMaterial('stock', index, e)}
                />
                <TextField
                    type="number"
                    helperText={'precio unitario'}
                    size="small"
                    value={pu}
                    onChange={(e) => editMaterial('pu', index, e)}
                />
            </Stack>
        </Stack>
    )
}
