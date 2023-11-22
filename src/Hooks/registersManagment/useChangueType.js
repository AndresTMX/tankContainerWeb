import { useState } from "react";
function useChangueType() {
    
    const [typeRegister, setTypeRegister] = useState('entrada');

    const handleTypeRegister = (newType) => {
        setTypeRegister(newType)
    }

    
    return {typeRegister, handleTypeRegister }
}

export {useChangueType};