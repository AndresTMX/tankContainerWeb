import { useState } from "react";
import { Box, Paper, Stack, Button, CardMedia } from "@mui/material";

function UploadFileCloudinary() {

    const [image, setImage] = useState({ image: '', preview: '' })
    console.log("🚀 ~ file: index.jsx:7 ~ UploadFileCloudinary ~ image:", image)

    const onChangue = (event) => {
        const copyState = { ...image };

        const file = event.target.files[0];
        const urlImage = URL.createObjectURL(file);
        if (file) {
            copyState.image = file;
            copyState.preview = urlImage;
        }

        setImage(copyState);
    }

    const Submit = async (event) => {
        event.preventDefault();
        console.log('submit function')

        const preset = 'mvtjch9n';
        const folderName = 'maniobras_checklist';

        const formData = new FormData();
        formData.append('file', image.image);
        formData.append('folder', folderName);
        formData.append('upload_preset', `${preset}`)

        const url = await sendImageCloudinary(formData)
        console.log(url)


    }

    const sendImageCloudinary = async (formData) => {
        const url = 'https://api.cloudinary.com/v1_1/dwiyxwcxj/image/upload';
        // Opciones por defecto estan marcadas con un *
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        return response.json();
    }

    return (
        <Box>

            <form onSubmit={Submit}>
                <Stack>
                    <Paper>

                        <CardMedia
                            component="img"
                            alt="Selected"
                            height="200"
                            image={image.preview}
                        />

                        <input
                            type="file"
                            accept="image/*"
                            id={`image-input`}
                            // style={{ display: "none" }}
                            onChange={onChangue}
                        />
                    </Paper>

                    <Button
                        type="submit"
                    >
                        subir
                    </Button>
                </Stack>
            </form>

        </Box>
    );
}

export { UploadFileCloudinary };