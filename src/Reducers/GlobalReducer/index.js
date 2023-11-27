const initialState = {
    notification:false,
    loading:false,
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
    setNotification: 'SET_NOTIFICATION',
    setLoading: 'SET_LOADING',
}

//Use reducer con estrutura de objetos 
const reducerObject = (state, payload) => ({
 
 
    [actionTypes.setNotification]:{
        ...state,
        notification: payload
    },
    [actionTypes.setLoading]:{
        ...state,
        loading: payload
    },

});

export { initialState , reducer, actionTypes }