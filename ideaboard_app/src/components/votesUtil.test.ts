import {Vote, voteData} from "./votesUtil";

describe("votesUtil", () => {
    it("returns an array of votes", () => {
        const votes: Vote[] = [
            {votedOption: 2},
            {votedOption: 3},
            {votedOption: 6},
            {votedOption: 5}
        ];
        const expected = [0,0,1,1,0,1,1];
        const result = voteData(votes, 7);
        expect(result).toEqual(expected);
    })
    it("accumulates votes", () => {
        const votes: Vote[] = [
            {votedOption: 2},
            {votedOption: 3},
            {votedOption: 2},
            {votedOption: 5}
        ];
        const expected = [0,0,2,1,0,1,0];
        const result = voteData(votes, 7);
        expect(result).toEqual(expected);
    })
})