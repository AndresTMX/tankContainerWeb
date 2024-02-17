import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLayout } from "../../Hooks/Layout";
import { GridItemColumn } from "../GridItemColumn";
import { Stack, Chip, Grid, } from "@mui/material";

function GridBlock({ tipos, simulateState, bloque }) {

    const [level, setLevel] = useState('1');
    const toggleLevel = (level) => setLevel(level)

    const { stateLayout } = useLayout(tipos, level, simulateState, bloque);

    const [columns, setColumns] = useState([])

    useEffect(() => {
        // Extraer columnas únicas
        const columnasUnicas = stateLayout.reduce((columnas, objeto) => {
            if (!columnas.includes(objeto.columna)) {
                columnas.push(objeto.columna);
            }
            return columnas;
        }, []);
        setColumns(columnasUnicas)
    }, [stateLayout])

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
                sx={{
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    height: '100%',
                    minWidth: '700px',
                    maxWidth: '1200px',
                    bgcolor: 'whitesmoke',
                    overflowY: 'auto',
                    overflowX: 'auto',
                    maxHeight: '80vh',
                }}>

                {columns.map((columna) => (
                    <GridItemColumn key={columna} stateLayout={stateLayout} column={columna} level={level} tipos={tipos} bloque={bloque} />
                ))}

            </Grid>

        </Stack>
    );
}

export { GridBlock }