import { useEffect, useState, useMemo, useRef } from "react"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { Container, Box, Stack, Paper, Accordion, AccordionSummary, AccordionDetails, Pagination, Alert } from "@mui/material"
import { Menu, MenuItem, IconButton, Typography, Chip, Checkbox, TextField, Button, InputLabel, Select, FormControl, } from "@mui/material"
//hooks
import { useRealtime } from "../../Hooks/FetchData"
import useMediaQuery from "@mui/material/useMediaQuery"
//icons
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { TbFilters } from "react-icons/tb";
//services
import { getAllRegistersForStatus, updateRegister } from "../../services/puerto";
import { getAllTransportistas } from "../../services/transportistas"
import { getAllOperadores } from "../../services/operadores"
import { createManiobra } from "../../services/maniobras"
import { getAllClientes } from "../../services/clientes"
//helpers
import { dateInText } from "../../Helpers/date";
//context
import { useTransportistasContext } from "../../Context/TransportistaContext";
//libreries
import { Toaster, toast } from "sonner"

export function Transportista() {

    const { context } = useTransportistasContext();
    const { selectTanks, toggleGroup, setSelectTanks } = context || {};

    const [filter, setFilter] = useState('puerto');
    const [menu, setMenu] = useState(false);

    const [group, setGroup] = useState('created_at');
    const [groupMenu, setGroupMenu] = useState(false);

    const operadorRef = useRef();
    const placasRef = useRef();
    const transportistaRef = useRef();
    const clienteRef = useRef();


    async function newRegister() {
        try {

            let operador_id = operadorRef.current.value;
            let numero_economico = placasRef.current.value;
            let transportista_id = transportistaRef.current.value;
            let cliente_id = clienteRef.current.value;
            let tanquesAgregados = selectTanks.length;

            if (numero_economico === '' || operador_id === '' || transportista_id === '' || cliente_id === '') {
                throw new Error('Complete los campos para continuar')
            }

            if (tanquesAgregados > 4) {
                throw new Error(`Máximo 4 tanques por tracto`)
            }

            if (tanquesAgregados < 1) {
                throw new Error(`Agrega tanques al tracto`)
            }

            const registros = selectTanks.map((t) => ({
                id: t.id,
                numero_tanque: t.numero_tanque,
                especificacion: t.especificacion,
                tipo: t.tipo,
                cliente_id: cliente_id,
                transportista_id: transportista_id
            }))

            const { errorCreateRegister } = await createManiobra(operador_id, numero_economico, registros);

            if (errorCreateRegister) {
                throw new Error(errorCreateRegister?.message && errorCreateDetails?.message)
            } else {
                toast.success('nueva maniobra creada con exito')
                setSelectTanks([])

            }

        } catch (error) {
            toast.error(error?.message)
        }
    }

    const handleFilter = (newFilter) => {
        setMenu(false)
        setFilter(newFilter)
    }

    const handleGroup = (newGroup) => {
        setGroupMenu(false)
        setGroup(newGroup);
    }

    async function getDataFilter() {
        try {
            const { error, data } = await getAllRegistersForStatus(filter);
            return { error, data }
        } catch (error) {
            console.error(error)
        }
    }

    function groupObjectsByValueKey(array, key) {
        return array.reduce((result, currentItem) => {
            const value = currentItem[key];
            if (!result[value]) {
                result[value] = [];
            }
            result[value].push(currentItem);
            return result;
        }, {});
    }

    const [dataGroup, setDataGroup] = useState({})
    const { loading, error, data: tanques } = useRealtime(getDataFilter, 'puerto', 'puerto', [filter]);
    const { loading: loadingOperadores, error: errorOperadores, data: operadores } = useRealtime(getAllOperadores, 'operadores', 'operadores')
    const { loading: loadingClientes, error: errorClientes, data: clientes } = useRealtime(getAllClientes, 'clientes', 'clientes');
    const { loading: loadingTransportistas, error: errorTransportistas, data: transportistas } = useRealtime(getAllTransportistas, 'transportistas', 'transportistas');

    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const rowsPerPage = 10;

    const pages = Math.ceil(tanques.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return tanques.slice(start, end);
    }, [page, dataGroup, tanques]);

    useEffect(() => {
        const newData = groupObjectsByValueKey(items, group);
        setDataGroup(newData)
    }, [page, group, tanques])

    return (
        <>

            <Toaster richColors position='top-center' />

            <Container
                maxWidth='xlg'
                sx={{
                    padding: '20px',
                    bgcolor: 'whitesmoke',
                    height: `calc(100vh - 65px)`
                }}>

                <Grid2 sx={{ height: '100%' }} container spacing={2}>

                    <Grid2 sx={{ height: '100%' }} xs={8}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', justifyContent: 'space-between' }}>

                            <Paper
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    padding: '10px',
                                    gap: '10px',

                                }}
                            >
                                <div>
                                    <IconButton
                                        id="basic-button"
                                        aria-controls={menu ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={menu ? 'true' : undefined}
                                        onClick={(e) => setMenu(e.currentTarget)}
                                    >
                                        <FilterAltIcon />
                                    </IconButton>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={menu}
                                        open={menu}
                                        onClose={() => setMenu(false)}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={() => handleFilter('puerto')}>puerto</MenuItem>
                                        <MenuItem onClick={() => handleFilter('descartado')}>descartado</MenuItem>
                                        <MenuItem onClick={() => handleFilter('transportista')}>transportista</MenuItem>
                                    </Menu>
                                </div>

                                <Typography variant='body2' >
                                    Tanques status:  <Chip size="small" color='primary' label={filter} />
                                </Typography>

                                <div>
                                    <IconButton
                                        id="group-button"
                                        aria-controls={groupMenu ? 'group-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={groupMenu ? 'true' : undefined}
                                        onClick={(e) => setGroupMenu(e.currentTarget)}
                                    >
                                        <TbFilters />
                                    </IconButton>
                                    <Menu
                                        id='group-menu'
                                        anchorEl={groupMenu}
                                        open={groupMenu}
                                        onClose={() => setGroupMenu(false)}
                                        MenuListProps={{
                                            'aria-labelledby': 'group-menu',
                                        }}
                                    >
                                        <MenuItem onClick={() => handleGroup('created_at')}>fecha</MenuItem>
                                        <MenuItem onClick={() => handleGroup('tipo')}>tipo</MenuItem>
                                        <MenuItem onClick={() => handleGroup('especificacion')}>especificacion</MenuItem>
                                        <MenuItem onClick={() => handleGroup('status')}>status</MenuItem>
                                    </Menu>
                                </div>

                                <Typography variant='body2'>
                                    Tanques grupo:  <Chip size="small" color='primary' label={group === 'created_at' ? 'fecha' : group} />
                                </Typography>

                                <Typography variant='body2'>
                                    Tanques seleccionados:  <Chip size="small" color='primary' label={selectTanks.length} />
                                </Typography>


                            </Paper>

                            <Stack
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    height: '70vh',
                                    overflow: 'auto',
                                }}
                            >

                                {Object.entries(dataGroup).map(([category, items], index) => (
                                    <Accordion
                                        key={index}
                                        id={`panel-header-${index}`}
                                        aria-controls={`panel-content-${index}`}
                                        defaultExpanded={true}
                                        variant='elevation'
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                        >
                                            {group === 'created_at' ?
                                                <Typography fontWeight='500' color='primary' >{dateInText(category)}</Typography> :
                                                <Typography fontWeight='500' color='primary' >{category}</Typography>}

                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <IconButton
                                                color="primary"
                                                onClick={() => toggleGroup(items)}
                                                sx={{ position: 'absolute', right: '5%', top: '10px' }}>
                                                <ChecklistRtlIcon />
                                            </IconButton>
                                            <Stack
                                                sx={{
                                                    gap: '10px',
                                                    display: 'flex',
                                                    padding: '20px',
                                                    flexDirection: 'column',
                                                    bgcolor: 'whitesmoke'
                                                }}
                                            >
                                                {items.map(item => (
                                                    <Item key={item.id} tanque={item} />
                                                ))}
                                            </Stack>
                                        </AccordionDetails>

                                    </Accordion>
                                ))}

                            </Stack>
                            <Pagination sx={{ marginX: 'auto' }} variant="outlined" shape="rounded" color="primary" count={pages} page={page} onChange={handleChange} />
                        </Box >
                    </Grid2>

                    <Grid2 sx={{ height: '100%' }} xs={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                height: '100%',
                            }}>
                            <Paper
                                sx={{
                                    gap: '10px',
                                    padding: '20px',
                                    height: 'auto'
                                }}
                            >
                                <Stack spacing={2} >


                                    <strong>Nueva maniobra</strong>

                                    <FormControl fullWidth>
                                        <InputLabel>transportista</InputLabel>
                                        <Select
                                            label="transportista"
                                            inputRef={transportistaRef}
                                            defaultValue={''}
                                        >
                                            {transportistas.map((op) => (
                                                <MenuItem key={op.id} value={op.id}>{op.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel>cliente</InputLabel>
                                        <Select
                                            label="cliente"
                                            inputRef={clienteRef}
                                            defaultValue={''}
                                        >
                                            {clientes.map((op) => (
                                                <MenuItem key={op.id} value={op.id}>{op.cliente}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel>operador</InputLabel>
                                        <Select
                                            label="operador"
                                            inputRef={operadorRef}
                                            defaultValue={''}
                                        >
                                            {operadores.map((op) => (
                                                <MenuItem key={op.id} value={op.id}>{op.nombre}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        id='input-numero-placas'
                                        fullWidth
                                        inputRef={placasRef}
                                        placeholder="X4T4567"
                                        helperText="número de placas"
                                    />

                                    <Button
                                        fullWidth
                                        endIcon={<SendIcon />}
                                        variant="contained"
                                        sx={{ justifyContent: 'space-between' }}
                                        onClick={newRegister}
                                    >
                                        enviar
                                    </Button>

                                </Stack>

                            </Paper>

                            <Paper
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    padding: '20px',
                                    height: `calc(100% - 430px)`
                                }}
                            >
                                <Stack
                                    sx={{
                                        gap: '10px',
                                        display: 'flex',
                                        padding: '20px',
                                        flexDirection: 'column',
                                        bgcolor: 'whitesmoke',
                                        overflow: 'auto',
                                        height: '100%'
                                    }}
                                >

                                    {!selectTanks.length && <Alert variant='outlined' severity='info' >
                                        <Typography color='primary'>Sin tanques agregados</Typography>
                                    </Alert>}

                                    {selectTanks.map(item => (
                                        <Item
                                            key={item.id}
                                            tanque={item}
                                        />
                                    ))}
                                </Stack>
                            </Paper>

                        </Box>
                    </Grid2>
                </Grid2>

            </Container>

        </>
    )
}

function Item({ tanque }) {

    const { context } = useTransportistasContext();

    const { toggleTank, selectTanks } = context || {};

    const checked = selectTanks.length > 0 ?
        selectTanks.find((item) => item.numero_tanque === tanque.numero_tanque) ? true : false
        : false;

    async function descartarTanque() {
        toast.custom((t) => (
            <Paper elevation={3} sx={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p>¿Seguro que deseas descartar este tanque?</p>
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
                            await updateRegister(tanque.id, { status: 'descartado' })
                            toast.dismiss(t)
                        }
                        }
                        variant="contained"
                        size="small"
                        color="error">
                        descartar
                    </Button>

                </Stack>
            </Paper>
        ))
    }

    return (
        <>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    items: 'center',
                    padding: '10px',
                    justifyContent: 'space-between',
                    border: '1px solid #E4E4E7',
                }}
            >
                <Stack flexDirection='row' alignItems='center' gap='20px' padding='10px'>

                    <Box>
                        <Typography variant='caption'>N° tanque</Typography>
                        <Typography>{tanque.numero_tanque}</Typography>
                    </Box>

                    <Box>
                        <Typography variant='caption'>Tipo</Typography>
                        <Typography>{tanque.tipo}</Typography>
                    </Box>

                    <Box>
                        <Typography variant='caption'>Especificación</Typography>
                        <Typography>{tanque.especificacion}</Typography>
                    </Box>

                </Stack>



                {tanque.status === 'puerto' &&
                    <Stack flexDirection='row' alignItems='center' gap='20px'>

                        {(!checked && tanque.status === 'puerto') &&
                            <Button
                                variant='outlined'
                                color="error"
                                onClick={() => descartarTanque()}
                            >
                                descartar
                            </Button>
                        }

                        <Checkbox
                            onChange={() => toggleTank(tanque)}
                            checked={checked}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Stack>}
            </Paper>
        </>
    )
}
