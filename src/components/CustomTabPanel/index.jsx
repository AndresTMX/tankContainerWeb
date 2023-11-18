import { Box } from "@mui/material";
function CustomTabPanel({children, value, index}) {
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box 
                sx={{
                    paddingTop:'10px', 
                    }}>
                   {children}
                </Box>
            )}
        </Box>
    );
}

export { CustomTabPanel };