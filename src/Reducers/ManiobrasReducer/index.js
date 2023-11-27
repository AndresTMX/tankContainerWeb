
const initialState = {
    maniobrasCheckList: {},
    typeRegister: 'entrada',
    selectItem: false,
    previewPDF: false,
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
    setManiobrasCheck: 'SET_MANIOBRAS_CHECK',
    setTypeRegister: 'SET_TYPE_REGISTER',
    setSelectItem: 'SET_SELECT_ITEM',
    setPreviewPDF: 'SET_PREVIEW_PDF'
}

//Use reducer con estrutura de objetos 
const reducerObject = (state, payload) => ({

    [actionTypes.setManiobrasCheck]: {
        ...state,
        maniobrasCheckList: payload
    },
    [actionTypes.setTypeRegister]: {
        ...state,
        typeRegister: payload
    },
    [actionTypes.setSelectItem]: {
        ...state,
        selectItem: payload
    },
    [actionTypes.setPreviewPDF]: {
        ...state,
        previewPDF: payload
    }

});

export { initialState, reducer, actionTypes }