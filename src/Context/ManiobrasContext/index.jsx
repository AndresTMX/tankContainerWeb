import { createContext, useContext, useState } from "react";

const ManiobrasContext = createContext();

const ManiobrasProvider = ({ children }) => {

    const [step, setStep] = useState(1);

    const [checklist, setChecklist] = useState({});

    const [item, setItem] = useState({});

    const checklistResponseAll = {
        paneles: [
            {
                question: 'PANEL FROTAL',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                section: 'panel',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'PANEL IZQUIERDO',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                section: 'panel',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'PANEL DERECHO',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                section: 'panel',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'PANEL INFERIOR',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                section: 'panel',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'PANEL SUPERIOR',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                section: 'panel',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'PANEL TRASERO',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                section: 'panel',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']

            },
        ],
        marcos: [
            {
                question: 'MARCO FRONTAL',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },

            {
                question: 'MARCO TRASERO',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']

            },
            {
                question: 'MARCO DERECHO',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'MARCO IZQUIERDO',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'MARCO SUPERIOR',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'MARCO INFERIOR',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
        ],
        informacion: [
            {
                question: 'NOMENCLATURA',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'PLACA DE DATOS',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'PORTA DOCUMENTOS',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
        ],
        entradas: [
            {
                question: 'ESCALERAS',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'PASARELAS',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'ENTRADA DE HOMBRE',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']

            },
            {
                question: 'MARIPOSAS DE E. HOMBRE',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'MANERAL DE VÁLVULA DE SEGURIDAD',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
        ],
        valvulas: [
            {
                question: 'VÁLVULA DE PRESIÓN Y ALIVIO',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'VÁLVULA DE ALIVIO',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'VÁLVULA DE PIE DE TANQUE',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'VÁLVULA DE DESCARGA',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                step: '5',
                section: 'valvula',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'TAPÓN DE VÁLVULA DE DESCARGA',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'TAPONES DE TUBO DE VAPOR',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'BRIDA CIEGA',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'TUBO DE DESAGÜE',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'TUBO DE VAPOR',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
        ],
        sistemas: [
            {
                question: 'CIERRE DE EMERGENCIA REMOTO',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'SISTEMA DE CALENTAMIENTO ELÉCTRICO',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'MANÓMETRO',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
            {
                question: 'TERMÓMETRO',
                value: 'buen estado',
                preview: '',
                image: '',
                coment: '',
                correct: 'buen estado',
                options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
            },
        ],
    }

    const CheckAll = () => {
        setChecklist(checklistResponseAll);
        setStep(7)
    }

    return (
        <ManiobrasContext.Provider value={{ step, setStep, checklist, setChecklist, item, setItem, CheckAll }}>
            {children}
        </ManiobrasContext.Provider>
    )
}

function useManiobrasContext() {
    const context = useContext(ManiobrasContext);
    return context;
}

export { ManiobrasContext, ManiobrasProvider, useManiobrasContext }

