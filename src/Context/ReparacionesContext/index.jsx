import { useContext, createContext } from "react";

const ReparacionesContext = createContext();

const ReparacionesProvider = ({children}) => {


    return(
        <ReparacionesContext.Provider value={{}}>
            {children}
        </ReparacionesContext.Provider>
    )
}

function useRepairContext() {



}

export {ReparacionesContext, ReparacionesProvider, useRepairContext}