import createRandomSequenceOfUnique from '../prng/createRandomSequenceOfUnique';
import nextNumber from '../prng/nextNumber';
import createDigitVerify from './createDigitVerify';

export default function createLedgerAccountRandomNumber(sequence: number): string {

    if (sequence <= 0) throw new Error('ArgumentOutOfRangeException: sequence');
    const MAX_ACCOUNT_NUMBER_LENGTH = 12;

    const number = createRandomNumber(sequence);
    const digit = createDigitVerify(number);
    const accountNumber = number + digit;

    if (accountNumber.length > MAX_ACCOUNT_NUMBER_LENGTH) {
        throw new Error('Número gerado é maior que 12 caracteres');
    }

    return accountNumber;
}

export function createRandomNumber(sequence: number): string {

    if (sequence <= 0) throw new Error('ArgumentOutOfRangeException: sequence');

    const SEED = 1;
    const MAX_RANDOM_NUMBER_LENGTH = 11;
    const MAX_SEQUENCE_LENGTH = 5;

    let offset = SEED + sequence;
    let result = createRandomSequenceOfUnique(SEED, offset);
    let index = result[0];
    let intermediateOffset = result[1];
    
    let number = nextNumber(index, intermediateOffset).toString();
    
    if (sequence.toString().length > MAX_SEQUENCE_LENGTH)
        number = sequence.toString()[0] + number;

    return number.padStart(MAX_RANDOM_NUMBER_LENGTH, '0');
}