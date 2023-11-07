//days
import { currentDate } from "./Helpers/date";

export const mockRegisters = [
    {
        id:1,
        checkIn: currentDate,
        linea: 'Linea random 1',
        tracto: 'tracto 1',
        operador: {
            name:'Armando Mendoza Lopez',
            celular: '5577828470'
        },
        tanques:[
            {tanque:'C-4589F'},
            {tanque:'C-4588F'},
            {tanque:'C-4587F'},
            {tanque:'C-4586F'}
        ],
        checkOut:currentDate
    },
    {
        id:2,
        checkIn: currentDate,
        linea: 'Linea random 2',
        pipa:'P-896325',
        tracto: 'tracto 2',
        operador: {
            name:'Juan Miguel Salazar Perez',
            celular: '5577828470'
        },
        checkOut:currentDate
    },
    {
        id:3,
        checkIn: currentDate,
        linea: 'Linea random 3',
        tracto: 'tracto 3',
        operador: {
            name:'Armando Mendoza Lopez',
            celular: '5577828470'
        },
        tanques:[
            {tanque:'C-58469'},
            {tanque:'C-53486'},

        ],
        checkOut:currentDate
    },
    {
        id:4,
        checkIn: currentDate,
        linea: 'Linea random 4',
        tracto: 'tracto 4',
        operador: {
            name:'Lucas Ascencio Lopez',
            celular: '5577828470'
        },
        tanques:[
            {tanque:'C-85964'},
            {tanque:'C-63598'},
        ],
        checkOut:undefined
    },
    {
        id:5,
        checkIn: currentDate,
        linea: 'Linea random 5',
        tracto: 'tracto 5',
        operador: {
            name:'Armando Mendoza Lopez',
            celular: '5577828470'
        },
        tanques:[
            {tanque:'C-85963'},
            {tanque:'C-36985'},
            {tanque:'C-12354'},
        ],
        checkOut:undefined
    },

]