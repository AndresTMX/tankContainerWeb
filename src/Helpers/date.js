import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/es';
dayjs.locale('es');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

export const dateInText = (date) => dayjs(date).format('dddd, MMMM D, YYYY');

export const currentDate = new dayjs(new Date());

export const transformDate = (date) => dayjs(date);

export const dateMX = (date) => transformDate(date).tz('America/Mexico_City');

export const dateMXFormat = (date) => {
    const datemx = dateMX(date);
    const year = datemx.$y;
    const month = datemx.$M + 1;
    const day = datemx.$D;
    return `${day}/${month}/${year}`
}

export const datetimeMXFormat = (date) => {
    const datemx = transformDate(date);
    const hora = datemx.$H;
    const minutes = datemx.$m;
    return `${hora}: ${minutes}`
}

export const currenDateFormatTz = dateMX(currentDate);

export const tiempoTranscurrido = (date) => dayjs(date).fromNow(true)

export const timepoParaX = (date) => {

    const fechaActualInString = dayjs(currentDate).toISOString();
    const fechaRecibida = dayjs(date).toISOString();

    return dayjs(fechaRecibida).from(fechaActualInString, true)
}

export const dateTextShort = (date) => {
    const splitText = dateInText(date)?.split(',', [4])
    const splitData = splitText[1].split(' ', 3)
    const dia = splitText[0]
    return `${dia} ${splitData[2]} de ${splitData[1]}`
}



