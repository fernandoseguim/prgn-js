export default function permuteQPR(value: number): number {

    if (value < 0) throw new Error('ArgumentOutOfRangeException: value');

    const PERMUTATION_PRIME = 4294967291;

    if (value >= PERMUTATION_PRIME) return value;

    let residue = (value * value) % PERMUTATION_PRIME;

    return value <= PERMUTATION_PRIME / 2 ? residue : PERMUTATION_PRIME - residue;
}