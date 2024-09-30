export default function permuteQPR(value: number): number {

    if (value < 0) throw new Error('ArgumentOutOfRangeException: value');

    const PERMUTATION_PRIME = 127;
    const RESIDUE_THRESHOLD = 2;

    if (value >= PERMUTATION_PRIME) return value;

    let residue = (value * value) % PERMUTATION_PRIME;

    return value <= PERMUTATION_PRIME / RESIDUE_THRESHOLD ? residue : PERMUTATION_PRIME - residue;
}