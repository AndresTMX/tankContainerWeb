import { Box, Stack, Chip, Skeleton, Typography, Alert, IconButton, Paper } from "@mui/material";
//customComponents
import { ContainerScroll } from "../ContainerScroll";
//icons
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

function ViewAndSelectTanks({ colorItemTank, toggleTank, dataTank, tankChargue, tanksReady, tankLoading, tankError, }) {

    return (
        <Box>
            <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle2'>Tanques disponibles</Typography>
                <Typography variant='caption'>{tanksReady.length}</Typography>
            </Stack>

            <ContainerScroll height='100px'>
                <Stack
                    flexDirection={'row'}
                    alignItems={'center'}
                    flexWrap={'wrap'}
                    gap={'10px'}
                >
                    {tanksReady.map((item) => (
                        <ItemTank
                            key={item.tanque}
                            onClick={toggleTank}
                            tanque={item}
                            colorTank={colorItemTank}
                        />
                    ))}

                    {tankLoading && (
                        <Stack
                            flexDirection={'row'}
                            alignItems={'center'}
                            flexWrap={'wrap'}
                            gap={'10px'}
                        >
                            <Skeleton variant='rounded' width={'85px'} height={'32px'} />
                            <Skeleton variant="rounded" width={'85px'} height={'32px'} />
                            <Skeleton variant="rounded" width={'85px'} height={'32px'} />
                        </Stack>
                    )}

                    {tankError &&
                        <Alert severity="error">Hubo un error al cargar los tanques, intenta de nuevo</Alert>
                    }
                </Stack>
            </ContainerScroll>
        </Box>
    );
}

export { ViewAndSelectTanks };

export function ViewAndDeletTanks({ deleteTank, dataTank, }) {
 
    return (
        <Box>
            <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle2'>Tanques cargados</Typography>
                <Typography variant='caption'>{`${(dataTank.length)}/4`}</Typography>
            </Stack>

            <ContainerScroll background={'white'} height='150px'>
                <Stack
                    flexDirection={'colum'}
                    gap={'5px'}
                >
                    {dataTank.map((item) => (
                        <ItemTank
                            typeItem={'delete'}
                            key={item.tanque}
                            onClick={() => deleteTank(item)}
                            tanque={item}
                            colorTank={() => 'error'}
                        />
                    ))}

                </Stack>
            </ContainerScroll>
        </Box>
    )
}

export function ItemTank({ tanque, onClick, colorTank, typeItem }) {
    return (
        <>
            {!typeItem &&
                <Chip
                    color={colorTank(tanque.tanque)}
                    label={tanque.tanque}
                    deleteIcon={<AddIcon />}
                    onDelete={() => onClick(tanque)}
                />}

            {typeItem === 'delete' &&
                    <Paper
                        elevation={1}
                        sx={{
                            bgcolor:'#0288d1',
                            color:'white',
                            padding: '5px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <Typography sx={{paddingLeft:'15px'}}>{tanque.tanque}</Typography>

                        <IconButton>
                            <ClearIcon sx={{color:'white'}} onClick={() => onClick(tanque)} />
                        </IconButton>
                    </Paper>
            }
        </>
    );
}
