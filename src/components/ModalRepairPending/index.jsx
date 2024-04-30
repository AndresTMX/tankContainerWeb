import { Box, Paper, Stack, Typography, Alert, Button, Fade, Select, MenuItem } from "@mui/material";

function ModalRepairPending() {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '90vw', marginTop: '50px' }}>

                <Paper sx={{ padding: '20px' }}>
                    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} flexWrap={'wrap'}>

                        <Stack flexDirection={'row'} alignItems={'center'} gap={'5px'}>
                            <Typography variant="subtitle2">Cliente :</Typography>
                            <Typography>{cliente}</Typography>
                        </Stack>

                        <Stack flexDirection={'row'} alignItems={'center'} gap={'5px'}>
                            <Typography variant="subtitle2">Folio EIR :</Typography>
                            <Typography>{folio}</Typography>
                        </Stack>

                        <Stack flexDirection={'row'} alignItems={'center'} gap={'5px'}>
                            <Typography variant="subtitle2">Fecha de ingreso :</Typography>
                            <Typography>{dateInText(ingreso)}</Typography>
                        </Stack>

                    </Stack>
                </Paper>

                <Stack gap={'5px'}>
                    <Typography variant='caption'>Evidencias recopiladas en EIR</Typography>
                    <Paper>
                        <Stack padding={'15px'} gap={'15px'} flexDirection={'row'} alignItems={'center'}>
                            {!loading && imagesChecklist.length > 0 &&
                                imagesChecklist.map((question) => (
                                    <ImageDinamic
                                        key={question.question}
                                        toggleItem={toggleImage}
                                        typeRepair={typeRepair}
                                        question={question}
                                    />
                                ))}

                            {(loading && !error) &&
                                <Fade in={loading}>
                                    <Stack padding={'15px'} gap={'15px'} flexDirection={'row'} alignItems={'center'}>
                                        <Skeleton variant='rounded' width={'150px'} height={'150px'} />
                                        <Skeleton variant='rounded' width={'150px'} height={'150px'} />
                                        <Skeleton variant='rounded' width={'150px'} height={'150px'} />
                                    </Stack>
                                </Fade>
                            }

                            {(!loading && error) &&
                                <Alert severity='error'>{error.message}</Alert>
                            }
                        </Stack>
                    </Paper>
                </Stack>

                <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    
                    <FormControl fullWidth>
                        <InputLabel>Tipo de reparación</InputLabel>
                        <Select
                            value={reparation}
                            label="reparación"
                            onChange={handleChange}
                        >
                            <MenuItem value={'interna'}>interna</MenuItem>
                            <MenuItem value={'externa'}>externa</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        onClick={updateTypeMaintance}
                        size='small'
                        variant="contained"
                        color="primary"
                    >
                        Guardar cambio
                    </Button>
                </Stack>

                <ContainerScroll background={'white'} height={'300px'}>
                    <Typography variant='caption'>
                        Proforma
                    </Typography>
                    <DataGridRepairs
                        rows={rows}
                        setRows={setRows}
                        typeRepair={typeRepair}
                        rowModesModel={rowModesModel}
                        setRowModesModel={setRowModesModel}
                    />
                </ContainerScroll>

                <Stack gap={'5px'}>
                    <Typography variant='caption'>Evidencias agregadas al documento</Typography>
                    <Paper>
                        <Stack padding={'15px'} gap={'15px'} flexDirection={'row'} alignItems={'center'}>
                            {evidences.map((question) => (
                                <ImageDinamic
                                    key={question.question}
                                    question={question}
                                    toggleItem={toggleImage}
                                    typeRepair={typeRepair}
                                />
                            ))}

                            {(evidences.length === 0) &&
                                <Alert severity='info'>Sin evidencias agregadas</Alert>
                            }
                        </Stack>
                    </Paper>
                </Stack>

                <Button
                    onClick={initRepairButton}
                    variant="contained"
                    color="primary"
                >
                    Iniciar reparación
                </Button>
            </Box>
        </>
    );
}

export { ModalRepairPending };