import { Box, Typography, Chip } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

function TextGeneral({ text, label, variant, onClick }) {
    return (
        <>
            {variant != 'chip' && (
                <Box width={'100%'}>
                    <Typography variant="subtitle2">{label}</Typography>
                    <Typography variant='body1'>{text}</Typography>
                </Box>
            )}

            {variant === 'chip' && (
                <Box sx={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                    <Typography variant="subtitle2">{label}</Typography>
                    <Chip size="small" color="info" onClick={onClick} label={text} />
                </Box>
            )}


        </>
    );
}

export { TextGeneral };