import { useReducer, createContext } from "react";
import { initialState, reducer } from "../../Reducers/PrelavadoReducer";

const PrelavadoContext = createContext();

const PrelavadoProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return(
        <PrelavadoContext.Provider value={[state, dispatch]}>
            {children}
        </PrelavadoContext.Provider>
    )
}

export {PrelavadoContext, PrelavadoProvider}