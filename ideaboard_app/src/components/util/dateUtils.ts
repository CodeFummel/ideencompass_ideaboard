import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc.js";
import weekday from "dayjs/plugin/weekday.js";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(weekday);

dayjs.locale("de");

export const formatDate = (date: Date): string => {
    const formatted = dayjs(date);
    return formatted.local().format("DD.MM.YYYY u[m] HH:mm");
}


