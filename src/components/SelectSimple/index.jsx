import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

function SelectSimple({title, value, options, onChange, helperText}) {


    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel>{title}</InputLabel>
                <Select
                    value={value}
                    label={title}
                    onChange={onChange}
                >
                    {
                        options.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))
                    }
                </Select>
                { helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
        </>
    );
}

export { SelectSimple };