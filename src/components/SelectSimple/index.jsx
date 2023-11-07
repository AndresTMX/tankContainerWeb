import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

function SelectSimple({title, value, options, onChange, helperText, width, required}) {


    return (
        <>
            <FormControl sx={{ m: 1, width: width? width: '200px' }}>
                <InputLabel>{title}</InputLabel>
                <Select
                    required={required}
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