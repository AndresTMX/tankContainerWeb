import { useReducer, createContext } from "react";
import { initialState, reducer } from "../../Reducers/GlobalReducer";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <GlobalContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider }