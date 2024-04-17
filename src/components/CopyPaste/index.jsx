import { useState, useRef } from "react";
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import { IoIosCopy } from "react-icons/io";
import { CopyToClipboard } from "react-copy-to-clipboard";

export function CopyPaste({ text }) {

    const [copy, setCopy] = useState(false)
    const textRef = useRef();

    return (
        <>
            <Paper
               elevation={1}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'between',
                    backgroundColor:'whitesmoke',
                    gap: '10px'
                }}>
                <CopyToClipboard text={text}
                    onCopy={() => setCopy(true)}>
                    <Stack flexDirection='row' gap='5px' alignItems='center' paddingX='10px' borderRadius='4px' >
                        <Typography fontSize='11px' fontWeight='500'  >{text}</Typography>
                        <IconButton
                            size="small"
                        >
                            <IoIosCopy style={{ color: copy ? '#0288d1' : '', fontSize: '14px' }} />
                        </IconButton>
                    </Stack>
                </CopyToClipboard>


            </Paper>
        </>
    )
}