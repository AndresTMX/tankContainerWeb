import supabase from "../../supabase";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { actionTypes as actionTypesGlobal } from "../../Reducers/GlobalReducer";

function useCustomers() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(null);
    const [update, setUpdate] = useState(false);
    const [error, setError] = useState(null);
    //dataGrid
    const [rowsCustomers, setRowsCustomers] = useState([]);

    const [stateGlobal, dispatchGlobal] = useContext(GlobalContext);

    useEffect(() => {
        getCustomers();
    }, [update])

    const getCustomers = async () => {
        try {
            setError(null);
            setLoading(true);
            const { data, error } = await supabase
                .from('clientes')
                .select()

            if (error) {
                throw new Error(error.message)
            }

            const rows = data.map((item) => ({
                id: item.id,
                col1: item.cliente,
                col2: item.rfc,
                col3: item.email,
                col4: item.phone
            }));

            setCustomers(data);
            setRowsCustomers(rows);
            setLoading(false);

        } catch (error) {
            setLoading(false)
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            })
        }
    }

    const createCustomer = async (customer) => {
        try {
            const { error } = await supabase
                .from('clientes')
                .insert({ ...customer })

            if (error) {
                throw new Error(error.message)
            }
        } catch (error) {
            setLoading(false);
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            });
        }
    }

    const deleteCustomer = async (arrayIds) => {
        try {

            const deleteCustomers = arrayIds.map(async (id) => {
                try {
                    const { error } = await supabase
                        .from('clientes')
                        .delete()
                        .eq('id', id)

                    if (error) {
                        throw new Error(error.message)
                    }

                } catch (error) {
                    setLoading(false);
                    dispatchGlobal({
                        type: actionTypesGlobal.setNotification,
                        payload: error.message
                    });
                }
            })

            await Promise.all(deleteCustomers);

        } catch (error) {
            setLoading(false);
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            });
        }
    }

    const updateCustomer = async (customerId, updates) => {
        try {
            const { error } = await supabase
                .from('clientes')
                .update({ rfc: '', email: '', phone: ''})
                .eq('id', customerId)

            if (error) {
                throw new Error(error.message)
            }
        } catch (error) {
            setLoading(false);
            dispatchGlobal({
                type: actionTypesGlobal.setNotification,
                payload: error.message
            });
        }
    }

    const updateCustomers = () => setUpdate(!update);

    return { customers, rowsCustomers, loading, error, updateCustomers, createCustomer, deleteCustomer, updateCustomer }

}

export { useCustomers };