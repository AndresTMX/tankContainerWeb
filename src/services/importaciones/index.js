import supabase from "../../supabase";
import { toast } from "sonner";

export async function createRegistersForGroup(rows) {

    try {

        const groups = groupObjectsByValueKey(rows, 'tracto');

        for (let group of groups) {
            const repetElement = hasDuplicateValuesForKey(group, 'numero_tanque')
            console.log("🚀 ~ createRegistersForGroup ~ repetElement:", repetElement)

            if (repetElement) {
                toast.warning(`Números de tanques repetidos, ${repetElement}`)
            }

        }



    } catch (error) {

    }

}

function groupObjectsByValueKey(array, key) {
    // Creamos un objeto para almacenar los grupos
    const groups = {};

    // Iteramos sobre el array de objetos
    array.forEach(obj => {
        // Obtenemos el valor de la clave especificada
        const value = obj[key];

        // Comprobamos si ya existe un grupo para este valor
        if (!groups[value]) {
            // Si no existe, creamos un nuevo grupo
            groups[value] = [];
        }

        // Agregamos el objeto al grupo correspondiente
        groups[value].push(obj);
    });

    // Convertimos el objeto de grupos en un array de arrays
    const result = Object.values(groups);

    return result;
}

function hasDuplicateValuesForKey(array, key) {
    // Creamos un objeto para almacenar los valores únicos de la clave
    const uniqueValues = {};

    // Iteramos sobre el array de objetos
    for (const obj of array) {
        // Obtenemos el valor de la clave para el objeto actual
        const value = obj[key];

        // Si ya existe el valor en el objeto uniqueValues, significa que es un valor duplicado
        if (uniqueValues[value]) {
            return value; // Se encontró un valor duplicado
        } else {
            uniqueValues[value] = true; // Almacenamos el valor en el objeto uniqueValues
        }
    }

    // Si no se encontraron valores duplicados, retornamos false
    return false;
}
