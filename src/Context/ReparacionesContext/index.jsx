import { useReducer, createContext } from "react";
import { initialState, reducer } from "../../Reducers/ReparacionesReducer";

const ReparacionesContext = createContext();

const ReparacionesProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return(
        <ReparacionesContext.Provider value={[state, dispatch]}>
            {children}
        </ReparacionesContext.Provider>
    )
}

export {ReparacionesContext, ReparacionesProvider}