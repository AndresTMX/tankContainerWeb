import { mockRegisters } from "../dataFake";

const initialState = {
    registers:mockRegisters,
    prelavado:[],
    reparacion:[],
};

//Use reducer que valida los objetos
 const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
}

const actionTypes = {
    setRegisters: 'SET_REGISTERS',
    setPrelavado: 'SET_PRELAVADO',
    setReparacion:'SET_REPARACION',
  
}

//Use reducer con estrutura de objetos 
const reducerObject = (state, payload) => ({
 
    [actionTypes.setRegisters]:{
        ...state,
        registers: payload
    },
    [actionTypes.setPrelavado]:{
        ...state,
        prelavado: payload
    },
    [actionTypes.setReparacion]:{
        ...state,
        reparacion: payload
    },

});

export { initialState , reducer, actionTypes }