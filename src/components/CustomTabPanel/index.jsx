import { Box } from "@mui/material";
function CustomTabPanel({children, value, index}) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{paddingTop:'20px', paddingBottom:'20px'}}>
                   {children}
                </Box>
            )}
        </div>
    );
}

export { CustomTabPanel };