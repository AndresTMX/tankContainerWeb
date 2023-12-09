import { useState, useEffect } from "react";
//components
import { Box, Tabs, Tab } from "@mui/material";
import { FormRegisterManiobras } from "../../components/FormRegisterManiobras";
import { CustomTabPanel } from "../../components/CustomTabPanel";
import { RegistersManiobras } from "../../components/RegistersManiobras";
//Notification
import { Notification } from "../../components/Notification";
import { LoadingState } from "../../components/LoadingState";
//helpers
import { EIRManiobras } from "../../components/EIRManiobras";
//hooks
import useMediaQuery from "@mui/material/useMediaQuery";

function Maniobras() {

    const IsSmall = useMediaQuery('(max-width:900px)');

    const [tab, setTab] = useState(0);

    const ToggleTab = (event, newValue) => {
        setTab(newValue)
    }

    return (
        <>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Tabs
                    value={tab}
                    onChange={ToggleTab}
                    variant={IsSmall ? "scrollable" : ''}
                    scrollButtons="auto"
                >
                    <Tab label="Maniobras" />
                    <Tab label="EIR" />
                </Tabs>
            </Box>

            <CustomTabPanel value={tab} index={0}>
                <RegistersManiobras />
            </CustomTabPanel>

            <CustomTabPanel value={tab} index={1}>
                <EIRManiobras />
            </CustomTabPanel>

            <LoadingState duration={1000} />

            <Notification />
        </>
    );
}

export { Maniobras };