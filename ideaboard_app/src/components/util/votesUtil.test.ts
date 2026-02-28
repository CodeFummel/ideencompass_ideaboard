import {Vote, voteData} from "./votesUtil";

describe("votesUtil", () => {
    it("returns an array of votes", () => {
        const votes: Vote[] = [
            {votedOption: 2},
            {votedOption: 3},
            {votedOption: 6},
            {votedOption: 5}
        ];
        const options = [2,3,5,6];
        const expected = [1,1,1,1];
        const result = voteData(votes, options);
        expect(result).toEqual(expected);
    })
    it("accumulates votes", () => {
        const votes: Vote[] = [
            {votedOption: 2},
            {votedOption: 3},
            {votedOption: 2},
            {votedOption: 5}
        ];
        const options = [2,3,5,6];
        const expected = [2,1,1,0];
        const result = voteData(votes, options);
        expect(result).toEqual(expected);
    })
})