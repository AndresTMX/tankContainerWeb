import { useReducer, createContext } from "react";
import { initialState, reducer } from "../../Reducers/ManiobrasReducer";

const ManiobrasContext = createContext();

const ManiobrasProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return(
        <ManiobrasContext.Provider value={[state, dispatch]}>
            {children}
        </ManiobrasContext.Provider>
    )
}

export {ManiobrasContext, ManiobrasProvider}