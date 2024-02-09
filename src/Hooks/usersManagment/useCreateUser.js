import { useContext, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal} from "../../Reducers/GlobalReducer";
import supabase from "../../supabase";

function useCreateUser() {
    
    const [state, dispatch] = useContext(GlobalContext);
    const roles = ['admin', 'developer', 'vigilante', 'maniobrista', 'reparador', 'lavador', 'gestor de calidad'];
    const [dataUser, setDataUser] = useState({ rol: "", first_name: "", last_name: "", position: "", phone: "", email: "", password: "" })
    const [modal, setModal] = useState({form: false})
    const [error, setError] = useState(null);

    const validateDataUser = () => {
        const { rol, first_name, last_name, position, phone, email, password } = dataUser;

        let validateRol
        let validateInputs

        if (roles.includes(rol)) {
            validateRol = true;
        }

        if (!rol || !first_name || !last_name || !position || !password || !email) {
            dispatch({ type: actionTypesGlobal.setNotification, payload: 'Llena todos los campos' })
        } else {
            validateInputs = true
        }

        return validateInputs && validateRol;

    }

    const createUser = async (e) => {
        e.preventDefault();
        const validate = validateDataUser(dataUser)

        if (validate) {
            dispatch({ type: actionTypesGlobal.setLoading, payload: true })
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

                dispatch({ type: actionTypesGlobal.setNotification, payload: 'Usuario creado con exito' })
                dispatch({ type: actionTypesGlobal.setLoading, payload: false })
                setDataUser({ rol: "", first_name: "", last_name: "", position: "", phone: "", email: "", password: "" })
            } catch (error) {
                setError(error)
            }

        }

    }

    const toggleForm = () => {
        setModal({...modal, form:!modal.form })
    }

    return { dataUser, setDataUser, createUser, toggleForm, modal }
}

export { useCreateUser };