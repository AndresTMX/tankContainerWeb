

export function PrelavadosRealizados() {

    const movile = useMediaQuery('(max-width:820px)');

    return (
        <Stack gap='10px'>
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
                        items.map((prelavado) => (
                            <ItemPendiente key={prelavado.id} prelavado={prelavado} />
                        ))
                    }


                </Stack>
            </ContainerScroll>
            <Pagination variant="outlined" shape="rounded" color="primary" count={pages} page={page} onChange={handleChange} />

            <Outlet />
        </Stack>
    );
}

function ItemRevisado({ prelavado }) {

    const {
        data,
        created_at,
        registro_detalle_entrada_id,
        registros_detalles_entradas,
        tipo_lavado,
    } = prelavado;

    const { carga, numero_pipa, numero_tanque, status, } =
        registros_detalles_entradas ? registros_detalles_entradas : {};

    // const prelavadosInJson = data? JSON.parse(data): {};

    const [modal, setModal] = useState(false)

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                <Paper elevation={4} sx={{ padding: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} gap={'10px'}>

                        <Stack flexDirection={'row'} alignItems={'center'} flexWrap={'wrap'} gap={'10px'}>
                            <Chip size='small' color='warning' label={status} />
                        </Stack>

                        <Stack flexDirection={'row'} alignItems={'center'} flexWrap={'wrap'} gap={'10px'}>

                            <Chip
                                size='small'
                                color='info'
                                icon={<CalendarTodayIcon />}
                                label={dateMXFormat(created_at)} />
                            <Chip
                                size='small'
                                color='info'
                                icon={<ScheduleIcon />}
                                label={datetimeMXFormat(created_at)} />

                            <Chip
                                size='small'
                                color='info'
                                icon={<ScheduleIcon />}
                                label={tiempoTranscurrido(created_at)} />
                        </Stack>

                    </Stack>

                    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} gap={'10px'}>

                        <Stack flexDirection={'row'} alignItems={'center'} flexWrap={'wrap'} gap={'20px'}>

                            <Stack>
                                <Typography variant='caption'>
                                    {numero_tanque != null ? 'Tanque ' : 'Pipa '}
                                </Typography>
                                <Typography variant='button'>
                                    {numero_tanque != null ? numero_tanque : numero_pipa}
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography variant='caption'>
                                    Tipo de lavado
                                </Typography>
                                <Typography variant='button'>
                                    {tipo_lavado}
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack flexDirection={'row'} alignItems={'center'} flexWrap={'wrap'} gap={'10px'}>

                            <Button
                                onClick={() => setModal(true)}
                                endIcon={<ManageSearchIcon />}
                                size='small'
                                variant='contained'
                                color='primary'
                            >checklist</Button>
                        </Stack>

                    </Stack>

                </Paper>
            </Box>
            {/* 
            <Modal open={modal}>
                <Container sx={{ display: 'flex', flexDirection: 'column', paddingTop: '5%', minHeight: '100vh', width: '100vw', alignItems: 'center' }}>
                    <Paper sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', width: '90vw', maxWidth: '700px' }}>
                        <Stack
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                        >
                            <Typography variant="button">
                                inspección de calidad
                            </Typography>

                            <IconButton
                                onClick={() => setModal(!modal)}
                            >
                                <ClearIcon color='error' />
                            </IconButton>
                        </Stack>

                        <ContainerScroll height={'400px'}>
                            <Stack gap='8px'>
                                {prelavadosInJson.map((question) => (
                                    <Paper elevation={2} sx={{ padding: '15px' }} key={question.question}>
                                        <Stack gap={'5px'}>
                                            <Typography variant='body2'>
                                                {question.question}
                                            </Typography>

                                            <Typography variant='caption'>
                                                {question.value}
                                            </Typography>
                                        </Stack>
                                    </Paper>
                                ))}
                            </Stack>
                        </ContainerScroll>


                    </Paper>
                </Container>
            </Modal> */}

        </>
    )
}
