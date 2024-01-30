import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { GlobalContext } from "../../Context/GlobalContext";
import { AuthContext } from "../../Context/AuthContext";
import supabase from "../../supabase";
import { useContext } from "react";
import { sendImageCloudinary } from "../../cloudinary";

function useChecklistPrelavado(updaterFunction) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const { key } = useContext(AuthContext);

    //cloudinary data
    const preset = 'mvtjch9n';
    const folderName = 'prelavado_checklist';

    /*/
    Funcion que envia el checklist en la primera iteracion
    /*/
    const sendChecklistPrelavado = async (data) => {
        try {
            const { error } = await supabase
                .from('prelavado_checklist')
                .insert({
                    user_id: key,
                    ...data
                })

            if (error) {
                throw new Error(`Error al crear checklist de prelavado, error: ${error.message}`)
            }

            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: 'checklist guardado'
            })

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    /*/
    Funcion que se encarga de recibir el checklist, cargar las imagenes
    y regresar un nuevo checklist con url´s en lugar de imagenes.
    /*/
    const sendImagesChecklist = async (dataChecklist) => {
        try {

            //recuperar imagenes con preguntas        
            const imagesWhitQuestion = dataChecklist.filter((question) => question?.question && question.preview != '');

            //extraer las imagenes y cambiarles el nombre
            const imagesWhitName = imagesWhitQuestion.map((question, index) => {
                const oldFile = question.image;
                const newName = question.question.replace(/[?¿]/g, '');
                return new File([oldFile], newName, { type: oldFile.type });
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


            try {
                //resolver promesas
                await Promise.all(sendImages);
            } catch (error) {
                throw new Error(`Error al resolver promsesas, error: ${error.message}`)
            }

            //copia del array original 
            const copyOriginalArray = JSON.stringify(dataChecklist);
            const newArray = JSON.parse(copyOriginalArray)

            const arrayWhitUrls = newArray.map((item, index) => {

                if (index != 0 && item.image != "") {
                    const questionClear = item.question.replace(/[?¿]/g, '');
                    const indexImage = links.findIndex((link) => link.question === questionClear);
                    const url = links[indexImage].url;

                    item.image = url;
                    item.preview = '';
                }

                return item

            });

            const checklistWhitUrlInString = JSON.stringify(arrayWhitUrls);

            return checklistWhitUrlInString;
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    /*/
    Funcion que se encarga de recibir el checklist y ejecutar 
    funciones auxiliares segun el numero de iteracion del prelavado
    /*/
    const completeChecklist = async (idRegister, idLavado, dataChecklist, newStatus) => {

        try {

            const { registro_detalle_entrada_id, numero_tanque, numero_pipa, data } = dataChecklist;

            //verificar si el checklist contiene imagenes
            const checkListWhitImages = data.filter((item) => item.preview != '');

            if (checkListWhitImages.length) {

                //subir las imagenes anexadas y regresar data en string
                const checklistWhitUrlInString = await sendImagesChecklist(data)

                if (checklistWhitUrlInString === undefined) {
                    throw new Error(`Error al obtener los url del las imagenes`)
                }
                //recounstruir el objeto con la nueva data del checklist
                const checklistDataWhitImages = {
                    ...dataChecklist,
                    data: checklistWhitUrlInString,
                }

                await sendChecklistPrelavado(checklistDataWhitImages);

            } else {

                await sendChecklistPrelavado({ ...dataChecklist, data: JSON.stringify(data) });
            }


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
                    .eq('id', idRegister)

                if (errorUpdateStatus) {
                    throw new Error(`Error al actualizar el registro ${errorUpdateStatus.message} `)
                }

            }

            if (newStatus === 'lavado') {

                const { error } = await supabase
                    .from('registros_detalles_entradas')
                    .update({ status: newStatus })
                    .eq('id', idRegister);

                if (error) {
                    await supabase.from('registros_detalles_entradas').update({ status: 'prelavado' }).eq('id', idRegister);
                    throw new Error(`Error al actualizar el estatus del registro \nerror: ${error.message}`)
                }

                const { error: errorUpdateWashing } = await supabase
                    .from('lavados')
                    .update({ status: 'programado' })
                    .eq('id', idLavado)

                if (errorUpdateWashing) {
                    await supabase.from('registros_detalles_entradas').update({ status: 'prelavado' }).eq('id', idRegister)
                    await supabase.from('lavados').update({ status: 'pending' }).eq('id', idLavado)
                    throw new Error(`Error al actualizar el estatus del registro \nerror: ${error.message}`)
                }

            }

            if (newStatus === 'almacenado') {

                const { error } = await supabase
                    .from('registros_detalles_entradas')
                    .update({ status: 'almacenado-prelavado' })
                    .eq('id', idRegister);

                if (error) {
                    await supabase.from('registros_detalles_entradas').update({ status: 'prelavado' }).eq('id', idRegister);
                    throw new Error(`Error al actualizar el estatus del registro \nerror: ${error.message}`)
                }

                const { error: errorUpdateWashing } = await supabase
                    .from('lavados')
                    .update({ status: 'almacenado-prelavado' })
                    .eq('id', idLavado)

                if (errorUpdateWashing) {
                    await supabase.from('registros_detalles_entradas').update({ status: 'prelavado' }).eq('id', idRegister)
                    await supabase.from('lavados').update({ status: 'pending' }).eq('id', idLavado)
                    throw new Error(`Error al actualizar el estatus del registro \nerror: ${error.message}`)
                }

            }

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }

    }


    return { completeChecklist }

}

export { useChecklistPrelavado };