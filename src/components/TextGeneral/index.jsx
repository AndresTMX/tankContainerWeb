import { Box, Typography, Chip } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

function TextGeneral({ text, label, variant, onClick }) {
    return (
        <>
            {!variant && (
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

             {variant === 'row' && (
                <Box sx={{display:'flex', alignItems:'center', flexDirection:'row', gap:'20px'}}>
                    <Typography variant="subtitle2">{label}</Typography>
                    <Box sx={{
                        backgroundColor:'white',
                        padding:'5px',
                        borderRadius:'5px'
                    }}>
                    <Typography variant='body1'>{text}</Typography>
                    </Box>
                </Box>
            )}


        </>
    );
}

export { TextGeneral };