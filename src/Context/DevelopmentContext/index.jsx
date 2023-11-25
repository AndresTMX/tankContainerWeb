import { useReducer, createContext, useContext } from "react";
import { initialState, reducer } from "../../Reducers/";
const DevelopmentContext = createContext();

const DevelopmentProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return(
        <DevelopmentContext.Provider value={[state, dispatch]}>
            {children}
        </DevelopmentContext.Provider>
    )
}

export {DevelopmentContext, DevelopmentProvider}