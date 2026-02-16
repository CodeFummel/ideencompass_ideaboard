import {Idea} from "@/src/components/idea/useIdeas";

export const sortByCreatedAt = (a: Idea, b: Idea, ascending: boolean) => {
    const result = b.createdAt.valueOf() - a.createdAt.valueOf();
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
