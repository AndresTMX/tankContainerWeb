import { useState } from "react";
import { Outlet } from "react-router-dom";
import { GridItemColumn } from "../GridItemColumn";
import { Stack, Chip, Grid, } from "@mui/material";
import { useLayout } from "../../Hooks/Layout";

function GridContainer58() {

    const [level, setLevel] = useState('1');
    const toggleLevel = (level) => setLevel(level)

    const simulateState = [
        {
            bloque:'a',
            nivel: '1',
            fila: '1',
            columna: '1',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '2',
            columna: '1',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '3',
            columna: '1',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '4',
            columna: '1',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '5',
            columna: '1',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '6',
            columna: '1',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '1',
            columna: '2',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '2',
            columna: '2',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '3',
            columna: '2',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '4',
            columna: '2',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '5',
            columna: '2',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '6',
            columna: '2',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '1',
            columna: '3',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '2',
            columna: '3',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '3',
            columna: '3',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '4',
            columna: '3',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '5',
            columna: '3',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '6',
            columna: '3',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '1',
            columna: '4',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '2',
            columna: '4',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '3',
            columna: '4',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '4',
            columna: '4',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '5',
            columna: '4',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '6',
            columna: '4',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '1',
            columna: '5',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '2',
            columna: '5',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '3',
            columna: '5',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '4',
            columna: '5',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '1',
            fila: '5',
            columna: '5',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '1',
            columna: '1',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '2',
            columna: '1',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '3',
            columna: '1',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '4',
            columna: '1',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '5',
            columna: '1',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '6',
            columna: '1',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '1',
            columna: '2',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '2',
            columna: '2',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '3',
            columna: '2',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '4',
            columna: '2',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '5',
            columna: '2',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '6',
            columna: '2',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '1',
            columna: '3',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '2',
            columna: '3',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '3',
            columna: '3',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '4',
            columna: '3',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '5',
            columna: '3',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '6',
            columna: '3',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '1',
            columna: '4',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '2',
            columna: '4',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '3',
            columna: '4',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '4',
            columna: '4',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '5',
            columna: '4',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '6',
            columna: '4',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '1',
            columna: '5',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '2',
            columna: '5',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '3',
            columna: '5',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '4',
            columna: '5',
            numero_tanque: null,
        },
        {
            bloque:'a',
            nivel: '2',
            fila: '5',
            columna: '5',
            numero_tanque: null,
        },

    ]

    const tipos = ['NFC', 'FCOJ / NFC', 'FCOJ']

    const { stateLayout } = useLayout(tipos, level, simulateState);

    return (
        <Stack gap='20px' alignItems='center'>

            <Stack flexDirection='row' alignItems='center' justifyContent='flex-end' gap='10px' >
                <Chip onClick={() => toggleLevel('1')} color={level === '1' ? 'primary' : 'default'} label='nivel 1' />
                <Chip onClick={() => toggleLevel('2')} color={level === '2' ? 'primary' : 'default'} label='nivel 2' />
            </Stack>

            <Outlet />

            <Grid
                container
                spacing={1}
                direction='row'
                justifyContent='center'
                sx={{ paddingTop: '10px', paddingBottom: '10px', height: '100%', minWidth: '700px', maxWidth: '1200px', bgcolor: 'whitesmoke' }}>

                <GridItemColumn stateLayout={stateLayout} column={'1'} level={level} tipos={tipos} />

                <GridItemColumn stateLayout={stateLayout} column={'2'} level={level} tipos={tipos} />

                <GridItemColumn stateLayout={stateLayout} column={'3'} level={level} tipos={tipos} />

                <GridItemColumn stateLayout={stateLayout} column={'4'} level={level} tipos={tipos} />

                <GridItemColumn stateLayout={stateLayout} column={'5'} level={level} tipos={tipos}/>



            </Grid>

        </Stack>
    );
}

export { GridContainer58 }