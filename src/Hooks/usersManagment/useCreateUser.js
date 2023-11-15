import { useContext, useState } from "react";
import { useSupabase } from "../useSupabase";
import { DevelopmentContext } from "../../Context";
import { actionTypes } from "../../Reducers";

function useCreateUser() {

    const { supabase } = useSupabase();
    const [state, dispatch] = useContext(DevelopmentContext);
    const roles = ['admin', 'developer', 'vigilante', 'Maniobrista', 'Reparador', 'Lavador', 'Gestor de calidad'];
    const [dataUser, setDataUser] = useState({ rol: "", first_name: "", last_name: "", position: "", phone: "", email: "", password: "" })
    const [error, setError] = useState(null);

    const validateDataUser = () => {
        const { rol, first_name, last_name, position, phone, email, password } = dataUser;

        let validateRol
        let validateInputs

        if (roles.includes(rol)) {
            validateRol = true;
        }

        if (!rol || !first_name || !last_name || !position || !phone || !password || !email) {
            dispatch({ type: actionTypes.setNotification, payload: 'Llena todos los campos' })
        } else {
            validateInputs = true
        }

        return validateInputs && validateRol;

    }

    const createUser = async (e) => {
        e.preventDefault();
        const validate = validateDataUser(dataUser)

        if (validate) {
            dispatch({ type: actionTypes.setLoading, payload: true })
            try {
                const { data, error } = await supabase.auth.signUp(
                    {
                        email: dataUser.email,
                        password: dataUser.password,
                        options:{
                            data: {
                                 rol: dataUser.rol,
                                 first_name: dataUser.first_name,
                                 last_name: dataUser.last_name,
                                 phone: dataUser.phone
                              }
                        }
                    }, 
                )

                const { error: errorAddData } = await supabase
                    .from('users_data')
                    .insert({
                        id: data.user.id,
                        rol: dataUser.rol,
                        email: dataUser.email,
                        first_name: dataUser.first_name,
                        last_name: dataUser.last_name,
                        position: dataUser.position,
                        phone: dataUser.phone
                    })

                dispatch({ type: actionTypes.setNotification, payload: 'Usuario creado con exito' })
                dispatch({ type: actionTypes.setLoading, payload: false })
                setDataUser({ rol: "", first_name: "", last_name: "", position: "", phone: "", email: "", password: "" })
            } catch (error) {
                setError(error)
            }

        }

    }

    return { dataUser, setDataUser, createUser }
}

export { useCreateUser };