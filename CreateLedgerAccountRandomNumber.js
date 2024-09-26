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
  const EXPONENT = 27  
  return PermuteQPR((PermuteQPR(index) + intermediateOffset) ^ EXPONENT);
}

function RandomSequenceOfUnique(seed, offset) {
  let index = PermuteQPR(PermuteQPR(seed) + 3);
  let intermediateOffset = PermuteQPR(PermuteQPR(offset) + 7);

  return [index, intermediateOffset];
}

function PermuteQPR(value) {
  const PRIME = 127;
  const DIVISOR = 2;
  if (value >= PRIME) return value;

  let residue = (value * value) % PRIME;
  return value <= PRIME / DIVISOR ? residue : PRIME - residue;
}

function VerifiedDigit(accountNumber) {
  const WEIGHT = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9];

  let sum = 0;
  let idx = 0;

  for (let intPos = accountNumber.length - 1; intPos >= 0; intPos--) {
      sum += parseInt(accountNumber[intPos]) * WEIGHT[idx];
      idx++;
  }

  let mod = (sum * 10) % 11;
  if (mod >= 10) mod = 0;
  return mod;
}
