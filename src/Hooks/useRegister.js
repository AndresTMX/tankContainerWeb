import { useState, useContext, } from "react";

function useRegister({dispatch}) {
    const [send, setSend] = useState(false)

   
    const addRegister = (newRegister) => {
        console.log(newRegister)
        setSend(!send)
    }

    return {addRegister, send}
}

export {useRegister};