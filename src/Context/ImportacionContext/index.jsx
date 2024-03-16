import { useState, useContext, createContext } from "react";

const ImportacionContext = createContext();

export function ImportacionProvider({ children }) {

    const defaultRows = [
        { id: 1, tracto: '1235', operador_id: '1', carga: '1', transportista_id: '1', numero_tanque: '785412-8', cliente_id: '1', tipo: '1', especificacion: '1' },
    ]

    const [dataRows, setDataRows] = useState(defaultRows)

    return (
        <ImportacionContext.Provider value={{ dataRows, setDataRows }}>
            {children}
        </ImportacionContext.Provider>
    );
}


export function useContextImportacion() {
    const context = useContext(ImportacionContext)
    return context
}


