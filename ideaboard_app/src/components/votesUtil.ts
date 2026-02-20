
export type Vote = {
    votedOption: number,
    votedPoll: number,
}

type Option = {
    id: number,
    content: string,
}

export const mapOptionsToIds = (options: Option[]): number[] => options.map(o => o.id);

export const voteData = (votes: Vote[], options: number[]) => votes.reduce((a, v) => {
    const index = options.indexOf(v.votedOption);
    a[index]+= 1;
    return a;
}, new Array(options.length).fill(0))