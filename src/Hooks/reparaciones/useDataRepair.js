import { useEffect, useState } from "react";

function useDataRepair(typeRepair, dataTanque, dataChecklist) {

    const [materials, setMaterials] = useState([])
    const [evidences, setEvidences] = useState([])
    const [concepts, setConcepts] = useState([])

    const routerData = () => {

        const routes = {
            pendiente: () => extractDataPending(),
            proceso: () => extractDataProcess(),
            completado: () => { }
        }

        if (routes[typeRepair]) {
            routes[typeRepair]()
        }
    }

    const extractDataPending = () => {
        const questionsWhitEvidence = dataChecklist.filter((question) => question.image != '');
        setEvidences(questionsWhitEvidence);
    }

    const extractDataProcess = () => {
        const dataReparation = JSON.parse(dataTanque.data);
        const questionsForAddEvidence = dataReparation.repairs.map((question) => ({
            ...question,
            previewEvidence: '',
            imageEvidence: '',
        }));
        setEvidences(questionsForAddEvidence)
        setConcepts(dataReparation.proforma)
    }


}

export { useDataRepair };