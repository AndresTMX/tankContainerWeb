import { useState, useMemo, useEffect } from "react"
// custom components
import { ContainerScroll } from "../../ContainerScroll"
import { ItemLoadingState } from "../../ItemLoadingState"
import { CopyPaste } from "../../CopyPaste"
// components
import { Stack, Alert, Chip, Button, Paper, Box, Modal, Pagination, MenuItem, Menu, IconButton, Skeleton, Divider } from "@mui/material"
//hooks
import useMediaQuery from "@mui/material/useMediaQuery"
import { useContextProgramacion } from "../../../Context/ProgramacionContext"
//helpers
import { tiempoTranscurrido, dateInText, datetimeMXFormat, minutosXhoras, currentDate } from "../../../Helpers/date"
//libreries
import dayjs from "dayjs"
import { toast } from "sonner"
import { Outlet, useNavigate, useParams } from "react-router-dom"
//icons
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TuneIcon from '@mui/icons-material/Tune';
import { Add } from "@mui/icons-material"
//services
import { updateRegistroWhitId } from "../../../services/maniobras"
import { getRegistersWhereEspectAndType, assignTankOfItemOrder, removeTankOfItemOrder, confirmOrderWhitId, updateOrderWhitId } from "../../../services/ordenes"


export function SolicitudesDeLavado() {

    const movile = useMediaQuery('(max-width:820px)');
    const { states } = useContextProgramacion();

    const { searchValue, dataDinamic, loading, error, mode } = states;

    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const rowsPerPage = 5;

    const pages = Math.ceil(dataDinamic?.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return dataDinamic?.slice(start, end);
    }, [page, dataDinamic]);


    return (
        <>
            <ContainerScroll height={movile ? '70vh' : '76vh'} background='whitesmoke'>

                <Stack gap='10px' padding='0px' >

                    {(loading && !error && !dataDinamic?.length) &&
                        <>
                            <ItemLoadingState />
                            <ItemLoadingState />
                            <ItemLoadingState />
                            <ItemLoadingState />
                        </>
                    }

                    {(!loading && !error && !dataDinamic.length && mode === 'data') &&
                        <Alert severity='info'>Sin registros añadidos</Alert>
                    }

                    {(!error && !loading && dataDinamic.length && mode === 'search') &&
                        <Alert severity='info'>Resultados de busqueda {searchValue.current?.value} </Alert>
                    }

                    {(!error && !loading && !dataDinamic.length && mode === 'search') &&
                        <Alert severity='warning'>No se encontraron coincidencias para tu busqueda, {searchValue.current?.value}</Alert>
                    }


                    {
                        items.map((order) => (
                            <ItemOrder
                                key={order.id}
                                order={order}
                            />
                        ))
                    }


                </Stack>
            </ContainerScroll>
            <Pagination variant="outlined" shape="rounded" color="primary" count={pages} page={page} onChange={handleChange} />

            <Outlet />

        </>
    )
}

function ItemOrder({ order }) {

    const movile = useMediaQuery('(max-width:700px)');
    const small = useMediaQuery('(max-width:500px)');

    const routerColorsStatus = {
        'por confirmar': 'warning',
        'confirmada': 'success',
        'almacenado':'success'
    }

    const { clientes, destinos, status, tanques, created_at, fecha_recoleccion } = order || {};

    const navigate = useNavigate();

    const solicitud = encodeURIComponent(JSON.stringify(order));

    async function removeAssign(id) {
        try {

            const copyTanques = [...tanques];
            const indexElement = copyTanques.findIndex((e) => e.id === id);
            const idTanque = tanques[indexElement]['registro_id'];
            delete copyTanques[indexElement]['numero_tanque']
            delete copyTanques[indexElement]['registro_id']

            const { error } = await removeTankOfItemOrder(order.id, { tanques: copyTanques }, idTanque)

            if (error) {
                throw new Error(error)
            } else {
                toast.success('tanque retirado de la orden')
            }

        } catch (error) {
            toast.error(error?.message)
        }
    }

    async function confirmOrder() {
        try {

            for (let tanque of tanques) {
                if (!tanque.numero_tanque) {
                    throw new Error(`Asigna todos los tanques de la orden antes de confirmarla`)
                }
            }

            const { error } = await confirmOrderWhitId(order.id, order);

            if (error) {
                throw new Error(`Error al actualizar estatus de orden`)
            } else {
                toast.success('Orden aprobada, lavados creados')
            }

        } catch (error) {
            toast.error(error?.message)
        }
    }

    async function discardItem(id, index) {
        try {

            const updatesOrder = [...tanques];
            updatesOrder.splice(index, 1);

            const { error: errorOrder } = await updateOrderWhitId(order.id, { tanques: updatesOrder });

            const { error: errorUpdate } = await updateRegistroWhitId(id, { status: 'descartado' })

            let error = errorOrder || errorUpdate;

            if (error) {
                throw new Error(error?.message)
            }

        } catch (error) {
            toast.error(error)
        }
    }

    async function deleteOrderEmpty() {
        try {

            const { error } = await updateOrderWhitId(order.id, { status: 'cancelada' });

            if (error) {
                throw new Error(error)
            }

        } catch (error) {
            toast.error(error?.message)
        }
    }

    return (
        <>
            <Paper>

                <Stack flexDirection='row' flexWrap='wrap' padding='10px' gap='10px' alignItems='center' justifyContent='space-between'>

                    <Stack flexDirection='row' flexWrap='wrap' gap='10px'>
                        <Chip size="small" color={routerColorsStatus[status]} label={status} />

                        <Chip size="small" color={'info'} label={clientes?.cliente} />

                        <Chip size="small" color={'info'} label={`hace ${tiempoTranscurrido(created_at)}`} />
                    </Stack>

                    <CopyPaste text={order.id} />

                </Stack>

                <Stack padding='10px' gap='5px' alignItems='flex-start' >
                    <span style={{ fontWeight: '500' }}>DESTINO: <span>{destinos?.destino}</span></span>
                    <Alert
                        severity={'info'}
                        icon={<EditCalendarIcon />}
                        sx={{ width: '100%' }} >
                        entregar el  {dateInText(fecha_recoleccion)} - {datetimeMXFormat(fecha_recoleccion)}
                    </Alert>
                </Stack>

                <Stack sx={{ bgcolor: 'paper.bg' }} flexDirection='column' gap='10px' padding='10px'>

                    {tanques?.map((tanque, index) => (
                        <Paper
                            elevation={1}
                            key={tanque.id}
                            sx={{
                                display: 'flex',
                                padding: '10px',
                                gap: '15px',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                border: '1px solid #E4E4E7',
                                // backgroundColor: tanque.descartado ? '#ed6c02' : '',
                                // color: tanque.descartado ? 'white' : '',
                            }}>


                            <Stack flexDirection='row' alignItems='center' justifyContent='space-between' width='100%' flexWrap='wrap' spacing='10px' >

                                <Stack flexDirection={small ? 'column' : 'row'} gap={small ? '10px' : '30px'} width={small ? '100%' : 'auto'}>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        <strong>número de tanque</strong>
                                        <span>{tanque?.numero_tanque || 'por asignar'}</span>
                                    </Box>

                                    {small && <Divider flexItem sx={{ width: '100%' }} />}

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        <strong>tipo</strong>
                                        <span>{tanque.tipo}</span>
                                    </Box>

                                    {small && <Divider flexItem sx={{ width: '100%' }} />}

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        <strong>especificación</strong>
                                        <span>{tanque.especificacion}</span>
                                    </Box>
                                </Stack>

                                {(!tanque.numero_tanque) &&
                                    <Button
                                        fullWidth={movile}
                                        size="small"
                                        onClick={() => navigate(`/programacion/solicitudes/programar/${solicitud}/${tanque.id}`)}
                                        variant="contained">
                                        asignar tanque
                                    </Button>}

                                {(tanque?.numero_tanque && !tanque.descartado) &&
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        size="small"
                                        onClick={() => removeAssign(tanque.id)}
                                    >
                                        remover tanque
                                    </Button>
                                }

                                {(tanque.numero_tanque && tanque.descartado) &&
                                    <Alert severity="error" >
                                        <Stack gap='10px' >
                                            <span>tanque retirado de la orden  </span>
                                            <Button
                                                variant="contained"
                                                color='error'
                                                size="small"
                                                onClick={() => discardItem(tanque.registro_id, index)}
                                            >
                                                descartar
                                            </Button>
                                        </Stack>
                                    </Alert>

                                }

                            </Stack>

                        </Paper>
                    ))}

                    {(tanques?.length === 0) &&
                        <Button
                            fullWidth
                            size="small"
                            color='error'
                            onClick={deleteOrderEmpty}
                            variant="contained">
                            eliminar orden vacia
                        </Button>}

                    <Button
                        fullWidth
                        size="small"
                        color='error'
                        disabled={tanques?.length ? false : true}
                        onClick={() => confirmOrder()}
                        variant="contained">
                        confirmar solicitud
                    </Button>
                </Stack>


            </Paper>

        </>
    )
}

export function ConfirmarSolicitud() {

    //recibir la solicitud por parametros
    const navigate = useNavigate();
    const { solicitud, id } = useParams();
    const solicitudJson = JSON.parse(decodeURI(solicitud));
    const movile = useMediaQuery('(max-width:700px)');

    const [menu, setMenu] = useState(false);
    const [tipo, setTipo] = useState('AGMU');

    const [menuStatus, setMenuStatus] = useState(false);
    const [status, setStatus] = useState('almacenado')
    // const [espect, setEspect] = useState('NFC')
    const [loading, setLoading] = useState(null)
    const [data, setData] = useState([])

    const [item, setItem] = useState(null)

    const tipos = ['AGMU', 'DYOU', 'AFIU',]
    const espectOptions = ['NFC', 'FCOJ', 'OR-OIL', 'DLIMONENE', 'TEQUILA', 'NFC/FCOJ']

    async function get() {
        setLoading(true)
        const { error, data } = await getRegistersWhereEspectAndType(tipo, status);
        setData(data)
        setLoading(null)
    }

    useEffect(() => {
        get();
    }, [tipo, status])

    const handleFilter = (newValue) => {
        setTipo(newValue)
        setMenu(false)
    }

    const handleStatus = (newValue) => {
        setStatus(newValue)
        setMenuStatus(false)
    }

    async function assignOrder() {
        try {
            const idOrder = solicitudJson.id;
            const idOrderItem = id;

            if (!item) {
                throw new Error('selecciona un tanque')
            }

            const copyItemsOrder = [...solicitudJson.tanques]
            const indexItemEdit = copyItemsOrder.findIndex((i) => i.id === idOrderItem);
            copyItemsOrder[indexItemEdit]['numero_tanque'] = item.numero_tanque
            copyItemsOrder[indexItemEdit]['registro_id'] = item.id

            const { error } = await assignTankOfItemOrder(idOrder, { tanques: copyItemsOrder }, item.id);

            if (error) {
                throw new Error(error)
            } else {
                toast.success('tanque asignado')
                navigate(`/programacion/solicitudes`)

            }

        } catch (error) {
            toast.error(error?.message)
        }

    }

    return (
        <>
            <Modal
                open={true}
                onClose={() => navigate(`/programacion/solicitudes`)}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '90VW',
                        marginTop: '20px',
                        maxWidth: '700px'
                    }}
                >

                    <Stack padding='20px' gap='10px'>

                        <Box>
                            <span>Asignar tanque a solicitud</span>
                        </Box>

                        <Stack flexDirection='row' gap='10px' >

                            <Stack flexDirection='row' alignItems='center' gap='5px'>
                                <IconButton
                                    id="basic-button"
                                    aria-controls={menu ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={menu ? 'true' : undefined}
                                    onClick={(e) => setMenu(e.currentTarget)}
                                >
                                    <TuneIcon />
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
                                    <MenuItem onClick={() => handleFilter('AGMU')}>AGMU</MenuItem>
                                    <MenuItem onClick={() => handleFilter('AFIU')}>AFIU</MenuItem>
                                    <MenuItem onClick={() => handleFilter('DYOU')}>DYOU</MenuItem>
                                </Menu>
                                <span>{tipo}</span>
                            </Stack>

                            <Stack flexDirection='row' alignItems='center' gap='5px'>
                                <IconButton
                                    id="basic-button"
                                    aria-controls={menuStatus ? 'basic-menu-status' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={menuStatus ? 'true' : undefined}
                                    onClick={(e) => setMenuStatus(e.currentTarget)}
                                >
                                    <FilterAltIcon />
                                </IconButton>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={menuStatus}
                                    open={menuStatus}
                                    onClose={() => setMenuStatus(false)}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={() => handleStatus('almacenado')}>almacenado</MenuItem>
                                    <MenuItem onClick={() => handleStatus('descartado')}>descartado</MenuItem>
                                </Menu>
                                <span>{status}</span>
                            </Stack>


                        </Stack>

                        {item && <Alert severity="info">

                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '40px', spacing: '20px' }} >

                                <Stack>
                                    <strong>Numero de tanque</strong>
                                    <span>{item.numero_tanque}</span>
                                </Stack>

                                <Stack>
                                    <strong>Especificación</strong>
                                    <span>{item.especificacion}</span>
                                </Stack>

                                <Stack>
                                    <strong>Status de tanque</strong>
                                    <span>{item.status}</span>
                                </Stack>

                            </Box>


                        </Alert>}

                        {(item?.lavados.length > 0) &&
                            <Paper elevation={1} sx={{ padding: '10px', border: '1px solid #E4E4E7' }}>
                                <Stack>
                                    {item?.lavados.map((lavado, indexLavado) => (
                                        <Stack flexDirection='row' gap='10px' justifyContent='space-between'  flexWrap='wrap'>
                                            <strong>Lavado {indexLavado + 1}</strong>
                                            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} >
                                                <Chip label={lavado.status} size="small" color='info' />
                                                <Chip label={dateInText(lavado.created_at)} size="small" color='info' />
                                            </div>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Paper>}

                        <Box sx={{ bgcolor: '#f5f5f5', maxHeight: '400px', overflow: 'auto' }} >

                            <Stack flexDirection={movile ? 'colum' : 'row'} gap=' 10px' flexWrap='wrap' padding='10px'  >

                                {data.map((d) => (
                                    <Chip
                                        key={d.id}
                                        deleteIcon={<Add />}
                                        color={item?.id === d.id ? 'info' : 'default'}
                                        onDelete={() => setItem(d)}
                                        label={
                                            <Stack flexDirection='row' gap='5px'>
                                                <strong>{d.numero_tanque}</strong>
                                                <span>{d.especificacion}</span>
                                            </Stack>} />
                                ))}

                                {(!data.length && !loading) &&
                                    <Alert severity="warning" sx={{ width: '100%' }}>
                                        Sin tanques tipo {tipo} almacenados
                                    </Alert>
                                }

                                {(loading) &&
                                    <>
                                        <Skeleton variant="rectangular" width={100} height={30} />
                                        <Skeleton variant="rectangular" width={100} height={30} />
                                        <Skeleton variant="rectangular" width={100} height={30} />
                                    </>
                                }

                            </Stack>

                        </Box>

                        <Button
                            variant="contained"
                            onClick={assignOrder}
                        >
                            asignar tanque
                        </Button>
                    </Stack>



                </Paper>

            </Modal>
        </>
    )
}


