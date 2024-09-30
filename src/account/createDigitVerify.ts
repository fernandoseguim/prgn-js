export default function createDigitVerify(value: string): number {
    const WEIGHT: number[] = [2, 3, 4, 5, 6, 7, 8, 9];
    const MOD_DIVISOR: number = 11;
    let sum: number = 0;
    let index: number = 0;

    for (let position: number = value.length - 1; position >= 0; position--) {
        sum += parseInt(value[position]) * WEIGHT[index % WEIGHT.length];
        index++;
    }

    let mod: number = sum % MOD_DIVISOR;
    let checkDigit: number = MOD_DIVISOR - mod;

    return checkDigit >= 10 ? 0 : checkDigit;
}
