import { Box, Typography, Chip } from "@mui/material";

function TextGeneral({ width, text, label, variant, onClick, styles }) {
    return (
        <>
            {!variant && (
                <Box width={width? width: 'auto'}>
                    <Typography variant="subtitle2">{label}</Typography>
                    <Typography variant='body1'>{text}</Typography>
                </Box>
            )}

            {variant === 'chip' && (
                <Box sx={{display:'flex', alignItems:'center', flexDirection:'column', gap:'10px'}}>
                    <Typography variant="subtitle2">{label}</Typography>
                    <Chip size="small" color="info" onClick={onClick} label={text} />
                </Box>
            )}

             {variant === 'row' && (
                <Box sx={{display:'flex', alignItems:'center', flexDirection:'row', gap:'10px'}}>
                    <Typography variant="subtitle2">{label}</Typography>
                    <Box sx={{
                        padding:'5px',
                        borderRadius:'5px',
                    }}>
                    <Typography variant='body1'>{text}</Typography>
                    </Box>
                </Box>
            )}


        </>
    );
}

export { TextGeneral };