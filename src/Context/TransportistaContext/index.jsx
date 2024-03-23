import { useState, createContext, useContext } from "react";

const TransportistaContext = createContext();

export function TransportistaProvider({ children }) {

    const [selectTanks, setSelectTanks] = useState([])

    function toggleTank(item) {
        const newList = new Set(selectTanks);

        if (newList.has(item)) {
            newList.delete(item);
        } else {
            newList.add(item);
        }

        setSelectTanks([...newList.values()]);
    }

    function toggleGroup(arrayItems) {

        const newList = new Set(selectTanks);

        for (const item of arrayItems) {
            if (newList.has(item)) {
                newList.delete(item);
            } else {
                newList.add(item);
            }
        }

        setSelectTanks([...newList.values()]);

    }



    return (
        <TransportistaContext.Provider value={{ selectTanks, toggleTank, toggleGroup }}>
            {children}
        </TransportistaContext.Provider>
    )
}

export function useTransportistasContext() {
    const context = useContext(TransportistaContext);
    return { context }
}