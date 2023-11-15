import { useEffect, useState } from "react";
import supabase from "../../supabase";

function useGetUsers() {

    const [users, setUsers] = useState([])
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        getAllUsers();
    }, [update])

    const getAllUsers = async () => {

        try {
            const { data, error } = await supabase.from('users_data').select('*');
            setUsers(data)
        } catch (error) {
            setError(error)
        }
    }

    const updateUsers = () => {
        setUpdate(!update)
    }

    return { users, updateUsers }

}

export { useGetUsers };