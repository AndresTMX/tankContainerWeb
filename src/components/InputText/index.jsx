import { useState } from "react";
import { TextField, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function InputText({ label, variant, value, onChangue, width, type, required }) {

    const [pass, setPass] = useState(false);

    const handleClickShowPassword = () => setPass(!pass);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <>

            {!type &&
                <TextField
                    required={required}
                    sx={{
                        width: width ? width : '200px'
                    }}
                    value={value}
                    label={label}
                    onChange={onChangue}
                    variant={variant ? variant : "outlined"} />}

            {type === 'textarea' &&
                <TextField
                    required
                    multiline
                    maxRows={5}
                    sx={{
                        width: width ? width : '200px',
                    }}
                    value={value}
                    label={label}
                    onChange={onChangue}
                    variant={variant ? variant : "outlined"} />}

            {type === 'password' && (
                <FormControl sx={{ m: 1, width: width ? width : '200px' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        value={value}
                        onChange={onChangue}
                        required={true}
                        id="outlined-adornment-password"
                        type={ pass? 'password' : 'text'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {pass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
            )}
        </>
    );
}

export { InputText };