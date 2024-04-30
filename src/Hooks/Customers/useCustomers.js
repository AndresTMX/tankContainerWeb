import supabase from "../../supabase";
import { useState, useEffect } from "react";

function useCustomers(idCustomer) {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(null);
    const [update, setUpdate] = useState(false);
    const [error, setError] = useState(null);
    const [selectCustomers, setSelectCustomers] = useState([]);
    const [customerId, setCustomerId] = useState([])
    //dataGrid
    const [rowsCustomers, setRowsCustomers] = useState([]);

    const cache = localStorage.getItem('customers')

    useEffect(() => {
        if (idCustomer) {
            getCustomerWhitId(idCustomer);
        } else {
            getCustomers();
        }

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

            const customerNameAndId = data.map((item) => ({
                id: item.id,
                nombre: item.cliente
            }));

            setCustomers(data);
            setRowsCustomers(rows);
            setSelectCustomers(customerNameAndId);
            localStorage.setItem('customers', JSON.stringify(data));
            setLoading(false);

        } catch (error) {
            setLoading(false)
            // dispatchGlobal({
            //     type: actionTypesGlobal.setNotification,
            //     payload: error.message
            // })
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
            // dispatchGlobal({
            //     type: actionTypesGlobal.setNotification,
            //     payload: error.message
            // });
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
                    // dispatchGlobal({
                    //     type: actionTypesGlobal.setNotification,
                    //     payload: error.message
                    // });
                }
            })

            await Promise.all(deleteCustomers);

        } catch (error) {
            setLoading(false);
            // dispatchGlobal({
            //     type: actionTypesGlobal.setNotification,
            //     payload: error.message
            // });
        }
    }

    const updateCustomer = async (updates) => {
        try {

            const updatesCustomers = updates.map(async (update) => {

                const { error } = await supabase
                    .from('clientes')
                    .update({ ...update })
                    .eq('id', update.id)

                if (error) {
                    throw new Error(error.message)
                }

                setLoading(false)
                // dispatchGlobal({
                //     type: actionTypesGlobal.setNotification,
                //     payload: error.message
                // });
            })

            try {
                await Promise.all(updatesCustomers);
            } catch (error) {
                throw new Error(`Error: ${error.message}`)
            }

        } catch (error) {
            setLoading(false);
            // dispatchGlobal({
            //     type: actionTypesGlobal.setNotification,
            //     payload: error.message
            // });
        }
    }

    const getCustomerWhitId = async (idCustomer) => {
        try {
            const { data, error } = await supabase
                .from('clientes')
                .select(`*`)
                .eq('id', idCustomer)

            if (error) {
                throw new Error(error.message)
            }

            setCustomerId(...data);
        } catch (error) {
            // dispatchGlobal({
            //     type: actionTypesGlobal.setNotification,
            //     payload: error.message
            // });
        }
    }

    const updateCustomers = () => setUpdate(!update);

    return { customers, rowsCustomers, selectCustomers, customerId, loading, error, updateCustomers, createCustomer, deleteCustomer, updateCustomer, getCustomerWhitId }

}

export { useCustomers };