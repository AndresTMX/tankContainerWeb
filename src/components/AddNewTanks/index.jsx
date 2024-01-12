import { useEffect, useState, useContext } from "react";
import { Stack, TextField, IconButton, Button } from "@mui/material";
import { ContainerScroll } from "../ContainerScroll";
//icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddIcon from '@mui/icons-material/Add';
//context
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function AddNewTanks({ dataTank, setDataTank }) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const [newTanks, setNewTanks] = useState([''])
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const newState = new Set()
        for (let element of newTanks) {
            newState.add(element)
        }
        setDataTank([...newState])
    }, [update]);

    const addField = () => {

        if (newTanks.length === 4) {
            alert('no puedes agregar mas de 4 tanques a un tracto')
        } else {
            const newState = [...newTanks]
            newState.push('')
            setNewTanks(newState)
        }
    }

    const saveField = () => {
        setUpdate(!update)
    }

    const deleteField = (index) => {
        const newState = [...newTanks]
        newState.splice(index, 1)
        setNewTanks(newState)
        setUpdate(!update)

    }

    const onChangueField = (index, value) => {
        const newState = [...newTanks]
        newState[index] = value
        setNewTanks(newState)
    }

    const validateExist = (index) => {
        return dataTank[index]
    }

    const length = newTanks.length;

    return (
        <>

            <Stack gap='8px'>

                <Stack flexDirection={'row'} justifyContent={'space-between'}>
                    <Button
                        variant="contained"
                        onClick={addField}
                        endIcon={<AddIcon />
                        }>
                        Agregar otro
                    </Button>

                </Stack>

                {
                    newTanks.map((element, index) => (
                        <InputTank
                            key={index}
                            index={index}
                            value={element}
                            validateExist={validateExist}
                            onChange={onChangueField}
                            deleteField={deleteField}
                            saveField={saveField}
                            length={length}
                        />
                    ))
                }
            </Stack>
        </>
    );
}

export { AddNewTanks };

function InputTank({ value, onChange, index, deleteField, saveField, validateExist, length }) {

    const buttonSave = validateExist(index);

    return (
        <Stack flexDirection='row' alignItems='center' gap='5px'>
            <TextField
                id={`addTank_${index}`}
                sx={{ maxWidth: '89%' }}
                fullWidth
                value={value}
                onChange={(e) => onChange(index, e.target.value)} />

            <IconButton
                color="info"
                disabled={buttonSave}
                onClick={saveField}
            >
                <SaveAsIcon fontSize="large" />
            </IconButton>

            <IconButton
                color="error"
                onClick={() => deleteField(index)}
            >
                <RemoveCircleIcon fontSize="large" />
            </IconButton>
        </Stack>
    )
}