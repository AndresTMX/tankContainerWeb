
const initialState = {
    maniobrasCheckList: {
        pageOne: [],
        pageTwo: [],
        pageThree: []
    },
    cliente:'',
    status:'',
    typeRegister: 'entrada',
    selectItem: false,
    previewPDF: false,
    select: false,
    selectOutputRegisters:[],
    modalSendRegisters:false,
    update: false
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
    setPreviewPDF: 'SET_PREVIEW_PDF',
    setCliente:'SET_CLIENTE',
    setStatus:'SET_STATUS',
    setSelect:'SET_SELECT',
    setSelectOutputRegister:'SET_SELECT_OUTPUTREGISTER',
    setModalRegister:'SET_MODAL_REGISTER',
    setUpdate:'SET_UPDATE_REGISTERS',
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
    },
    [actionTypes.setStatus]:{
        ...state,
        status: payload
    },
    [actionTypes.setCliente]:{
        ...state,
        cliente:payload
    },
    [actionTypes.setSelect]:{
        ...state,
        select: payload
    },
    [actionTypes.setSelectOutputRegister]:{
        ...state,
        selectOutputRegisters:payload
    },
    [actionTypes.setModalRegister]:{
        ...state,
        modalSendRegisters: payload
    },
    [actionTypes.setUpdate]:{
        ...state,
        update:payload
    }

});

export { initialState, reducer, actionTypes }