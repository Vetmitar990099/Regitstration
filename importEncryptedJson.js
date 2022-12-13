const crypto = require('crypto');
const fs = require('fs');

const password = 'dave';


const fileName = './Encrypted/person.aes';
const algorithm = 'aes-192-cbc';
// const password = 'password';

const key = crypto.scryptSync(password, 'salt', 24);
const iv = Buffer.alloc(16, 0);
const inFile = fs.createReadStream(fileName);
const outFile = fs.createWriteStream(fileName + ".json");
const decrypt = crypto.createDecipheriv(algorithm, key, iv);

inFile.pipe(decrypt).pipe(outFile);