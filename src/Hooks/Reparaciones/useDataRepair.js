import { useEffect, useState } from "react";

function useDataRepair(typeRepair, dataTanque, dataChecklist, loading) {

    useEffect(() => {
        routerData()
    }, [typeRepair, loading])

    useEffect(() => {
        setChecklist(dataChecklist)
    }, [dataChecklist])

    const [imagesChecklist, setImagesChecklist] = useState([])
    const [evidences, setEvidences] = useState([])

    //stados de la dataGrid de conceptos
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    //stados de la dataGrid de materiales
    const [rowsMaterials, setRowMaterials] = useState([]);
    const [rowModesMaterials, setRowModesMaterials] = useState({});
    const [checklist, setChecklist] = useState(dataChecklist)

    const routerData = () => {

        const routes = {
            pendiente: () => chargueChecklist(),
            proceso: () => extractDataProcess(),
            completado: () => extractDataComplete()
        }

        if (routes[typeRepair]) {
            routes[typeRepair]()
        }
    }

    const chargueChecklist = () => {
        setImagesChecklist(dataChecklist);
    }

    const extractDataProcess = () => {
        const dataReparation = JSON.parse(dataTanque.data);
        setEvidences(dataReparation.repairs)
        setRows(dataReparation.proforma)
    }

    const extractDataComplete = () => {
        const dataReparation = JSON.parse(dataTanque.data);
        const repairs = JSON.parse(dataReparation.repairs)
        setEvidences(repairs)
        setRows(dataReparation.proforma)
        setRowMaterials(dataReparation.materiales)
    }

    const toggleImage = (question) => {
        const exist = evidences.findIndex((quest) => quest.question === question.question);
        let newState

        if (exist >= 0) {
            setEvidences(evidences.filter((quest) => quest.question != question.question));
        } else {
            newState = evidences.length >= 1 ? [...evidences] : [];
            newState.push(question)
            setEvidences(newState)
        }
    }

    const onChangueImage = (event, index) => {
        const copyState = [...evidences];
        const file = event.target.files[0];
        const urlImage = URL.createObjectURL(file);
        copyState[index].previewEvidence = urlImage;
        copyState[index].imageEvidence = file;
        setEvidences(copyState)
    }

    const onDeleteImage = (index) => {
        const copyState = [...evidences];
        copyState[index].previewEvidence = '';
        copyState[index].imageEvidence = '';
        setEvidences(copyState)
    }

    const upLoadImage = async (indexInput, event) => {
        const copyState = [...checklist];

        const file = event.target.files[0];
        const urlImage = URL.createObjectURL(file);
        if (file) {
            copyState[indexInput].image = file;
            copyState[indexInput].preview = urlImage;
        }

        setChecklist(copyState);

    };

    const states = { evidences, imagesChecklist, rows, rowModesModel, rowsMaterials, rowModesMaterials, checklist }
    const actions = { toggleImage, onChangueImage, onDeleteImage, setRows, setRowModesModel, setRowMaterials, setRowModesMaterials, upLoadImage }

    return { states, actions }


}

export { useDataRepair };