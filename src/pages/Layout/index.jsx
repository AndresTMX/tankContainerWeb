import { useState } from "react";
import { Button, IconButton, Box, Tab, Tabs, Select, MenuItem, FormControl, InputLabel, Stack, Grid, Chip, Paper, Typography } from "@mui/material";
import { CustomTabPanel } from "../../components/CustomTabPanel";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";
//components
import { GridContainer58 } from "../../containers/GridContainer58";

function Layout() {

    const movile = useMediaQuery('(max-width:850px)')

    //traer todos los tanques con location y position

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>

            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', flexDirection: movile ? 'column' : 'row', display: 'flex', height: '100%', padding: movile? '5px' :'20px', gap: '20px', alignItems: movile? 'center':'start', justifyContent:'center', paddingBottom:'20px' }}>

                <Box sx={{ height: movile ? 'auto' : '80vh', display: 'flex', alignItems: 'start' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        orientation={movile ? "horizontal" : "vertical"}
                        variant="scrollable"
                    >
                        <Tab label="NFC/FCOJ" />
                        <Tab label="FCOJ/DYU" />
                        <Tab label="Tequila/Aceite" />
                        <Tab label="Prelavado y lavado" />
                        <Tab label="Proceso de prelavado" />
                        <Tab label="Dañados / Reparación" />

                    </Tabs>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>

                    <CustomTabPanel value={value} index={0}>
                        <>
                        <GridContainer58/>
                        </>
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={1}>
                        Item Two
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Item Three
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        Item For
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={4}>
                        Item Five
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={5}>
                        Item Six
                    </CustomTabPanel>
                </Box>
            </Box>


        </>
    );
}

export { Layout };

export function DinamicItem({ sizeItem, numTank }) {

    const empty = numTank === ''? true : false;

    return (
        <Grid item xs={sizeItem} >
            <Paper elevation={4}
             sx={{ height:'100%', width:'100%', background: empty? 'whitesmoke': '#0092ba'}}>
                <Typography>{numTank}</Typography>
            </Paper>
        </Grid>
    )
}