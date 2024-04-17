import { useState, useEffect } from "react";
//imports materialui
import { Box, Stack, Paper, Chip, TextField, Alert, Button, Typography, Divider } from "@mui/material";
import { ContainerScroll } from "../../components/ContainerScroll";
import { NotConexionState } from "../../components/NotConectionState";
import { ItemLoadingState } from "../../components/ItemLoadingState";
import { CopyPaste } from "../../components/CopyPaste";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
import { Outlet } from "react-router-dom";
//icons
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
//libraries
import dayjs from "dayjs";
import { Toaster, toast } from "sonner";
//context
import { usePrelavadoContext } from "../../Context/PrelavadoContext";
//helpers
import { currentDate, datetimeMXFormat, timepoParaX, dateInTextEn } from "../../Helpers/date";

export function Prelavado() {

   const { loading, error, dataDinamic, mode, searchValue, handleKeyPress, onChangeClear } = usePrelavadoContext();

   const IsSmall = useMediaQuery('(max-width:540px)')

   return (
      <>
         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>

            <Stack alignItems='center' width='100%' gap='10px' maxWidth='900px'>

               <Paper
                  sx={{
                     display: 'flex',
                     flexDirection: IsSmall ? 'column' : 'row',
                     flexFlow: IsSmall ? 'column-reverse' : '',
                     justifyContent: 'space-between',
                     alignItems: IsSmall ? 'start' : 'center',
                     bgcolor: 'whitesmoke',
                     border: '1px',
                     borderColor: '#E4E4E7',
                     borderStyle: 'solid',
                     maxWidth: '900px',
                     padding: '15px',
                     width: '96vw',
                     gap: '10px',
                  }}>
                  <Stack flexDirection='row' gap='10px' width={IsSmall ? '100%' : 'auto'}>
                     <Chip
                        label='prelavados pendientes'
                        color='warning'
                     />

                  </Stack>

                  <TextField
                     sx={{ width: IsSmall ? '80vw' : 'auto' }}
                     size='small'
                     variant='outlined'
                     name="searchProgram"
                     onKeyDown={handleKeyPress}
                     onChange={onChangeClear}
                     inputRef={searchValue}
                     InputProps={{
                        endAdornment: <SearchIcon />
                     }}
                  />

               </Paper>

               <ContainerScroll height='78vh'>

                  {(!dataDinamic.length && !error && !loading) &&
                     <Box sx={{ width: '100%' }}  >
                        <Alert sx={{ width: '100%' }} severity={mode != 'search' ? "info" : "warning"}>
                           {mode === 'data' ? 'Sin prelavados pendientes' : `Sin coincidencias para ${searchValue.current.value}`}
                        </Alert>
                     </Box>
                  }

                  {(error) &&
                     <NotConexionState />
                  }

                  <Stack gap='10px' >
                     {(!loading && !error && dataDinamic.length >= 1) &&
                        dataDinamic.map((item) => (
                           <PrelavadoItem
                              key={item.id}
                              data={item} />
                        ))}
                  </Stack>

                  {(loading && !error) &&
                     <Stack gap='10px' >
                        <ItemLoadingState />
                        <ItemLoadingState />
                        <ItemLoadingState />
                     </Stack>
                  }

               </ContainerScroll>

            </Stack>

            <Outlet />

         </Box>

         <Toaster richColors position='top-center' />

      </>
   );
}

function PrelavadoItem({ data }) {

   const { item, selectItem } = usePrelavadoContext();

   const [vencimiento, setVencimiento] = useState(false)

   const IsSmall = useMediaQuery('(max-width:830px)');

   const { status: statusLavado, registros_detalles_entradas, fecha_recoleccion, ordenes_lavado } = data || {};

   const { carga, numero_pipa, numero_tanque, tipo, registros, especificacion, status: statusTanque } = registros_detalles_entradas || {};

   const { clientes, destinos } = ordenes_lavado || {};

   const { cliente } = clientes || {};

   const { checkIn, checkOut } = registros || {};

   const onWashing = () => {
      // dispatch({
      //     type: actionTypes.setSelectCheck,
      //     payload: data
      // })
      toast.success('onWashing')
   }

   const CancelChecklist = () => {
      // dispatch({
      //     type: actionTypes.setSelectCheck,
      //     payload: false
      // })
      toast.success('cancel check')
   }

   const { destino, duracion } = destinos || {};

   const entregaTentativa = dayjs(fecha_recoleccion);

   const tanqueColorStatus = {
      'descartado': 'error',
      'programado': 'info'
   }

   useEffect(() => {
      if (entregaTentativa.isBefore(currentDate)) {
         setVencimiento(true)
      } else {
         setVencimiento(false)
      }
   }, [data])

   return (
      <>

         <Paper
            elevation={3}
            sx={{ display: 'flex', flexDirection: 'column', padding: '15px', gap: '10px' }} >

            <Stack flexDirection='row' justifyContent='space-between' alignItems='center' gap='10px' flexWrap='wrap' spacing='10px' >
               <Stack flexDirection='row' alignItems='center' gap='10px' flexWrap='wrap' >
                  <Chip color={tanqueColorStatus[statusTanque]} label={`tanque ${statusTanque}`} />
                  <Chip color='warning' label={`lavado ${statusLavado}`} />
               </Stack>
               <CopyPaste text={data.id} />
            </Stack>

            <Stack flexDirection='row' gap='10px' flexWrap='wrap' >

               <Chip
                  icon={<CalendarTodayIcon />}
                  label={` Entregar el ${dateInTextEn(fecha_recoleccion)}`}
                  color='info'
                  size="small"
               />

               <Chip
                  icon={<AccessTimeIcon />}
                  label={`${datetimeMXFormat(fecha_recoleccion)}`}
                  color='info'
                  size="small"
               />

               {!vencimiento && <Chip
                  icon={<AccessTimeIcon />}
                  label={`${timepoParaX(fecha_recoleccion)} para entrega`}
                  color='info'
                  size="small"
               />}

               {vencimiento && <Chip
                  icon={<AccessTimeIcon />}
                  label={`${timepoParaX(fecha_recoleccion)} de retraso`}
                  color='error'
                  size="small"
               />}

            </Stack>

            <Stack flexDirection={IsSmall ? 'column' : 'row'} gap={IsSmall ? '15px' : '30px'} justifyContent='flex-start'>

               <Box>
                  <Typography variant="subtitle2">{`N° ${carga}`}</Typography>
                  <Typography>{tipo}  {numero_tanque || numero_pipa}</Typography>
               </Box>
               <Divider />
               <Box>
                  <Typography variant="subtitle2">Especificacion</Typography>
                  <Typography>{especificacion}</Typography>
               </Box>
               <Divider />
               <Box>
                  <Typography variant="subtitle2">Cliente</Typography>
                  <Typography>{clientes.cliente}</Typography>
               </Box>
               <Divider />
               <Box>
                  <Typography variant="subtitle2">Destino</Typography>
                  <Typography>{destino}</Typography>
               </Box>

            </Stack>

            <Button
               fullWidth={IsSmall}
               onClick={onWashing}
               variant="contained"
               color="primary"
               size="small"
            >
               Checklist
            </Button>

         </Paper>

      </>
   );
}


