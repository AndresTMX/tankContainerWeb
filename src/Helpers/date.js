import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export const currentDate = new dayjs(new Date());

export const transformDate = (date) =>  dayjs(date);

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

