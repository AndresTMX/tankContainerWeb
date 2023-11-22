import supabase from "../../supabase";

function useSearchRegister(typeRegister) {
    
    const tableRegisters = "registros";

    const SearchRegister = async (search) => {
        const { data, error } = await supabase
            .from(tableRegisters)
            .select(`
                    *,
                    registros_detalles_entradas (
                    id,
                    carga,
                    tracto,
                    numero_tanque,
                    status,
                    transportistas (
                    id,
                    name
                       ),
                    operadores (
                    id,
                    nombre,
                    correo,
                    contacto
                        ),
                )
            `
            )
            .eq("type", typeRegister)
            .order("checkIn", { ascending: false })
            .range(0, 19);
    };

    return {};
}

export { useSearchRegister };
