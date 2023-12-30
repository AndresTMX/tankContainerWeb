import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";
import { AuthContext } from "../../Context/AuthContext";
import { GlobalContext } from "../../Context/GlobalContext";
import { useContext, useState } from "react";
import supabase from "../../supabase";
import { dividirArray } from "../../Helpers/transformRegisters";
import { sendImageCloudinary } from "../../cloudinary";
import { dateMXFormat } from "../../Helpers/date";

function useChecklistPrelavado(updaterFunction) {

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);
    const { key } = useContext(AuthContext);

    //cloudinary data
    const preset = 'mvtjch9n';
    const folderName = 'prelavado_checklist';

    /*/
    Funcion que recupera el numero de iteraciones realizadas 
    y los datos de los checklist realizados en un lavado 
    /*/
    const validateIterationCheckList = async (idRegister) => {
        try {
            const { data, error } = await supabase
                .from('prelavado_checklist')
                .select(`iteraciones, data`)
                .eq('registro_detalle_entrada_id', idRegister)

            if (error) {
                throw new Error(`Error al validar las iteraciones del checklist, \n error: ${error.message}`)
            }

            return { data, error }
        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    /*/
    Funcion que actualiza la columna donde se almacenan los datos 
    del checklist
    /*/
    const updateDataChecklist = async (idRegister, dataValidate, dataChecklist) => {

        try {
            const iteraciones = dataValidate?.length ? dataValidate[0].iteraciones + 1 : 0;

            let mergeChecklist
            let newDataInString

            const oldDataChecklist = JSON.parse(dataValidate[0].data);
            const currentChecklistInJson = JSON.parse(dataChecklist.data);

            if (iteraciones > 1) {
                oldDataChecklist.push(currentChecklistInJson);
                mergeChecklist = oldDataChecklist
                newDataInString = JSON.stringify(mergeChecklist);
            } else {
                mergeChecklist = [...oldDataChecklist, ...currentChecklistInJson];
                const newDataInJson = dividirArray(mergeChecklist, 17);
                newDataInString = JSON.stringify(newDataInJson);
            }

            //actualizar el campo data agregando el nuevo checklist y las iteraciones sumandole 1
            const { error: errorUpdate } = await supabase
                .from('prelavado_checklist')
                .update({ data: newDataInString, iteraciones: iteraciones })
                .eq('registro_detalle_entrada_id', idRegister)

            if (errorUpdate) {
                throw new Error(`Error al actualizar checklist, \n error: ${error.message}`)
            }

            if (!errorUpdate) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: `checlist guardado, iteracion: ${iteraciones}`
                })
            }

        } catch (error) {
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }


    }

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
                throw new Error(error.message)
            }

            if (!error) {
                dispatchGlobal({
                    type: actionTypesGlobal.setNotification,
                    payload: 'checklist guardado'
                })
            }

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
            const imagesWhitQuestion = dataChecklist.filter((question) => question?.question && question.image != '');

            //extraer las imagenes y cambiarles el nombre
            const imagesWhitName = imagesWhitQuestion.map((question, index) => {
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


            try {
                //resolver promesas
                await Promise.all(sendImages);
            } catch (error) {
                throw new Error(`Error al resolver promsesas, error: ${error.message}`)
            }
         
            //copia del array original con los cambios listos para enviar la data
            const arrayWhitUrls = dataChecklist.map((item) => {
                if (item.image !== '') {
                    const indexImage = links.findIndex((link) => link.question === item.question);
                    if (indexImage !== -1) {
                        item.image = links[indexImage].url;
                        item.preview = '';
                    }
                }
                return { ...item }; // Crear un nuevo objeto para evitar modificar el original
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
    const completeChecklist = async (idRegister, dataChecklist) => {

        try {

            //subir las imagenes anexadas y regresar data en string
            const checklistWhitUrlInString = await sendImagesChecklist(dataChecklist.data)

            if (checklistWhitUrlInString === undefined) {
                throw new Error(`Error al obtener los url del las imagenes`)
            }

            //recounstruir el objeto con la nueva data del checklist
            const checklistDataWhitImages = {
                registro_detalle_entrada_id: dataChecklist.registro_detalle_entrada_id,
                numero_tanque: dataChecklist.numero_tanque,
                numero_pipa: dataChecklist.numero_pipa,
                data: checklistWhitUrlInString,
            }

            //verificar la existencia de un checklist con el mismo id de detalles de entrada 
            const { data: dataValidate, error: errorValidate } = await validateIterationCheckList(idRegister);

            if (errorValidate) {
                throw new Error(errorValidate)
            }
            //recuperar las veces que se ha repetido este proceso
            const iteraciones = dataValidate?.length ? dataValidate[0].iteraciones + 1 : 0;
            //si se ha repetido mas de una vez
            if (iteraciones >= 1) {
                await updateDataChecklist(idRegister, dataValidate, checklistDataWhitImages);
            } else {
                await sendChecklistPrelavado(checklistDataWhitImages);
            }

            const { error } = await supabase
                .from('registros_detalles_entradas')
                .update({ status: 'almacenado' })
                .eq('id', idRegister);

            if (error) {
                throw new Error(`Error al actualizar el estatus del registro \nerror: ${error.message}`)
            }

            setTimeout(() => {
                updaterFunction()
            }, 1000)

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