import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ClearIcon from '@mui/icons-material/Clear';

export function ModalVisualizePrelavados({ modal, toggleModal, prelavados, }) {

    const IsSmall = useMediaQuery('(max-width:900px)');
    const [tab, setTab] = useState(0);
    const ToggleTab = (event, newValue) => {
        setTab(newValue)
    }

    const allCheckListInJson = prelavados.map((prelavado) => ({ ...prelavado, data: JSON.parse(prelavado.data) }))

    return (
        <>
            <Modal open={modal}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '700px' }}>
                        <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '20px', }}>
                            <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <Typography variant='button'>Checklists de prelavado</Typography>

                                <IconButton
                                    color='error'
                                    variant='outlined'
                                    onClick={toggleModal}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </Stack>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <Tabs
                                    value={tab}
                                    onChange={ToggleTab}
                                    variant={IsSmall ? "scrollable" : ''}
                                    scrollButtons="auto"
                                >
                                    {allCheckListInJson.map((prelavado, index) => (
                                        <Tab key={prelavado.id} label={`Prelavado ${index + 1}`} />
                                    ))}
                                </Tabs>
                            </Box>

                            {allCheckListInJson.length >= 1 &&
                                allCheckListInJson.map((prelavado, index) => (
                                    <CustomTabPanel key={`panel_${index}`} index={index} value={tab} >
                                        <ContainerScroll height={'400px'} >
                                            <Stack width={'100%'} gap={'8px'} alignItems={'center'}>
                                                {prelavado.data.map((question, index) => (
                                                    <CheckListInspect
                                                        key={`checklist_${index}`}
                                                        question={question}
                                                    />
                                                ))}
                                            </Stack>
                                        </ContainerScroll>
                                    </CustomTabPanel>
                                ))}

                        </Paper>
                    </Box>
                </Container>
            </Modal>
        </>
    )
}

function CheckListInspect({ question }) {

    const [image, viewImage] = useState(false)

    return (
        <>
            <Paper sx={{ padding: '20px', width: '100%' }}>
                <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>

                    <Stack display='flex' flexDirection='column' gap='5px'>
                        {(question?.cubierta) &&
                            <Typography variant='subtitle2'>Tipo de cubierta</Typography>}
                        <Typography variant='subtitle2'>{question.question}</Typography>
                        <Typography variant='caption'>{question?.value ? question.value : question.cubierta}</Typography>
                    </Stack>

                    <Stack display='flex' flexDirection='column' gap='5px'>
                        <IconButton
                            onClick={() => viewImage(!image)}
                            disabled={question?.image ? false : true}
                            color={question?.image ? 'info' : 'default'}
                        >
                            <InsertPhotoIcon />
                        </IconButton>
                    </Stack>


                </Stack>
            </Paper>

            <Modal open={image}>
                <Container
                    onClick={() => viewImage(!image)}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10%' }}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="400px"
                            image={question.image}
                            alt={question?.value ? question.value : question.cubierta}
                        />
                    </Card>
                </Container>
            </Modal>
        </>
    )
}
