import { useState } from "react";
import { Tab, Tabs, Box } from "@mui/material";
import { CustomTabPanel } from "../CustomTabPanel";
import { AddTanksStored } from "../AddTanksStored";
import { AddNewTanks } from "../AddNewTanks";

function AddTankManiobra({ dataTank, setDataTank, toggleTank }) {

    const [tab, setTab] = useState(0)

    const toggleTab = (event, newValue) => {
        setTab(newValue);
    }

    return (
        <Box sx={{width:'100%', padding:'10px'}}>

            <Tabs value={tab} onChange={toggleTab}>
                <Tab label='Tanques almacenados' />
                <Tab label='Nuevos tanques' />
            </Tabs>


            <CustomTabPanel value={tab} index={0}>
                <AddTanksStored toggleTank={toggleTank}/>
            </CustomTabPanel>

            <CustomTabPanel value={tab} index={1}>
                <AddNewTanks setDataTank={setDataTank} dataTank={dataTank}/>
            </CustomTabPanel>


        </Box>
    );
}

export { AddTankManiobra };