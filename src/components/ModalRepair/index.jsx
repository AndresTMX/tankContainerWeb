import { useState } from "react";
import { Container, Box, Paper, Stack, Button, IconButton, Typography, Card, CardMedia } from "@mui/material";
import { DataGridRepairs } from "../DataGridRepairs";
//hooks
import { useGetCheckList } from "../../Hooks/reparaciones/useGetChecklist";
//icons
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { SelectSimple } from "../SelectSimple";
import { ContainerScroll } from "../ContainerScroll";

function ModalRepair({ tanque, selectItem }) {

    const { checklist, dataJson, loading, error } = useGetCheckList(tanque.id_detalle_registro)

    const questionWhitEvidence = dataJson.filter((question) => question.image != '');

    const [reparation, setReparation] = useState('');

    //stados de la dataGrid
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});

    return (
        <>
            <Paper elevation={4}>
                <ContainerScroll height={'85vh'}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '20px', paddingRight: '20px', gap: '10px', width: '95vw', maxWidth: '1000px' }}>
                        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography>
                                Reparación del tanque {tanque.numero_tanque}
                            </Typography>

                            <IconButton
                                onClick={() => selectItem(false)}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Stack>

                        <Stack gap={'5px'}>
                            <Typography variant='caption'>Evidencias recopiladas en EIR</Typography>
                            <Paper>
                                <Stack padding={'15px'} gap={'15px'} flexDirection={'row'} alignItems={'center'}>
                                    {questionWhitEvidence.map((question) => (
                                        <ImageDinamic
                                            key={question.question}
                                            linkImage={question.image}
                                        />
                                    ))}
                                </Stack>
                            </Paper>
                        </Stack>

                        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <SelectSimple
                                width={'300px'}
                                title={'Tipo de reparación'}
                                options={['interna', 'externa']}
                                value={reparation}
                                onChange={(e) => setReparation(e.target.value)}
                            />

                            <Button
                                size='small'
                                variant="contained"
                                color="primary"
                            >
                                Guardar cambio
                            </Button>
                        </Stack>

                        <ContainerScroll background={'white'} height={'300px'}>
                            <Typography variant="subtitle2">
                                Proforma
                            </Typography>
                            <DataGridRepairs 
                            rows={rows}
                            setRows={setRows}
                            rowModesModel={rowModesModel}
                            setRowModesModel={setRowModesModel}
                            />
                        </ContainerScroll>

                        <Stack>
                            <Typography>
                                Evidencias agregadas al documento
                            </Typography>
                        </Stack>

                        <Button
                        variant="contained"
                        color="primary"
                        >
                            Iniciar reparación
                        </Button>
                    </Box>
                </ContainerScroll>
            </Paper>

        </>
    );
}

export { ModalRepair };

export function ImageDinamic({ linkImage }) {
    return (
        <>
            <Card sx={{ position: 'relative', width: '100px', height: '100px', zIndex: 1, "&: hover": { filter: 'saturate(200%)' } }}>
                <CardMedia
                    sx={{ zIndex: -1 }}
                    component="img"
                    height="100px"
                    width="100px"
                    image={linkImage}
                    alt="image"
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 2,
                        bgcolor: '#e2e2e24a',
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <IconButton size='large' color="info">
                        <AddIcon />
                    </IconButton>
                </Box>
            </Card>
        </>
    )
}