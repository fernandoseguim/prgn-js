### 1. `permuteQPR.ts`

**Função**: `permuteQPR`  
**Descrição**: Aplica o método de permutação "Quadratic Prime Residue" (QPR) para misturar bits de um número e gerar uma permutação pseudo-aleatória.

```ts
function permuteQPR(x: number): number
```

**Exemplo de Input**:
```js
permuteQPR(42)
```

**Exemplo de Output**:
```js
144756932
```

---

### 2. `createRandomSequenceOfUnique.ts`

**Função**: `createRandomSequenceOfUnique`  
**Descrição**: Gera uma sequência aleatória de números únicos dentro de um intervalo definido.

```ts
function createRandomSequenceOfUnique(min: number, max: number): number[]
```

**Exemplo de Input**:
```js
createRandomSequenceOfUnique(10, 100)
```

**Exemplo de Output**:
```js
[35, 89, 12, 76, 45, 23, 91, 50, 33, 28]
```

---

### 3. `nextNumber.ts`

**Função**: `nextNumber`  
**Descrição**: Retorna o próximo número da sequência pseudo-aleatória.

```ts
function nextNumber(): number
```

**Exemplo de Input**:
```js
nextNumber()
```

**Exemplo de Output**:
```js
8734523
```

---

### 4. `createLedgerAccountRandomNumber.ts`

**Função**: `createLedgerAccountRandomNumber`  
**Descrição**: Gera um número aleatório para ser usado como identificador de conta no sistema de livro razão (ledger).

```ts
function createLedgerAccountRandomNumber(1): number
```

**Exemplo de Input**:
```js
createLedgerAccountRandomNumber()
```

**Exemplo de Output**:
```js
000000000558
```

---

### 5. `createDigitVerify.ts`

**Função**: `createDigitVerify`  
**Descrição**: Gera um dígito verificador para um número, comum em validações de números de conta ou documentos.

```ts
function createDigitVerify(number: number): number
```

**Exemplo de Input**:
```js
createDigitVerify(12345678)
```

**Exemplo de Output**:
```js
3
```
