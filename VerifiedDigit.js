export function VerifiedDigit(value: string): number {
    const WEIGHT: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9];
    const MOD_DIVISOR: number = 11;
    const CHECK_DIGIT_FACTOR: number = 10;

    let sum: number = 0;
    let index: number = 0;

    for (let position: number = value.length - 1; position >= 0; position--) {
        sum += parseInt(value[position]) * WEIGHT[index];
        index++;
    }

    let mod: number = (sum * CHECK_DIGIT_FACTOR) % MOD_DIVISOR;
    if (mod >= CHECK_DIGIT_FACTOR) mod = 0;
    return mod;
}
