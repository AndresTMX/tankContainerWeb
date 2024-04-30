import { useState, useEffect } from "react";
import supabase from "../../supabase";


function useMaterials() {

    const [rowMaterials, setRowMaterials] = useState([]);
    const [materiales, setMateriales] = useState([]);
    const [loading, setLoading] = useState(null);
    const [update, setUpdate] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getMaterials();
    }, [update])

    const getMaterials = async () => {

        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('materiales')
                .select('*')

            setMateriales(data)
            const rows = data.map((material) => ({
                id: material.id,
                col1: material.material,
                col2: material.stock,
                col3: material.precio_unitario,
            }));
            setRowMaterials(rows)

            if (error) {
                throw new Error(error.message)
            }

        } catch (error) {
            setLoading(false)
        }

    }

    const addMaterial = async (material) => {
        try {
            const { error } = await supabase.from('materiales')
                .insert({ ...material })

            if (error) {
                throw new Error(error.message)
            }

            updater();

        } catch (error) {
            console.error(error?.message)
        }
    }

    const deleteMaterial = async (arrayIds) => {
        try {

            const elementsForDelete = arrayIds.map(async (id) => {
                try {
                    const { error } = await supabase.from('materiales').delete().eq('id', id)

                    if (error) {
                        throw new Error(error.message)
                    }
                } catch (error) {
                    console.error(error?.message)
                }
            })

            await Promise.all(elementsForDelete);

            updater();

        } catch (error) {
            console.error(error?.message)
        }
    }

    const updateMaterial = async (arrayUpdates) => {
        try {

            const elementsForUpdate = arrayUpdates.map(async (update) => {
                try {
                    const { error } = await supabase.from('materiales')
                    .update({ precio_unitario:update.precio_unitario, stock: update.stock })
                    .eq('id', update.id)

                    if (error) {
                        throw new Error(error.message)
                    }
                } catch (error) {
                    console.error(error?.message)
                }
            })

            await Promise.all(elementsForUpdate);

            updater();

        } catch (error) {
            console.error(error?.message)

        }
    }

    const updater = () => setUpdate(!update);

    return { materiales, rowMaterials, loading, error, updater, addMaterial, deleteMaterial, updateMaterial }

}

export { useMaterials };