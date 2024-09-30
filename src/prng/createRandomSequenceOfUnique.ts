import permuteQPR from './permuteQPR';

export default function createRandomSequenceOfUnique(seed: number, offset: number): number[] {
    if (seed < 0) throw new Error('ArgumentOutOfRangeException: seed');
    if (offset < 0) throw new Error('ArgumentOutOfRangeException: offset');

    let index = permuteQPR(permuteQPR(seed) + 1741231585);
    let intermediateOffset = permuteQPR(permuteQPR(offset) + 1181783493);

    return [index, intermediateOffset];
}
