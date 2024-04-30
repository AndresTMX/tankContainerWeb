import dayjs from "dayjs";
import supabase from "../../supabase";
import { sendImageCloudinary } from "../../cloudinary";

function useUpdateRepair() {

    //cloudinary data
    const preset = 'mvtjch9n';
    const folderName = 'evidencias_reparacion';

    const updateRepair = async (questionsForUpdate, dataMaintance, idRepair) => {

        const { proforma, repairs } = dataMaintance;

        try {

            let updates;

            if (questionsForUpdate.length >= 1) {
                const checklistUpdate = await updateImagesReparation(repairs, questionsForUpdate);

                updates = { proforma, repairs: checklistUpdate }

            } else {
                updates = { proforma, repairs }
            }

            const data = JSON.stringify(updates)

            const { error } = await supabase.from('reparaciones')
                .update({ data, status: 'proceso' })
                .eq('id', idRepair)

            if (error) {
                throw new Error(`Error al actualizar el estatus de la reparacion ${idRepair}`)
            }
        } catch (error) {
           console.error(error?.message)
        }

    }

    const completeRepair = async (updates, idRepair, idRegister) => {

        try {

            const currentDate = new dayjs(new Date()).utc();

            const repairsWhitEvidences = await sendImagesReparation(updates.repairs);

            const updatesRepairs = {
                ...updates,
                repairs: repairsWhitEvidences
            }

            const updatesInJson = JSON.stringify(updatesRepairs)

            const { error: errorUpdateRepair } = await supabase
                .from('reparaciones')
                .update({ status: 'completado', data: updatesInJson, checkOut: currentDate })
                .eq('id', idRepair);

            if (errorUpdateRepair) {
                throw new Error(`Error al actualizar la reparación, error: ${errorUpdateRepair.message}`)
            }

            const { error } = await supabase
                .from('registros_detalles_entradas')
                .update({ status: updates.status })
                .eq('id', idRegister)

            if (error) {
                throw new Error(`Error al actualizar registro de entrada`)
            }

            return { error }
        } catch (error) {
            console.error(error?.message)
        }

    }

    const sendImagesReparation = async (arrayQuestions) => {
        try {
            //recuperar imagenes con preguntas        
            const imagesWhitQuestion = arrayQuestions.filter((question) => question.imageEvidence != '');

            //extraer las imagenes y cambiarles el nombre
            const imagesWhitName = imagesWhitQuestion.map((question) => {
                const oldFile = question.imageEvidence;
                return new File([oldFile], question.question, { type: oldFile.type });
            });

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
                    newItem.previewEvidence = ''
                }
                return newItem
            })

            const checklistWhitUrlInString = JSON.stringify(arrayWhitUrls);

            return checklistWhitUrlInString;

        } catch (error) {
           console.error(error?.message)
        }
    }

    const updateImagesReparation = async (oldQuestions, updateQuestions) => {
        try {

            //extraer las imagenes y cambiarles el nombre
            const imagesWhitName = updateQuestions.map((question) => {
                const oldFile = question.image;
                return new File([oldFile], question.question, { type: oldFile.type });
            });

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
                throw new Error(error?.message)
            }

            //copia profunda del array original 
            const copyFlatInString = JSON.stringify(oldQuestions);
            const copyFlatInJson = JSON.parse(copyFlatInString);

            console.log(links)
            console.log(copyFlatInJson)

            //copia del array original con los cambios listos para enviar la data
            const arrayWhitUrls = copyFlatInJson.map((item) => {
                const newItem = item
                if (typeof newItem.image != 'string') {
                    const indexImage = links.findIndex((link) => link.question === item.question)
                    newItem.image = links[indexImage].url
                    newItem.preview = ''
                }
                return newItem
            })

            return arrayWhitUrls;
        } catch (error) {
            console.error(error?.message)
        }
    }


    return { updateRepair, completeRepair }

}

export { useUpdateRepair };