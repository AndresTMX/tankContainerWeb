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
                { position: 'dome', image: imageDome, value: valueDome },
                { position: 'valve', image: imageValve, value: valueValve },
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
                .update({ status: 'sellado' })
                .eq('id', idRegistroEntrada)

            if (errorUpdateRegister) {
                throw new Error(`Error al actualizar el registro general de entrada, error: ${errorUpdateRegister.message}`)
            }

            //actualizar el registro de lavado a sanitizado
            const { error: errorUpdateWashing } = await supabase
                .from('lavados')
                .update({ status: 'sellado', URL: urlInString })
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
                payload: 'Enviado a sellado'
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

    const returnToStatus = async (idLavado, idRegistro, newStatus) => {

        try {

            if (newStatus === 'interna' || newStatus === 'externa') {

                //cambiar status de lavado a cancelado
                const { error: errorUpdateStatusWashing } = await supabase
                    .from('lavados')
                    .update({ status: 'cancelado' })
                    .eq('id', idLavado)

                if (errorUpdateStatusWashing) {
                    throw new Error(`Error al crear nueva reparación ${newStatus} , error: ${errorUpdateStatusWashing.message}`)
                }

                //crear reparacion del tipo deseado
                const { error: errorCreateReaparation } = await supabase
                    .from('reparaciones')
                    .insert({ id_detalle_registro: idRegister, tipo_reparacion: newStatus })

                if (errorCreateReaparation) {
                    await supabase.from('lavados').update({ status: 'almacenado-prelavado' }).eq('id', idLavado)
                    throw new Error(`Error al crear raparación ${newStatus} `)
                }

                const { error: errorUpdateStatus } = await supabase
                    .from('registros_detalles_entradas')
                    .update({ status: 'reparacion' })
                    .eq('id', idRegistro)

                if (errorUpdateStatus) {
                    throw new Error(`Error al actualizar el registro ${errorUpdateStatus.message} `)
                }

            }

            if (newStatus === 'lavado') {

                const { error } = await supabase
                    .from('registros_detalles_entradas')
                    .update({ status: newStatus })
                    .eq('id', idRegistro);

                if (error) {
                    await supabase.from('registros_detalles_entradas').update({ status: 'prelavado' }).eq('id', idRegistro);
                    throw new Error(`Error al actualizar el estatus del registro \nerror: ${error.message}`)
                }

                const { error: errorUpdateWashing } = await supabase
                    .from('lavados')
                    .update({ status: 'asignado' })
                    .eq('id', idLavado)

                if (errorUpdateWashing) {
                    await supabase.from('registros_detalles_entradas').update({ status: 'prelavado' }).eq('id', idRegistro)
                    await supabase.from('lavados').update({ status: 'pending' }).eq('id', idLavado)
                    throw new Error(`Error al actualizar el estatus del registro \nerror: ${error.message}`)
                }

            }
            
        } catch (error) {
            console.error(error)
        }
    }

    return { sendToSanitization, returnToStatus }
}

export { useSendToSanitization };