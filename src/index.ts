import * as fs from 'fs';
import * as path from 'path';
import createLedgerAccountRandomNumber from './account/createLedgerAccountRandomNumber';


// Função principal que gera os números, verifica colisões e exporta o CSV
async function generateLedgerAccounts(totalAccounts: number, batchSize: number) {
  let currentFileIndex = 1;

  for (let batchStart = 0; batchStart < totalAccounts; batchStart += batchSize) {
    const ledgerAccounts: { sequence: number; number: string; colide_with: number | null }[] = [];
    const accountNumbers = new Map<string, number>(); // Mapeia números de conta para o sequence

    const batchEnd = Math.min(batchStart + batchSize, totalAccounts);

    for (let i = batchStart + 1; i <= batchEnd; i++) {
      const accountNumber = createLedgerAccountRandomNumber(i);

      // Verifica se o número já foi gerado antes
      if (accountNumbers.has(accountNumber)) {
        const collidingSequence = accountNumbers.get(accountNumber)!;
        ledgerAccounts.push({ sequence: i, number: accountNumber, colide_with: collidingSequence });
      } else {
        accountNumbers.set(accountNumber, i);
        ledgerAccounts.push({ sequence: i, number: accountNumber, colide_with: null });
      }

      // Verifica se o limite de linhas do arquivo foi atingido
      if (ledgerAccounts.length >= batchSize) {
        await exportToCSV(ledgerAccounts, currentFileIndex);
        ledgerAccounts.length = 0; // Limpa a lista para o próximo arquivo
        currentFileIndex++;
      }

      // Log para controle de progresso
      if (i % 100000 === 0) {
        console.log(`${i} contas geradas...`);
      }
    }

    // Exporta o último batch se ainda houver registros
    if (ledgerAccounts.length > 0) {
      await exportToCSV(ledgerAccounts, currentFileIndex);
      currentFileIndex++;
    }

    console.log(`Processamento do batch ${batchStart + 1} a ${batchEnd} concluído.`);
  }
}

// Função que exporta os dados gerados para um arquivo CSV
async function exportToCSV(data: { sequence: number; number: string; colide_with: number | null }[], fileIndex: number) {
  
  const reportDir = path.join(__dirname, 'temp');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }

  const filePath = path.join(reportDir, `ledger_accounts_${fileIndex}.csv`);
  const header = 'sequence,number,colide_with\n';
  const rows = data
    .map(({ sequence, number, colide_with }) => `${sequence},${number},${colide_with ?? ''}`)
    .join('\n');

  // Escreve os dados no arquivo CSV
  fs.writeFileSync(filePath, header + rows);

  // Verifica se há alguma colisão no arquivo
  const hasCollision = data.some(entry => entry.colide_with !== null);

  // Exibe a mensagem no console, informando se há ou não colisões
  if (hasCollision) {
    console.log(`Arquivo gerado: ${filePath} (contém colisões)`);
  } else {
    console.log(`Arquivo gerado: ${filePath}`);
  }
}

// Função para capturar o valor passado pelo prompt
function getParameterFromPrompt(): number {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    throw new Error('Por favor, forneça a quantidade de contas a serem geradas como parâmetro.');
  }

  const totalAccounts = parseInt(args[0], 10);
  if (isNaN(totalAccounts) || totalAccounts <= 0) {
    throw new Error('A quantidade de contas a serem geradas deve ser um número positivo.');
  }

  return totalAccounts;
}

// Iniciar o processo para gerar a quantidade de contas passadas como argumento
const totalAccounts = getParameterFromPrompt();
const batchSize = 1000000; // Definir um tamanho de lote seguro para processar em blocos menores
generateLedgerAccounts(totalAccounts, batchSize).catch((err) => console.error('Erro ao gerar as contas:', err));
