import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc.js";

export const formatDate = (date: Date): string => {
    dayjs.extend(customParseFormat);
    dayjs.extend(utc);
    const formatted = dayjs(date).locale("de");
    return formatted.local().format("DD.MM.YYYY u[m] HH:mm");
}


