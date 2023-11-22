import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export const currentDate = new dayjs();

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
