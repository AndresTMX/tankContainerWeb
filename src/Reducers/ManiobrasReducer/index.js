
const initialState = {
  EIR:{}
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
}

//Use reducer con estrutura de objetos 
const reducerObject = (state, payload) => ({

  [actionTypes.setManiobrasCheck]: {
    ...state,
    maniobrasCheckList: payload
  },

});

export { initialState, reducer, actionTypes }

const checklist = [
  {
    question: 'PANEL FROTAL',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '1',
    section: 'panel',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'PANEL IZQUIERDO',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '1',
    section: 'panel',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'PANEL DERECHO',
    value: null,
    preview: '',
    image: '',
    coment: '',
    section: 'panel',
    step: '1',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'PANEL INFERIOR',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '1',
    section: 'panel',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'PANEL SUPERIOR',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '1',
    section: 'panel',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'PANEL TRASERO',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '1',
    section: 'panel',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']

  },





  {
    question: 'MARCO FRONTAL',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '2',
    section: 'marco',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },

  {
    question: 'MARCO TRASERO',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '2',
    section: 'marco',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']

  },
  {
    question: 'MARCO DERECHO',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '2',
    section: 'marco',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'MARCO IZQUIERDO',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '2',
    section: 'marco',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'MARCO SUPERIOR',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '2',
    section: 'marco',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'MARCO INFERIOR',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '2',
    section: 'marco',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },





  {
    question: 'NOMENCLATURA',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '3',
    section: 'informacion',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'PLACA DE DATOS',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '3',
    section: 'informacion',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'PORTA DOCUMENTOS',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '3',
    section: 'informacion',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },








  {
    question: 'ESCALERAS',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '4',
    section: 'entrada',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'PASARELAS',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '4',
    section: 'entrada',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'ENTRADA DE HOMBRE',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '4',
    section: 'entrada',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']

  },
  {
    question: 'MARIPOSAS DE E. HOMBRE',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '4',
    section: 'entrada',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'MANERAL DE VÁLVULA DE SEGURIDAD',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '5',
    section: 'valvula',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },









  {
    question: 'VÁLVULA DE PRESIÓN Y ALIVIO',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '5',
    section: 'valvula',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'VÁLVULA DE ALIVIO',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '5',
    section: 'valvula',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'VÁLVULA DE PIE DE TANQUE',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '5',
    section: 'valvula',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'VÁLVULA DE DESCARGA',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '5',
    section: 'valvula',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'TAPÓN DE VÁLVULA DE DESCARGA',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '5',
    section: 'valvula',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'TAPONES DE TUBO DE VAPOR',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '5',
    section: 'valvula',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'BRIDA CIEGA',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '5',
    section: 'valvula',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'TUBO DE DESAGÜE',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '5',
    section: 'valvula',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'TUBO DE VAPOR',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '5',
    section: 'valvula',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },




  {
    question: 'CIERRE DE EMERGENCIA REMOTO',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '6',
    section: 'sistemas',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'SISTEMA DE CALENTAMIENTO ELÉCTRICO',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '6',
    section: 'sistemas',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'MANÓMETRO',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '6',
    section: 'sistemas',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },
  {
    question: 'TERMÓMETRO',
    value: null,
    preview: '',
    image: '',
    coment: '',
    step: '6',
    section: 'sistemas',
    correct: 'buen estado',
    options: ['buen estado', 'mal estado', 'cortado', 'doblado', 'abollado', 'faltante']
  },


]