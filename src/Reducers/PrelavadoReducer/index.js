
const initialState = {
    typeWashing: 'prelavado',
    modalForm: false
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
    setTypeWashing: 'SET_TYPE_WASHING',
    setModalForm: 'SET_MODAL_FORM',
}

//Use reducer con estrutura de objetos 
const reducerObject = (state, payload) => ({

    [actionTypes.setTypeWashing]: {
        ...state,
        typeWashing: payload
    },
    [actionTypes.setModalForm]: {
        ...state,
        modalForm: payload
    },

});

export { initialState, reducer, actionTypes }