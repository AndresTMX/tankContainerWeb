import { Checkbox, FormControlLabel } from "@mui/material";

function InputCheck({value, onchangue, name }) {
    return ( 
        <>
         <FormControlLabel
         sx={{ margin:'0px'}}
            control={
              <Checkbox size='medium' checked={value} onChange={onchangue} name={name} />
            }
            label={name}
          />
        </>
     );
}

export {InputCheck};