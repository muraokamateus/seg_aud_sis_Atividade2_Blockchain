//Base do trabalho ->https://www.youtube.com/watch?v=zVqczFZr124&list=RDCMUCnxrdFPXJMeHru_b4Q_vTPQ&start_radio=1
//                 ->https://www.youtube.com/watch?v=HneatE69814&list=PLzvRQMJ9HDiTqZmbtFisdXFxul5k0F-Q4&index=2
//                 ->https://www.youtube.com/watch?v=HneatE69814&list=PLzvRQMJ9HDiTqZmbtFisdXFxul5k0F-Q4&index=3
//                   https://www.youtube.com/watch?v=kWQ84S13-hw&list=PLzvRQMJ9HDiTqZmbtFisdXFxul5k0F-Q4&index=4
//Adaptado para trabalho 2 sobre blockchain da materia de Segurança e Auditoria de Sistemas primeiro semestre de 2022
// Replicado por :Mateus Yi Muraoka

//importando funcoes do arquivo blockchain.js
const {Blockchain, Transaction} = require('./blockchain');

//Eh necessario a importacao da biblioteca elliptic, que permitira criar um chave publica e privada
//sendo um metodo para assinar algo e verificar um assinatura
const EC = require('elliptic').ec;
//Iguala ao ec a novo EC que tem o algoritimo secp256k1 que eh base das carteiras de bitcoin
const ec = new EC('secp256k1');

 //seta  a chave privada para ser utilizada
const myKey = ec.keyFromPrivate('c6c7f38907cd11fd1880d6f0011a422572ffabc643ee0db5f9c2951929263f73');
const myWalletAddress = myKey.getPublic('hex');

let savjeeCoin = new Blockchain();


//Seta a Transacao 1
const tx1 = new Transaction(myWalletAddress, 'public keys goes here',10);
//Assina transacao com key pessoal
tx1.signTransaction(myKey);
// Adiciona o Transacao 1 na blockchain
savjeeCoin.addTransaction(tx1);

console.log('\n Começou a mineração 1...');
savjeeCoin.minePendingTransactions(myWalletAddress);
const time1 =  new Date(savjeeCoin.chain[1].timestamp);
console.log("Tempo: \n", time1);
console.log('\nO saldo da carteira eh: ', savjeeCoin.getBalanceOfAddress(myWalletAddress));
console.log('A Chain eh valida?' , savjeeCoin.isChainValid());


// //Codigo para alterar os dados do bloco diretamente
// savjeeCoin.chain[1].transactions[0].amount =1;
// console.log('\nTentativa de alteracao')
// //checa se chain eh valida
// console.log('\nA Chain eh valida?' , savjeeCoin.isChainValid());

//Seta a Transacao 2
const tx2 = new Transaction(myWalletAddress, 'public keys goes here',10);
//Assina transacao com key pessoal
tx2.signTransaction(myKey);
// Adiciona o Transacao 2 na blockchain
savjeeCoin.addTransaction(tx2);

console.log('\n Começou a mineração 2...');
savjeeCoin.minePendingTransactions(myWalletAddress);
const time2 =  new Date(savjeeCoin.chain[2].timestamp);
console.log("Tempo: \n", time2);
console.log('\nO saldo da carteira eh: ', savjeeCoin.getBalanceOfAddress(myWalletAddress));
console.log('A Chain eh valida?' , savjeeCoin.isChainValid());

//Seta a Transacao 3
const tx3 = new Transaction(myWalletAddress, 'public keys goes here',10);
//Assina transacao com key pessoal
tx3.signTransaction(myKey);
// Adiciona o Transacao 3 na blockchain
savjeeCoin.addTransaction(tx3);

console.log('\n Começou a mineração 3...');
savjeeCoin.minePendingTransactions(myWalletAddress);
const time3 =  new Date(savjeeCoin.chain[3].timestamp);
console.log("Tempo: \n", time3);
console.log('\nO saldo da carteira eh: ', savjeeCoin.getBalanceOfAddress(myWalletAddress));
console.log('A Chain eh valida?' , savjeeCoin.isChainValid());











//console.log("");
// //Teste para block chain
// let savjeeCoin = new Blockchain();
// savjeeCoin.createTransaction(new Transaction('address1', 'address2', 100));
// savjeeCoin.createTransaction(new Transaction('address2', 'address1', 50));

// console.log('\n Starting the Miner...');
// savjeeCoin.minePendingTransactions('xavier-address');

// console.log('\nBalance of xavier is: ', savjeeCoin.getBalanceOfAdress('xaviers-address'));

// console.log('\n Starting the Miner Again...');
// savjeeCoin.minePendingTransactions('xavier-address');

// console.log('\nBalance of xavier is: ', savjeeCoin.getBalanceOfAdress('xaviers-address'));

//testes feitos para saber se o codigo estava funcionando
/*console.log('Mining block 1....'),
savjeeCoin.addBlock(new Block(1,"10/04/2022", {amount:4}));

console.log('Mining block 2....'),
savjeeCoin.addBlock(new Block(2,"12/04/2022", {amount:10}));*/

/*//testa se a blockchain eh verdadeira
console.log('Is block chain valid?' + savjeeCoin.isChainValid());

savjeeCoin.chain[1].data = { amount: 100 };
savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculateHash();
//testa se a blockchain eh verdadeira
console.log('Is block chain valid?' + savjeeCoin.isChainValid());

//console.log(JSON.stringify(savjeeCoin,null,4));*/
