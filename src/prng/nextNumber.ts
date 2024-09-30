import permuteQPR from './permuteQPR';

export default function nextNumber(index: number, intermediateOffset: number): number {
    if (index < 0) throw new Error('ArgumentOutOfRangeException: index');
    if (intermediateOffset < 0) throw new Error('ArgumentOutOfRangeException: intermediateOffset');

    const STEP_SIZE_OFFSET = 1548584693
    return permuteQPR((permuteQPR(index) + intermediateOffset) ^ STEP_SIZE_OFFSET);
}