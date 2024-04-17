import { IconButton, Button, Box, Stack, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
//icons
import { IoMdNotifications } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
//services
import { getNotificationsWhitLimit, updateNotification } from "../../services/notificaciones_ordenes";
//hooks
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRealtime } from "../../Hooks/FetchData";
//customComponents
import { CopyPaste } from "../CopyPaste";
//helpers
import { tiempoTranscurrido } from "../../Helpers/date"

export function OrdenesNotificaciones() {

    const movile = useMediaQuery('(max-width:500px)')

    const [limite, setLimite] = useState(10)
    const [statusNotification, setStatusNotification] = useState(false);

    async function getNotifications() {
        const { error, data } = await getNotificationsWhitLimit(limite, statusNotification);
        return { error, data }
    }

    const { error, loading, data: notificaciones } = useRealtime(getNotifications, false, 'notificaciones_ordenes', [limite, statusNotification]);

    const [modalNotification, setModalNotification] = useState(false);



    return (
        <>
            <IconButton
                sx={{ zIndex: 1 }}
                onClick={() => setModalNotification(!modalNotification)}
            >
                <div>
                    <span
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'red',
                            borderRadius: '100%',
                            position: 'absolute',
                            fontSize: '9px',
                            height: 'auto',
                            width: 'fit-content',
                            aspectRatio: '1/1',
                            padding: '4px',
                            color: 'white',
                            right: -2,
                            top: 1,
                        }}>
                        <span>
                            {notificaciones?.length || '0'}
                        </span>
                    </span>
                    <IoMdNotifications />
                </div>
            </IconButton>


            {modalNotification &&
                <div style={{ position: 'absolute', width: '100vw', height: '100vh', left: '0px', top: '0px', zIndex: 0 }}>
                    <Paper
                        elevation={4}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1px',
                            padding: '10px',
                            position: 'absolute',
                            right: movile ? '32px' : '90px',
                            top: '55px',
                            width: movile ? '100%' : '350px',
                            background: 'whitesmoke',
                            maxWidth: '95vw',
                            maxHeight: '80vh',
                            overflow: 'auto'
                        }}>

                        <Stack flexDirection='row' gap='4px' padding='4px' >

                            <FormControl size="small" sx={{ fontSize: '10px' }} >
                                <InputLabel size="small" >limite</InputLabel>
                                <Select
                                    size='small'
                                    label='limite'
                                    value={limite}
                                    onChange={(e) => setLimite(e.target.value)}
                                >
                                    <MenuItem value={10} >10</MenuItem>
                                    <MenuItem value={20} >20</MenuItem>
                                    <MenuItem value={50} >50</MenuItem>
                                    <MenuItem value={100} >100</MenuItem>
                                    <MenuItem value={200} >200</MenuItem>
                                    <MenuItem value={300} >300</MenuItem>
                                </Select>

                            </FormControl>

                            <FormControl size="small" sx={{ fontSize: '10px' }} >
                                <InputLabel size="small" >status</InputLabel>
                                <Select
                                    size='small'
                                    label='status'
                                    value={statusNotification}
                                    onChange={(e) => setStatusNotification(e.target.value)}
                                >
                                    <MenuItem value={false} >nueva</MenuItem>
                                    <MenuItem value={true} >visto</MenuItem>
                                </Select>

                            </FormControl>



                        </Stack>

                        {notificaciones.map((n) => (
                            <Box 
                            key={n.id}
                            sx={{ display: 'flex', flexDirection: 'column', padding: '10px', backgroundColor: 'white', gap: '8px', width: '100%', border: '1px solid #E4E4E7', position: 'relative' }} >
                                <span style={{ fontSize: '10px', color: 'gray', position: 'absolute', right: 10, top: 8 }} > hace {tiempoTranscurrido(n.created_at)}</span>
                                <Typography variant='caption' fontWeight={500} sx={{ marginTop:'12px' }} >
                                    <Typography color='primary' variant='caption' fontWeight={500} sx={{ paddingRight: '5px' }}>{n.ordenes_lavado.clientes.cliente}</Typography>
                                    {n.descripcion}
                                </Typography>
                                <Stack flexDirection='row' gap='2px' justifyContent='space-between'>
                                    <CopyPaste text={n.orden_id} />
                                    <IconButton
                                        onClick={async () => await updateNotification({ visto: true }, n.id)}
                                        disabled={n.visto}
                                        size="small" 
                                        >
                                        <FaCheckCircle/>
                                    </IconButton>
                                </Stack>
                            </Box>
                        ))}
                    </Paper>
                </div>
            }

        </>
    )
}