
export type Vote = {
    votedOption: number,
}

export const voteData = (votes: Vote[], count: number) => votes.reduce((a, v) => {
    a[v.votedOption]+= 1;
    return a;
}, new Array(count).fill(0))