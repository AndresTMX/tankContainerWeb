import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack, Box, Divider } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AccordionSimple({arrayList, name}) {

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id={`accordion-${name}`}
            >
                <Typography variant='overline' fontWeight='500' fontSize='15px'>{name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack gap='20px'>
                    {arrayList.map((item, index) => (
                        <Box
                            sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                            key={item.question}>
                            <Typography>
                                {item.question}
                            </Typography>
                            {index < (arrayList.length - 1) && <Divider />}
                        </Box>
                    ))}
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

export { AccordionSimple };