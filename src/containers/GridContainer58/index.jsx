import { useState } from "react";
import { DinamicItem } from "../../pages/Layout";
import { Box, Stack, Chip, Grid, } from "@mui/material";

function GridContainer58({ items }) {

    //recibe todos los contenedores que sean de tipo NFC/FCOJ
    const [level, setLevel] = useState(true);

    const toggleLevel = () => setLevel(!level)

    const simulateItem = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6']
    const simulateItem2 = ['1', '2', '3', '4', '5']

    const simulateLevelOne = [ 
        {
            nivel:'1',
            ejey:'1',
            ejex:'1',
            item:'tanque 2',
        },
        {
            nivel:'1',
            ejey:'1',
            ejex:'2',
            item:'',
        },
        {
            nivel:'1',
            ejey:'1',
            ejex:'3',
            item:'',
        },
        {
            nivel:'1',
            ejey:'1',
            ejex:'4',
            item:'',
        },
        {
            nivel:'1',
            ejey:'1',
            ejex:'5',
            item:'',
        },
        {
            nivel:'1',
            ejey:'1',
            ejex:'6',
            item:'',
        },
        {
            nivel:'1',
            ejey:'2',
            ejex:'1',
            item:'',
        },
        {
            nivel:'1',
            ejey:'2',
            ejex:'2',
            item:'',
        },
        {
            nivel:'1',
            ejey:'2',
            ejex:'3',
            item:'',
        },
        {
            nivel:'1',
            ejey:'2',
            ejex:'4',
            item:'',
        },
        {
            nivel:'1',
            ejey:'2',
            ejex:'5',
            item:'',
        },
        {
            nivel:'1',
            ejey:'2',
            ejex:'6',
            item:'',
        },
       
     ]

     const EjeY1 = simulateLevelOne.filter((item) =>  item.nivel === '1' &&  item.ejey === '1'  )

     const EjeY2 = simulateLevelOne.filter((item) =>  item.nivel === '1' &&  item.ejey === '2'  )


    return (
        <>
            <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0px', gap: '20px' }}>

                <Stack flexDirection='row' alignItems='center' justifyContent='flex-end' gap='10px'>
                    <Chip onClick={toggleLevel} color={level ? 'primary' : 'default'} label='nivel 1' />
                    <Chip onClick={toggleLevel} color={!level ? 'primary' : 'default'} label='nivel 2' />
                </Stack>

                {level &&
                    <Grid
                        container
                        spacing={1}
                        direction='row'
                        justifyContent='center'
                        sx={{ background: 'whitesmoke', height: '80vh', width: '100%', maxWidth: '900px' }} >

                        <Grid item xs={2.4}>
                            <Grid container direction='column' spacing={1}
                                sx={{ height: '100%', width: '100%' }}>
                                {EjeY1.map((item) => (
                                    <DinamicItem sizeItem={2} numTank={item.item} />
                                ))}
                            </Grid>
                        </Grid>

                        <Grid item xs={2.4}>
                            <Grid container direction='column' spacing={1}
                                sx={{ height: '100%', width: '100%' }}>
                                {EjeY2.map((item) => (
                                    <DinamicItem sizeItem={2} numTank={item.ejex} />
                                ))}
                            </Grid>
                        </Grid>

                        <Grid item xs={2.4}>
                            <Grid container direction='column' spacing={1}
                                sx={{ height: '100%', width: '100%' }}>
                                {simulateItem.map((item) => (
                                    <DinamicItem sizeItem={2} numTank={item} />
                                ))}
                            </Grid>
                        </Grid>

                        <Grid item xs={2.4}>
                            <Grid container direction='column' spacing={1}
                                sx={{ height: '100%', width: '100%' }}>
                                {simulateItem.map((item) => (
                                    <DinamicItem sizeItem={2} numTank={item} />
                                ))}
                            </Grid>
                        </Grid>

                        <Grid item xs={2.4}>
                            <Grid container direction='column' spacing={1}
                                sx={{ height: '100%', width: '100%' }}>
                                {simulateItem2.map((item) => (
                                    <DinamicItem sizeItem={2} numTank={item} />
                                ))}
                            </Grid>
                        </Grid>


                    </Grid>}

                {!level &&
                    <Grid
                        container
                        spacing={1}
                        direction='row'
                        justifyContent='center'
                        sx={{ background: 'whitesmoke', height: '80vh', width: '100%', maxWidth: '900px' }} >

                        <Grid item xs={2.4}>
                            <Grid container direction='column' spacing={1}
                                sx={{ height: '100%', width: '100%' }}>
                                {simulateItem.map((item) => (
                                    <DinamicItem sizeItem={2} numTank={item} />
                                ))}
                            </Grid>
                        </Grid>

                        <Grid item xs={2.4}>
                            <Grid container direction='column' spacing={1}
                                sx={{ height: '100%', width: '100%' }}>
                                {simulateItem.map((item) => (
                                    <DinamicItem sizeItem={2} numTank={item} />
                                ))}
                            </Grid>
                        </Grid>

                        <Grid item xs={2.4}>
                            <Grid container direction='column' spacing={1}
                                sx={{ height: '100%', width: '100%' }}>
                                {simulateItem.map((item) => (
                                    <DinamicItem sizeItem={2} numTank={item} />
                                ))}
                            </Grid>
                        </Grid>

                        <Grid item xs={2.4}>
                            <Grid container direction='column' spacing={1}
                                sx={{ height: '100%', width: '100%' }}>
                                {simulateItem.map((item) => (
                                    <DinamicItem sizeItem={2} numTank={item} />
                                ))}
                            </Grid>
                        </Grid>

                        <Grid item xs={2.4}>
                            <Grid container direction='column' spacing={1}
                                sx={{ height: '100%', width: '100%' }}>
                                {simulateItem2.map((item) => (
                                    <DinamicItem sizeItem={2} numTank={item} />
                                ))}
                            </Grid>
                        </Grid>


                    </Grid>}

            </Box>
        </>
    );
}

export { GridContainer58 };