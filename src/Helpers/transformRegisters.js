import { dateMXFormat, datetimeMXFormat } from "./date";

/*funcion que divide un array en otros mas pequeños*/
export function dividirArray(array, tamanoMaximo) {
  const arraysDivididos = [];

  for (let i = 0; i < array.length; i += tamanoMaximo) {
    const subarray = array.slice(i, i + tamanoMaximo);
    arraysDivididos.push(subarray);
  }

  return arraysDivididos;
}

/*funcion que divide un array en otros mas pequeños segun una propiedad especifica*/
export function dividirArrayPorPropiedad(array, propiedad) {
  const subarrays = [];
  let subarrayActual = [];

  for (const elemento of array) {
      if (elemento.hasOwnProperty(propiedad)) {
          // Si encontramos un elemento con la propiedad deseada, guardamos el subarray actual y comenzamos uno nuevo
          if (subarrayActual.length > 0) {
              subarrays.push(subarrayActual);
          }
          subarrayActual = [];
      }

      subarrayActual.push(elemento);
  }

  // Asegurarnos de agregar el último subarray
  if (subarrayActual.length > 0) {
      subarrays.push(subarrayActual);
  }

  return subarrays;
}
