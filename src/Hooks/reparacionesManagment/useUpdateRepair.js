import supabase from "../../supabase";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function useUpdateRepair() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    //cloudinary data
    const url = 'https://api.cloudinary.com/v1_1/dwiyxwcxj/image/upload';
    const preset = 'mvtjch9n';
    const folderName = 'evidencias_reparacion';

    const updateRepair = async (updates, idRepair) => {
        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: true
        });

        try {
            const { error } = await supabase.from('reparaciones')
                .update({ ...updates })
                .eq('id', idRepair)

            if (error) {
                throw new Error(`Error al actualizar el estatus de la reparacion ${idRepair}`)
            }
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            });
        }

        setTimeout(() => {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'Registro actualizado con exito'
            });
        }, 1000)


    }

    const completeRepair = async (updates, idRepair) => {

        dispatchGlobal({
            type: actionTypesGlobal.setLoading,
            payload: true
        });

        try {
            const repairsWhitEvidences = await sendImagesReparation(updates.repairs)
            console.log(repairsWhitEvidences)
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setLoading,
                payload: false
            });
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            });
        }

    }

    const sendImagesReparation = async (arrayQuestions) => {
        console.log("🚀 ~ file: useUpdateRepair.js:78 ~ sendImagesReparation ~ arrayQuestions:", arrayQuestions)
        try {
            //recuperar imagenes con preguntas        
            const imagesWhitQuestion = arrayQuestions.filter((question) => question.imageEvidence != '');
            console.log("🚀 ~ file: useUpdateRepair.js:82 ~ sendImagesReparation ~ imagesWhitQuestion:", imagesWhitQuestion)

            //extraer las imagenes y cambiarles el nombre
            const imagesWhitName = imagesWhitQuestion.map((question) => {
                const oldFile = question.imageEvidence;
                return new File([oldFile], question.question, { type: oldFile.type });
            });
            console.log("🚀 ~ file: useUpdateRepair.js:89 ~ imagesWhitName ~ imagesWhitName:", imagesWhitName)

            //extraer los objetos para mapearlos
            const arrayFiles = Object.values(imagesWhitName)
            const links = [];

            //crear el array de promesas
            const sendImages = arrayFiles.map(async (file) => {
                const formData = new FormData();
                formData.append('folder', folderName);
                formData.append('upload_preset', `${preset}`)
                formData.append('file', file);
                const request = await sendImageCloudinary(formData);
                links.push({ url: request.url, question: request.original_filename })
            });

            //resolver promesas
            try {
                await Promise.all(sendImages);
            } catch (error) {
                dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false })
                dispatchGlobal({ tyoe: actionTypesGlobal.setNotification, payload: error.message })
            }

            //copia profunda del array original 
            const copyFlatInString = JSON.stringify(arrayQuestions);
            const copyFlatInJson = JSON.parse(copyFlatInString);

            //copia del array original con los cambios listos para enviar la data
            const arrayWhitUrls = copyFlatInJson.map((item) => {
                const newItem = item
                if (newItem.imageEvidence != '') {
                    const indexImage = links.findIndex((link) => link.question === item.question)
                    newItem.imageEvidence = links[indexImage].url
                    newItem.preview = ''
                }
                return newItem
            })

            const checklistWhitUrlInString = JSON.stringify(arrayWhitUrls);

            return checklistWhitUrlInString;

        } catch (error) {
            dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false })
            dispatchGlobal({ tyoe: actionTypesGlobal.setNotification, payload: error.message })
        }
    }


    return { updateRepair, completeRepair }

}

export { useUpdateRepair };