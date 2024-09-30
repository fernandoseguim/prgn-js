export default function permuteQPR(value: number): number {

    const PERMUTATION_PRIME = 127;

    if (value >= PERMUTATION_PRIME) return value;

    let residue = (value * value) % PERMUTATION_PRIME;

    return value <= PERMUTATION_PRIME / 2 ? residue : PERMUTATION_PRIME - residue;
}