import supabase from "../../supabase";

function useUpdateTracto() {

    const updateStatusTracto = async(idTracto) => {
        const {error} = await supabase.from('tractos')
        .update({status: 'forconfirm'})
        .eq('tracto', idTracto)

        const {dataRegister, errorRegister} = await supabase.from('registros_detalles_salidas')
        .insert({
            
        })
    }

    return {updateStatusTracto}

}

export {useUpdateTracto};