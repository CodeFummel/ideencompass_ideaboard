import {Idea} from "@/src/components/idea/useIdeas";
import {Dateable} from "@/src/components/util/statUtil";

export const sortByCreatedAt = (a: Dateable, b: Dateable, ascending: boolean) => {
    const result = new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
    return ascending ? result : -result;
}

export const sortByLikes = (a: Idea, b: Idea, ascending: boolean) => {
    const result = b._count.likes - a._count.likes;
    return ascending ? result : -result;
}

export const sortByComments = (a: Idea, b: Idea, ascending: boolean) => {
    const result = b._count.comments - a._count.comments;
    return ascending ? result : -result;
}