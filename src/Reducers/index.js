import { mockRegisters } from "../dataFake";

const initialState = {
    registers:mockRegisters,
    prelavado:[],
    reparacion:[],
    notification:false,
    loading:false,
    maniobrasCheckList:{},
    typeRegister:'entrada',
    selectItem:false
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
    setNotification: 'SET_NOTIFICATION',
    setLoading: 'SET_LOADING',
    setManiobrasCheck: 'SET_MANIOBRAS_CHECK',
    setTypeRegister: 'SET_TYPE_REGISTER',
    setSelectItem: 'SET_SELECT_ITEM'
  
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
    [actionTypes.setNotification]:{
        ...state,
        notification: payload
    },
    [actionTypes.setLoading]:{
        ...state,
        loading: payload
    },
    [actionTypes.setManiobrasCheck]:{
        ...state,
        maniobrasCheckList: payload
    },
    [actionTypes.setTypeRegister]:{
        ...state,
        typeRegister:payload
    },
    [actionTypes.setSelectItem]:{
        ...state,
        selectItem: payload
    }

});

export { initialState , reducer, actionTypes }