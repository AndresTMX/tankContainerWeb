import { useState, useEffect } from "react";
import { DinamicItem } from "../../pages/Layout";
import { Box, Stack, Chip, Grid, } from "@mui/material";
import { useLayout } from "../../Hooks/Layout";

function GridContainer58({ items }) {

    //recibe todos los contenedores que sean de tipo NFC/FCOJ
    const [level, setLevel] = useState(true);

    const { CountForType, actualizarEstadoPorDefecto, count, types } = useLayout();

    
    const simulateLevelOne = [
        {
            nivel: '1',
            fila: '1',
            columna: '1',
            numTank: null
        },
        {
            nivel: '1',
            fila: '2',
            columna: '1',
            numTank: null
        },
        {
            nivel: '1',
            fila: '3',
            columna: '1',
            numTank: null
        },
        {
            nivel: '1',
            fila: '4',
            columna: '1',
            numTank: null
        },
        {
            nivel: '1',
            fila: '5',
            columna: '1',
            numTank: null
        },
        {
            nivel: '1',
            fila: '6',
            columna: '1',
            numTank: null
        },


    ]

    const [columnOne, setColumnOne] = useState(simulateLevelOne)
    console.log("🚀 ~ GridContainer58 ~ columnOne:", columnOne)

    useEffect(() => {
        CountForType(columnOne)
    }, [level])

    const toggleLevel = () => setLevel(!level)

    const simulateItem = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6']
    const simulateItem2 = ['1', '2', '3', '4', '5']

    const EjeY1 = simulateLevelOne.filter((item) => item.columna === '1')

    const EjeY2 = simulateLevelOne.filter((item) => item.nivel === '1' && item.columna === '2')



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
                                {columnOne.map((item) => (
                                    <DinamicItem sizeItem={2} item={item} />
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