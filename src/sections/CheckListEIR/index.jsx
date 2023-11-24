import { useState } from "react";
import { Box } from "@mui/material";
import { StepBarProgress } from "../StepsManiobras/StepBarProgress";
import { useCheckList } from "../../Hooks/useChecklist";

function CheckListEIR() {
    const [step, setStep] = useState(1);

    //inicio del hook de checklist
    const mockListCheck = [
        {
            question: 'PANEL FROTAL',
            value: null,
            preview: '',
            image: '',
            coment: '',
        },
        {
            question: 'MARCO FRONTAL',
            value: null,
            preview: '',
            image: '',
            coment: '',

        },
        {
            question: 'PANEL TRASERO',
            value: null,
            preview: '',
            image: '',
            coment: '',

        },
        {
            question: 'MARCO TRASERO',
            value: null,
            preview: '',
            image: '',
            coment: '',

        },
        {
            question: 'PANEL DERECHO',
            value: null,
            preview: '',
            image: '',
            coment: '',
        },
        {
            question: 'MARCO DERECHO',
            value: null,
            preview: '',
            image: '',
            coment: '',
        },
        {
            question: 'PANEL IZQUIERDO',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'MARCO IZQUIERDO',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'PANEL SUPERIOR',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'MARCO SUPERIOR',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'PANEL INFERIOR',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'MARCO INFERIOR',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'NOMENCLATURA',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'ESCALERAS',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'PASARELAS',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'ENTRADA DE HOMBRE',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'MARIPOSAS DE E. HOMBRE',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'VÁLVULA DE PRESIÓN Y ALIVIO',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'TUBO DE DESAGÜE',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'VÁLVULA DE ALIVIO',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'BRIDA CIEGA',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'MANÓMETRO',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'TERMÓMETRO',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'PLACA DE DATOS',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'PORTA DOCUMENTOS',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'TUBO DE VAPOR',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'TAPONES DE TUBO DE VAPOR',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'SISTEMA DE CALENTAMIENTO ELÉCTRICO',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'VÁLVULA DE PIE DE TANQUE',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'VÁLVULA DE DESCARGA',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'TAPÓN DE VÁLVULA DE DESCARGA',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'MANERAL DE VÁLVULA DE SEGURIDAD',
            value: null,
            preview: '',
            image: '',
            coment: ''
          },
          {
            question: 'CIERRE DE EMERGENCIA REMOTO',
            value: null,
            preview: '',
            image: '',
            coment: ''
          }
    ]
    const { actions, states } = useCheckList(mockListCheck)
    const { ChangueInput, ChangueComent, ChangueImage, DiscardImage} = actions
    const { listCheck, nextStep } = states
    ///fin del hook

    return ( 
        <>
          <Box 
           sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
           }}>

            <StepBarProgress step={step} />

           


           </Box>
        </>
     );
}

export {CheckListEIR};