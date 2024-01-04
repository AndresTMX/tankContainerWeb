import supabase from "../../supabase";
import { useState, useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { usePostRegister } from "../Maniobras/usePostRegister";
import { ManiobrasContext } from "../../Context/ManiobrasContext";
import { actionTypes } from "../../Reducers/ManiobrasReducer";
import { AuthContext } from "../../Context/AuthContext";
import { sendImageCloudinary } from "../../cloudinary";


function usePostCheckList() {

    const { key } = useContext(AuthContext)
    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const [state, dispatch] = useContext(ManiobrasContext)

    const tableManiobrasChecklist = 'maniobras_checklist'
    const tableReparaciones = 'reparaciones'
    //cloudinary data
    const preset = 'mvtjch9n';
    const folderName = 'maniobras_checklist';

    const [errorPost, setErrorPost] = useState(false)
    const [request, setRequest] = useState(false)
    const { updateStatusRegisters } = usePostRegister();

    const sendCheckList = async (dataCheck, flatCheckList) => {
        try {
            dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: true })
            setErrorPost(false)
            setRequest(false)

            const idRegistro = dataCheck.registro_detalle_entrada_id;

            if (state.status === 'interna' || state.status === 'externa') {

                const { dataRepair, errorRepair } = await supabase
                    .from(tableReparaciones)
                    .insert({
                        id_usuario: key,
                        id_detalle_registro: state.selectItem.id,
                        numero_tanque: state.selectItem.numero_tanque,
                        status: 'pendiente',
                        tipo_reparacion: state.status,
                    })

                if (errorRepair) {
                    throw new Error(`Error: ${errorRepair}`)
                }
            }

            const updateStatus = state.status != 'prelavado' ? 'reparacion' : state.status;

            const { error: errorUpdateTank } = await supabase
                .from('tanques')
                .update({ status: updateStatus })
                .eq('tanque', state.selectItem.numero_tanque)

            if (errorUpdateTank) {
                throw new Error(`Error: ${errorUpdate}`)
            }

            const { errorUpdate } = await supabase.from('registros_detalles_entradas')
                .update({ status: updateStatus })
                .eq('id', idRegistro)

            if (errorUpdate) {
                throw new Error(`Error: ${errorUpdate}`)
            }

            const checklitContainImages = flatCheckList.filter((item) => item.image != '');

            let checklist

            if (checklitContainImages.length === 0) {
                checklist = {
                    ...dataCheck,
                    data: JSON.stringify(flatCheckList)
                }
            } else {
                const data = await sendImagesChecklist(flatCheckList);
                checklist = {
                    ...dataCheck,
                    data: data
                }
            }

            const { data, error } = await supabase
                .from(tableManiobrasChecklist)
                .insert({ ...checklist })
                .select()

            if (error) {
                throw new Error(error.message)
            }

            setTimeout(() => {
                dispatch({ type: actionTypes.setSelectItem, payload: false })
                dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false })
            }, 1000)


        } catch (error) {
            setErrorPost(error)
            dispatch({ type: actionTypes.setSelectItem, payload: false })
            dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false })
            dispatchGlobal({ type: actionTypesGlobal.setNotification, payload: error.message })
        }

    }

    const sendImagesChecklist = async (flatCheckList) => {

        try {
            //recuperar imagenes con preguntas        
            const imagesWhitQuestion = flatCheckList.filter((question) => question.image != '');

            //extraer las imagenes y cambiarles el nombre
            const imagesWhitName = imagesWhitQuestion.map((question) => {
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
                dispatchGlobal({ type: actionTypesGlobal.setLoading, payload: false })
                dispatchGlobal({ tyoe: actionTypesGlobal.setNotification, payload: error.message })
            }

            //copia profunda del array original 
            const copyFlatInString = JSON.stringify(flatCheckList);
            const copyFlatInJson = JSON.parse(copyFlatInString);

            //copia del array original con los cambios listos para enviar la data
            const arrayWhitUrls = copyFlatInJson.map((item) => {
                const newItem = item
                if (newItem.image != '') {
                    const indexImage = links.findIndex((link) => link.question === item.question)
                    newItem.image = links[indexImage].url
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


    return { sendCheckList, errorPost, request }

}

export { usePostCheckList };
