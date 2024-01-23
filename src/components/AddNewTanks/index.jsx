import { Stack, TextField, Select, MenuItem, FormControl, Box, InputLabel, } from "@mui/material";

function AddDataTanks({ dataTank, typeTank, setDataTank, setTypeTank }) {

    return (
        <>

            <Stack
                justifyContent='space-around'
                flexDirection='row'
                flexWrap='wrap'
                gap='8px'>

                <InputTank
                    stateTank={dataTank.tanque1}
                    stateType={typeTank.tanque1}
                    onChangeTank={(value) => setDataTank({ ...dataTank, tanque1: value })}
                    onChangeType={(value) => setTypeTank({ ...typeTank, tanque1: value })}
                />

                <InputTank
                    stateTank={dataTank.tanque2}
                    stateType={typeTank.tanque2}
                    onChangeTank={(value) => setDataTank({ ...dataTank, tanque2: value })}
                    onChangeType={(value) => setTypeTank({ ...typeTank, tanque2: value })}
                />

                <InputTank
                    stateTank={dataTank.tanque3}
                    stateType={typeTank.tanque3}
                    onChangeTank={(value) => setDataTank({ ...dataTank, tanque3: value })}
                    onChangeType={(value) => setTypeTank({ ...typeTank, tanque3: value })}
                />

                <InputTank
                    stateTank={dataTank.tanque4}
                    stateType={typeTank.tanque4}
                    onChangeTank={(value) => setDataTank({ ...dataTank, tanque4: value })}
                    onChangeType={(value) => setTypeTank({ ...typeTank, tanque4: value })}
                />

            </Stack>
        </>
    );
}

export { AddDataTanks };

export function InputTank({ stateTank, stateType, onChangeTank, onChangeType }) {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2px', width:'350px', justifyContent:'space-around' }}>

            <FormControl sx={{width:'30%'}}>
                <InputLabel>Tipo</InputLabel>
                <Select
                    sx={{ width: '100%' }}
                    label='Tipo'
                    value={stateType}
                    onChange={(e) => onChangeType(e.target.value)}
                >
                    <MenuItem value='AGMU'>AGMU</MenuItem>
                    <MenuItem value='AFIU'>AFIU</MenuItem>
                    <MenuItem value='DYOU'>DYOU</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{width:'70%'}}>
                <TextField
                    sx={{ width: '100%' }}
                    value={stateTank}
                    onChange={(e) => onChangeTank(e.target.value)}
                    label='Número de tanque'
                />
            </FormControl>

        </Box>
    )
}