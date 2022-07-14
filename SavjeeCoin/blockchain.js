//Base do trabalho ->https://www.youtube.com/watch?v=zVqczFZr124&list=RDCMUCnxrdFPXJMeHru_b4Q_vTPQ&start_radio=1
//                 ->https://www.youtube.com/watch?v=HneatE69814&list=PLzvRQMJ9HDiTqZmbtFisdXFxul5k0F-Q4&index=2
//                 ->https://www.youtube.com/watch?v=HneatE69814&list=PLzvRQMJ9HDiTqZmbtFisdXFxul5k0F-Q4&index=3
//                   https://www.youtube.com/watch?v=kWQ84S13-hw&list=PLzvRQMJ9HDiTqZmbtFisdXFxul5k0F-Q4&index=4
//Adaptado para trabalho 2 sobre blockchain da materia de Segurança e Auditoria de Sistemas primeiro semestre de 2022
// Replicado por :Mateus Yi Muraoka


//sera utilizado sha-256 como funcao hash entretando nao esta disponivel
// em JavaScript por padrao, entao sera necessario importar a library
//atraves do terminal -> npm install --save crypto-js
//importando a funcao sha256
const SHA256 = require('crypto-js/sha256');

//Eh necessario a importacao da biblioteca elliptic, que permitira criar um chave publica e privada
//sendo um metodo para assinar algo e verificar um assinatura
const EC = require('elliptic').ec;
//Iguala ao ec a novo EC que tem o algoritimo secp256k1 que eh base das carteiras de bitcoin
const ec = new EC('secp256k1');

//Criando a classe transaction
class Transaction {
    // onde transacao sempre vem de alguem, vai para alguem e carrega uma certa quantia de moedas
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
    // Metodo para retornar a Hash sha256 da transacao
    calculateHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }
    // Metodo para assinar as transacao
    signTransaction(signingKey) {
        //Funcao para verificar se a chave eh igual ao  do endereco
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('Você não pode assinar transacoes para outras carteiras!');
        }
        // Eh calculado a hash da transacao
        //Assina com a chave em formato hex que se encontra no arquivo keygenerator.js 
        // Guarda o objeto da transacao
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }
    //Metodo para verificar se assinatura esta correta 
    isValid() {
        //verifica se a transacao eh nula se for eh um transacao valida
        if (this.fromAddress === null) return true;
        //verifica se nao ha assinatura ou se assinatura estiver vazia
        if (!this.signature || this.signature.length === 0) {
            throw Error('Sem assinatura nesta transacao!');
        }
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        //verifica se a hash do bloco esta assinada com esta assinatura
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}


//criar a classe block
class Block {
    //cria classe construtor que receberar//as propriedades , sendo que a previousHash esta vazia
    //"time" stamp dira quando o block foi criado 
    //previousHash eh um string que contem a hash anterior podemndo armzenar o valor de transacao 
    constructor(timestamp, transactions, previousHash = '') {
        //ira acompanhar todos os valores
        this.timestamp = timestamp; 
        this.transactions = transactions;
        this.previousHash = previousHash;
        //"hash" ira conter a hash do nosso bloco // precisamos de um caminho para calcular isto
        // enquanto mantem isto como vazio por agora
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    //criar um novo metodo para calcular a funcao hash do bloco//pegando a propriedades do bloco, roda-los dentro da funcao hash
    // e retornar a hash que identificara o bloco na blockchain//sera utilizado sha-256 como funcao hash 
    calculateHash() {
        //retorna as propriedades do bloco
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    //Metodo verifica a dificuldade de mineração e a incrementa
    mineBlock(difficulty) {
        // Condição criada para verificar a quandidade de zeros necessarias para minerar
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("BLOCK MINED: " + this.hash);
    }
    // Metodo verifica se todas as transacoes do bloco sao validas
    hasValidTransactions() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }
        return true;
    }
}

//Criar uma nova classe blockchain
class Blockchain {
    //criar um metodo constructor
    constructor() {
        //criar propriedade chain dentro da classe que sera um array dos blocos
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 6;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    //o primeiro bloco na blockchain eh bloco de Origem(GenesisBlock)
    // e ele dever ser adicionado manualmente

    //Metodo cria o Genesis block e 
    createGenesisBlock() {
        //retornara um novo bloco e sera iniciado como zero pois nao ha bloco anterior
        return new Block("01/01/2022", "Genesis block", "0");
    }

    //Metodo retorna o ultimo bloco da Blockchain
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    //Metodo resposavel por minerar, caso a mineracao ocorra com sucesso, 
    //o bloco enviara o reward para este endereco
    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Bloco Minerado com sucesso!');
        this.chain.push(block);

        this.pendingTransactions = [];
    }
    //Metodo resposavel por adicionar uma Transacao
    addTransaction(transaction) {
        //  cria condicao para verificar se a transacao tem endereço de origem e destino
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('A transacao deve incluir de qual endereco e para qual endereço');
        }
        //  cria condicao para verificanr se a transacao que sera adicionada a cadeia eh valida
        if (!transaction.isValid()) {
            throw new Error('Nao pode adicionar transacao invalida a chain');
        }
        this.pendingTransactions.push(transaction);
    }
    //Metodo resposavel para calcular o Saldo
    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }
    //Metodo para validar o valores da blockchain
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // cria condicao para verificar se todas transacoes do bloco sao validas
            if (!currentBlock.hasValidTransactions()) {
                return false;
            }
            //cria condicao para verificar se o  hash bloco atual nao eh igual ao do hashcalculado bloco 
            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false;
            }
            //cria condicao para verificar se o bloco esta apontando corretamente para o  bloco anterior  
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;