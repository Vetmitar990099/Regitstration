const crypto = require('crypto');
const fs = require('fs');

const password = "dave"

if (process.argv < 2){
    console.error("Usage node Encrypt.js database.js");
}

const fileName = process.argv[2];
const algorithm = 'aes-192-cbc';

const key = crypto.scryptSync(password, 'salt', 24);
const iv = Buffer.alloc(16, 0);
const inFile = fs.createReadStream(fileName);
const outFile = fs.createWriteStream(fileName + ".aes");
const encrypt = crypto.createCipheriv(algorithm, key, iv);

inFile.pipe(encrypt).pipe(outFile);