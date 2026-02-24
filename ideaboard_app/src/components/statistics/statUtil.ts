import {Idea} from "@/src/components/idea/useIdeas";

export const categoryData = (ideas: Idea[]) => {
    const categoryWorkplaceAmount = ideas.filter(i => i.category === "Arbeitsplatz").length;
    const categoryCafeAmount = ideas.filter(i => i.category === "Cafe").length;
    const categoryHRAmount = ideas.filter(i => i.category === "HR").length;
    const categoryITAmount = ideas.filter(i => i.category === "IT").length;
    const categoryProductsAmount = ideas.filter(i => i.category === "Produkte").length;
    const categoryElseAmount = ideas.filter(i => i.category === "Sonstiges").length;

    return [categoryWorkplaceAmount, categoryCafeAmount, categoryHRAmount, categoryITAmount, categoryProductsAmount, categoryElseAmount];
}
