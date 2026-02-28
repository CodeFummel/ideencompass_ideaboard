import {Idea} from "@/src/components/idea/useIdeas";
import dayjs from "dayjs";

export type Period = "week" | "month" | "year";

const ideasInPeriod = (ideas: Idea[], period: Period) =>
    ideas.filter(idea => period === "all" ? true : dayjs(idea.createdAt).diff(dayjs(), period) === 0);

export const categoryData = (ideas: Idea[], period: Period) => {
    console.log("ideas:", ideas);

    const filteredIdeas = ideasInPeriod(ideas, period);

    const categoryWorkplaceAmount = filteredIdeas.filter(i => i.category === "Arbeitsplatz").length;
    const categoryCafeAmount = filteredIdeas.filter(i => i.category === "Cafe").length;
    const categoryHRAmount = filteredIdeas.filter(i => i.category === "HR").length;
    const categoryITAmount = filteredIdeas.filter(i => i.category === "IT").length;
    const categoryProductsAmount = filteredIdeas.filter(i => i.category === "Produkte").length;
    const categoryElseAmount = filteredIdeas.filter(i => i.category === "Sonstiges").length;

    console.log(filteredIdeas);

    return [categoryWorkplaceAmount, categoryCafeAmount, categoryHRAmount, categoryITAmount, categoryProductsAmount, categoryElseAmount];
}

export const countLabels = (period: Period) => {
    switch (period) {
        case "week":
            return ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
        case "year":
            return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }
}

export type Dateable = {createdAt: string | Date};

export const countData = (dateables: Dateable[], period: Period) => {
    const filteredDateables = dateables.filter(dateable => dayjs(dateable.createdAt) >= dayjs().startOf(period));

    switch (period) {
        case "week": {
            const data = Array(7).fill(0);
            for (const dateable of filteredDateables) {
                data[(dayjs(dateable.createdAt).day() + 6) % 7]++;
            }
            return data;
        }
        case "year": {
            const data = Array(12).fill(0);
            for (const dateable of filteredDateables) {
                data[dayjs(dateable.createdAt).month()]++;
            }
            return data;
        }
    }
}