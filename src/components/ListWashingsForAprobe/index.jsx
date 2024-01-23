
function ListWashingForAprobe() {

    const [url, setUrl] = useState({ image: '', preview: '', notes: '' });

    return (
        <>

        </>
    );
}

export { ListWashingForAprobe };

///componentes de calidad 

function EvidenceURL({ url, setUrl }) {

    const onChangueImage = (e) => {
        const file = e.target.files[0];
        const urlImage = URL.createObjectURL(file);
        setUrl({ ...url, image: file, preview: urlImage });
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', background: 'whitesmoke', gap: '10px', padding: '15px' }}>


                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px', gap: '10px' }}>

                    <Stack
                        width='100%'
                        flexDirection='row'
                        alignItems={url.preview === '' ? 'center' : 'flex-start'}
                        justifyContent={url.preview === '' ? 'flex-start' : 'space-between'} >
                        <Typography textAlign='start'>Anexa evidencias de la prueba URL</Typography>
                        {(url.preview != '') &&
                            <IconButton onClick={() => setUrl({ ...url, image: '', preview: '' })} >
                                <DeleteIcon color="error" />
                            </IconButton>}
                    </Stack>

                    {(url.preview != '') &&
                        <CardMedia
                            component="img"
                            height="140"
                            image={url.preview}
                            alt="prueba_url"
                        />}

                    {(url.preview === '') &&
                        <Box
                            sx={{
                                display: 'flex',
                                height: '140px',
                                width: '140px',
                                alignItems: 'center',
                                bgcolor: 'whitesmoke',
                                justifyContent: 'center',
                            }} >
                            <InsertPhotoIcon color='action' fontSize='large' />
                        </Box>}

                    <CardContent sx={{ padding: '0px', width: '100%' }}>
                        <Typography gutterBottom variant="h6">
                            Notas adicionales
                        </Typography>
                        <TextField
                            multiline
                            rows={2}
                            sx={{ width: '100%', padding: '5px', borderRadius: '4px', }}
                            value={url.notes}
                            onChange={(e) => setUrl({ ...url, notes: e.target.value })}
                        />

                    </CardContent>

                    <CardActions sx={{ padding: '0px' }}>

                        <input
                            type="file"
                            accept="image/*"
                            id={`url-input`}
                            style={{ display: "none" }}
                            onChange={(e) => onChangueImage(e)}
                        />
                        <label htmlFor={`url-input`}>
                            <Button
                                variant="contained"
                                component="span"
                                startIcon={<AddAPhotoIcon />}
                            >
                                Adjuntar evidencia
                            </Button>
                        </label>
                    </CardActions>
                </Card>

            </Box>
        </>
    )
}

function AsigmentSeals({ }) {

    const submit = (e) => {
        e.preventDefault();

        const formulario = e.target;
        const formData = new FormData(formulario);

        const valuesForm = [];

        for (const [campo, valor] of formData.entries()) {
            if (valor != '') {
                valuesForm.push({ [campo]: valor });
            }
        }

        console.log(valuesForm)
    }

    return (
        <>
            <form onSubmit={submit}>
                <Paper sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
                    <ContainerScroll height='300px'>
                        <Stack gap='10px'>
                            <TextField label='sello #1' id="sello-1" name="sello-1" />
                            <TextField label='sello #2' id="sello-2" name="sello-2" />
                            <TextField label='sello #3' id="sello-3" name="sello-3" />
                            <TextField label='sello #4' id="sello-4" name="sello-4" />
                            <TextField label='sello #5' id="sello-5" name="sello-5" />
                            <TextField label='sello #6' id="sello-6" name="sello-6" />
                            <TextField label='sello #7' id="sello-7" name="sello-7" />
                            <TextField label='sello #8' id="sello-8" name="sello-8" />
                            <TextField label='sello #9' id="sello-9" name="sello-9" />
                            <TextField label='sello #10' id="sello-10" name="sello-10" />
                        </Stack>
                    </ContainerScroll>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color='primary'>
                        asignar sellos
                    </Button>
                </Paper>
            </form>
        </>
    )
}
