import { Cloudinary } from "@cloudinary/url-gen";

const url = 'https://api.cloudinary.com/v1_1/dwiyxwcxj/image/upload';

//cloudinary data
export const preset = 'mvtjch9n';
export const folderName = 'pruebas_url';

const App = () => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dwiyxwcxj' } });
};

export async function sendImageCloudinary(formData) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,

    });
    return response.json();
  } catch (error) {
    throw new Error(`Error al subir las imagenes del checklist`)
  }
}