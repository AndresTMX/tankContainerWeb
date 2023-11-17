import { useState } from "react";
import {usePostTrasporter} from "../Hooks/transportersManagment/usePostTransporter";

function useFormTransporter() {

    const { sendTransporter } = usePostTrasporter();
    const [transporterModal, setTransporterModal] = useState(false);
    const [transporter, setTransporter] = useState('');

    const addTransporter = async() => {
       const data = await sendTransporter(transporter)
       setTransporterModal(!transporterModal)
       setTransporter('')
       return data;
    }

    const toggleFormTransporter = () => {
        setTransporterModal(!transporterModal)
    }
    

    return {transporter, setTransporter, addTransporter, transporterModal, toggleFormTransporter }
}

export {useFormTransporter};