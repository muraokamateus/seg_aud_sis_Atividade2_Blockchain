//Base do trabalho ->https://www.youtube.com/watch?v=zVqczFZr124&list=RDCMUCnxrdFPXJMeHru_b4Q_vTPQ&start_radio=1
//                 ->https://www.youtube.com/watch?v=HneatE69814&list=PLzvRQMJ9HDiTqZmbtFisdXFxul5k0F-Q4&index=2
//                 ->https://www.youtube.com/watch?v=HneatE69814&list=PLzvRQMJ9HDiTqZmbtFisdXFxul5k0F-Q4&index=3
//                   https://www.youtube.com/watch?v=kWQ84S13-hw&list=PLzvRQMJ9HDiTqZmbtFisdXFxul5k0F-Q4&index=4
//Adaptado para trabalho 2 sobre blockchain da materia de Segurança e Auditoria de Sistemas primeiro semestre de 2022
// Replicado por :Mateus Yi Muraoka

//Eh necessario a importacao da biblioteca elliptic, que permitira criar um chave publica e privada
//sendo um metodo para assinar algo e verificar um assinatura
const EC = require('elliptic').ec;
//Iguala ao ec a novo EC que tem o algoritimo secp256k1 que eh base das carteiras de bitcoin
const ec = new EC('secp256k1');

//Geracao do par de chaves 
const key = ec.genKeyPair();
//Extrarir a chave publica no formato hex
const publicKey = key.getPublic('hex');
//Extrarir a chave privada no formato hex
const privateKey = key.getPrivate('hex');

//Imprime no terminal
console.log();
console.log('Private key: ', privateKey);

//Imprime no terminal
console.log();
console.log('Public key:  ', publicKey);

