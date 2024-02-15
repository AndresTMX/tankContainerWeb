import { useState } from "react";
import { Box, Tab, Tabs, Grid, Stack} from "@mui/material";
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

            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', flexDirection: 'column', display: 'flex', height: '100%', padding:'10px', width:'100%' }}>

                <Box sx={{ display: 'flex', alignItems: 'start', }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        orientation={"horizontal"}
                        scrollButtons
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

                <CustomTabPanel value={value} index={0}>
                    <Stack width='100%' height='100%' >
                        <GridContainer58 />
                    </Stack>
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


        </>
    );
}

export { Layout };

