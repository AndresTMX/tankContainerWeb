import supabase from "../../supabase";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes } from "../../Reducers/GlobalReducer";
import { sendImageCloudinary } from "../../cloudinary";

function useSendToSanitization() {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    //cloudinary data
    const preset = 'mvtjch9n';
    const folderName = 'pruebas_url';

    const sendToSanitization = async (idLavado, idRegistroEntrada, dataUrl) => {
        try {

            dispatchGlobal({
                type: actionTypes.setLoading,
                payload: true
            })

            //subir imagen de url y devolver string url image
            const { valueDome, coments, previewDome, imageDome, valueValve, previewValve, imageValve } = dataUrl || {};

            const images = [imageDome, imageValve];
            const urls = []

            const dataURL = [
                { position:'dome', image: imageDome, value: valueDome},
                { position:'valve', image: imageValve, value: valueValve},
            ]

            for (let item of dataURL) {

                if (item.image != '') {
                    const formData = new FormData();
                    formData.append('folder', folderName);
                    formData.append('upload_preset', `${preset}`)
                    formData.append('file', item.image);
                    const response = await sendImageCloudinary(formData);

                    if (!response.url) {
                        throw new Error(`Error al subir al subir la imagen, imposible recuperar url, url: ${response.url}`)
                    }

                    urls.push({ ...item, image: response.url })
                }

            }

            const url = {
                ...urls,
                coments: coments
            }

            const urlInString = JSON.stringify(url);

            //actualizar el registro general a sanitizando
            const { error: errorUpdateRegister } = await supabase
                .from('registros_detalles_entradas')
                .update({ status: 'sanitizado' })
                .eq('id', idRegistroEntrada)

            if (errorUpdateRegister) {
                throw new Error(`Error al actualizar el registro general de entrada, error: ${errorUpdateRegister.message}`)
            }

            //actualizar el registro de lavado a sanitizado
            const { error: errorUpdateWashing } = await supabase
                .from('lavados')
                .update({ status: 'sanitizado', URL: urlInString })
                .eq('id', idLavado)


            if (errorUpdateWashing) {
                await supabase.from('registros_detalles_entradas').update({ stauts: 'lavado' }).eq('id', idRegistroEntrada)
                throw new Error(`Error al actualizar el registro de lavado, error: ${errorUpdateWashing.message}`)
            }

            dispatchGlobal({
                type: actionTypes.setLoading,
                payload: false
            })

            dispatchGlobal({
                type: actionTypes.setNotification,
                payload: 'Enviado a sanitización'
            })

        } catch (error) {
            dispatchGlobal({
                type: actionTypes.setLoading,
                payload: false
            })

            dispatchGlobal({
                type: actionTypes.setNotification,
                payload: error.message
            })
        }
    }

    return { sendToSanitization }
}

export { useSendToSanitization };