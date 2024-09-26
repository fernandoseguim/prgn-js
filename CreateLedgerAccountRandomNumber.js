function CreateLedgerAccountRandomNumber(sequence) {

    if (sequence <= 0) throw new Error('ArgumentOutOfRangeException: sequence');

    const SEED = 1;
    const MAX_ACCOUNT_NUMBER_LENGTH = 12;
    const MAX_SEQUENCE_LENGTH = 5;

    let offset = SEED + sequence;
    let result = RandomSequenceOfUnique(SEED, offset);
    let index = result[0];
    let intermediateOffset = result[1];
    let number = Next(index, intermediateOffset).toString();
    let lengthMaxCountAccount = sequence.toString().length;

    if (lengthMaxCountAccount > MAX_SEQUENCE_LENGTH)
        number = sequence.toString()[0] + number;

    let Number = number + VerifiedDigit(number);

    if (Number.length > MAX_ACCOUNT_NUMBER_LENGTH) {
        throw new Error('Número gerado é maior que 12 caracteres');
    }

    return Number.padStart(MAX_ACCOUNT_NUMBER_LENGTH, '0');
}

function Next(index, intermediateOffset) {
    if (index < 0) throw new Error('ArgumentOutOfRangeException: index');
    if (intermediateOffset < 0) throw new Error('ArgumentOutOfRangeException: intermediateOffset');

    const STEP_SIZE_OFFSET = 27
    return PermuteQPR((PermuteQPR(index) + intermediateOffset) ^ STEP_SIZE_OFFSET);
}

function RandomSequenceOfUnique(seed, offset) {
    if (seed < 0) throw new Error('ArgumentOutOfRangeException: seed');
    if (offset < 0) throw new Error('ArgumentOutOfRangeException: offset');

    let index = PermuteQPR(PermuteQPR(seed) + 3);
    let intermediateOffset = PermuteQPR(PermuteQPR(offset) + 7);

    return [index, intermediateOffset];
}

function PermuteQPR(value) {

    if (value < 0) throw new Error('ArgumentOutOfRangeException: value');

    const PERMUTATION_PRIME = 127;
    const RESIDUE_THRESHOLD = 2;
    if (value >= PERMUTATION_PRIME) return value;

    let residue = (value * value) % PERMUTATION_PRIME;
    return value <= PERMUTATION_PRIME / RESIDUE_THRESHOLD ? residue : PERMUTATION_PRIME - residue;
}

function VerifiedDigit(accountNumber) {

    const WEIGHT = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9];
    const MOD_DIVISOR = 11;
    const CHECK_DIGIT_FACTOR = 10

    let sum = 0;
    let index = 0;

    for (let position = accountNumber.length - 1; position >= 0; position--) {
        sum += parseInt(accountNumber[position]) * WEIGHT[index];
        index++;
    }

    let mod = (sum * CHECK_DIGIT_FACTOR) % MOD_DIVISOR;
    if (mod >= CHECK_DIGIT_FACTOR) mod = 0;
    return mod;
}
