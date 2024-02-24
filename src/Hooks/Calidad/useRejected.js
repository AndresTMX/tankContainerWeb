import supabase from "../../supabase";

function useRejected() {

    const rejectedTank = async (idLavado) => {
        try {
            const { error } = await supabase.from('lavados').update({ status: 'rechazado' }).eq('id', idLavado)
        } catch (error) {
            console.error(error)
        }
    }

    return { rejectedTank}

}

export { useRejected };