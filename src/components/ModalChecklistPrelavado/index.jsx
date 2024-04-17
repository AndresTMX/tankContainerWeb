import { useState, useEffect } from "react";
import { Paper, Button, Chip, Stack, Divider, Typography, Box, Modal, Container } from "@mui/material";
//icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//helpers
import { datetimeMXFormat, timepoParaX, dateTextShort, dateInTextEn, currentDate } from "../../Helpers/date";
//context
import { usePrelavadoContext } from "../../Context/PrelavadoContext";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
//libraries
import dayjs from "dayjs";
import { toast } from "sonner"

export function ModalChecklistPrelavado() {

    return (
        <>
            <Modal>
                <Container>

                    <Paper
                        elevation={4}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: 'auto',
                            maxWidth: '95vw',
                            padding: '10px',
                        }}>
                        <Box sx={{ padding: isMovile ? '0px' : '15px', width: '90vw', maxWidth: '800px' }}>

                            <Paper elevation={3} sx={{ width: '100%', padding: '15px', justifyContent: 'space-between', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px' }}>

                                <Stack flexDirection='row' gap='10px' justifyContent='flex-start' flexWrap='wrap'>
                                    <Chip color="info" size="small" label={`${carga != 'pipa' ? tipo : ''}  ${numero_tanque || numero_pipa}`} />
                                    <Chip color="info" size="small" label={'Cliente:  ' + clientes.cliente} />
                                    <Chip color="info" size="small" label={'Llego el ' + dateTextShort(checkIn)} />
                                </Stack>

                                <Button
                                    fullWidth={IsMovile}
                                    endIcon={<DoDisturbIcon />}
                                    onClick={CancelChecklist}
                                    variant='contained'
                                    color="error"
                                    size="small"
                                >
                                    Cancelar
                                </Button>

                            </Paper>


                            <CheckListPrelavado updater={updater} />
                        </Box>
                    </Paper>

                </Container>
            </Modal>
        </>
    )
}