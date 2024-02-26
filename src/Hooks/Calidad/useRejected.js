import supabase from "../../supabase";

function useRejected() {

    const rejectedTank = async (idLavado, callback) => {
        try {
            const { error } = await supabase.from('lavados').update({ status: 'rechazado' }).eq('id', idLavado)

            if (error) {
                throw new Error(`Error al marcar como rechazado, error: ${error.message}`)
            }

                callback()
          
        } catch (error) {
            console.error(error)
        }
    }

    return { rejectedTank }

}

export { useRejected };